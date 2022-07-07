import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/PuffLoader"; //ScaleLoader is p cool
import Filter from "@/components/molecules/Filter";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
import SavedResortsBG from "../molecules/SavedResortsBG";
import Header from "@/components/organisms/AccountHeader";
import useSnowData from "../hooks/useSnowData";

export default function account({
  handleEmit,
  error,
  results,
  resortsSearchHistory,
}) {
  const { showFavs, setShowFavs, snowData, isLoading } =
    useSnowData(resortsSearchHistory);
  console.log("LOADING", isLoading);
  //ok ERROS working when hit strapi here for snow data but also need to do it in fav ctx and
  // then watch for it in places where thats called set it in ctx wtach in ui then call taostify in useEffect
  return (
    <section className='home'>
      {/* These together could be an organism
     This organism can slot into here or be like a header prop in the page
     */}
      {/* Could add this to context or something if becomes an issue to prop drill it */}
      <Header emit={handleEmit}></Header>
      <main className='home__main'>
        {/* Maybe to stay a template this stuff is slots or passed in components */}
        <Filter setShowFavs={setShowFavs} />
        {/* //TODO  replace error here with gloabl error hadnler in RQ */}

        <SavedResortsBG
          filtered={snowData}
          isLoading={isLoading}
          results={results}
        ></SavedResortsBG>
      </main>
    </section>
  );
}
