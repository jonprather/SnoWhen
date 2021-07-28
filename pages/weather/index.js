import React, { useEffect, useState } from "react";
import Location from "../../lib/location";
import DailyWeather from "../../components/dailyWeather";
export default function index() {
  var lat = 33.44;
  var lon = -94.04;
  var exclude = "hourly";
  var tempAPIKEY = process.env.NEXT_PUBLIC_WEATHER;
  var [data, setData] = useState({});
  var [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 }); //by default can set this in useEffect to get from cookie local storage or have default

  function handleEmit(data) {
    setCoordinates(data);
  }
  useEffect(() => {
    let getData = async function () {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude=${exclude}&units=imperial&appid=${tempAPIKEY}`
      );
      let data = await res.json();
      console.log(data);
      setData(data);
      console.log(
        "data.daily[0].weather[0].main",
        data.daily[0].weather[0].main
      );
    };
    getData();
  }, [coordinates]);
  return (
    <div>
      <Location emit={handleEmit} />

      {data.daily && data.daily.map((data) => <DailyWeather day={data} />)}
    </div>
  );
}
