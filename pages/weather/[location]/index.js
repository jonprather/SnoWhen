import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState();
  const [id, setId] = useState("test");
  const [location, setLocation] = useState(null);

  function weatherAccumulation(location) {
    let snowPerDay = [];
    let snowPerHourly = [];
    let tempArr = [];

    location?.data?.forecast.reduce((acc, ele, i) => {
      tempArr.push(ele);

      if (ele.time === "22:00") {
        snowPerHourly.push(tempArr);
        tempArr = [];
        snowPerDay.push({ ...ele, total: acc + ele["snow_in"] });
        acc = 0;
        return acc; //ele["snow_in"];
      }
      return acc + ele["snow_in"]; //ele["snow_in"];
    }, 0);

    console.log("SnowPerHourly", snowPerHourly);

    console.log("snowPerDay", snowPerDay);
    // Why does this only have the time of 22 not the others?
    //bc only pushing in elements when they have that time but the total is right bc acc is always acc just only pushing in at that
    //time whihc is time

    return { snowPerDay, snowPerHourly };
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
      var id = router.query.id;
      setId(id);
      setLocation(router.query.location);
      console.log("RQ___", router.query);
    }
    return () => {};
  }, [router.isReady]);

  return (
    <div>
      Days Page for: {location}
      {state && (
        <Graph
          location={location}
          isHourlyTitles={false}
          dayIndex={null}
          data={
            weatherAccumulation(queryClient?.queryCache?.queries[id].state)[
              "snowPerDay"
            ]
          }
        />
      )}
      {state &&
        weatherAccumulation(queryClient?.queryCache?.queries[id].state)[
          "snowPerDay"
        ].map((day, i) => {
          return (
            <>
              Yo maybe i need to make it an onclick thing idk why this link
              doesnt work with the weather card
              {/* WEATHER COMPONENT */}
              <a
                onClick={() =>
                  router.push(`/weather/${location}/${i}?id=${id}`)
                }
              >
                <WeatherCard
                  location={location}
                  weatherDesc={day.base["wx_desc"]}
                  humPct={day["hum_pct"]}
                  windSpd={day.base["windspd_mph"]}
                  temp={day.base["temp_f"]}
                  date={day.date}
                />
              </a>
              {/* //IDK HOW TO MAKE THIS FUCKING CLICKABLE LIKE I WANT TO CHANGE THE PAGE>>>>> */}
            </>
          );
        })}
    </div>
  );
}
//queryclient.queryCache.queries.queryKey[0]===mammoth //can filter by this
//queryclient?.queryCache.queries[0].state.data ///this is the obj i want which then can do .forecast etc
//but bc refresh breaks it i might just want to try tryFetch or whatever its called
