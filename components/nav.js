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
              <div className='nav__brand'>
                <img src='/logo.png' className='nav__brand__logo' />
                <p className='nav__brand__title'>SnoWhen</p>
              </div>
            </Link>
            <div className='nav__pages-container__links'>
              <button className='nav__pages-container__links__home'>
                Home
              </button>
              <button className='nav__pages-container__links__about'>
                About
              </button>

              <button className='nav__pages-container__links__faq'>FAQ</button>
            </div>
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
