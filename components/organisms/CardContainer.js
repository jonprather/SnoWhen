import React, { useState } from "react";
import LocationCard from "@/components/molecules/locationCard";
import Loading from "../atoms/Loading";

import { motion, AnimatePresence } from "framer-motion";
//TODO Add Some text for null state like add some Resorts same thign liek add some favorites if fav is
export default function CardContainer({ filtered, isLoading, message }) {
  // filter off empty data to stop the undefined data from showing up
  filtered = filtered.filter((ele) => ele.data);
  console.log("FIKLT", filtered);

  return (
    <div className='home__card-container '>
      <Loading />
      <AnimatePresence>
        {!filtered.length ? (
          <LocationCard nullCaseMessage={message} />
        ) : (
          filtered?.map((ele, i) => {
            return (
              <LocationCard
                weatherData={ele?.data?.snowReport?.data[0]?.attributes?.blob}
                i={i}
                id={ele?.data?.snowReport?.data[0].id}
                searchHistoryId={ele?.data.snowReport.favoriteId}
                resortCode={
                  "" + ele?.data?.snowReport?.data[0].attributes.blob.id
                }
                liked={ele?.data.snowReport.liked}
                key={"" + ele?.data?.snowReport?.data[0]?.id}
                nullCaseMessage={message}
              />
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
