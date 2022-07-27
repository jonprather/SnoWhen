import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";
import React from "react";
const FavoritesContext = createContext();
//feel like can clean this up have reducer for state updates (def) and msg?
//TODO make this use a reducer as well
// SET UP REDUCER, USEREducer call
const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};

const historyReducer = (state, action) => {
  console.log("IN REDUCER", state, action);
  switch (action.type) {
    case ACTIONS.ADD:
      return `${ACTIONS.REGISTER} ${string}`;
    case ACTIONS.TOGGLE:
      return `${ACTIONS.LOGIN} ${string}`;
    case ACTIONS.DELETE:
      return `${ACTIONS.LOGOUT} ${string}`;
    default:
      return "";
      break;
  }
};
// SET up Action objs , payload,
// replace  calls with the new dispatch
//should just be local to this file
//so is the ADD action the same for both the initail just adding the data to the state like init
// or should even that try to make a copy but wht if starts as null maybe dont start as null then
//but it not being null will change how it works well maybe do a null check in reducer then when adding
//if !state then just add it
// else spread in the copy and only update the properties in question

export const FavoritesProvider = ({ children }) => {
  const [showFavs, setShowFavs] = useState(false);

  const { user } = React.useContext(AuthContext);
  const [searchHistory, setSearchHistory] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const router = useRouter();

  const saveSearchHistory = async ({ resort }) => {
    const res = await fetch(`${NEXT_URL}/api/storeHistory`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${1}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { resort } }),
    });
    setMsg(null);

    const data = await res.json();
    if (res.ok) {
      setMsg("Resort Saved");

      const arrayCopy = searchHistory ? searchHistory.data.slice() : [];
      arrayCopy.push(data.data.data);
      setSearchHistory((favArrObjs) => {
        return { ...favArrObjs, data: arrayCopy };
      });

      // router.push("/account/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const getResorts = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/resorts`, {
        method: "GET",
      });

      const data = await res.json();

      if (res.ok) {
        setSearchHistory(data.resortsSearchHistory);
      } else {
        console.log("IN elese", data.message);

        setError(data.message);
        // setError(null);
      }
    } catch (error) {
      console.log("IN CATCH", error);
      setError(error);
      //
    }
  };

  const toggleLikeResort = async ({ searchHistoryId, liked }) => {
    const favoriteData = {
      user: user.id,
      createdBy: user.id,
      updatedBy: user.id,
      liked: !liked,
    };
    // TODO WHY ARE THEY ALL GETTING LIKED when click on one FIXME
    const res = await fetch(`${NEXT_URL}/api/toggleLike/${searchHistoryId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { ...favoriteData } }),
    });

    var strapiToggleData = await res.json();
    if (res.ok) {
      let idFromNew = strapiToggleData?.data.id;
      let newLikeValue = strapiToggleData?.data.attributes?.liked;
      //TODO changed to use filtered data in cards need to update this to be in sysnc
      //ie use and setFiltered rather than just searchHistory or init filtered with this data not
      //just results but results is of the snow data which should be downstream from this
      let mapData = searchHistory.data.map((ele) => {
        if (ele.id === idFromNew) {
          let newObj = {
            ...ele,
            attributes: { ...ele.attributes, liked: newLikeValue },
          }; //?
          return newObj; //?
        } else {
          return ele;
        }
      });
      //TODO so this sets the searchHistory which triggers the next snowData which is passed to Locc ard
      //and not filtered the second time...
      setSearchHistory((favArrObjs) => {
        return { ...favArrObjs, data: [...mapData] };
      });
    } else {
      setError(strapiToggleData.message);
    }
  };
  const deleteSearchHistory = async ({ id }) => {
    if (!confirm("Delete this item from seach history?")) {
      return;
    }
    const res = await fetch(`${NEXT_URL}/api/deleteHistory/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setMsg(null);

    if (res.ok) {
      setMsg("Succesfully Deleted Item");
      //TODO could get actually name here rather than 'item'
      setSearchHistory((prev) => {
        const arrayCopy = prev.data.slice();
        const filteredArr = arrayCopy.filter((e) => e.id !== id);
        return { ...prev, data: filteredArr };
      });
    } else {
      setMsg(null);
      setError(data.message);
      setError(null);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        searchHistory,
        getResorts,
        toggleLikeResort,
        deleteSearchHistory,
        saveSearchHistory,
        msg,
        setMsg,
        showFavs,
        setShowFavs,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

//so most of this needs to be removed but showFavs and setShowFavs is currently being used
//this also solves the prob of prop drilling so this way is much better and solves that duplicate useState issue

// could perhaps move tha tmsg logic here as well but idk if needs to be global
