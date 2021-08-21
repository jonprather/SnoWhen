import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";
import Nav from "../../../components/nav";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState();
  const [locationId, setLocationId] = useState("test");
  const [dayId, setDayId] = useState("test");
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

  useEffect(() => {
    //would need to pass the index or name if pass index of query could do in router very easily

    if (queryClient?.queryCache.queries.length === 0) {
      router.push(`/weather`);
      //can hypothetically do a refecth with similar logic right?
    }
    var id;
    var daysId;
    if (router.isReady) {
      id = router.query.id;
      daysId = router.query.day;

      setLocationId(id);
      setDayId(daysId);
      setLocation(router.query.location);
      if (queryClient) {
        setWeatherObj(() => {
          return weatherAccumulation(
            queryClient?.queryCache?.queries[id]?.state
          )["snowPerHour"][daysId];
        });
        console.log(
          "WESATHER OBJ",
          queryClient?.queryCache?.queries[id]?.state,
          weatherObj
        );
      }
    }

    //would like to save this computation but idk how yet... maybe useMemo or ... idk but its not even working right
    return () => {};
  }, [router.isReady]);
  console.log("8===========>", weatherObj);
  return (
    <div>
      <Nav />
      "YO WTF"
      {weatherObj &&
        queryClient?.queryCache?.queries[locationId]?.state?.data?.name}
      {weatherObj && (
        <Graph
          location={location}
          isHourlyTitles={true}
          dayIndex={dayId}
          data={weatherObj}
        />
      )}
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
                date={hour.time}
                isHourlyTitles={true}
              />
            );
          })}
      </div>
    </div>
  );
}
//queryclient.queryCache.queries.queryKey[0]===mammoth //can filter by this
//queryclient?.queryCache.queries[0].state.data ///this is the obj i want which then can do .forecast etc
//but bc refresh breaks it i might just want to try tryFetch or whatever its called
