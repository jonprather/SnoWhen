import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState();
  const [id, setId] = useState("test");
  const [dayId, setDayId] = useState("test");
  const [altitude, setAltitude] = useState("base");
  const [location, setLocation] = useState(null);

  function weatherAccumulation(location) {
    let snowPerDay = [];
    let snowPerHour = [];
    let tempArr = [];

    console.log("WEATHER DATA___", location);

    location?.data?.forecast.reduce((acc, ele, i) => {
      console.log("ELE", i, acc, ele["snow_in"]);
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
        return acc; //ele["snow_in"];
      }
      return acc + ele["snow_in"]; //ele["snow_in"];
    }, 0);

    console.log("SnowPerHourly", snowPerHour);

    console.log("snowPerDay", snowPerDay);

    return { snowPerDay, snowPerHour };
  }

  console.log("QUERY CLINET", queryClient);
  useEffect(() => {
    //would need to pass the index or name if pass index of query could do in router very easily
    setState(queryClient.queryCache.queries[0]);
    if (queryClient?.queryCache.queries.length === 0) {
      router.push(`/weather`);
      //can hypothetically do a refecth with similar logic right?
    }
    if (router.isReady) {
      let id = router.query.id;
      let dayId = router.query.day;

      setId(id);
      setDayId(dayId);
      setLocation(router.query.location);
    }
    if (queryClient?.queryCache.queries.length === 0) {
      router.push(`/weather`);
      //can hypothetically do a refecth with similar logic right?
    }
    return () => {};
  }, [router.isReady]);

  return (
    <div>
      "YO WTF"
      {state && queryClient?.queryCache?.queries[id]?.state?.data?.name}
      {state && (
        <Graph
          location={location}
          isHourlyTitles={true}
          dayIndex={dayId}
          data={
            weatherAccumulation(queryClient?.queryCache?.queries[id].state)[
              "snowPerHour"
            ][dayId]
          }
        />
      )}
      {state &&
        weatherAccumulation(queryClient?.queryCache?.queries[id]?.state)[
          "snowPerHour"
        ][dayId].map((hour, i) => {
          return (
            // THE CARDS FOR WEATHER COULD MAKE THIS A WEATHER COMPONENT pass data as props

            <>
              <WeatherCard
                location={location}
                weatherDesc={hour[altitude]["wx_desc"]}
                humPct={hour.hum_pct}
                windSpd={hour[altitude]["windspd_mph"]}
                temp={hour[altitude]["temp_f"]}
                date={hour.time}
              />
            </>
          );
        })}
    </div>
  );
}
//queryclient.queryCache.queries.queryKey[0]===mammoth //can filter by this
//queryclient?.queryCache.queries[0].state.data ///this is the obj i want which then can do .forecast etc
//but bc refresh breaks it i might just want to try tryFetch or whatever its called
