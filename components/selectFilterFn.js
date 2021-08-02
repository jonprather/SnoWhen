export const selectFilterFn = function (filter) {
  var filterTypeObj = {
    thunderstorm: (ele) => ele.weather[0].main === "Thunderstorm",
    drizzle: (ele) => ele.weather[0].main === "Drizzle",
    snowy: (ele) => ele.weather[0].main === "Snow",
    rainy: (ele) =>
      ele.weather[0].main === "Rain" || ele.weather[0].main === "Drizzle",
    cloudy: (ele) => ele.weather[0].main === "Clouds",
    clear: (ele) => ele.weather[0].main === "Clear",
    inclement: (ele) => ele.weather[0].main !== "Clear",
    none: (ele) => true,
  };
  return filterTypeObj[filter];
};
//could add the images to here so they can be pulled off an object that these return
// snow: (ele) => {
// ele.weather[0].main === "Snow";
// },
// icon: "03n",
// },
//idk but prob is the string is passed in dynamically and has to match the name here idk
