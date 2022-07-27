import { useContext } from "react";
import Filter from "@/components/molecules/Filter";

import SavedResortsBG from "../molecules/SavedResortsBG";
import Header from "@/components/organisms/AccountHeader";
import FavoritesContext from "@/context/FavoritesContext";

export default function account() {
  const { setShowFavs } = useContext(FavoritesContext);

  return (
    <section className='home'>
      {/* These together could be an organism
     This organism can slot into here or be like a header prop in the page
     */}
      {/* Could add this to context or something if becomes an issue to prop drill it */}
      <Header />
      <main className='home__main'>
        {/* Maybe to stay a template this stuff is slots or passed in components */}
        {/* //HMm could refactor Filter to be more generic not be so coupled to specific implementation 
         also needs cruft cleaned out as well
        */}
        <Filter setShowFavs={setShowFavs} />
        <SavedResortsBG />
      </main>
    </section>
  );
}
