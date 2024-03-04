import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useInventoryContext } from "../../context";
import { ItemForm, DeleteItemForm } from "../../forms";

import { SideBar, useModalContext, useToggler, Tabs, Button, ModalConfirmation, NavButton, Spinner } from "shared";
import { ItemDisplayInfo } from "../../components";

import { GoPlus } from "react-icons/go";
import { PenIcon } from "../../../../assets";
import { HiOutlinePrinter } from "react-icons/hi";
import { CloseIcon } from "assets";
import clsx from "clsx";

import ConfirmationByDateForm from "domain/Product/components/confirmation-by-date/confirmation-by-date";

import "./inventory.page.scss";

export const InventoryPage = () => {
  const params = useParams();
  const componentRef = useRef();
  const navigate = useNavigate();

  const { createModal } = useModalContext();
  const [item, setItem] = useState(undefined);
  const [parentItem, setParentItem] = useState(undefined);
  const { getItem, deleteInventoryPart, deleteInventory, getParentById, updateItem } =
    useInventoryContext();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [updateInventoryErrorMessage, setUpdateInventoryErrorMessage] = useState("");
  const { isOpen, onOpenHandler, onCloseHandler } = useToggler();

  const {
    element: DeleteInventoryPartModal,
    open: openDeleteModal,
    close: closeDeleteModal,
  } = useMemo(() => createModal(), [createModal]);

  const {
    element: DeleteInventoryModal,
    open: openDeleteInventoryModal,
    close: closeDeleteInventoryModal,
  } = useMemo(() => createModal(), [createModal]);

  const {
    element: EditInventoryModal,
    open: openEditModal,
    close: closeEditModal,
  } = useMemo(() => createModal(), [createModal]);

  const {
    element: ConfirmInventoryActivationModal,
    open: openActivationModal,
    close: closeActivationModal,
  } = useMemo(() => createModal(), [createModal]);

  const getFullItemDetails = useCallback(() => {
    getItem(params.id)
      .then((data) => {
        const {
          id,
          label,
          itemId,
          purchasePrice,
          totalPrice,
          location,
          assignedTo,
          company,
          category,
          owner,
          navigatorId,
          serialNumber,
          isSmallInventory,
          amortizationType,
          parts,
          amortization,
          invoice,
          activationDate,
          supplier,
          activeCensus,
        } = data;
        let currentPrice = +amortization?.current_price;
        const percentageSpent = 100 - (+amortization?.current_price / +purchasePrice) * 100;
        if (data.parts.length) {
          currentPrice = data.parts.reduce((acc, inventory) => {
            acc += +inventory.amortization?.current_price;
            return acc;
          }, 0);
        }

        const itemFromDb = {
          id,
          label,
          itemId,
          purchasePrice,
          currentPrice,
          percentageSpent,
          totalPrice,
          location,
          assignedTo,
          company,
          owner,
          category,
          navigatorId,
          serialNumber,
          isSmallInventory,
          amortizationType,
          parts,
          invoice,
          activationDate,
          supplier,
          activeCensus,
        };

        setItem(itemFromDb);
        return itemFromDb;
      })
      .then((data) => {
        if (data) {
          getParentById(data.id).then((configuration) => {
            if (!configuration) return;

            const {
              id,
              label,
              itemId,
              purchasePrice,
              currentPrice,
              totalPrice,
              location,
              assignedTo,
              company,
              ownerId,
              category,
              navigatorId,
              serialNumber,
              isSmallInventory,
              parts,
              amortizationType,
              invoice,
              activeCensus,
            } = configuration;

            if (configuration) {
              setParentItem({
                id,
                label,
                itemId,
                purchasePrice,
                currentPrice,
                totalPrice,
                location,
                assignedTo,
                company,
                ownerId,
                category,
                navigatorId,
                serialNumber,
                isSmallInventory,
                parts,
                amortizationType,
                invoice,
                activeCensus,
              });
            }
          });
        }
      });
  }, [getItem, getParentById, params.id]);

  useEffect(() => {
    setParentItem(undefined);
    getFullItemDetails();
  }, [getItem, params.id, getParentById, getFullItemDetails]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Delete keyCode
      if (e.keyCode === 46 && !!parentItem) {
        openDeleteModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDeleteModal, parentItem]);

  const onDeleteInventoryPart = () => {
    deleteInventoryPart(parentItem.id, item.id).finally(() => {
      closeDeleteModal();
      navigate(`/item/${parentItem.itemId}`);
    });
  };

  const onDeleteItem = (archivedReason) => {
    setIsBtnLoading(true);
    deleteInventory(item.id, archivedReason)
      .then(() => {
        setIsBtnLoading(false);
        alert("Predmet je uspešno obrisan!");
        closeDeleteInventoryModal();
        navigate("/");
      })
      .catch((error) => {
        setIsBtnLoading(false);
        alert("Predmet nije obrisan. Dogodila se greska pri brisanju predmeta!");
      });
  };

  const onUpdateInventory = useCallback(
    (data) => {
      setIsBtnLoading(true);
      updateItem(data)
        .then(() => getFullItemDetails())
        .then(() => setIsBtnLoading(false))
        .then(() => closeEditModal())
        .catch((error) => {
          setIsBtnLoading(false);
          setUpdateInventoryErrorMessage(error.response.data);
        });
    },
    [setIsBtnLoading, getFullItemDetails, closeEditModal, updateItem]
  );

  const isParent = useMemo(() => item?.parts?.length > 0, [item]);

  const tabs = useMemo(
    () => [
      {
        title: "Konfiguracija",
        component: <InventoryConfig item={parentItem || item} hasParent={!!parentItem} />,
      },
      {
        title: "Lokacija",
        component: <ItemDisplayLocation item={item} />,
      },
      {
        title: "Faktura",
        component: <ItemDisplayInvoice item={item} />,
      },
      {
        title: "Istorija",
        component: <ItemDisplayHistory item={item} />,
      },
    ],
    [item, parentItem]
  );

  if (!item) return <h2 className="page__error">Ne postoji inventar sa traženim evidencionim brojem {params.id}</h2>;

  if (!item?.category || !item?.parts) return <Spinner size="large" />;

  const onActivateItem = (date) => {
    const activatedItem = { ...item, activationDate: date };
    updateItem(activatedItem).then(() => {
      setItem(activatedItem);
      openActivationModal();
    });
  };

  return (
    <>
      <div className="item-page">
        <div className="item-page__item">
          <div className="item-page__info">
            <ItemDisplayInfo
              item={item}
              openDeleteModal={openDeleteModal}
              isDeleteButtonVisible={!!parentItem && !isParent}
              openActivationModal={openActivationModal}
            />
          </div>
        </div>

        <div className="item-page__item ml-5">
          <section className="qr-and-buttons-section">
            <section className="button-holder">
              <NavButton />
              <Button
                buttonPrefixIcon={<HiOutlinePrinter className="btn__print" />}
                buttonText={"Štampaj nalepnice"}
                buttonColor={"blue"}
                event={onOpenHandler}
              />
              <Button
                buttonText={"Dodaj deo predmeta"}
                buttonColor={"blue"}
                event={(e) => {
                  setIsBtnLoading(false);
                  setUpdateInventoryErrorMessage("");
                  open();
                }}
                buttonIcon={<GoPlus className="btn__plus-icon" />}
              />
              <Button
                buttonText={"Izmeni"}
                buttonColor={"blue"}
                event={() => {
                  setItem((oldData) => ({ ...oldData, invoice: undefined, supplier: undefined }));
                  setIsBtnLoading(false);
                  setUpdateInventoryErrorMessage("");
                  openEditModal();
                }}
              />
              <Button buttonText={"Obriši predmet"} buttonColor={"red"} event={openDeleteInventoryModal} />
            </section>
          </section>
          <div className="item-page__main">
            <Tabs items={tabs} />
          </div>
          {item.activeCensus && (
            <div className={clsx("census-info", { [item.activeCensus.isMatching ? "completed" : "pending"]: true })}>
              Predmet je {item.activeCensus.isMatching ? "potvrđen" : "nepotvrđen"} uz informaciju:{" "}
              {item.activeCensus?.description}
              {!item.activeCensus.isMatching && (
                <span className="edit-census-info">
                  <PenIcon onClick={openEditCensusModal} />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <SideBar onClose={onCloseHandler} isOpen={isOpen} sideBarToggle floatRight>
        <div className="stickers__content" onClick={(e) => e.stopPropagation()}>
          <div className="stickers__close">
            <Button buttonIcon={<CloseIcon className="stickers__delete-icon" />} event={onCloseHandler} />
          </div>
          <div className="stickers__list">
            {isParent ? (
              <ParentGroupSticker item={item} ref={componentRef} />
            ) : (
              <ItemSticker item={item} ref={componentRef} />
            )}
          </div>
          <div className="stickers__print">
            <PrintElement
              elementRef={componentRef}
              width="1.97in"
              height="0.98in"
              buttonText={`Štampaj nalepnic${isParent ? "e" : "u"}`}
            />
          </div>
        </div>
      </SideBar>
      <EditInventoryModal>
        <ItemForm
          item={item}
          onSubmit={onUpdateInventory}
          onCancel={closeEditModal}
          isBtnLoading={isBtnLoading}
          errorMessage={updateInventoryErrorMessage}
        />
      </EditInventoryModal>
      <DeleteInventoryPartModal>
        <ModalConfirmation
          onSubmit={onDeleteInventoryPart}
          onCancel={closeDeleteModal}
          title="Uklanjanje dela predmeta"
          text={
            <p>
              Da li ste sigurni da želite da uklonite <strong>{item.label}</strong> iz konfiguracije?
            </p>
          }
          isBtnLoading={isBtnLoading}
          btnSubmitText="Potvrdi"
        />
      </DeleteInventoryPartModal>
      <DeleteInventoryModal>
        <DeleteItemForm
          onSubmit={onDeleteItem}
          onCancel={closeDeleteInventoryModal}
          inventory={item}
          isBtnLoading={isBtnLoading}
        />
      </DeleteInventoryModal>
      <ConfirmInventoryActivationModal>
        <ConfirmationByDateForm
          onClose={closeActivationModal}
          onSubmit={onActivateItem}
          title="Aktiviranje predmeta je ireverzibilno. Ukoliko ste sigurni izaberite datum i potvrdite odluku."
        />
      </ConfirmInventoryActivationModal>
    </>
  );
};
