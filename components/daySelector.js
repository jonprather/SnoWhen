import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function daySelector({ locationId, locationName, day }) {
  const router = useRouter();
  let dayId = router.query.id * 1;
  function handleClick(direction) {
    if (direction == "up") {
      if (dayId == 6) {
        return "";
      }
      return router.push(
        `/weather/${locationName}/${locationId}?id=${dayId + 1}`
      );
    }
    if (dayId === 0) return "";
    return router.push(
      `/weather/${locationName}/${locationId}?id=${dayId - 1}`
    );
  }
  return (
    <div className='day-selector'>
      <button
        className='day-selector__back-button'
        onClick={() => handleClick("down")}
      >
        <p className='day-selector__back-button__lt'>
          {String.fromCharCode(60)}
        </p>
      </button>
      <p className='day-selector__day-name'>{day}</p>
      <button
        className='day-selector__forward-button'
        onClick={() => handleClick("up")}
      >
        <p className='day-selector__forward-button__gt'>
          {String.fromCharCode(62)}
        </p>
      </button>
    </div>
  );
}
