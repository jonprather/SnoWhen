import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import axios from "axios";
// import SelectLocation from "../../components/selectLocation";
// import Nav from "../../components/nav";
const Nav = dynamic(() => import("../../components/nav"));
const SelectLocation = dynamic(() => import("../../components/selectLocation"));

// const weatherReducer = dynamic(() =>
//   import("../../lib/weatherReducer").then((mod) => mod.weatherReducer)
// );
import { weatherReducer } from "../../lib/weatherReducer";
console.log("WEATHER REDUCER", weatherReducer);
import { formatDate } from "../../lib/helpers/formatDate";
import dynamic from "next/dynamic";

import { getAllLocal, getLocalDarkMode } from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
// import Image from "next/image";
// import hero from "../../public/images/snowy-trees-large.jpg";

export default function index() {
  const router = useRouter();
  var [error, setError] = useState(null);
  // const [weatherObj, setWeatherObj] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);

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
  }, [resort]);

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
        {/* <img alt='snowy tree image' src='/images/snowy-trees-large.jpg' defer /> */}
      </div>
      <SelectLocation emit={handleEmit} />
      {searchHistory && (
        <>
          <h1 className='heading'>Favorite Resorts</h1>
          <h2 className='subheading mb-16'>Recent Searches</h2>
        </>
      )}

      <main className='home__main'>
        <div className='home__card-container'>
          {results.every((num) => num.isSuccess === true) &&
            results?.sort(sortFunction[sortDirection]).map((ele, i) => (
              <Link
                href={`/weather/${ele?.data?.name
                  .toLowerCase()
                  .trim()}?locationId=${i}
              `}
              >
                <div className='home__card' key={i}>
                  <h1 className='home__card-heading'>{ele?.data?.name}</h1>
                  <p className='home__card-state'>Ca</p>

                  <h2 className='home__card-subheading mb-16'>mountain</h2>

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
                      {weatherReducer(ele)["total"]} "
                    </p>
                  </div>

                  <p className='home__card__forecast-heading'>Forecast</p>

                  <div className='home__card__forecast-days-box'>
                    {weatherReducer(ele)["snowPerDay"].map((day, i) => {
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
