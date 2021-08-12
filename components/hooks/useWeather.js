import { useQuery } from "react-query";
import axios from "axios";

//query fn
const getWeatherByCoordinates = async function (coordinates) {
  const tempAPIKEY = process.env.NEXT_PUBLIC_WEATHER;
  const exclude = "hourly";

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=${exclude}&units=imperial&appid=${tempAPIKEY}`
  );
  return data;
};
export default function useWeather(coordinates) {
  return useQuery(
    [coordinates.address.toLowerCase().trim(), coordinates],
    () => getWeatherByCoordinates(coordinates),
    {
      // The query will not execute until coordinates exists
      enabled: !!coordinates,
      //idk if this will work cross component like this..
    }
  );
}
