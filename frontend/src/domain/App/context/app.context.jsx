import React from "react";
import { ModalProvider } from "shared";
import { FiltersProvider } from "domain/Filters";
import { InventoryProvider } from "domain/Product";
import { CartProvider } from "domain/Cart";

export const ApplicationContext = React.createContext();

export function ApplicationContextProvider({ children }) {
  return (
    <ApplicationContext.Provider>
        <FiltersProvider>
          <CartProvider>
            <InventoryProvider>
              <ModalProvider>{children}</ModalProvider>
            </InventoryProvider>
          </CartProvider>
        </FiltersProvider>
    </ApplicationContext.Provider>
  );
}
