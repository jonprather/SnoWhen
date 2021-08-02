import React, { useEffect, useState } from "react";
import Location from "../../lib/location";
import DailyWeather from "../../components/dailyWeather";
import { getAllLocal } from "../../lib/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();

  var [coordinates, setCoordinates] = useState(null);
  var [sortDirection, setSortDirection] = useState("desc");
  var [searchHistory, setSearchHistory] = useState(); //by default can set this in useEffect to get from cookie local storage or have default
  var [sortFunction, setSortFunction] = useState({
    asc: (a, b) => a.createdAt - b.createdAt,
    desc: (a, b) => b.createdAt - a.createdAt,
  });

  useEffect(() => {
    setSearchHistory(getAllLocal());
  }, []);

  function handleEmit(coordinates) {
    setCoordinates(coordinates);
    router.push(
      `/weather/${coordinates.address}?lat=${coordinates.lat}&lng=${coordinates.lng}`
    );
  }

  return (
    <div>
      <Location emit={handleEmit} />

      <button onClick={() => setSortDirection("asc")}> Ascending</button>
      <button onClick={() => setSortDirection("desc")}> Descending</button>

      <button
        onClick={() => {
          localStorage.clear();
          setSearchHistory(null);
        }}
      >
        Clear Local Storage
      </button>

      {searchHistory &&
        searchHistory
          .sort(sortFunction[sortDirection])
          .filter((ele) => true) // cant filter by weather yet it is not prefecthed yet unless change how its done to fetch on this page too
          .map((address) => (
            <>
              <Link
                href={`/weather/${address.address}?lat=${address.lat}&lng=${address.lng}`}
              >
                {address.address}
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem(address.address.toLowerCase());
                  setSearchHistory(getAllLocal());
                }}
              >
                Delete
              </button>
            </>
          ))}
    </div>
  );
}
