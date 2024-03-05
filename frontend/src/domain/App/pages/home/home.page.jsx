import React from "react";
import { useProductContext, ItemsTable } from "domain/Product";
import { ItemDisplayProduct } from "domain/Cart";
import { FiltersGroup } from "domain/Filters";
import { ScrollPosition, Button, NavButton, Spinner, SideBar, useToggler } from "shared";

import { FaShoppingCart } from "react-icons/fa";

import "./home.page.scss";

export const HomePage = () => {
  const { items, selectedItems, isLoading } = useProductContext();
  //const navigate = useNavigate();
  const { isOpen, onOpenHandler, onCloseHandler } = useToggler();

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

  // Calculate totals - TO DO::
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
          <ItemsTable data={items} isReadOnly={false} />
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
