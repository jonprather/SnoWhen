import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const motionStyle = {
  position: "absolute",
  bottom: "-8px",
  left: "0px",
  right: 0,
  height: "4px",
  background: "#0f4c75",
  borderRadius: "8px",
  zIndex: 0,
};
//to generalize this
// so it would be better if could pass in the setState for which filter is on
//and also pass in the array of tabs
//prob with current mode is that tabs has local functions in it
//need to seperate data from those functions find another way of adding those features in
//hmm sound slike a prottype solution could work or factory fucntion or something
// the three non fn properties can be set up in a constructor funciton or base obj to which you add
// those prototypes form Object.create
// like tabs.map Object.create(tab[i])
//TODO finish this refacotring
//would be better if had tests first 
//but this can wait maybe focus on BE testing and getting ti produciton ready first
export default function Filter({ setShowFavs }) {
  const [selected, setSelected] = useState(1);
  const tabs = [
    {
      label: "History",
      showFavs: false,
      id: 1,
      clk: (id) => setSelected(id),
      extraFunction: (showFavs) => setShowFavs(showFavs),
    },
    {
      label: "Favorites",
      showFavs: true,
      id: 2,
      clk: (id) => setSelected(id),
      extraFunction: (showFavs) => setShowFavs(showFavs),
    },
  ];
  //TODO FEel like can abstract this now but still tied to state passed in...
  //propably better to handle this details as parents resonisbility make this mroe just about layout and selection
  //any extra functionality maybe can be done via children or function as children functionality
  // its basically liek a lib making it very versatile prob is i dont want it jus tfor selction it should also trigger
  // a state change higher up based on whats selected how do i couple that wihout coupling that?

  function handleClick({ id, showFavs, clk, extraFunction }) {
    if (typeof extraFunction === "function") extraFunction(showFavs);
    if (typeof clk === "function") clk(id);
  }
  return (
    <div className='filter-favorite-menu'>
      <div className='filter-favorite-menu__tab'>
        {tabs.map((ele) => {
          return (
            <button
              key={"" + ele.id}
              className={"filter-favorite-menu__btn"}
              onKeyDown={(event) =>
                event.key === "Enter" ? handleClick(ele) : null
              }
              onClick={() => handleClick(ele)}
            >
              {ele.label}
              {ele.id === selected ? (
                <motion.div style={motionStyle} layoutId='underline' />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// TODO continure refactor can it be claenr more resulsBL not call the setFavs or pass in extras seems not repeatable bc calls that stuff hwo to abstract to common set ??
//slao still refactor of keeping it useLayout group...
// might introduce complications elsewhere but its more future proo fits a trade off more work now
// but less later
