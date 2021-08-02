export const countDays = function (day) {
  if (data) {
    return data?.daily?.filter(selectFilterFn(filterType)).length;
  }
};
export const weatherStringFormatter = function (filterType) {
  let firstPart;
  let closing;
  let filterType = filterType;
  if (filterType === "none") return "";
  if (filterType === "inclement") filterType = "non-clear";

  let countDay = countDays();

  if (countDay === 0) {
    firstPart = "There are ";
    countDay = "no ";
    closing = " days.";
  }
  if (countDay === 1) {
    firstPart = `There is `;
    countDay = "one ";
    closing = " day.";
  } else {
    closing = " days.";

    switch (countDay) {
      case 2:
        countDay = "two ";
        break;
      case 3:
        countDay = "three ";
        break;
      case 4:
        countDay = "four ";
        break;
      case 5:
        countDay = "five ";
        break;
      case 6:
        countDay = "six ";
        break;
      case 7:
        countDay = "seven ";
        break;
      case 8:
        countDay = "eight ";
        break;
      default:
        "? Days;";
        break;
    }
    firstPart = `There are `;
    closing = " days.";
  } //end else
  return {
    firstPart,
    countDay,
    filterType: filterType,
    closing,
  };
};
