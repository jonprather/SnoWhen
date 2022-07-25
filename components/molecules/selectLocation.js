import React, { useState, useEffect, useContext } from "react";
import useSaveSearchHistory from "../hooks/useSaveSearchHistory";
import useSearchHistory from "../hooks/useSearchHistory";
import useResorts from "../hooks/useResorts";

import Loading from "../atoms/Loading";
import Select from "react-select";
import { toast } from "react-toastify";
// TODO get these resorts dynamically from api - cant yet due to api cost constraints ie only have mammoth active
//for now we will pull in all despite not being active then wehn active it will be auto filtered
// bc pull from hook
const resorts = [
  { label: "Mammoth", value: 619002, id: 1 },
  { label: "Snow Summit", value: 420, id: 2 },
  { label: "Big Bear", value: 4201, id: 3 },
];

export default function Location(props) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resort, setResort] = useState(null);
  const addResort = useSaveSearchHistory();
  const { resorts } = useResorts();
  const { searchHistory } = useSearchHistory();

  //TODO put this feature flag in a better spot
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

    setResort("");
  }
  // TODO maybe msg based toasts for liek adding removing are uneeded bc have animations...
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
        <Loading loading={isLoading} />
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
              <i className='fa fa-search' aria-hidden='true'></i>{" "}
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
