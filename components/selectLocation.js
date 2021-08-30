import React, { useState, useEffect } from "react";
import { setLocalAddress, getLocalAddress } from "../lib/LocalStorage";
export default function Location(props) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const resorts = [
    { name: "Mammoth", code: 619002 },
    { name: "Everest", code: 420 },
    { name: "K2", code: 4201 },
  ];

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setIsLoading(false);
    };
  }, []);
  const [resort, setResort] = useState("");

  function handleChange(resort) {
    let msg = setLocalAddress(resort);

    props.emit(resort, msg);
  }

  return (
    <div className='locations__search-box'>
      <p className='locations__search-box__title'>Find a Resort</p>
      {/* <p className='locations__search-box__paragraph'>
        Search Our growing resort List for your favorites. Then Quickly get the
        data you want without distraction.
      </p> */}
      {isLoading && <span>Loading...</span>}

      {error && <span>Error {error.message}</span>}

      <label htmlFor='resort'> </label>
      <select
        name='resort'
        id='resort'
        value={resort}
        onChange={(event) => {
          handleChange(event.target.value);
          setResort("");
        }}
      >
        <option value=''></option>
        {resorts.map((resort, i) => {
          return (
            <option key={i} value={resort.code}>
              {resort.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
