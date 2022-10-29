import React, { useState } from "react";
import Link from "next/link";
import DarkMode from "./darkMode";
import { NavModal } from "./navModal";
import AuthContext from "@/context/AuthContext.js";
export default function nav() {
  const { logout, user } = React.useContext(AuthContext);

  function handleLogOut() {
    console.log("You should be logged out", user);
    logout();
  }
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
              <Link href='/account'>
                <button className='nav__pages-container__links__home'>
                  Home
                </button>
              </Link>
              <Link href='/about'>
                <button className='nav__pages-container__links__about'>
                  About
                </button>
              </Link>

              <Link href='/faq'>
                <button className='nav__pages-container__links__faq'>
                  FAQ
                </button>
              </Link>
            </div>
            <NavModal>
              <div className='nav__dropdown'>
                <Link href='/account'>
                  <button className=''>Home</button>
                </Link>
                {user ? (
                  <button onClick={handleLogOut}>Log out</button>
                ) : (
                  <>
                    <Link href='/account/login'>
                      <button className=''>Log in</button>
                    </Link>
                    <Link href='/account/register'>
                      <button className=''>Sign up</button>
                    </Link>
                  </>
                )}
                <Link href='/about'>
                  <button className=''>About</button>
                </Link>
                <Link href='/faq'>
                  <button className=''>FAQ</button>
                </Link>
              </div>
            </NavModal>
          </div>
        </div>
        <div className='nav__auth-container'>
          {user ? (
            <>
              <span>{user.username}</span>
              <button className='nav__logout' onClick={handleLogOut}>
                <span>Log out</span>
              </button>
            </>
          ) : (
            <>
              <Link href='/account/login'>
                <button className='nav__auth-container__log-in'>Log in</button>
              </Link>
              <Link href='/account/register'>
                <button className='nav__auth-container__sign-up'>
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
        {/* <DarkMode /> */}
        {/* <div className='nav__hr'></div> */}
      </nav>
    </div>
  );
}
//TODO add animation like opcaity change when username comes in or out in nav bar the fast switch looks bad
// also prob should have a diff nav bar or somehting...
//ALSO wtf is with the bnoundincg around to login and stuff
