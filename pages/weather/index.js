/**
 * @jest-environment jsdom
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";

import dynamic from "next/dynamic";
//components
const SelectLocation = dynamic(() => import("../../components/selectLocation"));
const LocationCard = dynamic(() => import("../../components/locationCard"));

// custom helpers
import { weatherReducer } from "../../lib/weatherReducer";
import { getAllLocal } from "../../lib/LocalStorage.ts";
import Layout from "@/components/layout";

export default function index() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [searchHistory, setSearchHistory] = useState(null);
  //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setSearchHistory(getAllLocal());
  }, [resort]);

  const getWeather = async function (resort) {
    try {
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
        onSuccess: console.log(""),
      };
    }) ?? []
  );

  function handleEmit({ label, value: resortID }) {
    setResort(resortID);
    router.push(`/weather/${label}/search?resortId=${resortID}`);
  }
  function handleDeletion(id) {
    localStorage.removeItem(id);
    setSearchHistory((prev) => {
      let tempArr = [...prev.filter((ele) => +ele.resortCode !== id)];
      return tempArr.length === 0 ? null : tempArr;
    });
  }

  return (
    <Layout>
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
        <main className='home__main'>
          {error ? (
            <>
              <p className='heading error'>Error </p>
              <p className='subheading error'>{error}</p>
            </>
          ) : searchHistory ? (
            <div className='home__heading-container'>
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

          <div className='home__card-container'>
            {results.every((num) => num.isSuccess === true) &&
              results?.map((ele, i) => (
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
    </Layout>
  );
}
