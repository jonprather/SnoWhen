import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function backButton({ url, path }) {
  const router = useRouter();
  return (
    <div className='back-button__wrapper'>
      <button className='back-button__button' onClick={() => router.push(url)}>
        <p className='back-button__button__lt'>{String.fromCharCode(60)}</p>
        <p className='back-button__button__text'>Back</p>
      </button>
      <div className='back-button__path'>
        {path?.map((ele, i) => {
          return <span key={ele}>/ {ele}</span>;
        })}
      </div>
    </div>
  );
}
