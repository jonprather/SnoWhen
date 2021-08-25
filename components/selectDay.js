import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate, addDay, subtractDay } from "../lib/helpers/formatDate";

export default function daySelector({
  locationId,
  locationName,
  day,
  emit,
  date,
}) {
  const router = useRouter();
  let dayId = router.query.dayId * 1;
  function handleClick(direction) {
    let newDay = direction === "up" ? addDay(date) : subtractDay(date);
    let pathName = `/weather/${locationName.toLowerCase()}/${newDay.toLowerCase()}`;
    if (direction == "up") {
      if (dayId == 6) {
        return "";
      }
      emit(dayId + 1);

      return router.push(
        {
          pathname: pathName,
          query: {
            locationId: locationId,
            dayId: dayId + 1,
          },
        },
        undefined,
        { scroll: false }
      );
    }
    if (dayId === 0) return "";
    emit(dayId - 1);
    return router.push(
      {
        pathname: pathName,
        query: {
          locationId: locationId,
          dayId: dayId - 1,
        },
      },
      undefined,
      { scroll: false }
    );
  }
  return (
    <div className='day-selector'>
      <button
        className='day-selector__back-button'
        onClick={() => handleClick("down")}
      >
        <p className='day-selector__back-button__lt'>
          {dayId === 0 ? String.fromCharCode(60) : String.fromCharCode(60)}
        </p>
      </button>
      <p className='day-selector__day-name'>{dayId === 0 ? "Today" : day}</p>
      <button
        className='day-selector__forward-button'
        onClick={() => handleClick("up")}
      >
        <p className='day-selector__forward-button__gt'>
          {dayId === 6 ? String.fromCharCode(62) : String.fromCharCode(62)}
        </p>
      </button>
    </div>
  );
}
