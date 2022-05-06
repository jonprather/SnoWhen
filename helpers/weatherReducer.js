export const weatherReducer = function (location, alt = "base") {
  let tempArr = [];
  let snowPerHour = [];
  let snowPerDay = [];
  let name = location?.name;
  let altitude = altitude ?? alt;
  // WEll wtf why pass in location instead of just blob?
  console.log("Location", location);
  if (!location?.id) return null;
  location?.forecast.reduce((acc, ele, i) => {
    tempArr.push({
      ...ele,
      date: ele.date,
      total: ele[altitude]["freshsnow_in"],
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
  return { name, total, snowPerDay, snowPerHour };
};
// instead of doing it per base either ignore base or do a diff sum for each nested
// also need to spread back in og then make it ready to get pushed to db
//so would need to run the reducer multiple times as well
