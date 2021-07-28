import React from "react";
import { FiCloudSnow } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";

export default function dayWeather({ day }) {
  console.log("day", day);
  return (
    <div>
      {/* Can filter by weather event like snow to keepit just to simple snow report
        or can leave more general and it can be search weather anywhere
        have the priors cahced ready to go location wise and data wise but updata with react query as well
        */}
      {day.weather[0].main === "Rain" ? (
        <>
          <p>Weather Main:{day.weather[0].main}</p>
          <p>Weather Description:{day.weather[0].description}</p>
          <p>Temperature average:{day.temp.day}</p>
          <p>Temperature morning:{day.temp.morn}</p>
          <p>Temperature evening:{day.temp.eve}</p>
          <p>Wind Gusts:{day.wind_gust}</p>
          <p>Wind Speed:{day.wind_speed}</p>
          <p>ICON:{day.weather[0].icon}</p>
          <FiCloudSnow />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

// day day
