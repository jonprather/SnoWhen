import React from "react";
import Link from "next/link";
export default function nav() {
  return (
    <nav className='nav'>
      <Link href='/weather'>
        <p className='nav__brand-title'>
          {" "}
          <span>sno</span>When
        </p>
      </Link>
    </nav>
  );
}
