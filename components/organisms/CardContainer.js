import { weatherReducer } from "@/helpers/weatherReducer";
import React, { useState } from "react";
import LocationCard from "@/components/molecules/locationCard";
import Loading from "../atoms/Loading";

import { motion, AnimatePresence } from "framer-motion";
// {/* TODO move weather reducer to BE or FE fetch */}

export default function CardContainer({ filtered, isLoading }) {
  // filter off empty data to stop the undefined data from showing up
  filtered = filtered.filter((ele) => ele.data);

  return (
    <div className='home__card-container'>
      <Loading />
      <AnimatePresence>
        {!isLoading &&
          filtered &&
          filtered.map((ele, i) => {
            {
              /* TODO move weatherReducer to a better location like on BE or in Fetch */
            }

            return (
              <LocationCard
                weatherData={weatherReducer(
                  ele?.data?.snowReport?.data[0]?.attributes?.blob
                )}
                i={i}
                id={ele?.data?.snowReport?.data[0].id}
                searchHistoryId={ele?.data.snowReport.favoriteId}
                resortCode={
                  "" + ele?.data?.snowReport?.data[0].attributes.blob.id
                }
                liked={ele?.data.snowReport.liked}
                key={"" + ele?.data?.snowReport?.data[0]?.id}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}
