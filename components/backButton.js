import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function nav() {
  const router = useRouter();
  return (
    <button className='back-button' onClick={() => router.back()}>
      <p className='back-button__lt'>{String.fromCharCode(60)}</p>
      <p className='back-button__text'> Back</p>
    </button>
  );
}
