export const setLocalAddress = function (addressAndCoordinates) {
  const { address } = addressAndCoordinates;
  if (typeof Storage === "undefined") return null;
  const d = new Date();
  let createdAt = d.getTime();
  // hmm i want to save more than one address tho how do i have an array of objects
  //or many keys make the key the cityName eg Tustin Ca and then return that and the lat lng etc
  localStorage.setItem(
    address.toLowerCase().trim(),
    JSON.stringify({ ...addressAndCoordinates, createdAt })
  );
  console.log(
    "setLocal --> address is x >) :",
    JSON.parse(localStorage.getItem(address))
  );
};

export const getLocalAddress = function (address) {
  if (typeof Storage === "undefined") return null;
  if (localStorage && localStorage.getItem(address)) {
    console.log(
      "checkforLocal --> address is ;) :",
      JSON.parse(localStorage.getItem(address))
    );
    return JSON.parse(localStorage.getItem(address));
  }
  return false;
};

export const getAllLocal = function () {
  if (typeof Storage === "undefined") {
    console.log.log("Your Browser is Weak. Upgrade ASAP");
    return "Your Browser is Weak. Upgrade ASAP";
  }
  var entries = Object.entries(localStorage);
  // var arr = entries.map((item) => {
  //   if (item.is)
  //  JSON.parse(item));
  // }
  var arr = entries
    .filter((item) => JSON.parse(item[1]).address)
    .map((item) => JSON.parse(item[1]));
  console.log("ARRAy", arr);
  return arr;
  // console.log("W/O");

  // console.log(Object.entries(JSON.parse(JSON.stringify(localStorage))));
};
//would be better if could come up with a general all purpose solution this only works for the way it is set up
