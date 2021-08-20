import React from "react";
import { formatDate } from "../lib/helpers/formatDate";
export default function weatherCard({
  weatherDesc,
  humPct,
  windSpd,
  date,
  temp,
  location,
}) {
  return (
    <div className='weatherCard'>
      <h3 className='heading weatherCard__heading'>{formatDate(date)}</h3>
      <div className='weatherCard__icon'>ICON</div>
      {/* <div className="subheading"></div> */}
      <div className='weatherCard__icon'>
        <p>{weatherDesc}</p>
      </div>
      <div className='weatherCard__info-container'>
        <div className='weatherCard__info-container__temp'>
          <h4 className='weatherCard__info-container__temp__heading'>Temp</h4>
          <p className='weatherCard__info-container__temp__num'>{temp}</p>
        </div>
        <div className='weatherCard__info-container__hum'>
          <h4 className='weatherCard__info-container__temp__heading'>Wind</h4>
          <p className='weatherCard__info-container__temp__num'>{humPct}</p>
        </div>
        <div className='weatherCard__info-container__wind'>
          <h4 className='weatherCard__info-container__temp__heading'>Hum</h4>
          <p className='weatherCard__info-container__temp__num'>{windSpd}</p>
        </div>
      </div>
    </div>
  );
}
