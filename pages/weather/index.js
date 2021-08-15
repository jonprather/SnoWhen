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
  var [snowAcc, setSnowAcc] = useState(null);

  //can make this global state to pass around context api.. idk if worth it as this works and need multi locaion to do it

  var [sortFunction, setSortFunction] = useState({
    asc: (a, b) =>
      a?.data?.coordinates?.createdAt - b?.data?.coordinates?.createdAt,
    desc: (a, b) =>
      b?.data?.coordinates?.createdAt - a?.data?.coordinates?.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());
    // if (results.every((num) => num.isSuccess === true)) {
    //   let deez = weatherAccumulation(results);
    //   setSnowAcc(deez);
    // }

    console.log(snowAcc);
    // setQueriesObj(obj);
  }, [coordinates]);

  function weatherAccumulation(location) {
    let snowPerDay = [];
    let snowPerHourly = [];
    let tempArr = [];

    console.log("WEATHER DATA___", location);

    location.data.forecast.reduce((acc, ele, i) => {
      console.log("ELE", i, acc, ele["snow_in"]);
      tempArr.push(ele);

      if (ele.time === "22:00") {
        snowPerHourly.push(tempArr);
        tempArr = [];
        snowPerDay.push({ date: ele.date, total: acc + ele["snow_in"] });
        acc = 0;
        return acc; //ele["snow_in"];
      }
      return acc + ele["snow_in"]; //ele["snow_in"];
    }, 0);

    let total = snowPerDay.reduce((acc, ele) => acc + ele.total, 0);
    console.log("SnowPerHourly", snowPerHourly);

    console.log("ARRRR____________", snowPerDay);

    return { total, snowPerDay, snowPerHourly };
  }

  const getWeather = async function (coordinates) {
    const { data } = await axios.get(`/api/fakeSnowReport`);
    // /api/fakeWeather
    //  `https://api.weatherunlocked.com/api/resortforecast/${process.env.NEXT_PUBLIC_RESORT_MAMMOTH}?app_id=${process.env.NEXT_PUBLIC_RESORT_APP_ID}&app_key=${process.env.NEXT_PUBLIC_RESORT_APP_KEY}`
    //
    //w i fake it till fix api issue then put this back but use less need to optimize that
    console.log("NEW API DATA", data);

    return data;
  };
  //coordinates here could jus tbecome the searched thing which i have a lookup table for to pass the resort id
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
      <p>{snowAcc && snowAcc.total}</p>
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

      {true &&
        results.every((num) => num.isSuccess === true) &&
        results?.sort(sortFunction[sortDirection]).map((ele, i) => (
          <>
            <Link
              href={`/weather/${ele?.data?.name.toLowerCase().trim()}?id=${i}
              `}
            >
              <div>
                The Snow Total For {ele?.data?.name} is:
                {weatherAccumulation(ele)["total"]}
                {weatherAccumulation(ele)["snowPerDay"].map((day, i) => {
                  return (
                    <p>
                      The Total for day {day.date} is {day.total}
                    </p>
                  );
                })}
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
            {/* <div>
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
            </div> */}
          </>
        ))}
    </div>
  );
}
