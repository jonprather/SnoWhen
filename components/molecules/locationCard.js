import React from "react";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import Image from "next/image";

export default function locationCard({ weatherData, i, id, deleteFromLS }) {
  console.log(weatherData);
  if (!weatherData?.name) return "";
  return (
    <>
      <Link
        href={`/weather/${weatherData?.name
          .toLowerCase()
          .trim()}?locationId=${i}
              `}
      >
        <div className='home__card'>
          <div className='home__card-heading__wrapper'>
            <h1 className='home__card-heading mb-12'>{weatherData?.name}</h1>
          </div>

          <p className='home__card-state'>Ca</p>

          <div className='home__card__mtn-bg mb-16'>
            <img src='/mtn-bg.png' className='' />
          </div>
          <div className='home__card__snowflake'>
            <img
              src='/snowflake-black.png'
              className='home__heading-container__mtn'
            />
          </div>
          <div className='home__card__snow-amount-box'>
            <div>
              <p className='home__card__snow-amount-box-heading'>Next Week</p>
              <p className='home__card__snow-amount-box-subheading'>
                Snow Total
              </p>
            </div>
            <p className='home__card__snow-amount-box-quantity'>
              {weatherData["total"]}"
            </p>
          </div>

          {/* <p className='home__card__forecast-heading'>Forecast</p> */}

          <div className='home__card__forecast-days-box'>
            {weatherData["snowPerDay"].map((day, i) => {
              if (i > 4) return "";
              return (
                <div key={i} className='home__card__forecast-days-box-cell'>
                  <p className='home__card__forecast-days-box-day'>
                    {formatDate(day.date)}
                  </p>
                  <p className='home__card__forecast-days-box-amount'>
                    {day.total}"
                  </p>
                </div>
              );
            })}
          </div>

          <div className='home__card__accent-box'>
            <div className='flex justify-c align-c'>
              <button
                className='home__card__delete'
                onClick={(e) => {
                  deleteFromLS(id);
                  console.log("ID", id);
                  e.stopPropagation();
                }}
              >
                Remove
              </button>
            </div>
            <p className='home__card__accent-box__details'>Click for More</p>
          </div>
        </div>
      </Link>
    </>
  );
}
