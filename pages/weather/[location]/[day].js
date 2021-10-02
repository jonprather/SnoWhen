import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const SelectAltitude = dynamic(() =>
  import("../../../components/selectAltitude")
);
const SelectDay = dynamic(() => import("../../../components/selectDay"));
const WeatherCard = dynamic(() => import("../../../components/weatherCard"));

import Graph from "../../../components/graph";
import BackButton from "../../../components/backButton";

//helpers
import { weatherReducer } from "../../../lib/weatherReducer";

import { militaryToStandardTime } from "../../../lib/helpers/militaryToStandardTime";
import { formatDate } from "../../../lib/helpers/formatDate";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState();
  const [locationId, setLocationId] = useState("test");
  const [dayId, setDayId] = useState("test");
  const [dayname, setDayName] = useState(null);

  const [altitude, setAltitude] = useState("base");
  const [location, setLocation] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);

  function handleEmit(data) {
    setDayId(data);
  }
  function handleEmitAltitude(alt) {
    setAltitude(alt);
  }
  useEffect(() => {
    if (!router?.isReady) return;
    if (!queryClient) return;

    if (queryClient?.queryCache.queries.length === 0) {
      router?.push(`/weather`);
    }

    let id = router?.query?.locationId;
    let daysId = router?.query?.dayId;

    setLocationId(id);
    setDayId(daysId);

    setLocation(router?.query?.location?.toLowerCase());

    setWeatherObj(() => {
      return weatherReducer(
        queryClient?.queryCache?.queries[id]?.state,
        altitude
      )["snowPerHour"][daysId];
    });
  }, [router?.isReady, dayId, altitude]);

  return (
    <div className='day'>
      <div className='location__header'>
        <BackButton
          url={`/weather/${location}?locationId=${locationId}`}
          path={[location, router?.query?.day]}
        />
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-18'>Hourly Forecast</h2>
      </div>

      <div className='day__forecast'>
        <div className='day__forecast__graph-container'>
          {weatherObj && altitude && (
            <Graph
              location={location}
              isHourlyTitles={true}
              dayIndex={dayId}
              data={weatherObj}
            />
          )}
          <div className='day__forecast__graph-container__header'>
            <SelectAltitude
              emitAltitude={handleEmitAltitude}
              altitude={altitude}
            />
            {!weatherObj && <p className='subheading'>..Loading</p>}
            {weatherObj && (
              <SelectDay
                locationId={locationId}
                locationName={
                  queryClient?.queryCache?.queries[locationId]?.state?.data
                    ?.name
                }
                day={formatDate(weatherObj[0].date)}
                date={weatherObj[0].date}
                emit={handleEmit}
              />
            )}
          </div>
        </div>
      </div>
      <div className='day__weather'>
        <h1 className='heading'>{location} </h1>
        <h2 className='subheading day__weather__subheading mb-18'>
          Hourly Weather{" "}
        </h2>
        <div className='day__weather__cards-container'>
          <div className='day__weather__cards-container__header'>
            <div className='day__weather__cards-container__header--positioner'>
              <SelectAltitude
                emitAltitude={handleEmitAltitude}
                altitude={altitude}
              />
            </div>
            {weatherObj && (
              <SelectDay
                locationId={locationId}
                locationName={
                  queryClient?.queryCache?.queries[locationId]?.state?.data
                    ?.name
                }
                day={formatDate(weatherObj[0].date)}
                date={weatherObj[0].date}
                emit={handleEmit}
              />
            )}
          </div>
          <div className='weather-card__container'>
            {weatherObj &&
              weatherObj.map((hour, i) => {
                return (
                  <WeatherCard
                    location={location}
                    weatherDesc={hour[altitude]["wx_desc"]}
                    humPct={hour.hum_pct}
                    windSpd={hour[altitude]["windspd_mph"]}
                    temp={hour[altitude]["temp_f"]}
                    date={militaryToStandardTime(hour.time)}
                    isHourlyTitles={true}
                    icon={hour.base["wx_icon"].slice(0, -4)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
