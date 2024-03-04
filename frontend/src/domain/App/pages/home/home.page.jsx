import React, { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryContext, ItemForm, ItemsTable } from "domain/Product";
import { FiltersGroup } from "domain/Filters";
import { ScrollPosition, useModalContext, Button, Spinner } from "shared";
import { initialDisplayedColumns, DISPLAYED_COLUMNS } from "shared/constants/constants";
import { FaShoppingCart } from "react-icons/fa";
import { ModalConfirmation } from "shared/components/Modal/components/modal-confirmation/modal-confirmation";
import { NavButton } from "shared/components/nav-button/nav-button";
import "./home.page.scss";
import { useLocalStorage } from "domain/App/hooks";

export const HomePage = () => {
  const { items, addItem, isLoading } = useInventoryContext();
  const { createModal } = useModalContext();
  const [isCreateBtnLoading, setIsCreateBtnLoading] = useState(false);
  const [createInventoryErrorMessage, setCreateInventoryErrorMessage] = useState("");
  const navigate = useNavigate();

  const [displayedColumns] = useLocalStorage(DISPLAYED_COLUMNS, initialDisplayedColumns);

  const { element: CreateNewItemModal, open, close } = useMemo(() => createModal(), [createModal]);
  const {
    element: CloseNewItemModalConfirmation,
    open: openConfirmationModal,
    close: closeConfirmationModal,
  } = useMemo(() => createModal(), [createModal]);

  const onCreateNewItem = useCallback(
    (newItem, count) => {
      setIsCreateBtnLoading(true);
      addItem(newItem, count)
        .then((data) => {
          close();
          data && navigate(`/item/${data[0].itemId}`);
        })
        .catch((error) => setCreateInventoryErrorMessage(error.response.data))
        .finally(() => setIsCreateBtnLoading(false));
    },
    [addItem, close, navigate]
  );

  const onSubmitConfirmationModal = () => {
    closeConfirmationModal();
    close();
  };

  const onCloseConfirmationModal = () => {
    closeConfirmationModal();
  };

  return (
    <>
      <div className="home-header">
        <NavButton />
        <div className="home-header_left">
          <FiltersGroup />
        </div>
        <div className="home-header_right">
          <div className="home-header_right_primary_cta">
            <Button
              buttonText={"Korpa"}
              buttonIcon={<FaShoppingCart />}
              buttonColor={"blue"}
              event={(e) => {
                setIsCreateBtnLoading(false);
                setCreateInventoryErrorMessage("");
                open();
              }}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="items-table__loading">
          <Spinner size="large" />
        </div>
      ) : items ? (
        <ScrollPosition uniqueId="dashboard-page">
          <ItemsTable displayedColumns={displayedColumns} data={items} isReadOnly={false} />
        </ScrollPosition>
      ) : null}
      <CreateNewItemModal>
        <ItemForm
          onSubmit={onCreateNewItem}
          onCancel={openConfirmationModal}
          isBtnLoading={isCreateBtnLoading}
          errorMessage={createInventoryErrorMessage}
        />
      </CreateNewItemModal>
      <CloseNewItemModalConfirmation>
        <ModalConfirmation
          onSubmit={onSubmitConfirmationModal}
          onCancel={onCloseConfirmationModal}
          text={<p>Da li ste sigurni da želite da zatvorite prozor?</p>}
        />
      </CloseNewItemModalConfirmation>
    </>
  );
};
