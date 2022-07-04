// so create file for hook and folder
// extract that logic out of it for ueSnowData simple useQueries hook
//make the loading and error automatic like check isFetching in loading spinner
// and onError pass it a default error handler ( in global config or jus tin hook of useQueries)
import axios from "axios";
import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
const getWeather = async function (resortCode) {
  try {
    // TODO if this errors out sends no data still fills ui with stuff
    //bc has resorts this is then called but returns no data but still ui shows half baked stuff
    const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);
    // setError("");
    return data;
  } catch (error) {
    // setError(error.message);
    console.error(error);
  }
};
export default function useSnowData(searchHistory) {
  // so need to pass it array of resorts
  //thats coming from that other call
  // this is a depedent query can make it depend on
  // resorts data should i pass it in or
  // or call the useResorts here?
  //well its always going to depnd on it and want it to jus tsubscribe to it so yeah can call it here
  //actually just passing a resort code but multiple times
  // should make the query key for each unique not queryKey for this useSnow
  // but queryKeys for useResorts([querkeys,resort, resort.id], resort.id)
  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: ["resorts", resortCode, resort],
        queryFn: (resort) => getWeather(resortCode),
        onSuccess: console.log(""),
      };
    }) ?? []
  );
  let data = results || [];
  return { snowData: data };
}
