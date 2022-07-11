/**
 * @jest-environment jsdom
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";

import dynamic from "next/dynamic";
import Hero from "@/components/organisms/Hero";
//components
const SelectLocation = dynamic(() =>
  import("@/components/molecules/selectLocation")
);
const LocationCard = dynamic(() =>
  import("@/components/molecules/locationCard")
);

// custom helpers
import { weatherReducer } from "@/helpers/weatherReducer";
import { getAllLocal } from "../../lib/LocalStorage.js";
import Layout from "@/components/layout";

export default function index() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [searchHistory, setSearchHistory] = useState(null);
  //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setSearchHistory([]); //get all local is jank replace with strapi BE and  make this inside the app
    setError("");
  }, [resort]);

  const getWeather = async function (resort) {
    try {
      const { data } = await axios.get(
        `/api/snowReport?ID=${resort?.queryKey[1]?.resortCode}`
      );
      setError("");

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
    if (label === undefined || resortID === undefined) return;
    console.log(label, resortID);
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
      {/* THis could be a heading molecule, and a seach molecule that make up a organism, which make up a template
    all of which i can reuse */}
      {/* //SO TODO set up the atomic desgin basics for the above so i can get it working for account page
     also might want to make a hook for the react query shit ...  
     // SO make the folder structure can even look up example then try it out based on above atoms, molecles organisms
     //template 
     */}
      <section className='home'>
        <Hero></Hero>
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
                    weatherData={weatherReducer(ele.data)}
                    // does this take ele?.data?.snowReport.data[0].attributes.blob now? idk
                    //why it cant read snowPer day...
                    i={i}
                    id={ele?.data?.id}
                  />
                </React.Fragment>
              ))}
          </div>
        </main>
      </section>
    </Layout>
  );
}
