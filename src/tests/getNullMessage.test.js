import getNullElementMessage from "../../helpers/getNullElementMessage.js";

// so if on showFavs and no likes the data will be blank

describe("Test Null messages", () => {
  it("case where no results and on showAll", () => {
    const showFavs = false;
    const results = [];
    let nullMsgObj = getNullElementMessage({ showFavs, results });

    expect(nullMsgObj).toStrictEqual({
      heading: "No Resorts",
      details: "add some resorts!",
    });
  });

  it("case where no results and on showFav", () => {
    const showFavs = true;
    const results = [];
    let nullMsgObj = getNullElementMessage({ showFavs, results });
    nullMsgObj; //?

    expect(nullMsgObj).toStrictEqual({
      heading: "No favorites",
      details: "add some resorts to like!",
    });
  });

  it("case where no results and on showFav", () => {
    const showFavs = true;
    const results = [1, 2, 3];
    const filtered = [];
    let nullMsgObj = getNullElementMessage({ showFavs, results });

    expect(nullMsgObj).toStrictEqual({
      heading: "No favorites",
      details: "Like Some Resorts!",
    });
  });
});
