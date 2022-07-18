import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import SnowTotalGraph from "@/components/snowTotalGraph";
import Loading from "@/components/atoms/Loading";
import { useQueryClient } from "react-query";
import useSnowData from "@/components/hooks/useSnowData";
import useSearchHistory from "@/components/hooks/useSearchHistory";

import dynamic from "next/dynamic";
//components
const WeatherCard = dynamic(() => import("../../../components/weatherCard"));
import Graph from "@/components/graph";
import BackButton from "@/components/molecules/backButton";
import { weatherReducer } from "@/helpers/weatherReducer";
//import hooks
// get data from hook
// get exact weatherReducer stuff which should now be on snowReport data area console log to find it
//then for weather obj that should be snowPerDay but thats derived state so i prob wont use state for that

// so need snowperday array
//also location var for tittles

export default function location() {
  const { searchHistory } = useSearchHistory();
  const { snowData } = useSnowData(searchHistory);
  const router = useRouter();
  const value = useRef(0);
  const id = router?.query?.locationId;
  const blob = snowData[id]?.data?.snowReport?.data[0]?.attributes.blob ?? {};
  const snowPerDay = blob?.snow_per_day ?? [];
  const queryClient = useQueryClient();

  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (!router?.isReady) return;

    //TODO i think i can remove this state TKDODO style as it is syncronous setting...
    setLocation(router.query.location);
  }, [router?.isReady]);
  if (!router?.isReady) return <Layout></Layout>;

  return (
    <Layout>
      <div className='location'>
        <div className='location__header'>
          <BackButton url={`/account`} path={[location]} />

          <h1 className='heading'>{location}</h1>
          <h2 className='subheading mb-18'>Snow Forecast</h2>
        </div>
        <div className='location__forecast'>
          <Loading loading={!snowPerDay} color={"black"} />
          <div className='location__forecast__graph-container'>
            {snowPerDay && (
              <Graph
                location={location}
                isHourlyTitles={false}
                dayIndex={null}
                data={snowPerDay}
              />
              /* <SnowTotalGraph data={weatherObj} /> THis is jank still */
            )}
          </div>
        </div>
        <div className='location__weather'>
          <div className=''>
            <div className='location__header--2'>
              {location ? (
                <h1 className='heading'>{location}</h1>
              ) : (
                <Loading isLoading={true} />
              )}
              <h2 className='subheading location__weather__subheading mb-18'>
                Weather
              </h2>
            </div>
            <div className='weather-card__container'>
              <Loading loading={!snowPerDay} color={"black"} />

              {snowPerDay &&
                snowPerDay.map((day, i) => {
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
