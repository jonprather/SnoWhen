import { weatherReducer } from "@/helpers/weatherReducer";
import React, { useEffect, useState } from "react";
import LocationCard from "@/components/molecules/locationCard";
export default function CardContainer({ results }) {
  return (
    <div className='home__card-container'>
      {/* TODO make the props pass in correct data might be different now
    //Yeah they are now in . data? then .attr  or atleast .blob so will be a bit diff
      Also now not using reducer on front end 
     */}
      {results.every((num) => num.isSuccess === true) &&
        results?.map((ele, i) => (
          <React.Fragment key={ele?.data?.snowReport.data[0].id}>
            <LocationCard
              weatherData={weatherReducer(
                ele?.data?.snowReport.data[0].attributes.blob
              )}
              i={i}
              id={ele?.data?.id}
              //   deleteFromLS={handleDeletion} deprecated replace with new strapi based api
            />
          </React.Fragment>
        ))}
    </div>
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
