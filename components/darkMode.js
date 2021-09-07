/**
 * @jest-environment jsdom
 */
import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export default function darkMode({ darkModeTheme }) {
  const [theme, setTheme] = useLocalStorage("darkmode", "light");

  console.log("IN DARK MODE--", theme);

  function handleToggle(bool) {
    if (theme === "dark") {
      return setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    console.log("IN DARK MODE USEEFFECT", theme);
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
          class='input'
          id='toggle'
          type='checkbox'
          checked={theme !== "dark"}
          onClick={() => handleToggle()}
        />
        <div class='toggle-wrapper'>
          <span class='selector'></span>
        </div>
        <p class='notification'>
          {" "}
          <span class='selected'></span>
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
