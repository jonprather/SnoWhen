import { weatherReducer } from "@/helpers/weatherReducer";
import React, { useEffect, useState } from "react";
import LocationCard from "@/components/molecules/locationCard";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInBottom, stagger, containerScale } from "@/lib/animate";

export default function CardContainer({
  resultsLengthsObj,
  filtered,
  isLoading,
}) {
  const { length, filteredLength } = resultsLengthsObj;

  console.log("FILTERED", filtered);
  return (
    <div className='home__card-container'>
      <AnimatePresence>
        {!isLoading &&
          filtered.map((ele, i) => {
            return (
              <LocationCard
                weatherData={weatherReducer(
                  ele?.data?.snowReport?.data[0]?.attributes?.blob
                )}
                i={i}
                id={ele?.data?.snowReport?.data[0].id}
                searchHistoryId={ele?.searchHistoryId}
                liked={ele?.liked}
                key={"" + ele?.data?.snowReport?.data[0]?.id}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}

// WOW this is a mess
// 0:
// data:
// snowReport:
// data: Array(2)  //so nested in the ele.data is another array but relly just want one for now though might at another time want more than the latest
// TODO not in desc order?
// 0:
// attributes: {createdAt: '2022-04-23T02:33:01.759Z', blob: {…}, updatedAt: '2022-04-30T02:20:06.925Z', publishedAt: null, resort: {…}}
// id: 15
// ele?.data?.snowReport.data[0].attributes.blob
