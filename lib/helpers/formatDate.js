var dayjs = require("dayjs");

function changeDateOrder(date) {
  // Reorder "12/08/2021"; to // let date = "08/12/2021";
  let arr = date.split("/");
  let newDate = [arr[1], arr[0], arr[2]].join("/");
  return newDate;
}

export const formatDate = function (date, format = "ddd") {
  if (!date) {
    return " ";
  }

  return dayjs(changeDateOrder(date)).format(format);
};
export const addDay = function (date, format = "ddd") {
  if (!date) {
    return " ";
  }

  return dayjs(changeDateOrder(date)).add(1, "day").format(format);
};
export const subtractDay = function (date, format = "ddd") {
  if (!date) {
    return " ";
  }

  return dayjs(changeDateOrder(date)).subtract(1, "day").format(format);
};
