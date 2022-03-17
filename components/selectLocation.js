import React, { useState, useEffect } from "react";
import { setLocalAddress } from "../lib/LocalStorage.ts";
// import { SelectBox } from "@/components/selectBox";

import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const resorts = [
  { label: "Mammoth", value: 619002 },
  { label: "Snow Summit", value: 420 },
  { label: "Big Bear", value: 4201 },
];
// const resorts = [
//   { name: "Mammoth", code: 619002 },
//   { name: "Snow Summit", code: 420 },
//   { name: "Big Bear", code: 4201 },
// ];

export default function Location(props) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resort, setResort] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    return () => {
      setIsLoading(false);
    };
  }, [resort]);

  function handleChange(resort) {
    console.log("CHange", resort);
    setError("");
    setResort(resort);
  }
  function handleSubmit() {
    console.log("HANDLE SUB=", resort);
    if (resort === "") {
      setError("Please select an option to search.");
      return;
    }
    //have
    //so it wants resort id and name
    setLocalAddress(resort.value);
    // let name  = resort.label;
    props.emit(resort);
    setResort("");
    // router.push("/weather/"); //push to item on search
  }
  const SelectBox = () => (
    <Select
      options={resorts}
      className='locations__search-box__inner-container__select-box__select'
      id='resort'
      isSearchable
      placeholder='Choose Resort'
      // value={resort.label}
      name='IDK'
      value={resort}
      autoFocus
      onChange={handleChange}
      blurInputOnSelect
      closeMenuOnSelect
      controlShouldRenderValue

      // value={resort}
      // onChange={(event) => {
      //   handleChange(event.target.value);
      // }}
    />
  );

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

            {/* <select
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
            </select> */}
            <SelectBox />
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
