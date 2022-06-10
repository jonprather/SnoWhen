import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";
import React from "react";
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
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
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
