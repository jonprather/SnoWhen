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
        {/* <Image
          src={url}
          alt='Picture of Snowy Tree'
          layout='fill'
          objectFit='cover'
          className={"home__hero-img__img"}
        /> */}
      </div>
      <SelectLocation emit={handleEmit} />

      {error ? (
        <>
          <p className='heading error'>Error </p>
          <p className='subheading error'>{error}</p>
        </>
      ) : searchHistory ? (
        <div className=' home__heading-container'>
          <h1 className='heading home__heading-container__heading'>
            Favorite Resorts
          </h1>
          <h2 className='subheading mb-12'>Recent Searches</h2>
        </div>
      ) : (
        <>
          <h2 className='subheading mb-12'>Add some Resorts!</h2>
        </>
      )}

      <main className='home__main'>
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
      </main>
    </section>
  );
}
