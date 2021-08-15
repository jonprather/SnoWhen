import React from "react";

export default function weatherCard({
  weatherDesc,
  humPct,
  windSpd,
  date,
  temp,
  location,
}) {
  return (
    <>
      <div>
        BRUHH The Location {location} on day {date}
        <span> The weather is {weatherDesc}</span>
        <span> The Temp is {temp}</span>
        <span> The Humidity is {humPct}</span>
        <span> The WindSpeed is {windSpd}</span>
      </div>
    </>
  );
}
