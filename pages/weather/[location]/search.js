import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { useQuery } from "react-query";
import axios from "axios";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const WeatherCard = dynamic(() => import("../../../components/weatherCard"));

import Graph from "../../../components/graph";

import BackButton from "../../../components/backButton";

import { formatDate } from "../../../lib/helpers/formatDate";
import { weatherReducer } from "../../../lib/weatherReducer";

export default function locationFromSearch() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  // Queries

  const [locationId, setLocationId] = useState("test");
  const [location, setLocation] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);

  // Queries
  const getWeather = async function (resortCode) {
    resortCode = router.query.resortId;
    try {
      // console.log("resort", resort);
      const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);

      return data;
    } catch (error) {
      setError(error.message);
      // console.error(error);
    }
  };
  const query = useQuery(["todos", router?.query?.resortId], async () => {
    const data = await getWeather(router?.query?.resortId);
    return data;
  });

  //idk something wrong here with how i pass this in inspec tthe obj compare to locaiont one

  useEffect(() => {
    if (!router?.isReady) return;

    var id = router?.query?.locationId;
    setLocationId(id);
    setLocation(router?.query?.location?.toLowerCase());

    // if (query?.isSuccess) {
    //   setWeatherObj(() => {
    //     return weatherReducer(query?.data)["snowPerDay"];
    //   });
    // }
  }, [router?.isReady]);

  return (
    <div className='location'>
      <div className='location__header'>
        <BackButton url={`/weather`} path={[location]} />
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-18'>Snow Forecast</h2>
      </div>
      <div className='location__forecast'>
        {!query.isSuccess && <p className='subheading'>..Loading</p>}
        <div className='day__forecast__graph-container'>
          {query && query?.isSuccess && (
            <Graph
              location={location}
              isHourlyTitles={false}
              dayIndex={null}
              data={weatherReducer(query)["snowPerDay"]}
            />
          )}
        </div>
      </div>
      <div className='location__weather'>
        <div className='day__weather__cards-container'>
          <div className='location__header--2'>
            <h1 className='heading'>{location} </h1>
            <h2 className='subheading location__weather__subheading mb-18'>
              Weather
            </h2>
          </div>
          <div className='weather-card__container'>
            {query?.isSuccess &&
              weatherReducer(query)["snowPerDay"]?.map((day, i) => {
                return (
                  <React.Fragment key={day.date}>
                    <a
                      className='link'
                      onClick={() =>
                        router?.push(
                          `/weather/${location}/${formatDate(
                            weatherObj[i].date
                          ).toLowerCase()}?locationId=${locationId}&dayId=${i}`
                        )
                      }
                    >
                      <WeatherCard
                        key={i}
                        location={location}
                        weatherDesc={day.base["wx_desc"]}
                        humPct={day["hum_pct"]}
                        windSpd={day.base["windspd_mph"]}
                        temp={day.base["temp_f"]}
                        date={day.date}
                        isHourlyTitles={false}
                        icon={day.base["wx_icon"].slice(0, -4)}
                      />
                    </a>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
