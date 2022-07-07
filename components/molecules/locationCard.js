import React, { useContext, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import Image from "next/image";
import FavoritesContext from "@/context/FavoritesContext";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";

import { useRouter } from "next/router";
import { fadeInRight, hover, tap } from "@/lib/animate";
import { motion } from "framer-motion";

export default function locationCard({
  weatherData,
  i,
  searchHistoryId,
  liked,
}) {
  const router = useRouter();

  const { deleteSearchHistory, toggleLikeResort } =
    useContext(FavoritesContext);
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
                Snow Total {weatherData?.total}
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
                toggleLikeResort({
                  searchHistoryId: searchHistoryId,
                  liked: liked,
                });
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
