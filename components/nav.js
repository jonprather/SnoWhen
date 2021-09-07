import React from "react";
import Link from "next/link";
import DarkMode from "./darkMode";

export default function nav() {
  return (
    <>
      <nav className='nav'>
        <Link href='/weather'>
          <p className='nav__brand-title'>
            {" "}
            <span>Sno</span>When
          </p>
        </Link>
      </nav>
      <DarkMode />
    </>
  );
}
