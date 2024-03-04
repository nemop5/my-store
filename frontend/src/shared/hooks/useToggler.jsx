import { useState, useCallback } from "react";

export function useToggler() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onOpenHandler, onCloseHandler };
}
