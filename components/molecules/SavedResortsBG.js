import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/atoms/Loading";
import CardContainer from "../organisms/CardContainer";
import Filter from "./Filter";
import { container } from "@/lib/animate";
export default function SavedResortsBG({
  results,
  filtered,
  isLoading,
  showFavs,
}) {
  function getKey({ showFavs, results, filtered } = {}) {
    console.log("RESULTS", results);
    let key = "";
    key = showFavs ? "showFavs_" : "noShowFavs_";
    key += results.length > 0 ? "results_" : "noResults_";
    key += filtered.every((ele) => !ele.data) ? "noLikes" : "likes";
    return key;
  }
  function getMessage({ showFavs, results, filtered } = {}) {
    const key = getKey({ showFavs, results, filtered });
    const obj = {
      showFavs_noResults_noLikes: {
        heading: "No favorites",
        details: "add some resorts to like!",
      },
      showFavs_results_noLikes: {
        heading: "No favorites",
        details: "Like Some Resorts!",
      },
      noShowFavs_noResults_noLikes: {
        heading: "No Resorts",
        details: "add some resorts!",
      },
    };
    return obj[key];
  }
  // filtered[i].data its undefined when its filtered off
  //TODO Add Some text for null state like add some Resorts same thign liek add some favorites if fav is null

  return (
    <div className='home__heading-container'>
      <div className='home__heading-container__svg-wrapper'>
        <svg
          width='2126'
          height='985'
          viewBox='0 0 2126 985'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0 0C688.784 136.861 1454.23 51.1291 2100.41 0L2126 985C1705.43 919.41 921.173 863.633 0 901.291C133.279 584.565 229.401 343.513 0 0Z'
            fill='#BBE1FA'
          />
        </svg>
      </div>

      <CardContainer
        isLoading={isLoading}
        filtered={filtered}
        message={getMessage({ showFavs, results, filtered })}
      ></CardContainer>
    </div>
  );
}
