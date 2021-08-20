export const formatDate = function (date, format = "ddd") {
  if (!date) {
    console.log("ERROR no date passed in");
    return " ";
  }
  function changeDateOrder(date) {
    // Reorder "12/08/2021"; to // let date = "08/12/2021";
    let arr = date.split("/");
    let newDate = [arr[1], arr[0], arr[2]].join("/");
    return newDate;
  }
  return dayjs(changeDateOrder(date)).format(format);
};
