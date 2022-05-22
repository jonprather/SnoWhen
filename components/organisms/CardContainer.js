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
      {/* //NEED A WAY TO MAP THE  resort CODE from results to the favorite */}
      {/* //Like find id of result element where code from favs is code from results
     TODO so thats next find how to match these resorts or maybe thers is a ways to pass it down or attach it to obj
     of results earlier in the chain that would be easiet if CS i did that above
     has to be client side bc the snow data is nuetral for many peopl jus tbased on a resort
     but favorites are unique to people even though they share a resort code
     so worse case i can math them but i think the object method will be easier
      */}
      {results.every((num) => num.isSuccess === true) &&
        results?.map((ele, i) => {
          return (
            <React.Fragment key={ele?.data?.snowReport.data[0]?.id}>
              <LocationCard
                weatherData={weatherReducer(
                  ele?.data?.snowReport?.data[0]?.attributes?.blob
                )}
                i={i}
                id={ele?.data?.id}
                searchHistoryId={ele?.searchHistoryId}
                liked={ele?.liked}
                //instead of this need the favorites id
                //   deleteFromLS={handleDeletion} deprecated replace with new strapi based api
              />
            </React.Fragment>
          );
        })}
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
