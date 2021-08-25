import React from "react";
import { formatDate } from "../lib/helpers/formatDate";

export default function graph({ data, location, isHourlyTitles }) {
  console.log("data in comp bro", data);
  const snowAmountBlock = {
    backgroundColor: "blue",
    width: "4rem",
    height: "5rem",
  };
  function miltaryToStandardTime(time) {
    var time = time.slice(0, -3);
    time = time * 1;
    if (time > 12) {
      time = time - 12;
      return time + " pm";
    }
    return time + " am";
  }
  let graphTotal = data.reduce((acc, ele) => acc + ele?.total, 0);

  // 1.2 bc 12px per inch and rem is 10 px so 1.2rem per inch
  return (
    <div className='graph'>
      <p className='graph__subheading '>Fresh Snow</p>

      {false && (
        <div>
          <button>{String.fromCharCode(60)}</button> day{" "}
          <button>{String.fromCharCode(62)}</button>
        </div>
      )}
      <div className='graph__container'>
        <div className='graph__container--top'>
          {data.map((unit) => {
            return (
              <div
                className='graph__container--top__block'
                style={{
                  height: unit.total * 1.2 + "rem",
                  backgroundColor: "#3282B8",
                }}
              >
                <div className='graph__container--top__block__total'>
                  {unit.total > 2 ? (
                    unit.total + `"`
                  ) : (
                    <p
                      style={{
                        position: "relative",
                        top: "-4.5rem",
                        color: "var(--heading-span-color)",
                        fontSize: "2rem",
                      }}
                    >
                      {unit.total + `"`}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className='graph__container--bottom'>
          {data.map((unit) => {
            return (
              <div className='graph__container--bottom__cells'>
                <p>
                  {isHourlyTitles
                    ? miltaryToStandardTime(unit.time)
                    : formatDate(unit.date)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <p className='graph__total'>Total {graphTotal} "</p>
    </div>
  );
}
// be able to hanlde if no total then go for snow_in
//and use time instead of date for the title under the columns
//ok for days component get id for the day from the router
//can have ternary to use time or date bc no time prop is on snowPerday but is on perHour
