import React, { useState, useEffect, useContext } from "react";
// import { setLocalAddress } from "@/helpers/"
// import { SelectBox } from "@/components/selectBox";
import FavoritesContext from "@/context/FavoritesContext";
import Select from "react-select";
// TODO get these resorts dynamically from api or pass them down from getServerSide props call which i do in account
//also pass in id value as that will help for delete by id
//also perhaps in create as well

const resorts = [
  { label: "Mammoth", value: 619002, id: 1 },
  { label: "Snow Summit", value: 420, id: 2 },
  { label: "Big Bear", value: 4201, id: 3 },
];

// const resorts = [
//   { name: "Mammoth", code: 619002 },
//   { name: "Snow Summit", code: 420 },
//   { name: "Big Bear", code: 4201 },
// ];

export default function Location(props) {
  const { saveSearchHistory } = useContext(FavoritesContext);
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
    saveSearchHistory({ resortID: resort.id });
    if (resort === "" || resort === undefined) {
      setError("Please select an option to search."); // TODO FIXME -takes two clicks instead of one
      return;
    }

    //so it wants resort id and name
    // setLocalAddress(resort.value);
    // let name  = resort.label;
    // so can be from setFavorite(resort)
    //can also have a setFavErrorMsg too so not to compete with this one
    // props.emit(resort);
    //so instead of props.emit all the way up can make this come from FavoritesContext.
    // its just for handling ui state can prob do that with context
    //TODO make this create a request to create an item
    //   so have to handl ereq to strapi
    // pushing any data to top level so that it is clean ui state ie to reset any state... idk if needed need to
    //rethink how this will work now that its in strapi not Local Storage

    //TODO also add rest of crud functionality to dashboard
    // eg like dette need to pass that function down for deltion also ones for creation a simple function
    // defined in a context file which hits api and or strapi to achieve functionality
    //maybe use context api to avoid prop drilling
    //TODO bonus add resorts to slect box based on hitting API so its easy when add new ones
    setResort("");
    // router.push("/weather/"); //push to item on search
  }

  function customTheme(theme) {
    let colorDark = "#0f4c75";
    let colorPrimary = "#3282b8";
    let colorLight = "#bbe1fa";
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: colorLight,
        primary: colorDark,
      },
    };
  }
  const SelectBox = () => (
    <Select
      // autoFocus
      className='locations__search-box__inner-container__select-box__select'
      id='resort'
      isSearchable
      noOptionsMessage={() => "Resort Not Available"}
      onChange={handleChange}
      options={resorts}
      placeholder='Search for Resorts'
      theme={customTheme}
      value={resort}
      // blurInputOnSelect
      // closeMenuOnSelect
      // controlShouldRenderValue
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
