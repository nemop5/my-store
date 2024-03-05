import React from "react";
import { ModalProvider } from "shared";
import { FiltersProvider } from "domain/Filters";
import { ProductProvider } from "domain/Product";
import { CartProvider } from "domain/Cart";

export const ApplicationContext = React.createContext();

export function ApplicationContextProvider({ children }) {
  return (
    <ApplicationContext.Provider>
        <FiltersProvider>
          <CartProvider>
            <ProductProvider>
              <ModalProvider>{children}</ModalProvider>
            </ProductProvider>
          </CartProvider>
        </FiltersProvider>
    </ApplicationContext.Provider>
  );
}
