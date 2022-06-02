import { weatherReducer } from "@/helpers/weatherReducer";
import React, { useEffect, useState } from "react";
import LocationCard from "@/components/molecules/locationCard";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInBottom, stagger, containerScale } from "@/lib/animate";

export default function CardContainer({
  results,
  showFavs,
  filterFunc,
  resultsLengthsObj,
  filtered,
  isLoading,
}) {
  const { length, filteredLength } = resultsLengthsObj;

  //TODO after filter off the last remaining item it shows jank bg ie it thought the children woudl be there
  //instead now after filtering thesres nothing but its still shows as if there would be
  //that bg being dynamically created based on content is causing problems maybe a min height?
  // if (length && !filteredLength) {
  //   return (
  //     <div className='home__card-container home__card-container--empty'></div>
  //   );
  // }
  //this is jank i think i need to lay out expactly wha ti want in each state and then make
  //either a state machine or put in the logic to make it happen and also work between compoents
  // BG and this
  //problem is the other BG component doesnt knwo then have it show up as add some resorts and this...
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit={"exit"}
      variants={stagger}
      Layout
      className='home__card-container'
    >
      <AnimatePresence position='layout'>
        {!isLoading &&
          filtered.map((ele, i) => {
            return (
              <LocationCard
                weatherData={weatherReducer(
                  ele?.data?.snowReport?.data[0]?.attributes?.blob
                )}
                i={i}
                id={ele?.data?.id}
                searchHistoryId={ele?.searchHistoryId}
                liked={ele?.liked}
                // Liked is set here came from resutls og which gets updated when search Hisotry does
                //but this is a stale copy of results i think before update? but shouldnt it relaold when is Loading
                //maybe need to rerun when results changes
                key={ele?.data?.snowReport.data[0]?.id}
              />
            );
          })}
      </AnimatePresence>
    </motion.div>
  );
}

// WOW this is a mess
// 0:
// data:
// snowReport:
// data: Array(2)  //so nested in the ele.data is another array but relly just want one for now though might at another time want more than the latest
// TODO not in desc order wtf?
// 0:
// attributes: {createdAt: '2022-04-23T02:33:01.759Z', blob: {…}, updatedAt: '2022-04-30T02:20:06.925Z', publishedAt: null, resort: {…}}
// id: 15
// ele?.data?.snowReport.data[0].attributes.blob
