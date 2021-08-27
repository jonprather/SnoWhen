import React from "react";
import { formatDate } from "../lib/helpers/formatDate";
export default function weatherCard({
  weatherDesc,
  humPct,
  windSpd,
  date,
  temp,
  location,
  isHourlyTitles,
  icon,
}) {
  const nullText = "n/a";
  console.log("ICONS,-", icon);
  return (
    <div
      className='weather-card'
      style={{ transform: isHourlyTitles ? "scale(1)" : "" }}
    >
      <h3 className='weather-card__heading'>
        {!isHourlyTitles ? formatDate(date) : date}
      </h3>
      <div className='weather-card__icon'>
        <img src={`/images/${icon}.png`} alt='Weather Icon' />
      </div>

      <div className='weather-card__description-container'>
        <p> {weatherDesc ? weatherDesc : <span>{nullText}</span>}</p>
      </div>
      <div className='weather-card__info-container'>
        <div className='weather-card__info-container__temp'>
          <h4 className='weather-card__info-container__temp__heading'>Temp</h4>
          <p className='weather-card__info-container__temp__num'>
            {temp ? temp : <span>{nullText}</span>}
          </p>
        </div>
        <div className='weather-card__info-container__hum'>
          <h4 className='weather-card__info-container__temp__heading'>Wind</h4>
          <p className='weather-card__info-container__temp__num'>
            {windSpd ? windSpd : <span>{nullText}</span>}
          </p>
        </div>
        <div className='weather-card__info-container__wind'>
          <h4 className='weather-card__info-container__temp__heading'>Hum</h4>
          <p className='weather-card__info-container__temp__num'>
            {humPct ? humPct : <span>{nullText}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
