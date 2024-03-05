import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { INDEX, ITEM, CART_DETAILS } from "router";
import { HomePage, ErrorPage, App, CartDetailsPage } from "domain/App";
import { InventoryPage } from "domain/Product";

export const GlobalRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={INDEX} element={<App />}>
        <Route index element={<HomePage />} />
        <Route path={ITEM}>
          <Route path=":id" element={<InventoryPage />} />
        </Route>
        <Route path={CART_DETAILS} element={<CartDetailsPage />}></Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
