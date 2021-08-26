//index
// function weatherAccumulation(location) {
//   location?.data?.forecast?.reduce((acc, ele, i) => {
//     tempArr.push(ele);
//     //ok this just pushes the ele
//     if (ele.time === "22:00") {
//       snowPerHourly.push(tempArr);
//       tempArr = [];
//       snowPerDay.push({ date: ele.date, total: acc + ele["snow_in"] });
//       acc = 0;
//       return acc; //ele["snow_in"];
//     }
//     return acc + ele["snow_in"]; //ele["snow_in"];
//   }, 0);

//   let total = snowPerDay.reduce((acc, ele) => acc + ele.total, 0);

//   return { total, snowPerDay, snowPerHourly };
// }
// //location
// function weatherAccumulation(location) {
//   location?.data?.forecast.reduce((acc, ele, i) => {
//     tempArr.push(ele);

//     if (ele.time === "22:00") {
//       snowPerHourly.push(tempArr);
//       tempArr = [];
//       snowPerDay.push({ ...ele, total: acc + ele["snow_in"] });
//       acc = 0;
//       return acc; //ele["snow_in"];
//     }
//     return acc + ele["snow_in"]; //ele["snow_in"];
//   }, 0);
//   console.log("SNOWPERDAY___", snowPerDay);
//   return { snowPerDay, snowPerHourly };
// }

//day
//so this uses component state of altitude maybe i could refactor to have
// a param named alt="base"
// then if altitude set alt to altitude
export const weatherReducer = function (location, alt = "base") {
  let tempArr = [];
  let snowPerHour = [];
  let snowPerDay = [];
  let altitude = altitude ?? alt;
  location?.data?.forecast.reduce((acc, ele, i) => {
    tempArr.push({
      ...ele,
      date: ele.date,
      total: ele[altitude]["freshsnow_in"],
      // also still have option for total snow for all together instead of alt just snow again
    });
    if (ele.time === "22:00") {
      snowPerHour.push(tempArr);
      tempArr = [];
      snowPerDay.push({ ...ele, date: ele.date, total: acc + ele["snow_in"] });
      acc = 0;
      return acc;
    }
    return acc + ele["snow_in"];
  }, 0);

  let total = snowPerDay.reduce((acc, ele) => acc + ele.total, 0);

  return { total, snowPerDay, snowPerHour };
};
