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
} from "../../lib/helpers/filterStringFormatters";

export default function Address(props) {
  const router = useRouter();
  const [coordinates, setCoordinates] = useState({});
  const [address, setAddress] = useState("test");
  const [filterType, setFilterType] = useState("none");
  const [count, setCount] = useState("");
  const [templateStringObj, setTemplateStringObj] = useState({});

  const exclude = "hourly";
  const tempAPIKEY = process.env.NEXT_PUBLIC_WEATHER;
  const queryClient = useQueryClient();

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
    return () => {};
  }, [router.isReady]);

  const getWeather = async function (coordinates) {
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
      // The query will not execute until coordinates exists
      enabled: !!coordinates,
    }
  );

  function handleEmit(filterType) {
    setFilterType(filterType);
    // setTemplateStringObj(weatherStringFormatter({ filterType, data }));
  }

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
            {weatherStringFormatter({ filterType, data }).firstPart}
            <strong>
              {weatherStringFormatter({ filterType, data }).countDay}
            </strong>
            <i>{weatherStringFormatter({ filterType, data }).filterType}</i>
            {weatherStringFormatter({ filterType, data }).closing}
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
                count={countDays({ data, filterType })}
                filterType={filterType}
              />
            ))}
      </div>
    </>
  );
}
