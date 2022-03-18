export const setLocalAddress = function (resortCode: string): {
  msg: string;
  type: string;
} {
  if (typeof Storage === "undefined")
    return {
      msg: "Your Browser Doesnt support Local Storage Sorry",
      type: "fail",
    };
  const d = new Date();
  let createdAt = d.getTime();
  if (getLocalAddress(resortCode)) {
    return { msg: "Resort was already added!", type: "already" };
  }
  localStorage.setItem(resortCode, JSON.stringify({ resortCode, createdAt }));
  return { msg: "Resort was succusfully added!", type: "success" };
};

export const getLocalAddress = function (address) {
  if (typeof Storage === "undefined") return null;
  if (localStorage && localStorage.getItem(address)) {
    return JSON.parse(localStorage.getItem(address));
  }
  return false;
};

export const getAllLocal = function () {
  if (typeof Storage === "undefined") {
    return "Your Browser is Weak. Upgrade ASAP";
  }
  var entries = Object.entries(localStorage);

  var arr = entries
    .filter((item) => {
      return JSON.parse(item[1])["resortCode"];
    })
    .map((item) => JSON.parse(item[1]));

  if (arr.length) return arr;
  return null;
};
export const setLocalDarkMode = function (color) {
  if (typeof Storage === "undefined") return null;

  localStorage.setItem("darkmode", JSON.stringify(color));
};
export const getLocalDarkMode = function () {
  if (typeof Storage === "undefined") return null;
  if (localStorage && localStorage.getItem("darkmode")) {
    return JSON.parse(localStorage.getItem("darkmode"));
  }
  return false;
};
