import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }
  useEffect(() => {
    // router.push(`/weather`);
  }, []);

  return (
    <section className='landing-page'>
      <header className='landing-page-header'>
        <div className='landing-page-header__container'>
          <div className='landing-page-header__container__header-box'>
            <h1 className='landing-page-header__container__heading'>SnoWhen</h1>
            <h2 className='landing-page-header__container__subheading mb-12'>
              Know When Its Snowing
            </h2>
          </div>
          <p className='landing-page-header__container__text'>
            The Simplest way to find your next powder day{" "}
          </p>
          <button
            onClick={handleClick}
            className='btn--check-snow landing-page-header__container__button'
          >
            check snow
          </button>
        </div>

        <div className='landing-page-header__img-container'>
          <Image
            src='https://res.cloudinary.com/dudethatsmyname/image/upload/v1630715207/images/beautiful-scenery-clear-white-snowy-mountains-hills_gjsbjb.jpg
          '
            alt='Picture of Snowy Mountains'
            layout='fill'
            objectFit='cover'
            className={"landing-page-header__img-container__img"}
          />
        </div>
      </header>
      <main className='landing-page-forecast'>
        <div className='landing-page-forecast__container'>
          <div className='landing-page-forecast__container__header-box'>
            <h1 className='landing-page-forecast__container__heading'>
              Simple Forecast
            </h1>
            <h2 className='landing-page-forecast__container__subheading'>
              Find Fresh Snow
            </h2>
          </div>
          <p className='landing-page-forecast__container__text landing-page-forecast__container__p-1'>
            Easily see the conditions for your favorite mountains with the
            simplest ski resort forecasts.
          </p>
          <p className='landing-page-forecast__container__text landing-page-forecast__container__p-2'>
            Don’t get stuck in an avalanche of data. Focus on just the info you
            need help choose your next powder trip.
          </p>
          <h3 className='landing-page-forecast__container__callout'>
            Check the forecast!
          </h3>
          <button
            onClick={handleClick}
            className='btn--check-snow landing-page-forecast__container__button'
          >
            Check Snow
          </button>
        </div>
        <div className='landing-page-forecast__img-container'>
          <Image
            src='https://res.cloudinary.com/dudethatsmyname/image/upload/v1630715277/images/beautiful-snowy-landscape-with-mountains_wwaif7.jpg
          '
            alt='Picture of Snowy Mountains'
            layout='fill'
            objectFit='cover'
            className={"landing-page-forecast__img-container__img"}
          />
        </div>
      </main>
    </section>
  );
}
//could seperate the buttons styling form its positioning bc the styling is the same  on both
