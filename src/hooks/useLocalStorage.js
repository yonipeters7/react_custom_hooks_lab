import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  // Initialize state with value from localStorage or initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      if (storedValue !== null) {
        window.localStorage.setItem(key, storedValue);
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
