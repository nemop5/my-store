import React from "react";
import { useNavigate } from "react-router-dom";
import { useInventoryContext, ItemsTable } from "domain/Product";
import { ItemDisplayProduct } from "domain/Cart";
import { FiltersGroup } from "domain/Filters";
import { ScrollPosition, Button, Spinner, SideBar, useToggler } from "shared";
import { initialDisplayedColumns, DISPLAYED_COLUMNS } from "shared/constants/constants";
import { FaShoppingCart } from "react-icons/fa";
import { NavButton } from "shared/components/nav-button/nav-button";
import "./home.page.scss";
import { useLocalStorage } from "domain/App/hooks";

export const HomePage = () => {
  const { items, selectedItems, isLoading } = useInventoryContext();
  const navigate = useNavigate();

  const { isOpen, onOpenHandler, onCloseHandler } = useToggler();

  const [displayedColumns] = useLocalStorage(DISPLAYED_COLUMNS, initialDisplayedColumns);

  // const onCreateNewItem = useCallback(
  //   (newItem, count) => {
  //     setIsCreateBtnLoading(true);
  //     addItem(newItem, count)
  //       .then((data) => {
  //         close();
  //         data && navigate(`/item/${data[0].itemId}`);
  //       })
  //       .catch((error) => setCreateInventoryErrorMessage(error.response.data))
  //       .finally(() => setIsCreateBtnLoading(false));
  //   },
  //   [addItem, close, navigate]
  // );

  const onOpenCart = () => {
    onOpenHandler();
  };

  // Calculate totals
  const total = selectedItems.reduce((acc, item) => acc + item.original.price * item.quantity, 0);
  const discountedTotal = selectedItems.reduce(
    (acc, item) => acc + (item.original.price * (100 - item.original.discounted_percentage) / 100) * item.quantity,
    0
  );
  const totalProducts = selectedItems.length;
  const totalQuantity = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

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
              buttonColor={"blue"}
              buttonIcon={<FaShoppingCart />}
              event={onOpenCart}
              isDisabled={!selectedItems.length}
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
      <SideBar
        isOpen={isOpen} 
        sideBarToggle 
        floatRight
        selectedItems={selectedItems}
        total={total}
        discountedTotal={discountedTotal}
        totalProducts={totalProducts}
        totalQuantity={totalQuantity}
        style={{ overflowY: 'auto', maxHeight: '80vh' }} 
      >
        <div className="item-display-close" onClick={onCloseHandler}>Zatvori korpu</div>
        {selectedItems?.map((item, index) => {
          return <div key={index}><ItemDisplayProduct item={item.original} /></div>
        })}
        <div className="item-display-close" onClick={onCloseHandler}>Kreiraj porudžbinu</div>
      </SideBar>
    </>
  );
};
