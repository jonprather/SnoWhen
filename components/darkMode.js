import React from "react";
import {
  getAllLocal,
  getLocalDarkMode,
  setLocalDarkMode,
} from "../lib/LocalStorage";
export default function darkMode() {
  function toggleTheme(color) {
    document.documentElement.setAttribute("data-theme", color);

    setLocalDarkMode(color);
  }
  return (
    <div className='darkmode'>
      <button onClick={() => toggleTheme("dark")} className='darkmode-dark'>
        Dark
      </button>

      <button onClick={() => toggleTheme("light")} className='darkmode-light'>
        Light
      </button>
    </div>
  );
}
