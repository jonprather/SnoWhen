import React, { useEffect, useState } from "react";
import { selectFilterFn } from "./selectFilterFn";

export default function filterByWeather(props) {
  var [filterType, setFilterType] = useState("none");

  function handleSubmit(data) {
    console.log("SELCT", data);
    props.handleSubmit(data);
    //I just want to pass a function up to the damn filtertype but its a bitch...
    // I could just have the objFilter type up the level but then the lower level and it are more coupled but would be easier
    //i wanted to have the lower level pass all you need so handle all that just give me the function to use for the top level filter but instead im getting errors up the wazoo
    // return props.handleSubmit was trying to pass the whole function up but not sure how to init a f
  }
  return (
    <div>
      <label htmlFor='filter'>Filter By </label>
      <select
        name='filter'
        id='filter'
        value={filterType}
        onChange={(event) => {
          setFilterType();
          handleSubmit(event.target.value);
        }}
      >
        <option value='none'>No filter</option>

        <option value='snowy'>Snow</option>
        <option value='rainy'>Rain or Drizzle</option>
        <option value='cloudy'>Clouds</option>
        <option value='thunderstorm'>Thunderstorm</option>

        <option value='clear'>Clear</option>
        <option value='inclement'>Any Non-Clear</option>
      </select>
    </div>
  );
}
