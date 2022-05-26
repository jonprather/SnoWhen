import React, { useState } from "react";
import ClipLoader from "react-spinners/PuffLoader"; //ScaleLoader is p cool

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
// import Loading from "@/components/atoms/Loading";
// Is this really an atom or a molecule im not sure it depends if uses more stuff like spinner
// TODO make this a molecule made up of atoms which incude some spinner library

export default function account({
  handleEmit,
  error,
  resortsSearchHistory,
  results,
}) {
  const [showFavs, setShowFavs] = useState(false);
  function handleClick(bool) {
    setShowFavs(bool);
  }

  const filterFunc = function (ele) {
    console.log("ELELEL", ele);
    return showFavs ? ele.liked : true;
  };
  const filteredLength = results?.filter(filterFunc)?.length;
  const length = results.length;
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
        <div className='filter-favorite-menu'>
          {/* TODO write css for this */}
          <button
            className={`filter-favorite-menu__btn ${
              showFavs ? "filter-favorite-menu__btn--active" : ""
            }`}
            onClick={() => handleClick(true)}
          >
            Favorites
          </button>
          <button
            className={`filter-favorite-menu__btn ${
              !showFavs ? "filter-favorite-menu__btn--active" : ""
            }`}
            onClick={() => handleClick(false)}
          >
            History
          </button>
        </div>
        <ErrorText error={error} />
        {/* OK WAs trying to put home cad contianer in home heading container
        bc looks liek shit with stupid after things its jank be easier to have a normla stacit refular element bg rather then the psued
        so agin trying to make that happend by nesting the stuff properly in correct div maybe can instead make new dive to containe the thigns i want
        yeah make new div to make this work undo the children and nestin gthin if have to that might be bad form idk
        then also address classes left hanging
        in home container aray */}
        <SavedResortsBG
          resortsSearchHistory={resortsSearchHistory}
          showFavs={showFavs}
          resultsLengthsObj={{ length, filteredLength }}
        >
          <>
            <Loading loading={results[results.length - 1]?.isLoading} />

            <CardContainer
              results={results}
              showFavs={showFavs}
              filterFunc={filterFunc}
              resultsLengthsObj={{ length, filteredLength }}
            ></CardContainer>
          </>
        </SavedResortsBG>
        {/* TODO whats the diff between results and resortssearch History
        I think results is is the snowData and resortSearchHistory is fav data
        So im thinking the solution is to do filter op up here and pass down length to BG
        //that way it can know wheter to show BG Liked HIstory or NOting to show etc
        //So yeah thats next stop is to work on that compoennt comm and make it sdisplay what i want so first lay out sate and desiered aout put
        //then what must have in common then make it happen
         */}
        {/* THese props might have to change  dep on new api */}
      </main>
    </section>
  );
}
