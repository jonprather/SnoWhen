import React, { useState, useEffect, useContext } from "react";
// import { setLocalAddress } from "@/helpers/"
// import { SelectBox } from "@/components/selectBox";
import useSaveSearchHistory from "../hooks/useSaveSearchHistory";
import Loading from "../atoms/Loading";
import FavoritesContext from "@/context/FavoritesContext";
import Select from "react-select";
import { toast } from "react-toastify";
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
  const { saveSearchHistory, searchHistory } = useContext(FavoritesContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resort, setResort] = useState(null);
  const addResort = useSaveSearchHistory();
  useEffect(() => {
    setIsLoading(false);

    return () => {
      setIsLoading(false);
    };
  }, [resort]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  function handleChange(resort) {
    setError("");
    setResort(resort);
  }
  function handleSubmit() {
    if (resort === "" || !resort) {
      setError("Please select an option to search.");
      return;
    }
    const hasItem = searchHistory
      ? searchHistory.data.filter(
          (ele) => +ele.attributes.resort.data.attributes.code === resort.value
        ).length
      : false;

    if (hasItem) {
      setError(`${resort.label} is already in History!`);
      return;
    }
    if (resort.id) {
      addResort({ resort: resort.id });
    }

    //TODO bonus add resorts to slect box based on hitting API so its easy when add new ones
    setResort("");
    // router.push("/weather/"); //push to item on search
  }
  // TODO maybe msg based toasts for liek adding removing are uneeded bc have animations...
  //errros still clutch tho
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
        <Loading loading={isLoading} />
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
        {/* {error && <div className='error'>{error}</div>}
        
        using toast instead */}
      </div>
    </>
  );
}
