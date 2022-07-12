//make the loading and error automatic like check isFetching in loading spinner
// and onError pass it a default error handler ( in global config or jus tin hook of useQueries)
// pass it one or more history objs and it will give you  a combined resutls obj with a report for each resort
// also works with single quries just pre filter and pass it one resort
import axios from "axios";
import { useEffect } from "react";
import { useQueries } from "react-query";
import { queryKeys } from "src/react-query/constants";
import { toast } from "react-toastify";

//TODO repeat the process of checkign error flow for the other useHooks also auth ( which use ctx)
// have done useSearchHistory and useSnowData both erro flows work and end in toast
// also consider error boundary approach for CSR pages..

import { useState, useCallback } from "react";
const getWeather = async function (resortCode, searchHistory) {
  // TODO if this errors out sends no data still fills ui with stuff
  //bc has resorts this is then called but returns no data but still ui shows half baked stuff
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
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {}, [showFavs]);

  const filterFn = useCallback((data) => {
    if (data.snowReport.liked) {
      return data;
    }
  });

  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: [queryKeys.snowReports, resortCode],
        queryFn: () => getWeather(resortCode, searchHistory),
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
