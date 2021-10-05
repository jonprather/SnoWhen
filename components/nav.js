import React, { useState } from "react";
import Link from "next/link";
import DarkMode from "./darkMode";
import { NavModal } from "./navModal";

export default function nav() {
  // const [open, setOpen] = useState(false);
  // function handleToggle() {
  //   setOpen((prev) => !prev);
  // }
  return (
    <div className='nav__wrapper'>
      <nav className='nav'>
        <div>
          <div className='nav__pages-container'>
            <Link href='/'>
              <div className='nav__brand'>
                <img src='/logo.png' className='nav__brand__logo' />
                <p className='nav__brand__title'>SnoWhen</p>
              </div>
            </Link>
            <div className='nav__pages-container__links'>
              <Link href='/weather'>
                <button className='nav__pages-container__links__home'>
                  Home
                </button>
              </Link>

              <button className='nav__pages-container__links__about'>
                About
              </button>

              <button className='nav__pages-container__links__faq'>FAQ</button>
            </div>
            <NavModal>
              <div className='nav__dropdown'>
                <Link href='/weather'>
                  <button className=''>Home</button>
                </Link>
                <button className=''>Log in</button>
                <button className=''>Sign up</button>
                <button className=''>About</button>
                <button className=''>FAQ</button>
              </div>
            </NavModal>
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
