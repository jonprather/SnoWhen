/**
 * @jest-environment jsdom
 */
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export default function darkMode({ darkModeTheme }) {
  const [theme, setTheme] = useLocalStorage("darkmode", "light");

  function handleToggle(bool) {
    if (theme === "dark") {
      return setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <div className='darkmode'>
      <div className='darkmode__button-container'></div>
      <button onClick={() => setTheme("dark")} className='darkmode-dark'>
        {theme && (
          <p
            className={
              theme === "dark"
                ? "underline--darkmode"
                : "underline--darkmode--null"
            }
          >
            Dark
          </p>
        )}
      </button>
      <label for='toggle'>
        <input
          className='input'
          id='toggle'
          type='checkbox'
          defaultChecked={theme !== "dark"}
          onClick={() => handleToggle()}
        />
        <div className='toggle-wrapper'>
          <span className='selector'></span>
        </div>
        <p className='notification'>
          <span className='selected'></span>
        </p>
      </label>
      <button onClick={() => setTheme("light")} className='darkmode-light'>
        {theme && (
          <p
            className={
              theme === "light"
                ? "underline--darkmode"
                : "underline--darkmode--null"
            }
          >
            Light
          </p>
        )}
      </button>
    </div>
  );
}
