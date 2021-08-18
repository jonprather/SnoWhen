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
// import Image from "next/image";
// import hero from "../../public/images/snowy-trees-large.jpg";
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
  function changeDateOrder(date) {
    // Reorder "12/08/2021"; to // let date = "08/12/2021";
    let arr = date.split("/");
    let newDate = [arr[1], arr[0], arr[2]].join("/");
    return newDate;
  }
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
    <section className='home'>
      <div className='home__hero-img'>
        {/* <Image src={hero} alt=' Close up picture of a snowy tree branch' /> */}
      </div>
      <Location emit={handleEmit} />
      <div className='home__darkmode'>
        <p className='home__darkmode-dark'>Dark</p>

        <p className='home__darkmode-light'>Light</p>
      </div>
      <main className='home__main'>
        <div className='home__card-container'>
          {results.every((num) => num.isSuccess === true) &&
            results?.sort(sortFunction[sortDirection]).map((ele, i) => (
              <Link
                href={`/weather/${ele?.data?.name.toLowerCase().trim()}?id=${i}
              `}
              >
                <div className='home__card'>
                  <p className='home__card-title'>{ele?.data?.name}</p>
                  <p className='home__card-state'>Ca</p>

                  <p className='home__card-subtitle'>mountain</p>

                  <div className='home__card__snow-amount-box'>
                    <div>
                      <p className='home__card__snow-amount-box-title'>
                        Next Week
                      </p>
                      <p className='home__card__snow-amount-box-subtitle'>
                        Snow Total
                      </p>
                    </div>
                    <p className='home__card__snow-amount-box-quantity'>
                      {weatherAccumulation(ele)["total"]} "
                    </p>
                  </div>

                  <p className='home__card__forecast-title'>Forecast</p>

                  <div className='home__card__forecast-days-box'>
                    {weatherAccumulation(ele)["snowPerDay"].map((day, i) => {
                      if (i > 4) return "";
                      return (
                        <div className='home__card__forecast-days-box-cell'>
                          <p className='home__card__forecast-days-box-day'>
                            {dayjs(changeDateOrder(day.date)).format("ddd")}
                          </p>
                          <p className='home__card__forecast-days-box-amount'>
                            {day.total} "
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className='home__card__accent-box'>
                    <p className='home__card__accent-box__details'>
                      Check Details
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </main>
    </section>
  );
}

//   <button
// onClick={() => {
//   localStorage.removeItem(
//     ele?.data?.coordinates?.address.toLowerCase().trim()
//   );
//   setSearchHistory(getAllLocal());
// }}
// >
// remove
// </button>
