import React from "react";
import Link from "next/link";
import DarkMode from "./darkMode";

export default function nav() {
  return (
    <div className='nav__wrapper'>
      <nav className='nav'>
        <div>
          <div className='nav__pages-container'>
            <Link href='/weather'>
              <>
                <img src='/logo.png' className='nav__brand-title' />
                <p>SnoWhen</p>
              </>
            </Link>
            <button className='nav__pages-container__home'>Home</button>
            <button className='nav__pages-container__about'>About</button>

            <button className='nav__pages-container__faq'>FAQ</button>
          </div>
        </div>
        <div className='nav__auth-container'>
          <button className='nav__auth-container__log-in'>Log in</button>
          <button className='nav__auth-container__sign-up'>Sign up</button>
        </div>
        {/* <DarkMode /> */}
        {/* <div className='nav__hr'></div> */}
      </nav>
    </div>
  );
}
