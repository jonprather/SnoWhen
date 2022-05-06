import React, { useEffect, useState } from "react";

export default function Error({ error = null }) {
  useEffect(() => {
    return () => {};
  }, [error]);
  return (
    <>
      {error && (
        <>
          <p className='heading error'>Error </p>
          <p className='subheading error'>{error}</p>{" "}
        </>
      )}
    </>
  );
}
