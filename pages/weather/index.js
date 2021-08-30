import React, { useEffect, useState } from "react";
import { useQueries } from "react-query";
import axios from "axios";
// import SelectLocation from "../../components/selectLocation";
// import Nav from "../../components/nav";

import { render } from "react-dom";
import FlashMessage from "react-flash-message";
import useTimeout from "../../components/hooks/useTimeout";
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
const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};
import { getAllLocal, getLocalDarkMode } from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// import hero from "../../public/images/snowy-trees-large.jpg";

export default function index() {
  const router = useRouter();
  var [error, setError] = useState("");
  // const [weatherObj, setWeatherObj] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchHistory, setSearchHistory] = useState(null); //by default can set this in useEffect to get from cookie local storage or have default
  const [resort, setResort] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [flashMsg, setFlashMsg] = useState("");
  const [timerID, setTimerID] = useState();
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
    console.log("CHECK ME OUT");
    // setTimeout(() => {
    //   setFlashMsg("");
    //   console.log("flash msg", flashMsg);
    // }, 1000);  //this one works but idk if good practice bc in dep array
    // setFlashMsg(() => {
    //   return setTimeout(() => null, 3000);
    // });
  }, [resort, deleted, flashMsg]);

  function handleDeletion(id) {
    localStorage.removeItem(id);
    setFlashMsg({ msg: "Resort Deleted!", type: "delete" });
    setSearchHistory(getAllLocal());
    resetFlash();
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
  function resetFlash() {
    var timeout = setTimeout(() => {
      setFlashMsg(null);

      console.log("flash msg", flashMsg?.type);
    }, 5000);
  }

  function handleEmit(resortObj, msg) {
    setResort(resortObj);
    setFlashMsg(msg);
    resetFlash();
  }

  return (
    //loop over results....

    <section className='home'>
      <Nav />
      <div className='home__hero-img'>
        {/* <Image src={require(`../../public/images/snowy-trees-large.jpg`)} /> */}
        {/* <img
          alt='snowy tree image'
          src='/images/snowy-trees-large.jpg'
          loading='lazy'
        /> */}
        {/* <Image
          src={"/images/snowy-trees-large.jpg"}
          alt='Picture of Snowy Tree'
          layout='intrinsic'
          width={1440}
          height={340}
        /> */}
      </div>
      <SelectLocation emit={handleEmit} />

      {flashMsg && (
        <div className={`flash-msg__box flash-msg__box--${flashMsg?.type}`}>
          <p className={"flash-msg__box__text"}>{flashMsg?.msg}</p>
        </div>
      )}
      {/* <FlashMessage duration={5000}>
          <p className='flash-msg' style={{ color: "red" }}>
            {flashMsg}
          </p>
        </FlashMessage> */}
      {error ? (
        <>
          <p className='heading error'>Error </p>
          <p className='subheading error'>{error}</p>
        </>
      ) : searchHistory ? (
        <>
          <h1 className='heading'>Favorite Resorts</h1>
          <h2 className='subheading mb-12'>Recent Searches</h2>
        </>
      ) : (
        <>
          {/* <h1 className='heading'>Favorite resorts</h1> */}
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
