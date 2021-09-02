import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  useEffect(() => {
    router.push(`/weather`);
  }, []);

  return (
    <section className='landing-page'>
      <div className='home__hero-img'>
        {/* <Image src={require(`../../public/images/snowy-trees-large.jpg`)} /> */}
        <img alt='snowy tree image' src='/images/snowy-trees-large.jpg' defer />
      </div>

      <h1 className='heading'>Go To App</h1>
      <h2 className='subheading mb-16'>And Find a resort</h2>
    </section>
  );
}
