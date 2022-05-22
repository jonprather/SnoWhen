import React, { useContext, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import Image from "next/image";
import FavoritesContext from "@/context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/router";

export default function locationCard({
  weatherData,
  i,
  id,
  deleteFromLS,
  searchHistoryId,
  liked,
}) {
  const [toggleState, setToggleState] = useState(liked);
  console.log(weatherData);
  const router = useRouter();

  const { deleteSearchHistory, toggleLikeResort } =
    useContext(FavoritesContext);
  const refreshData = () => {
    // router.push("/account");
    // router.replace(router.asPath);
    // TODO anti pattern ( bc two sources of turth and init state with props)
    //but idk how else to keep the scroll to top from happeing when use the router methods on SSR page
    //this way might be in sync if can match it to response but then  makes this uneeded...
    setToggleState((prev) => !prev);
  };
  if (!weatherData?.name) return "";
  return (
    <>
      <Link
        href={`/weather/${weatherData?.name
          .toLowerCase()
          .trim()}?locationId=${i}
              `}
      >
        <div className='home__card'>
          <div className='home__card-heading__wrapper'>
            <h1 className='home__card-heading mb-12'>{weatherData?.name}</h1>
          </div>

          <p className='home__card-state'>Ca</p>

          <div className='home__card__mtn-bg mb-16'>
            <img src='/mtn-bg.png' className='' />
          </div>
          <div className='home__card__snowflake'>
            <img
              src='/snowflake-black.png'
              className='home__heading-container__mtn'
            />
          </div>
          <div className='home__card__snow-amount-box'>
            <div>
              <p className='home__card__snow-amount-box-heading'>Next Week</p>
              <p className='home__card__snow-amount-box-subheading'>
                Snow Total
              </p>
            </div>
            <p className='home__card__snow-amount-box-quantity'>
              {weatherData["total"]}"
            </p>
          </div>

          {/* <p className='home__card__forecast-heading'>Forecast</p> */}

          <div className='home__card__forecast-days-box'>
            {weatherData["snowPerDay"].map((day, i) => {
              if (i > 4) return "";
              return (
                <div key={i} className='home__card__forecast-days-box-cell'>
                  <p className='home__card__forecast-days-box-day'>
                    {formatDate(day.date)}
                  </p>
                  <p className='home__card__forecast-days-box-amount'>
                    {day.total}"
                  </p>
                </div>
              );
            })}
          </div>

          <div className='home__card__accent-box'>
            <div className='flex justify-c align-c'>
              <button
                className='home__card__delete'
                onClick={(e) => {
                  // deleteFromLS(id);
                  //TODO this works if can pass it correct favorite id
                  //which i think is related to the data passed in here
                  deleteSearchHistory({ id: searchHistoryId });
                  console.log("ID", id);
                  e.stopPropagation();
                }}
              >
                Remove
              </button>
            </div>
            <p className='home__card__accent-box__details'>
              {" "}
              <button
                className='home__card__delete'
                onClick={(e) => {
                  toggleLikeResort({
                    searchHistoryId: searchHistoryId,
                    liked: liked,
                  });
                  refreshData();
                  //TODO i dont like how it scrolls to top when use this fn (for when use liked not toggle)
                  console.log("liked in card area", liked);
                  e.stopPropagation();
                }}
              >
                {/* //this works but duplicated source of truth and init state with props anti patterns */}
                {/* //maybe could debounce this in someway handle locally and do req in bg?? */}
                {/* like could get out of sync if req fails ...  */}
                {liked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
