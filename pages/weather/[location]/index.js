import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import SnowTotalGraph from "@/components/snowTotalGraph";

import { useQueryClient } from "react-query";

import dynamic from "next/dynamic";
//components
const WeatherCard = dynamic(() => import("../../../components/weatherCard"));
import Graph from "@/components/graph";
import BackButton from "@/components/molecules/backButton";
import { weatherReducer } from "@/helpers/weatherReducer";

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
      console.log(
        "SNOW PER DAY",
        queryClient?.queryCache?.queries[id]?.state.data.snowReport.data[0]
          .attributes.blob
      );
      return weatherReducer(
        queryClient?.queryCache?.queries[id]?.state.data.snowReport.data[0]
          .attributes.blob
      )["snowPerDay"];
    });
  }, [router?.isReady]);

  return (
    <Layout>
      <div className='location'>
        <div className='location__header'>
          <BackButton url={`/account`} path={[location]} />
          <h1 className='heading'>{location}</h1>
          <h2 className='subheading mb-18'>Snow Forecast</h2>
        </div>
        <div className='location__forecast'>
          {!weatherObj && <p className='subheading'>..Loading</p>}
          <div className='location__forecast__graph-container'>
            {weatherObj && (
              <Graph
                location={location}
                isHourlyTitles={false}
                dayIndex={null}
                data={weatherObj}
              />
              /* <SnowTotalGraph data={weatherObj} /> THis is jank still */
            )}
          </div>
        </div>
        <div className='location__weather'>
          <div className=''>
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
    </Layout>
  );
}
