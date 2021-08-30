import React from "react";
import Link from "next/link";
import { formatDate } from "../lib/helpers/formatDate";
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
          <div class='hidden flex justify-c align-c'>
            <button
              onClick={(e) => {
                deleteFromLS(id);
                console.log("ID", id);
                e.stopPropagation();
              }}
            >
              X
            </button>
          </div>
          <h1 className='home__card-heading'>{weatherData?.name}</h1>
          <p className='home__card-state'>Ca</p>

          <h2 className='home__card-subheading mb-16'>mountain</h2>

          <div className='home__card__snow-amount-box'>
            <div>
              <p className='home__card__snow-amount-box-heading'>Next Week</p>
              <p className='home__card__snow-amount-box-subheading'>
                Snow Total
              </p>
            </div>
            <p className='home__card__snow-amount-box-quantity'>
              {weatherData["total"]} "
            </p>
          </div>

          <p className='home__card__forecast-heading'>Forecast</p>

          <div className='home__card__forecast-days-box'>
            {weatherData["snowPerDay"].map((day, i) => {
              if (i > 4) return "";
              return (
                <div key={i} className='home__card__forecast-days-box-cell'>
                  <p className='home__card__forecast-days-box-day'>
                    {formatDate(day.date)}
                  </p>
                  <p className='home__card__forecast-days-box-amount'>
                    {day.total} "
                  </p>
                </div>
              );
            })}
          </div>

          <div className='home__card__accent-box'>
            <p className='home__card__accent-box__details'>Click for Details</p>
            {/* <p className='home__card__accent-box__details home__card__accent-box__details--riser'>
              Click for Details
            </p> */}
          </div>
        </div>
      </Link>
    </>
  );
}
