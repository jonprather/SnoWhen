import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate, addDay, subtractDay } from "../lib/helpers/formatDate";

export default function selectAltitude({ emitAltitude }) {
  const router = useRouter();
  let dayId = router.query.dayId * 1;
  const [activeElement, setActiveElement] = useState("base");

  function handleClick(alt) {
    emitAltitude(alt);
    //take the base mid upper and add some bottom border class to it

    setActiveElement(alt);
    //is this the best approach
  }

  return (
    <div className='select-altitude'>
      <p className='select-altitude__heading'>Select Altitude</p>
      <div className='select-altitude__container'>
        <button onClick={() => handleClick("base")}>
          <p
            className={
              activeElement === "base"
                ? "underline select-altitude__container__base"
                : "underline--null select-altitude__container__base"
            }
          >
            Base
          </p>
        </button>

        <button onClick={() => handleClick("mid")}>
          <p
            className={
              activeElement === "mid"
                ? "underline select-altitude__container__mid"
                : "underline--null select-altitude__container__mid"
            }
          >
            Mid
          </p>
        </button>
        <button onClick={() => handleClick("upper")}>
          <p
            className={
              activeElement === "upper"
                ? "underline select-altitude__container__upper"
                : "underline--null select-altitude__container__upper"
            }
          >
            {" "}
            Top
          </p>
        </button>
      </div>
    </div>
  );
}
