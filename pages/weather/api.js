import React, { useState, useEffect } from "react";

export default function api() {
  const [fakeWeatherData, setFakeWeatherData] = useState(null);
  useEffect(() => {
    const getWeatherStub = async function () {
      let res = await fetch("/api/fakeWeather");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await res.json();
      console.log("Fake Weather data", data);
      setFakeWeatherData(data);
      return data;
    };
    getWeatherStub();
    // setQueriesObj(obj);
  }, []);
  return <div></div>;
}
