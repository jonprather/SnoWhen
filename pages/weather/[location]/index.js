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
import { weatherReducer } from "../../../lib/weatherReducer";

export default function location() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [locationId, setLocationId] = useState("test");
  const [location, setLocation] = useState(null);
  const [weatherObj, setWeatherObj] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    var id = router.query.locationId;
    setLocationId(id);
    setLocation(router.query.location.toLowerCase());

    if (!queryClient) return;

    if (queryClient?.queryCache.queries.length === 0) {
      router.push(`/weather`);
    }

    setWeatherObj(() => {
      return weatherReducer(queryClient?.queryCache?.queries[id]?.state)[
        "snowPerDay"
      ];
    });
  }, [router.isReady]);

  return (
    <div className='location'>
      <Nav />
      <BackButton url={`/weather`} path={[location]} />
      <div className='location__forecast'>
        <h1 className='heading'>{location}</h1>
        <h2 className='subheading mb-16'>Snow Forecast</h2>
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
        <h1 className='heading'>{location} </h1>
        <h2 className='subheading location__weather__subheading'>Weather </h2>

        <div className='day__weather__cards-container'>
          <div className='weather-card__container'>
            {weatherObj &&
              weatherObj.map((day, i) => {
                return (
                  <React.Fragment key={day.date}>
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
//queryclient.queryCache.queries.queryKey[0]===mammoth //can filter by this
//queryclient?.queryCache.queries[0].state.data ///this is the obj i want which then can do .forecast etc
//but bc refresh breaks it i might just want to try tryFetch or whatever its called
