import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";
import Nav from "../../../components/nav";
import SelectDay from "../../../components/selectDay";
import SelectAltitude from "../../../components/selectAltitude";

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

  function weatherAccumulation(location) {
    let snowPerDay = [];
    let snowPerHour = [];
    let tempArr = [];

    location?.data?.forecast.reduce((acc, ele, i) => {
      tempArr.push({
        ...ele,
        date: ele.date,
        total: ele[altitude]["freshsnow_in"],
        // also still have option for total snow for all together instead of alt just snow again
      });
      if (ele.time === "22:00") {
        snowPerHour.push(tempArr);
        tempArr = [];
        snowPerDay.push({ date: ele.date, total: acc + ele["snow_in"] });
        acc = 0;
        return acc;
      }
      return acc + ele["snow_in"];
    }, 0);
    return { snowPerDay, snowPerHour };
  }
  function miltaryToStandardTime(time) {
    var time = time.slice(0, -3);
    time = time * 1;
    if (time > 12) {
      time = time - 12;
      return time + " pm";
    }
    return time + " am";
  }

  function handleEmit(data) {
    setDayId(data);
    // setDayName(formatDate(weatherObj[dayId].date));
  }
  function handleEmitAltitude(alt) {
    setAltitude(alt);
    // setDayName(formatDate(weatherObj[dayId].date));
  }
  useEffect(() => {
    //would need to pass the index or name if pass index of query could do in router very easily

    var id;
    var daysId;
    if (router.isReady) {
      if (queryClient?.queryCache.queries.length === 0) {
        router.push(`/weather`);
        //can hypothetically do a refecth with similar logic right?
      }
      id = router.query.locationId;
      daysId = router.query.dayId;

      setLocationId(id);
      setDayId(daysId);

      setLocation(router.query.location.toLowerCase());

      if (queryClient) {
        setWeatherObj(() => {
          return weatherAccumulation(
            queryClient?.queryCache?.queries[id]?.state
          )["snowPerHour"][daysId];
        });
        console.log(
          "WESATHER OBJ",
          weatherAccumulation(queryClient?.queryCache?.queries[id]?.state)[
            "snowPerHour"
          ][router.query.dayId]
        );
      }
    }

    return () => {};
  }, [router.isReady, dayId, altitude]);
  console.log("8===========>", weatherObj);
  return (
    <div className='day'>
      <Nav />
      <BackButton url={`/weather/${location}?locationId=${locationId}`} />

      <div className='day__forecast'>
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-16'>Hourly Forecast</h2>

        <div className='day__forecast__graph-container'>
          <div className='day__forecast__graph-container__header'>
            <SelectAltitude emitAltitude={handleEmitAltitude} />
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
              <SelectAltitude emitAltitude={handleEmitAltitude} />
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
                  // THE CARDS FOR WEATHER COULD MAKE THIS A WEATHER COMPONENT pass data as props

                  <WeatherCard
                    location={location}
                    weatherDesc={hour[altitude]["wx_desc"]}
                    humPct={hour.hum_pct}
                    windSpd={hour[altitude]["windspd_mph"]}
                    temp={hour[altitude]["temp_f"]}
                    date={miltaryToStandardTime(hour.time)}
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
