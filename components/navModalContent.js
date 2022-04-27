import React, { useCallback, useEffect, useRef } from "react";
import Link from "next/link";

export const Content = ({ onClose, children }) => {
  const ref = useRef(null);
  const escapeListener = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, []);
  const clickListener = useCallback(
    (e) => {
      if (!ref?.current?.contains(e.target)) {
        //if the click is not inside the ref close the modal via state change
        onClose?.(); // using optional chaining here, change to onClose && onClose(), if required
        //   if (!(ref.current!).contains(e.target)) {
        //
      }
    },
    [ref.current]
  );
  // Below is the 10 lines of code you need.
  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener("click", clickListener);
    document.addEventListener("keyup", escapeListener);
    // Detach the listeners on component unmount.
    return () => {
      document.removeEventListener("click", clickListener);
      document.removeEventListener("keyup", escapeListener);
    };
  }, []);
  return (
    <div className='nav__dropdown__wrapper' ref={ref}>
      {/* TODO add is oepn contigent on whteter state is set to open or note should then trigger combo class */}
      {children}
    </div>
  );
};
