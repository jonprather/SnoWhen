import React from "react";

export default function locationCard({ weatherData }) {
  return (
    <>
      <Link
        href={`/weather/${ele?.data?.name.toLowerCase().trim()}?locationId=${i}
              `}
      >
        <div className='home__card'>
          <h1 className='home__card-heading'>{ele?.data?.name}</h1>
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
              {weatherAccumulation(ele)["total"]} "
            </p>
          </div>

          <p className='home__card__forecast-heading'>Forecast</p>

          <div className='home__card__forecast-days-box'>
            {weatherAccumulation(ele)["snowPerDay"].map((day, i) => {
              if (i > 4) return "";
              return (
                <div className='home__card__forecast-days-box-cell'>
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
            <p className='home__card__accent-box__details'>Check Details</p>
          </div>
        </div>
      </Link>
    </>
  );
}
