import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import axios from "axios";
import SelectLocation from "../../components/selectLocation";
import Nav from "../../components/nav";

import { formatDate } from "../../lib/helpers/formatDate";

import {
  getAllLocal,
  getLocalDarkMode,
  setLocalDarkMode,
} from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// import hero from "../../public/images/snowy-trees-large.jpg";

import DarkMode from "../../components/darkMode";

export default function index() {
  const router = useRouter();
  var [error, setError] = useState(null);

  var [coordinates, setCoordinates] = useState(null);
  var [sortDirection, setSortDirection] = useState("desc");
  var [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  var [queriesObj, setQueriesObj] = useState([]);
  var [filterType, setFilterType] = useState(null);
  var [snowAcc, setSnowAcc] = useState(null);
  var [resort, setResort] = useState(null);

  //can make this global state to pass around context api.. idk if worth it as this works and need multi locaion to do it

  var [sortFunction, setSortFunction] = useState({
    asc: (a, b) =>
      a?.data?.coordinates?.createdAt - b?.data?.coordinates?.createdAt,
    desc: (a, b) =>
      b?.data?.coordinates?.createdAt - a?.data?.coordinates?.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());

    if (getLocalDarkMode()) {
      document.documentElement.setAttribute("data-theme", getLocalDarkMode());
    }

    // setQueriesObj(obj);
  }, [resort]);
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

    location?.data?.forecast?.reduce((acc, ele, i) => {
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

    return { total, snowPerDay, snowPerHourly };
  }

  const getWeather = async function (resort) {
    try {
      console.log("resort", resort);
      const { data } = await axios.get(
        `/api/snowReport?ID=${resort?.queryKey[1]?.resortCode}`
      );
      // test with fakeSnowReport after this
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  //coordinates here could jus tbecome the searched thing which i have a lookup table for to pass the resort id

  const results = useQueries(
    searchHistory?.map((obj, i) => {
      return {
        queryKey: [obj.resortCode, obj],
        queryFn: (obj) => getWeather(obj),
        onSuccess: () => console.log(""),
      };
    }) ?? []
  );

  function handleEmit(resortObj) {
    setResort(resortObj);
  }

  return (
    //loop over results....
    <section className='home'>
      <Nav />
      <div className='home__hero-img'>
        {/* <Image src={require(`../../public/images/snowy-trees-large.jpg`)} /> */}
        <img src='/images/snowy-trees-large.jpg' />
      </div>
      <SelectLocation emit={handleEmit} />
      <DarkMode />
      {/* Shit disapeaered even tho i import it and */}
      <main className='home__main'>
        <div className='home__card-container'>
          {results.every((num) => num.isSuccess === true) &&
            results?.sort(sortFunction[sortDirection]).map((ele, i) => (
              <Link
                href={`/weather/${ele?.data?.name.toLowerCase().trim()}?id=${i}
              `}
              >
                <div className='home__card'>
                  <h1 className='home__card-heading'>{ele?.data?.name}</h1>
                  <p className='home__card-state'>Ca</p>

                  <h2 className='home__card-subheading'>mountain</h2>

                  <div className='home__card__snow-amount-box'>
                    <div>
                      <p className='home__card__snow-amount-box-heading'>
                        Next Week
                      </p>
                      <p className='home__card__snow-amount-box-subheading'>
                        Snow Total
                      </p>
                    </div>
                    <p className='home__card__snow-amount-box-quantity'>
                      {weatherAccumulation(ele)["total"]} "
                    </p>
                  </div>

                  <p className='home__card__forecast-heading'>Forecast</p>

                  <div className='home__card__forecast-days-box'>
                    {weatherAccumulation(ele)["snowPerDay"].map((day, i) => {
                      if (i > 4) return "";
                      return (
                        <div className='home__card__forecast-days-box-cell'>
                          <p className='home__card__forecast-days-box-day'>
                            {formatDate(day.date)}
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
