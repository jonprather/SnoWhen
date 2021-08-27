import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";
import Nav from "../../../components/nav";
import SelectDay from "../../../components/selectDay";
import SelectAltitude from "../../../components/selectAltitude";
import { weatherReducer } from "../../../lib/weatherReducer";
import { militaryToStandardTime } from "../../../lib/helpers/militaryToStandardTime";

import DarkMode from "../../../components/darkMode";
import BackButton from "../../../components/backButton";

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
    if (!router.isReady) return;
    if (!queryClient) return;

    if (queryClient?.queryCache.queries.length === 0) {
      router.push(`/weather`);
    }

    let id = router.query.locationId;
    let daysId = router.query.dayId;

    setLocationId(id);
    setDayId(daysId);

    setLocation(router.query.location.toLowerCase());
    setTimeout(() => {}, 1000);
    setWeatherObj(() => {
      return weatherReducer(queryClient?.queryCache?.queries[id]?.state)[
        "snowPerHour"
      ][daysId];
    });
  }, [router.isReady, dayId, altitude]);

  return (
    <div className='day'>
      <Nav />
      <BackButton url={`/weather/${location}?locationId=${locationId}`} />

      <div className='day__forecast'>
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-16'>Hourly Forecast</h2>

        <div className='day__forecast__graph-container'>
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
          {weatherObj && (
            <Graph
              location={location}
              isHourlyTitles={true}
              dayIndex={dayId}
              data={weatherObj}
            />
          )}
        </div>
      </div>
      <div className='day__weather'>
        <h1 className='heading'>{location} </h1>
        <h2 className='subheading day__weather__subheading'>Hourly Weather </h2>
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
//queryclient.queryCache.queries.queryKey[0]===mammoth //can filter by this
//queryclient?.queryCache.queries[0].state.data ///this is the obj i want which then can do .forecast etc
//but bc refresh breaks it i might just want to try tryFetch or whatever its called
