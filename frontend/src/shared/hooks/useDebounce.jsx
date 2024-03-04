import { useState, useEffect, useCallback } from "react";

export function useDebounce(delay = 300) {
  const [timer, setTimer] = useState();

  const debounce = useCallback(
    (callback, value) => {
      setTimer(
        setTimeout(() => {
          callback(value);
        }, delay)
      );
    },
    [delay]
  );

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return { debounce };
}
