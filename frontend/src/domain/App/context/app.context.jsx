import React from "react";
import { ModalProvider } from "shared";
import { FiltersProvider } from "domain/Filters";
import { InventoryProvider } from "domain/Product";

export const ApplicationContext = React.createContext();

export function ApplicationContextProvider({ children }) {
  return (
    <ApplicationContext.Provider>
        <FiltersProvider>
          <InventoryProvider>
            <ModalProvider>{children}</ModalProvider>
          </InventoryProvider>
        </FiltersProvider>
    </ApplicationContext.Provider>
  );
}
