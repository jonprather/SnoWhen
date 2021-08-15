import React from "react";

export default function graph({ data, location, isHourlyTitles }) {
  console.log("data in comp bro", data);
  return (
    <div>
      <p>
        {data.map((unit) => {
          return (
            <>
              <p>Location: {location}</p>
              <p> {isHourlyTitles ? "Hourly Forecast" : "Daily Forecast"} </p>
              <p>The Date is {unit.date}</p>
              <p> Title:{isHourlyTitles ? unit.time : unit.date} </p>
              <p> Total:{unit.total} </p>
            </>
          );
        })}
        {/* i could map over the totals to get the blocks make them inline elements like flex box
      //can also map over the titles same way
      */}
      </p>
    </div>
  );
}
// be able to hanlde if no total then go for snow_in
//and use time instead of date for the title under the columns
//ok for days component get id for the day from the router
//can have ternary to use time or date bc no time prop is on snowPerday but is on perHour
