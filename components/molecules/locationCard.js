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
  nullCaseMessage,
}) {
  const { user } = useContext(AuthContext);

  const deleteSearchHistory = useRemoveSearchHistory(resortCode);
  const likeSearchHistory = useLikeResort(resortCode);

  const HomeCard = ({
    heading = "heading",
    subHeading = "subheading",
    isNullState = true,
  }) => {
    return (
      <div className={`home__card ${isNullState && "home__card--null"}`}>
        <div className='home__card-heading__wrapper'>
          {!isNullState && (
            <button
              className='home__card__delete'
              onClick={(e) => {
                deleteSearchHistory({ id: searchHistoryId });
                e.stopPropagation();
              }}
              disabled={isNullState}
            >
              {!isNullState && <FaTrash />}
            </button>
          )}
          <h1 className='home__card-heading'>{heading}</h1>
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
            <p className='home__card__snow-amount-box-subheading'>
              {subHeading}
            </p>
          </div>
        </div>

        <div className='home__card__accent-box__details'>
          {!isNullState && (
            <button
              className='home__card__like'
              onClick={(e) => {
                e.stopPropagation();
                likeSearchHistory({
                  searchHistoryId: searchHistoryId,
                  liked: liked,
                  user,
                });
              }}
              disabled={isNullState}
            >
              {/* TODO //maybe could debounce this in someway handle locally and do req in bg?? */}
              {!isNullState ? liked ? <FaHeart /> : <FaRegHeart /> : ""}
            </button>
          )}

          {/* // can make these overwritable make them into footers and be overwritable
          via method or passing null means you dont apply it like in article */}
        </div>

        <div className='home__card__accent-box'></div>
      </div>
    );
  };

  //TODO has to be a cleaner way than this implementation i mean so much DRY issues
  //well can make children components and pass in a message prop and let that control it
  // so loc cardMsg vs Loc card normal
  if (nullCaseMessage)
    return (
      <motion.div
        initial='initial'
        animate='animate'
        exit='exit'
        variants={fadeInRight}
        layout={"position"}
      >
        <HomeCard
          heading={nullCaseMessage.heading}
          subHeading={nullCaseMessage.details}
          isNullState={true}
        />
      </motion.div>
    );
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
        <HomeCard
          heading={weatherData?.name}
          subHeading={`Snow Total ${weatherData?.snow_six_day_total}`}
          isNullState={false}
        />
      </motion.div>
    </Link>
  );
}

//TODO could refactor this to be clearner use smaller peices atomic design style
//TODO consider addign the general compoent and Detailed component pattern here for cards
