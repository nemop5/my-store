import React, { useCallback, useContext, useState } from "react";
import uuid from "react-uuid";
import { Modal } from "../components";

const ModalContext = React.createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [controls, setControls] = useState({});

  const isOpen = useCallback((key) => controls[key], [controls]);

  const getControl = (key) => ({
    open: () => setControls((values) => ({ ...values, [key]: true })),
    close: () => setControls((values) => ({ ...values, [key]: false })),
  });

  const createModal = useCallback(({ large } = {}) => {
    const key = uuid();
    return {
      element: ({ children }) => (
        <Modal id={key} large={large}>
          {children}
        </Modal>
      ),
      ...getControl(key),
    };
  }, []);

  return <ModalContext.Provider value={{ createModal, getControl, isOpen }}>{children}</ModalContext.Provider>;
}
