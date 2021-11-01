/**
 * @jest-environment jsdom
 */
import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { useQueryClient } from "react-query";

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
  const [resortName, setResortName] = useState(null);

  const [deleted, setDeleted] = useState(null);
  const queryClient = useQueryClient();

  const [sortFunction, setSortFunction] = useState({
    asc: (a, b) =>
      a?.data?.coordinates?.createdAt - b?.data?.coordinates?.createdAt,
    desc: (a, b) =>
      b?.data?.coordinates?.createdAt - a?.data?.coordinates?.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());
  }, [resort, deleted]);
  async function getCacheId(resortId) {
    let id = queryClient?.queryCache?.queries.findIndex(
      (ele) => ele.state.data.id == resortId
    );
    let name = queryClient?.queryCache?.queries.find(
      (ele) => ele.state.data.id == resortId
    )?.state?.data?.name;

    return { id, name };
  }
  function handleDeletion(id) {
    localStorage.removeItem(id);

    setSearchHistory(getAllLocal());
  }
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
  //maybe on success i can check for the combo of onSuccess beign true
  //and onEmit if its true then push to
  //use onSuccess to set up some state
  //or better yet can use results.all are good to go that i have in js return for jsx
  //when all is good then fire off the push... and i should have the data ready in the cache already
  // results.every((num) => num.isSuccess === true) when this is ready then push to the next page
  function handleEmit(resortObj, name) {
    setResort(resortObj);
    setResortName(name);
    router.push(`/weather/${name}/search?resortId=${resortObj}`);

    //how do i wait until this is done need to update state so can rerun a function

    //like have the results in useEffect so when its done it will rerun
    // when its done it sets dsome state

    // array.indexOf
    //get id and name from cache to get proper url for next page
    //this breaks when its the first time... its not in the cache yet... hmm
    //need anothear approach bc this doesnt work first tiem and that is the most important
    //its not in the cache but ... so can i just have that shit on the resort obj or in local storage store the id of when it was searched and increment it based on the prior ls value ...
    // but then pppl can break it if they want to maybe i can use async code?
    //maybe ....... idk

    //need to access the data obj get correct name .. is that how it pulls in the new data?
    // router.push(`/weather/${name?.toLowerCase()}?locationId=${id}`);
    //ok now just need the resort name that correspons to this id

    //actaully i think i should jsut get the name and the resort id from the emit action
    // then push  that can use the resort id as a param in the above funcitno to get the index and use that to access the
    //query
    //so abstract a fn takes in resor tid and puts out id
    // have the other component use that before it runs its use effect query for it

    //for the click away i need to pass down the open function down
    //maybe not have it as a toogle
    // also pass in the children//it will come to me but i feel anx like i have to do it asap or ill never get it or ill forget and it wont get done
    //bc i feel afraid of not afinishing and needing to impress others with worik or getting a job asap fear econ
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
        <div className='home__card-container'>
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
