import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import WeatherCard from "../../../components/weatherCard";
import Graph from "../../../components/graph";
import DarkMode from "../../../components/darkMode";
import Nav from "../../../components/nav";
import BackButton from "../../../components/backButton";
import { formatDate } from "../../../lib/helpers/formatDate";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [state, setState] = useState();
  const [locationId, setLocationId] = useState("test");
  const [location, setLocation] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);

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
    console.log("SNOWPERDAY___", snowPerDay);
    return { snowPerDay, snowPerHourly };
  }

  console.log("QUERY CLINET", queryClient);
  useEffect(() => {
    //would need to pass the index or name if pass index of query could do in router very easily
    setState(queryClient.queryCache.queries[0]);

    if (router.isReady) {
      var id = router.query.locationId;
      setLocationId(id);
      setLocation(router.query.location.toLowerCase());
      console.log("RQ___", router.query);
      if (queryClient?.queryCache.queries.length === 0) {
        router.push(`/weather`);
      }
    }

    if (queryClient) {
      setWeatherObj(() => {
        return weatherAccumulation(queryClient?.queryCache?.queries[id]?.state)[
          "snowPerDay"
        ];
      });
      console.log(
        "WESATHER OBJ",
        weatherAccumulation(queryClient?.queryCache?.queries[id]?.state)[
          "snowPerDay"
        ]
      );
    }

    return () => {};
  }, [router.isReady]);

  return (
    <div className='location'>
      <Nav />
      <BackButton url={`/weather`} />
      <div className='location__forecast'>
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-16'>Snow Forecast</h2>
        <div className='day__forecast__graph-container'>
          {state && (
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
        <h1 className='heading'>{location} </h1>
        <h2 className='subheading location__weather__subheading'>Weather </h2>
        <div className='day__weather__cards-container'>
          <div className='weather-card__container'>
            {state &&
              weatherObj.map((day, i) => {
                return (
                  <>
                    <a
                      className='link'
                      onClick={() =>
                        router.push(
                          `/weather/${location}/${formatDate(
                            weatherObj[i].date
                          ).toLowerCase()}?locationId=${locationId}&dayId=${i}`
                        )
                      }
                    >
                      <WeatherCard
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
                  </>
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
