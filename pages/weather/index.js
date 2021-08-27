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
const LocationCard = dynamic(() => import("../../components/locationCard"));

import { getAllLocal, getLocalDarkMode } from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// import hero from "../../public/images/snowy-trees-large.jpg";

export default function index() {
  const router = useRouter();
  var [error, setError] = useState(null);
  // const [weatherObj, setWeatherObj] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);
  const [deleted, setDeleted] = useState(null);

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
  }, [resort, deleted]);

  function handleDeletion(id) {
    localStorage.removeItem(id);
    setSearchHistory(getAllLocal());
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

  const results = useQueries(
    searchHistory?.map((obj, i) => {
      return {
        queryKey: [obj.resortCode, obj],
        queryFn: (obj) => getWeather(obj),
        onSuccess: () => console.log("RESULTS IN THING", results),
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
        {/* <Image src={hero} alt='Picture of Snowy Tree' /> */}
      </div>
      <SelectLocation emit={handleEmit} />
      {searchHistory && (
        <>
          <h1 className='heading'>Favorite Resorts</h1>
          <h2 className='subheading mb-16'>Recent Searches</h2>
        </>
      )}

      <main className='home__main'>
        {results[results.length - 1]?.isLoading && (
          <p className='subheading'>...Loading</p>
        )}
        {results[0]?.isError && <p className='subheading'>...Error</p>}

        <div
          className='home__card-container'
          style={{
            "grid-template-columns":
              results.length == 1
                ? "repeat(1, auto)"
                : results.length == 2
                ? "repeat(2, auto)"
                : "",
          }}
        >
          {results.every((num) => num.isSuccess === true) &&
            results?.sort(sortFunction[sortDirection]).map((ele, i) => (
              <React.Fragment key={i}>
                <LocationCard
                  weatherData={weatherReducer(ele)}
                  i={i}
                  id={ele?.data?.id}
                  deleteFromLS={handleDeletion}
                />
              </React.Fragment>
            ))}
        </div>
      </main>
    </section>
  );
}

//   <button
// onClick={() => {
//   localStorage.removeItem(
//     ele?.data?.id
//   );
//   setSearchHistory(getAllLocal());
// }}
// >
// remove
// </button>
