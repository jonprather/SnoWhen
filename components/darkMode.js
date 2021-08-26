import React, { useState, useEffect } from "react";
import {
  getAllLocal,
  getLocalDarkMode,
  setLocalDarkMode,
} from "../lib/LocalStorage";

export default function darkMode({ darkModeTheme }) {
  useEffect(() => {
    setTheme(getLocalDarkMode());
  }, []);
  let [theme, setTheme] = useState("light");
  function toggleTheme(color) {
    document.documentElement.setAttribute("data-theme", color);
    setTheme(color);
    setLocalDarkMode(color);
  }
  return (
    <div className='darkmode'>
      <button onClick={() => toggleTheme("dark")} className='darkmode-dark'>
        <p className={theme === "dark" ? "underline" : "underline--null"}>
          Dark
        </p>
      </button>

      <button onClick={() => toggleTheme("light")} className='darkmode-light'>
        <p className={theme === "light" ? "underline" : "underline--null"}>
          Light
        </p>
      </button>
    </div>
  );
}
