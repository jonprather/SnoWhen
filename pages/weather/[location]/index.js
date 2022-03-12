import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useQueryClient } from "react-query";

import dynamic from "next/dynamic";
//components
const WeatherCard = dynamic(() => import("../../../components/weatherCard"));
import Graph from "../../../components/graph";
import BackButton from "../../../components/backButton";
import { weatherReducer } from "../../../lib/weatherReducer";

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
      return weatherReducer(queryClient?.queryCache?.queries[id]?.state)[
        "snowPerDay"
      ];
    });
  }, [router?.isReady]);

  return (
    <div className='location'>
      <div className='location__header'>
        <BackButton url={`/weather`} path={[location]} />
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
  );
}

class MinStack {
  constructor() {
  
  
  this.minStack = [];
  this.stack = [];
  this.countStack = 0;
  this.countMinStack = 0;
  
  
  }
  
  
  push(value) {
  
  
  if(this.countStack === this.stack.length)
  this.stack.push(value);
  else
  this.stack[this.countStack] = value;
  this.countStack++;
  const min = this.getMin();
  if(min === null || min >= value) {
  if(this.countMinStack === this.minStack.length)
  this.minStack.push(value);
  else
  this.minStack[this.countMinStack] = value;
  this.countMinStack++;
  }
  
  
  }
  
  
  pop() {
  
  
  if(this.countStack === 0)
  return null;
  var elem = this.stack[this.countStack - 1];
  this.countStack–;
  if(elem === this.minStack[this.countMinStack - 1])
  this.countMinStack–;
  return elem;
  
  
  }
  
  
  top() {
  
  
  if(this.countStack === 0)
  return null;
  return this.stack[this.countStack - 1];
  
  
  }
  
  
  getMin() {
  
  
  if(this.countMinStack === 0)
  return null;
  return this.minStack[this.countMinStack - 1]
  
  
  }
  }
  
  
  module.exports.MinStack = MinStack;
  