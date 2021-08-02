import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, useQueryClient } from "react-query";

import FilterByWeather from "../../components/filterByWeather";
import DailyWeather from "../../components/dailyWeather";
import { selectFilterFn } from "../../components/selectFilterFn";
import {
  weatherStringFormatter,
  countDays,
} from "../../lib/filterStringFormatters";

export default function Address(props) {
  const router = useRouter();
  var [coordinates, setCoordinates] = useState({});
  var [address, setAddress] = useState("test");
  var [filterType, setFilterType] = useState("none");
  var [count, setCount] = useState("");
  var [templateStringObj, setTemplateStringObj] = useState({});

  const date = new Date();
  const [month, dayOfWeekNumber, dayOfMonth, year, unixTime] = [
    date.getMonth(),
    date.getDay(),
    date.getDate(),
    date.getFullYear(),
    date.getTime(),
  ];

  useEffect(() => {
    console.log("QUERY", router.query.address);
    if (router.isReady) {
      var add = router.query.address;
      setAddress(add);
      var lat = router.query.lat;
      var lng = router.query.lng;
      setCoordinates({ add, lat, lng });
    }

    //made error where i spread them in instead of passed them in
    return () => {};
  }, [router.isReady]);

  function handleEmit(filterType) {
    setFilterType(filterType);
    setTemplateStringObj(weatherStringFormatter(filterType));
  }
  var exclude = "hourly";
  console.log("COORDS", coordinates);
  var tempAPIKEY = process.env.NEXT_PUBLIC_WEATHER;
  const queryClient = useQueryClient();

  let getWeather = async function (coordinates) {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=${exclude}&units=imperial&appid=${tempAPIKEY}`
    );
    let data = await res.json();
    console.log("DATA FROM GET API:", data);
    return data;
  };

  // Queries
  const { status, isFetching, isLoading, isError, data, error } = useQuery(
    [address.toLowerCase().trim(), coordinates],
    () => getWeather(coordinates),
    {
      // The query will not execute until the userId exists
      enabled: !!coordinates,
    }
  );

  return status === "loading" ? (
    <span>Loading...</span>
  ) : isError ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      <FilterByWeather handleSubmit={handleEmit} />
      {isFetching ? <div>Refreshing...</div> : null}
      <Link href='/weather'>Go Home</Link>
      <div>
        {data && filterType && (
          <p>
            {weatherStringFormatter(filterType).firstPart}
            <strong>{weatherStringFormatter(filterType).countDay}</strong>
            <i>{weatherStringFormatter(filterType).filterType}</i>
            {weatherStringFormatter(filterType).closing}
          </p>
        )}
        {data &&
          data.daily &&
          data.daily
            .filter(() => true)
            .map((data, i) => (
              <DailyWeather
                i={i}
                dayOfWeekNumber={dayOfWeekNumber}
                key={i}
                day={data}
                month={month}
                dayOfMonth={dayOfMonth}
                unixTime={unixTime}
                filterCondition={selectFilterFn(filterType)}
                count={countDays()}
                filterType={filterType}
              />
            ))}
      </div>
    </>
  );
}
