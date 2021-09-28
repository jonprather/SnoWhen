/**
 * @jest-environment jsdom
 */
import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";

import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

//components
import dynamic from "next/dynamic";
const SelectLocation = dynamic(() => import("../../components/selectLocation"));
const LocationCard = dynamic(() => import("../../components/locationCard"));

import { buildUrl } from "cloudinary-build-url";

// custom helpers
import { weatherReducer } from "../../lib/weatherReducer";
import { getAllLocal, getLocalDarkMode } from "../../lib/LocalStorage";
import useLocalStorage from "../../components/hooks/useLocalStorage";

export default function index() {
  const router = useRouter();

  const url = buildUrl("images/snowy-trees-large_ix0jck", {
    cloud: {
      cloudName: "dudethatsmyname",
    },
  });
  const [darkmode, setDarkmode] = useLocalStorage("darkmode", "light");
  const [error, setError] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);
  const [deleted, setDeleted] = useState(null);

  const [sortFunction, setSortFunction] = useState({
    asc: (a, b) =>
      a?.data?.coordinates?.createdAt - b?.data?.coordinates?.createdAt,
    desc: (a, b) =>
      b?.data?.coordinates?.createdAt - a?.data?.coordinates?.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());
    console.log("DARKMODE IN STATE", darkmode);
    if (typeof document !== "undefined") {
      if (resort) return "";
      //so dont rerrun when resort exists
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

      return data;
    } catch (error) {
      setError(error.message);
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

  function handleEmit(resortObj, msg) {
    setResort(resortObj);
  }

  return (
    //loop over results....
    <section className='home'>
      <div className='home__hero-img'>
        <h1 className='home__heading-container__heading'>
          Where are you skiing?
        </h1>
        <h2 className='home__heading-container__subheading mb-8'>
          Get Simple Forecasts for California Ski Resorts
        </h2>
      </div>
      <SelectLocation emit={handleEmit} />
      {/* <img src='/snow-bg.png' className='home__heading-container__mtn' /> */}
      <main className='home__main'>
        {error ? (
          <>
            <p className='heading error'>Error </p>
            <p className='subheading error'>{error}</p>
          </>
        ) : searchHistory ? (
          <div className='home__heading-container'>
            {/* <img
              src='/mtn-bg-blue.png'
              className='home__heading-container__mtn'
            /> */}
            <div className='home__heading-container__svg-wrapper'>
              <svg
                width='2126'
                height='985'
                viewBox='0 0 2126 985'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0 0C688.784 136.861 1454.23 51.1291 2100.41 0L2126 985C1705.43 919.41 921.173 863.633 0 901.291C133.279 584.565 229.401 343.513 0 0Z'
                  fill='#BBE1FA'
                />
              </svg>
            </div>
            <h1 className='heading home__heading-container__heading home__heading-container__heading--smaller'>
              Recent Searches
            </h1>
          </div>
        ) : (
          <>
            <h2 className='subheading pt-10  mb-12'>Add some Resorts!</h2>
          </>
        )}
        {results[results.length - 1]?.isLoading && (
          <p className='subheading'>...Loading</p>
        )}

        {/*  &&  */}
        <div
          className='home__card-container'
          style={{
            gridTemplateColumns:
              results.length == 1
                ? "repeat(1, auto)"
                : results.length == 2000
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
        {/* <div className=' home__card card'>
          <div class='item1'>Heading</div>
          <div class='item2'>Next Week</div>
          <div class='item3'>Snow Total</div>
          <div class='item4'>Mon</div>
          <div class='item5'>TUe</div>
          <div class='item6'>Wedn</div>
          <div class='item7'>Th</div>
          <div class='item8'>Fri</div>
        </div> */}
      </main>
    </section>
  );
}
