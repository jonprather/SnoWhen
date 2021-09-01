/**
 * @jest-environment jsdom
 */
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export default function darkMode({ darkModeTheme }) {
  const [theme, setTheme] = useLocalStorage("darkmode", "light");
  console.log("IN DARK MODE--", theme);

  useEffect(() => {
    console.log("IN DARK MODE USEEFFECT", theme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className='darkmode'>
      <button onClick={() => setTheme("dark")} className='darkmode-dark'>
        <p className={theme === "dark" ? "underline" : "underline--null"}>
          Dark
        </p>
      </button>

      <button onClick={() => setTheme("light")} className='darkmode-light'>
        <p className={theme === "light" ? "underline" : "underline--null"}>
          Light
        </p>
      </button>
    </div>
  );
}
