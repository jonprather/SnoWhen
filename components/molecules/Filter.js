import React, { useState, useEffect } from "react";

export default function Filter({
  showFavs,
  setShowFavs,
  setFiltered,
  results,
}) {
  useEffect(() => {
    if (!showFavs) {
      setFiltered(results);
      return;
    }
    const isLiked = (ele) => ele.liked;

    setFiltered(results?.filter(isLiked));
    //   return () => {
    //     second
    //   }
  }, [showFavs]);
  function handleClick(bool) {
    setShowFavs(bool);
  }
  return (
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
  );
}
