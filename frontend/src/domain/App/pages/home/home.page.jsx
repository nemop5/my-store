import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext, ItemsTable } from "domain/Product";
import { ItemDisplayProduct, useCartContext } from "domain/Cart";
import { FiltersGroup } from "domain/Filters";
import { ScrollPosition, Button, NavButton, Spinner, SideBar, useToggler } from "shared";

import { FaShoppingCart } from "react-icons/fa";

import "./home.page.scss";

export const HomePage = () => {
  const { items, selectedItems, isLoading } = useProductContext();
  const { addCart } = useCartContext();
  const navigate = useNavigate();
  const { isOpen, onOpenHandler, onCloseHandler } = useToggler();

  const onCreateNewCart = useCallback(() => {
      const products = selectedItems.map((item) => { return {id: item.original.id, quantity: item.original.quantity }});
      addCart(products)
        .then((data) => {
          data && navigate(`/cart-details`);
        })
        .catch((error) => console.log(error.response.data))
    },
    [selectedItems, addCart, navigate]
  );

  const onOpenCart = () => {
    onOpenHandler();
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
        style={{ overflowY: 'auto', maxHeight: '80vh' }} 
      >
        <div className="item-display-close" onClick={onCloseHandler}>Zatvori korpu</div>
        {selectedItems?.map((item, index) => {
          return <div key={index}><ItemDisplayProduct item={item.original} /></div>
        })}
        <div className="item-display-close" onClick={onCreateNewCart}>Kreiraj porudžbinu</div>
      </SideBar>
    </>
  );
};
