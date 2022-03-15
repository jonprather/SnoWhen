import React, { useState, useEffect } from "react";
import { setLocalAddress } from "../lib/LocalStorage";

export default function Location(props) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const resorts = [
    { name: "Mammoth", code: 619002 },
    { name: "Snow Summit", code: 420 },
    { name: "Big Bear", code: 4201 },
  ];

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setIsLoading(false);
    };
  }, []);
  const [resort, setResort] = useState("");

  function handleChange(resort) {
    setError("");
    setResort(resort);
  }
  function handleSubmit() {
    if (resort === "") {
      setError("Please select an option to search.");
      return;
    }
    setLocalAddress(resort);
    let { name } = resorts.find((ele) => ele.code == resort);
    props.emit(resort, name);
    setResort("");
    // router.push('/weather/') //push to item on search
    // setResort("");
  }

  return (
    <>
      <div className='locations__search-box'>
        {isLoading && <span>Loading...</span>}
        <div className='locations__search-box__inner-container'>
          <div className='locations__search-box__inner-container__select-box'>
            <label
              className='locations__search-box__inner-container__select-box__label'
              htmlFor='resort'
            >
              Select Resort
            </label>

            <select
              className='locations__search-box__inner-container__select-box__select'
              name='resort'
              id='resort'
              value={resort}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
            >
              <option defaultValue disabled value=''>
                Select One
              </option>
              {resorts.map((resort, i) => {
                return (
                  <option key={i} value={resort.code}>
                    {resort.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='locations__search-box__inner-container__button-box'>
            <button
              onClick={handleSubmit}
              className='locations__search-box__inner-container__button-box__button'
            >
              <i className='fa fa-search' aria-hidden='true'></i>{" "}
              <span>Search</span>
            </button>
          </div>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
    </>
  );
}
