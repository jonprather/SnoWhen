import React, { useState, useEffect, useContext } from "react";
import useSaveSearchHistory from "../hooks/useSaveSearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";
import useResorts from "../hooks/useResorts";

import Loading from "../atoms/Loading";
import Select from "react-select";
import { toast } from "react-toastify";

export default function Location() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resort, setResort] = useState(null);

  const addResort = useSaveSearchHistory();
  const { searchHistory } = useSearchHistory();
  const { resorts } = useResorts();

  //TODO put this feature flag in a better spot ; is it Used in multiple spots or jsut here
  // this allows for extra things to be searched for  that arent active; could also have this in useSearchHistory to only fetch live things
  //but if handle it correctly should search for things that arent there
  // but its possible if a person used demo data then i changed it then it will have a searchHisotry item thats not able to be fetched
  //like onlyGetSnowData where resort is active or can do that filter at some point
  // so restors -> sleet locationsearchHistory -> snowData
  // demo allows for fake resorts to be in db results so can play aorund with mroe than 1 active resorts bc of $ constraints I only have 1 active
  //TODO add a button for screen readers to click to details
  const demo = true;
  const filteredSearchHistory = resorts?.data?.filter(
    (ele) => demo || ele.attributes.active
  );

  const resortsList = filteredSearchHistory?.map((ele) => {
    return {
      value: ele.attributes.code,
      id: ele.id,
      label: ele.attributes.name,
    };
  });

  useEffect(() => {
    setIsLoading(false);
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
    const resortIsInHistory = (ele) =>
      +ele.attributes.resort.data.attributes.code === +resort.value;

    const resortCodeAlreadyAdded = searchHistory?.data?.some(resortIsInHistory);

    if (resortCodeAlreadyAdded) {
      setError(`${resort.label} is already in History!`);
      return;
    }
    if (resort.id) {
      addResort({ resort: resort.id });
    }
    setResort({});
  }
  // TODO maybe msg based toasts for adding removing are uneeded bc have animations...
  function customTheme(theme) {
    const colorDark = "#0f4c75";
    const colorPrimary = "#3282b8";
    const colorLight = "#bbe1fa";
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
      className='locations__search-box__inner-container__select-box__select'
      id='resort'
      isSearchable
      noOptionsMessage={() => "Resort Not Available"}
      onChange={handleChange}
      options={resortsList}
      placeholder='Search for Resorts'
      theme={customTheme}
      value={resort}
    />
  );

  return (
    <>
      <div className='locations__search-box'>
        {/* <Loading loading={isLoading} /> */}
        <div className='locations__search-box__inner-container'>
          <div className='locations__search-box__inner-container__select-box'>
            <label
              className='locations__search-box__inner-container__select-box__label'
              htmlFor='resort'
            >
              Select Resort
            </label>

            <SelectBox />
          </div>
          <div className='locations__search-box__inner-container__button-box'>
            <button
              onClick={handleSubmit}
              className='locations__search-box__inner-container__button-box__button'
            >
              <i className='fa fa-search' aria-hidden='true'></i>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
