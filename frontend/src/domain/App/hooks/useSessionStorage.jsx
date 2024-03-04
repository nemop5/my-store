import { useState } from "react";

export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = JSON.parse(sessionStorage.getItem(key));
      return item ? item : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    sessionStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};
