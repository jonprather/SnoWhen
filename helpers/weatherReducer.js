export const weatherReducer = function (location, alt = "base") {
  if (!location?.id) return null;

  let tempArr = [];
  let snowPerHour = [];
  let snowPerDay = [];
  let name = location?.name;
  let altitude = altitude ?? alt;

  location?.forecast.reduce((acc, ele) => {
    tempArr.push({
      ...ele,
      date: ele.date,
      total: ele[altitude]["freshsnow_in"],
    });
    if (ele.time === "22:00") {
      //last item for the day so get totals
      snowPerHour.push(tempArr);
      tempArr = [];
      snowPerDay.push({ ...ele, date: ele.date, total: acc + ele["snow_in"] });
      acc = 0; //start over for new day
      return acc;
    }
    return acc + ele["snow_in"];
  }, 0);
  //end reducer-
  //TODO hard to read could refactor

  let total = snowPerDay.reduce((acc, ele) => acc + ele.total, 0);
  console.log("WEATHER REDUCER OUTPUT", {
    name,
    total,
    snowPerDay,
    snowPerHour,
  });
  return { name, total, snowPerDay, snowPerHour };
};
//so it takes blob of forecast data as input and outputs
// instead of doing it per base either ignore base or do a diff sum for each nested
// also need to spread back in og then make it ready to get pushed to db
//so would need to run the reducer multiple times as well
