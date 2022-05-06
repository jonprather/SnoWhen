import React from "react";
import { formatDate } from "@/helpers/formatDate";
import { militaryToStandardTime } from "@/helpers/militaryToStandardTime";

export default function graph({ data, location, isHourlyTitles }) {
  console.log("data in comp bro", data);
  const snowAmountBlock = {
    backgroundColor: "blue",
    width: "4rem",
    height: "5rem",
  };

  let graphTotal = data.reduce((acc, ele) => acc + ele?.total, 0);

  // 1.2 bc 12px per inch and rem is 10 px so 1.2rem per inch
  return (
    <div className='graph'>
      <div className='graph__header-box'>
        <p className='graph__subheading '>Fresh Snow</p>
        <p className='graph__total'>Total {graphTotal}"</p>
      </div>
      {false && (
        <div>
          <button>{String.fromCharCode(60)}</button> day{" "}
          <button>{String.fromCharCode(62)}</button>
        </div>
      )}
      <div className='graph__container'>
        <div className='graph__container--top'>
          {data.map((unit, i) => {
            return (
              <div
                key={i}
                className='graph__container--top__block'
                style={{
                  height:
                    unit.total < 37
                      ? unit.total * 1.2 + "rem"
                      : 37 * 1.2 + "rem",
                  backgroundColor: "#3282B8",
                }}
              >
                <div className='graph__container--top__block__total'>
                  {unit.total > 3 ? (
                    unit.total > 37 ? (
                      unit.total + '"'
                    ) : (
                      unit.total + '"'
                    )
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
          {data.map((unit, i) => {
            return (
              <div className='graph__container--bottom__cells' key={i}>
                <p>
                  {isHourlyTitles
                    ? militaryToStandardTime(unit.time)
                    : formatDate(unit.date)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <p className='graph__total'>Total {graphTotal}"</p> */}
    </div>
  );
}
