// so create file for hook and folder
// extract that logic out of it for ueSnowData simple useQueries hook
//make the loading and error automatic like check isFetching in loading spinner
// and onError pass it a default error handler ( in global config or jus tin hook of useQueries)
import axios from "axios";
import { useEffect } from "react";
import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState, useCallback } from "react";
const getWeather = async function (resortCode, searchHistory) {
  try {
    // TODO if this errors out sends no data still fills ui with stuff
    //bc has resorts this is then called but returns no data but still ui shows half baked stuff
    const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);

    const snowReportResort =
      data.snowReport.data[0]?.attributes.resort.data.attributes.code;

    searchHistory.data.forEach((val, i) => {
      const searchHistoryResort = val.attributes.resort.data.attributes.code;
      let liked = val.attributes.liked;
      let id = val.id;
      console.log("search History val id and bool", liked, id);
      if (searchHistoryResort === snowReportResort) {
        data.snowReport.liked = liked;
        data.snowReport.favoriteId = id;
      }
    });

    return data;
  } catch (error) {
    // setError(error.message);
    console.error(error);
  }
};
export default function useSnowData(searchHistory) {
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    console.log("FILTER SHOW FAVS", showFavs);
  }, [showFavs]);

  // should make the query key for each unique not queryKey for this useSnow
  // but queryKeys for useResorts([querkeys,resort, resort.id], resort.id)
  //   const filterLikedResorts = (snowReports) => {
  //     console.log("REACTCB snowREPORTS SDFDS", snowReports);
  //     const isLikedResort = (ele) => ele.liked;
  //     return snowReports?.data?.filter(isLikedResort);
  //   };
  //   useCallback(() => {
  //     //returns the mapped data adding the properties from one obj to the other

  //     //filter

  //     let data = showFavs ? filterLikedResorts(mappedData) : undefined;
  //     return data;
  //   }, [showFavs])

  const filterFn = (data) => {
    console.log("FILTER FN DATA", data);
    // let filteredData = data.filter((val) => val.snowReport.liked);
    if (data.snowReport.liked) {
      return data;
    }
  };
  //TODO UI bug liked not showing as liked
  //TODO UI error multiple empty copies of no data cards showing up
  // TODO filter not working right
  // was getting shit working i think its wierd that filter is only one thign at a time bc has data already filterd
  //anyway GOAL - filte rthe data only liked are slected
  // currently its jank showing blank cards not picking liked correctly also not filtering false positives either bc zombie cards
  //
  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: ["resorts", resortCode],
        queryFn: () => getWeather(resortCode, searchHistory),
        onSuccess: console.log(""),
        enabled: !!searchHistory,
        //TODO write filterFN to filter by likedResort
        select: showFavs ? filterFn : undefined,
      };
    }) ?? []
  );

  let data = results || [];
  return {
    snowData: data,
    showFavs,
    setShowFavs,
    isLoading: results.every((ele) => ele.isLoading),
  };
}

// TODO  so this aint working lets try to get a simpler example going
// select: useCallback(() => {
//
//     //returns the mapped data adding the properties from one obj to the other

//     //filter
//     const filterLikedResorts = (snowReports) => {
//       console.log("REACTCB snowREPORTS SDFDS", snowReports);
//       const isLikedResort = (ele) => ele.liked;
//       return snowReports?.data?.filter(isLikedResort);
//     };
//     let data = showFavs ? filterLikedResorts(mappedData) : undefined;
//     return data;
//   }, [showFavs]),
//ohh i get it snowReport is just one bit of data from one RQueries call its just the data
//but results from the call involves a wrapper with the isLoading adn data which has both of the
