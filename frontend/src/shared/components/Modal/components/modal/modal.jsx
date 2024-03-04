import React, { useCallback, useEffect } from "react";
import reactDom from "react-dom";
import clsx from "clsx";

import { useModalContext } from "../../context";
import { CloseIcon } from "assets";

import "./modal.scss";
import { Button } from "shared";

export const Modal = ({ children, id, large }) => {
  const { isOpen, getControl } = useModalContext();
  const { close } = getControl(id);

  const CloseButton = useCallback(() => {
    return (
      <div className="modal__top-line">
        <Button altText="Zatvori modal" buttonIcon={<CloseIcon className="modal__close-icon" />} event={close} />
      </div>
    );
  }, [close]);

  const handleEscKey = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscKey, false);

    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [handleEscKey]);

  if (!isOpen(id)) return null;

  return reactDom.createPortal(
    <div className="modal__wrapper">
      <div className={clsx("modal__container", { large })} onClick={(e) => e.stopPropagation()}>
        <CloseButton />
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};
