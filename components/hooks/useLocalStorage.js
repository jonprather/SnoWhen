import React, { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof Storage === "undefined") return;

    let storedValue = JSON.parse(localStorage.getItem(key));

    if (storedValue) return storedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  });
  useEffect(() => {
    if (typeof Storage === "undefined") {
      return "Your Browser Doesnt support Local Storage Sorry";
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
