export const militaryToStandardTime = function (time) {
  var time = time.slice(0, -3);
  time = time * 1;
  if (time > 12) {
    time = time - 12;
    return time + " pm";
  }
  return time + " am";
};
