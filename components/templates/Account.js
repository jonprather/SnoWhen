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

import ErrorText from "@/components/molecules/Error";

export default function account({
  handleEmit,
  error,
  resortsSearchHistory,
  results,
  isLoading,
}) {
  const [showFavs, setShowFavs] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const filterFunc = function (ele) {
    return showFavs ? ele.liked : true;
  };
  const filteredLength = results?.filter(filterFunc)?.length;
  const length = results.length;
  useEffect(() => {
    let filtered = results.filter((ele) => (showFavs ? ele.liked : ele));
    setFiltered(filtered);
    //ok fixed it it needed to reset if results reset which makes sense but means im doing a fetch everytime a buttons clicked
    //TODO then doing another fetch to get new results seems p wasteful...
  }, [isLoading, results]);

  return (
    <section className='home'>
      {/* These together could be an organism
     This organism can slot into here or be like a header prop in the page
     */}
      {/* Could add this to context or something if becomes an issue to prop drill it */}
      <Header emit={handleEmit}></Header>
      <main className='home__main'>
        {/* Maybe to stay a template this stuff is slots or passed in components */}
        <Filter
          showFavs={showFavs}
          setShowFavs={setShowFavs}
          setFiltered={setFiltered}
          results={results}
          isLoading={isLoading}
        />

        <ErrorText error={error} />

        <SavedResortsBG
          resortsSearchHistory={resortsSearchHistory}
          showFavs={showFavs}
          filtered={filtered}
          results={results}
          resultsLengthsObj={{ length, filteredLength }}
          isLoading={isLoading}
        ></SavedResortsBG>
      </main>
    </section>
  );
}
