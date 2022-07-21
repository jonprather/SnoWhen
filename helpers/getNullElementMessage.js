const objKeys = {
  SHOW_FAVS: "showFavs",
  SHOW_ALL: "showAll",
  RESULTS: "results",
  NORESULTS: "noResults",
  LIKED: "liked",
  NOTLIKED: "notLiked",
};
function getKey({ showFavs, results, filtered } = {}) {
  let keys = [];
  keys.push(showFavs ? objKeys.SHOW_FAVS : objKeys.SHOW_ALL);
  keys.push(results?.length > 0 ? objKeys.RESULTS : objKeys.NORESULTS);
  keys.push(
    filtered?.every((ele) => !ele.data) ? objKeys.NOTLIKED : objKeys.LIKED
  );
  return keys;
}
export default function getNullElementMessage({
  showFavs,
  results,
  filtered,
} = {}) {
  console.log(">>>", {
    showFavs,
    results,
    filtered,
  });
  const [filterTypeKey, hasResultsKey, isLiked] = getKey({
    showFavs,
    results,
    filtered,
  });

  const messageObj = {
    showFavs: {
      noResults: {
        notLiked: {
          heading: "No favorites",
          details: "add some resorts to like!",
        },
      },
      results: {
        notLiked: {
          heading: "No favorites",
          details: "Like Some Resorts!",
        },
      },
    },
    //likes only matter when on showFavs and when have results
    showAll: {
      noResults: {
        notLiked: {
          heading: "No Resorts",
          details: "add some resorts!",
        },
      },
    },
    //other cases return null so that it can bypass this and show regular elemetns
  };

  return messageObj[filterTypeKey]?.[hasResultsKey]?.[isLiked] || null;
}
//takes in showFavs, results, filtered and returns a UI message or null

//TODO add tests for this for the edge cases and stuff
