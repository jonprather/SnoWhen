import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/PuffLoader"; //ScaleLoader is p cool
import Filter from "@/components/molecules/Filter";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};
import SavedResortsBG from "../molecules/SavedResortsBG";
import CardContainer from "../organisms/CardContainer";
import Header from "@/components/organisms/AccountHeader";
import Loading from "@/components/atoms/Loading";
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
    setFiltered(results);
    //TODO this doesnt seem to have the new liked info which comes from the faovrites context toggle update
    // where they set search hisotry to be in lien with it so should this be in line with snowdata aka results
    //or the resorts stuff im confused
    //maybe im off base on this one maybe look at how like flows down it might not be realted to this
    //ok fixed it it needed to reset if results reset which makes sense but means im doing a fetch everytime a buttons clicked
    //then doing another fetch to get new results seems p wasteful...
    //could leave it as it was and only set after inital load then keep res tin memory as a copy
    //but then have to worry about changes what about setting cahce on react query to only update when
    //certain things i care about update...
    // or aybe hit the easy biutton and just finish this bs
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
        {/* Then in page can slo tthis stuff in as needed 
      For now this is fine but can make this a better template and resuable by using more slots for flexibilty
      {/* concepts- choose favs or search history all, its a nav element, a selection element
      part of ui just for user chocie, filters, 
       */}
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
          resultsLengthsObj={{ length, filteredLength }}
        >
          <>
            <Loading loading={isLoading} />

            <CardContainer
              filtered={filtered}
              results={results}
              showFavs={showFavs}
              filterFunc={filterFunc}
              resultsLengthsObj={{ length, filteredLength }}
              isLoading={isLoading}
            ></CardContainer>
          </>
        </SavedResortsBG>
      </main>
    </section>
  );
}
