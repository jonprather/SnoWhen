import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useQueryClient } from "react-query";

import dynamic from "next/dynamic";
//components
const WeatherCard = dynamic(() => import("../../../components/weatherCard"));
import Graph from "../../../components/graph";
import BackButton from "../../../components/backButton";
import { weatherReducer } from "../../../lib/weatherReducer";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [locationId, setLocationId] = useState("test");
  const [location, setLocation] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);

  useEffect(() => {
    if (!router?.isReady) return;

    var id = router?.query?.locationId;
    setLocationId(id);
    setLocation(router?.query?.location?.toLowerCase());

    if (!queryClient) return;

    if (queryClient?.queryCache.queries.length === 0) {
      router?.push(`/weather`);
    }

    setWeatherObj(() => {
      return weatherReducer(queryClient?.queryCache?.queries[id]?.state)[
        "snowPerDay"
      ];
    });
  }, [router?.isReady]);

  return (
    <div className='location'>
      <div className='location__header'>
        <BackButton url={`/weather`} path={[location]} />
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-18'>Snow Forecast</h2>
      </div>
      <div className='location__forecast'>
        {!weatherObj && <p className='subheading'>..Loading</p>}
        <div className='day__forecast__graph-container'>
          {weatherObj && (
            <Graph
              location={location}
              isHourlyTitles={false}
              dayIndex={null}
              data={weatherObj}
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
            {weatherObj &&
              weatherObj.map((day, i) => {
                return (
                  <React.Fragment key={day.date}>
                    <div
                      className='link'
                      // onClick={
                      //   () =>
                      //   router?.push(
                      //     `/weather/${location}/${formatDate(
                      //       weatherObj[i].date
                      //     ).toLowerCase()}?locationId=${locationId}&dayId=${i}`
                      //   )
                      // }
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
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
