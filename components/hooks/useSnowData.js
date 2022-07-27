// API-  pass it one or more history objs and it will give you a combined resutls obj with a report for each resort
//note-  also works with single queries just pre filter and pass it one resort
import axios from "axios";
import { useContext, useCallback } from "react";
import { useQueries } from "react-query";

import { queryKeys } from "src/react-query/constants";
import FavoritesContext from "@/context/FavoritesContext";
//TODO  consider error boundary approach for CSR pages..

const getWeather = async function (resortCode, searchHistory) {
  const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);
  // Mutate data to have the properties from searchHistory
  const snowReportResort =
    data.snowReport.data[0]?.attributes.resort.data.attributes.code;

  searchHistory.data.forEach((val, i) => {
    const searchHistoryResort = val.attributes.resort.data.attributes.code;
    let liked = val.attributes.liked;
    let id = val.id;
    if (searchHistoryResort === snowReportResort) {
      data.snowReport.liked = liked;
      data.snowReport.favoriteId = id;
    }
  });
  return data;
};

export default function useSnowData(searchHistory) {
  const { showFavs } = useContext(FavoritesContext);

  const filterFn = useCallback(
    (data) => {
      console.log("SHOW useCB", showFavs, "LIKED:", data.snowReport.liked);
      if (data.snowReport.liked) {
        return data;
      }
      return null;
    },
    [showFavs, searchHistory]
  );

  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: [queryKeys.snowReports, resortCode],
        queryFn: () => getWeather(resortCode, searchHistory),
        select: showFavs ? filterFn : undefined,
        staleTime: 5000,
      };
    }) ?? []
  );

  let data = results || [];
  return {
    snowData: data,
    isLoading: results.every((ele) => ele.isLoading),
  };
}
