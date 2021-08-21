function weatherDataReducer(location, altitude = null) {
  let snowPerDay = [];
  let snowPerHour = [];
  let tempArr = [];

  location?.data?.forecast.reduce((acc, ele, i) => {
    tempArr.push({
      ...ele,
      date: ele.date,
      total: altitude ? ele[altitude]["freshsnow_in"] : acc + ele["snow_in"],
      // also still have option for total snow for all together instead of alt just snow again
    });
    if (ele.time === "22:00") {
      snowPerHour.push(tempArr);
      tempArr = [];
      snowPerDay.push({ date: ele.date, total: acc + ele["snow_in"] });
      acc = 0;
      return acc;
    }
    return acc + ele["snow_in"];
  }, 0);
  return { snowPerDay, snowPerHour };
}
//   I want to refactor this to be reusable I need to know what i need for each and if there is general pattern i cna use
//honestly might be able to just do this on the backend api part to rearrange the data how i like then i can just pass it around
//yeah that would be way better that way i can utilize react query
//can basically restructure the api to my liking and store it with react query
