import { useContext } from "react";
import LocationCard from "@/components/molecules/locationCard";
import Loading from "../atoms/Loading";

import useSnowData from "@/components/hooks/useSnowData";
import useSearchHistory from "@/components/hooks/useSearchHistory";
import getNullElementMessage from "@/helpers/getNullElementMessage";
import { motion, AnimatePresence } from "framer-motion";
import FavoritesContext from "@/context/FavoritesContext";
//TODO Add Some text for null state like add some Resorts same thign liek add some favorites if fav is
export default function CardContainer() {
  const { searchHistory } = useSearchHistory();

  const { snowData } = useSnowData(searchHistory);
  const { showFavs } = useContext(FavoritesContext);
  const message = getNullElementMessage({ showFavs, results: snowData });

  // filter off empty data to stop the undefined data(after the filter is changed to showFavs) from showing up
  const filtered = snowData.filter((ele) => ele.data);

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
