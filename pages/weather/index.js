import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import axios from "axios";
import Location from "../../lib/location";
import DailyWeather from "../../components/dailyWeather";
import { getAllLocal } from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWeather } from "../../components/hooks/useWeather";
import FilterByWeather from "../../components/filterByWeather";
import {
  weatherStringFormatter,
  countDays,
} from "../../lib/helpers/filterStringFormatters";

export default function index() {
  const router = useRouter();
  var [error, setError] = useState(null);

  var [coordinates, setCoordinates] = useState(null);
  var [sortDirection, setSortDirection] = useState("desc");
  var [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  var [queriesObj, setQueriesObj] = useState([]);
  var [filterType, setFilterType] = useState(null);
  //can make this global state to pass around context api.. idk if worth it as this works and need multi locaion to do it

  var [sortFunction, setSortFunction] = useState({
    asc: (a, b) =>
      a?.data?.coordinates?.createdAt - b?.data?.coordinates?.createdAt,
    desc: (a, b) =>
      b?.data?.coordinates?.createdAt - a?.data?.coordinates?.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());

    // setQueriesObj(obj);
  }, [coordinates]);

  function weatherAccumulation(day, condition = "snow") {
    //there often doesnot seem to be snow so would need a way to check if has it and need to scout see if enough locations have
    //that data and if not then pivot to just do soomething else
    // console.log("SNOW res====", res);
    //wait this would be for all locations i would need a specific location first to get its totals
    // would have to pass in not results but instead already have done a map to get ele then do reduce here
    let err = false;
    let snowAcc = day.reduce(
      (acc, day) => {
        if (day[condition]) {
          return acc + day[condition];
        } else {
          //also need to set a flag an error to user that no snow data to work with
          err = true;
          // setError((prev)=> [...prev, `error with ${i} with condition of {}`] )//dont need this as will likely be location not day based
        }
      },

      0
    );
    // setError(err);

    //so this works and can prob make it work for rain or snow for the week fairly easily
    //or just have the
    console.log("SNOW ACCC====", snowAcc);
    if (err)
      return `This location does not support ${condition} data at this Time. Please try another location.`;
    return snowAcc;
  }

  //setCoord array from local storage fetching
  // forEach thing in setCoords arr call useWeather
  const getWeather = async function (coordinates) {
    console.log("CORGIESSSSSSSSSS_____:", coordinates);
    const tempAPIKEY = process.env.NEXT_PUBLIC_WEATHER;
    const exclude = "hourly";
    coordinates = coordinates.queryKey[1];
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=${exclude}&units=imperial&appid=${tempAPIKEY}`
    );
    // /api/fakeWeather
    //`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=${exclude}&units=imperial&appid=${tempAPIKEY}`
    // this is the real api now i fake it till fix api issue then put this back but use less need to optimize that
    return { ...data, coordinates };
  };
  function hasWeatherCondition(condition, ele) {
    // /input a condition to check
    //out put a boolean whether it exists or not
    //eg snow does snow exist in the weekly obj weather array?

    return ele?.data?.daily.some(
      (day) => day.weather[0].main.toLowerCase() === condition
    );
  }
  function handleFilterTypeEmit(filterType) {
    console.log("FILTER TYPE EMIT", filterType);
    setFilterType(filterType);

    // setTemplateStringObj(weatherStringFormatter({ filterType, data }));
    //so cant set it here like this but i can use it in function i think
    //so weatherStringFormatter expects the data to be the individual results for one place
    // equivalent would be results[0]
    //could resuse that logic here but it isnt dry how would i make it dry ?
  }
  const results = useQueries(
    searchHistory?.map((obj, i) => {
      return {
        queryKey: [obj.address.toLowerCase().trim(), obj],
        queryFn: (obj) => getWeather(obj),
        onSuccess: () => console.log("I", i),
      };
    }) ?? []
  );

  console.log("Results", results);
  console.log("address", searchHistory?.address);

  function handleEmit(coordinates) {
    setCoordinates(coordinates);
    // router.push(
    //   `/weather/${coordinates.address}?lat=${coordinates.lat}&lng=${coordinates.lng}`
    // );
  }

  return (
    //loop over results....
    <div>
      <Location emit={handleEmit} />
      <FilterByWeather handleSubmit={handleFilterTypeEmit} />

      <button onClick={() => setSortDirection("asc")}> Ascending</button>
      <button onClick={() => setSortDirection("desc")}> Descending</button>

      <button
        onClick={() => {
          localStorage.clear();
          setSearchHistory(null);
        }}
      >
        Clear Local Storage
      </button>
      <p></p>
      {searchHistory &&
        searchHistory
          .sort(sortFunction[sortDirection])
          .filter((ele) => true) // cant filter by weather yet it is not prefecthed yet unless change how its done to fetch on this page too
          .map((address) => (
            <>
              <Link
                href={`/weather/${address.address}?lat=${address.lat}&lng=${address.lng}`}
              >
                {address.address}
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem(address.address.toLowerCase());
                  setSearchHistory(getAllLocal());
                }}
              >
                Delete
              </button>
            </>
          ))}

      {results.every((num) => num.isSuccess === true) &&
        results?.sort(sortFunction[sortDirection]).map((ele) => (
          <>
            <Link
              href={`/weather/${ele?.data?.coordinates?.address
                .toLowerCase()
                .trim()}?lat=${ele?.data?.coordinates?.lat}&lng=${
                ele?.data?.coordinates?.lng
              }`}
            >
              <div>
                The Current Temp For {ele?.data?.coordinates?.address} is:
                {ele?.data?.current?.temp}
                <p>
                  The Total Predicted Snow for this week is{" "}
                  {/* Make this conditional so can display a warning in red for the area 
                  and on the positve can highlight the snow amount */}
                  {weatherAccumulation(ele?.data?.daily, "snow")}
                </p>
                <p>
                  The Total Rain for this area is{" "}
                  {weatherAccumulation(ele?.data?.daily, "rain")}
                </p>
              </div>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem(
                  ele?.data?.coordinates?.address.toLowerCase().trim()
                );
                setSearchHistory(getAllLocal());
              }}
            >
              remove
            </button>
            <div>
              {filterType &&
              results.every((num) => num.isSuccess === true) &&
              filterType !== "none" ? (
                <p>
                  {
                    weatherStringFormatter({ filterType, data: ele.data })
                      ?.firstPart
                  }
                  <span>
                    {
                      weatherStringFormatter({ filterType, data: ele.data })
                        ?.countDay
                    }
                  </span>
                  <span>
                    {
                      weatherStringFormatter({ filterType, data: ele.data })
                        ?.weatherCondition
                    }
                  </span>
                  <span>
                    {" "}
                    {
                      weatherStringFormatter({ filterType, data: ele.data })
                        ?.closing
                    }
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
          </>
        ))}
    </div>
  );
}
