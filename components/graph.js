import React from "react";

export default function graph({ data, location, isHourlyTitles }) {
  console.log("data in comp bro", data);
  const snowAmountBlock = {
    backgroundColor: "blue",
    width: "4rem",
    height: "5rem",
  };

  let graphTotal = data.reduce((acc, ele) => acc + ele?.total, 0);
  function changeDateOrder(date) {
    // Reorder "12/08/2021"; to // let date = "08/12/2021";
    let arr = date.split("/");
    let newDate = [arr[1], arr[0], arr[2]].join("/");
    return newDate;
  }
  // 1.2 bc 12px per inch and rem is 10 px so 1.2rem per inch
  return (
    <div className='graph'>
      <p className='graph__subheading '>Fresh Snow</p>
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
                  {unit.total > 0 ? (
                    unit.total + `"`
                  ) : (
                    <p
                      style={{
                        position: "relative",
                        top: "-4.5rem",
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
                    ? unit.time
                    : dayjs(changeDateOrder(unit.date)).format("ddd")}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <p className='graph__total'>Total:{graphTotal} </p>
    </div>
  );
}
// be able to hanlde if no total then go for snow_in
//and use time instead of date for the title under the columns
//ok for days component get id for the day from the router
//can have ternary to use time or date bc no time prop is on snowPerday but is on perHour
