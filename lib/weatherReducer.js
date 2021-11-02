export const weatherReducer = function (location, alt = "base") {
  let tempArr = [];
  let snowPerHour = [];
  let snowPerDay = [];
  let name = location?.data?.name;
  let altitude = altitude ?? alt;

  location?.data?.forecast.reduce((acc, ele, i) => {
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
