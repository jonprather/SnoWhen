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
    console.error(error);
  }
};

export default function useSnowData(searchHistory) {
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    console.log("FILTER SHOW FAVS", showFavs);
  }, [showFavs]);

  const filterFn = useCallback((data) => {
    if (data.snowReport.liked) {
      return data;
    }
  });

  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: ["snowReports", resortCode],
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
