import React, { useContext } from "react";
import Link from "next/link";

import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

import { fadeInRight, hover, tap } from "@/lib/animate";
import { motion } from "framer-motion";
import useRemoveSearchHistory from "../hooks/useRemoveSearchHistory";
import useLikeResort from "../hooks/useLikeResort";

import AuthContext from "@/context/AuthContext";
export default function locationCard({
  weatherData,
  i,
  searchHistoryId,
  liked,
  resortCode,
}) {
  const { user } = useContext(AuthContext);

  const deleteSearchHistory = useRemoveSearchHistory(resortCode);
  const likeSearchHistory = useLikeResort(resortCode);

  //TODO find out why optimistic update seems to change the cahce but not really
  //ok forgot to call it so im exzporting the hook which returns the mutate function so need to call it
  //thats why i got the improper hook use
  if (!weatherData) return null;
  return (
    <Link
      href={`/weather/${weatherData?.name.toLowerCase().trim()}?locationId=${i}
          `}
    >
      <motion.div
        initial='initial'
        animate='animate'
        exit='exit'
        variants={fadeInRight}
        whileHover={hover}
        whileTap={tap}
        layout={"position"}
      >
        <div className='home__card'>
          <div className='home__card-heading__wrapper'>
            <button
              className='home__card__delete'
              onClick={(e) => {
                deleteSearchHistory({ id: searchHistoryId });
                e.stopPropagation();
              }}
            >
              <FaTrash />
            </button>
            <h1 className='home__card-heading'>{weatherData?.name}</h1>
          </div>

          <p className='home__card-state'>Ca</p>

          <div className='home__card__mtn-bg'>
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
              {/* <p className='home__card__snow-amount-box-heading'>Next Week</p> */}
              <p className='home__card__snow-amount-box-subheading'>
                Snow Total {weatherData?.snow_six_day_total}
              </p>
            </div>
            {/* <p className='home__card__snow-amount-box-quantity'>
              {weatherData?.total}
            </p> */}
          </div>

          <p className='home__card__accent-box__details'>
            {" "}
            <button
              className='home__card__like'
              onClick={(e) => {
                e.stopPropagation();
                likeSearchHistory({
                  searchHistoryId: searchHistoryId,
                  liked: liked,
                  user,
                }); // log this check if this works whats passed etc...
                // toggleLikeResort({
                //   searchHistoryId: searchHistoryId,
                //   liked: liked,
                // });
              }}
            >
              {/* TODO //maybe could debounce this in someway handle locally and do req in bg?? */}
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
          </p>

          {/* <p className='home__card__forecast-heading'>Forecast</p> */}

          <div className='home__card__accent-box'></div>
        </div>
      </motion.div>
    </Link>
  );
}

//TODO could refactor this to be clearner use smaller peices atomic design style
