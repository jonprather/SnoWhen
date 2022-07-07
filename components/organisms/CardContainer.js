import { weatherReducer } from "@/helpers/weatherReducer";
import React from "react";
import LocationCard from "@/components/molecules/locationCard";
import { motion, AnimatePresence } from "framer-motion";
// {/* TODO move weather reducer to BE or FE fetch */}

export default function CardContainer({ filtered, isLoading }) {
  // filter off empty data to stop the undefined data from showing up
  filtered = filtered.filter((ele) => ele.data);
  return (
    <div className='home__card-container'>
      <AnimatePresence>
        {!isLoading &&
          filtered &&
          filtered.map((ele, i) => {
            return (
              <LocationCard
                weatherData={weatherReducer(
                  ele?.data?.snowReport?.data[0]?.attributes?.blob
                )}
                i={i}
                id={ele?.data?.snowReport?.data[0].id}
                searchHistoryId={ele?.data.snowReport.favoriteId}
                liked={ele?.data.snowReport.liked}
                key={"" + ele?.data?.snowReport?.data[0]?.id}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}
