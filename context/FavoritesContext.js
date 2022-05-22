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

    const data = await res.json();
    if (res.ok) {
      const arrayCopy = searchHistory.data.slice();
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
    const res = await fetch(`${NEXT_URL}/api/resorts`, {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok) {
      setSearchHistory(data.resortsSearchHistory);
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const toggleLikeResort = async ({ searchHistoryId, liked }) => {
    const favoriteData = {
      user: user.id,
      createdBy: user.id,
      updatedBy: user.id,
      liked: !liked,
    };

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
    if (res.ok) {
      setSearchHistory((prev) => {
        const arrayCopy = prev.data.slice();
        const filteredArr = arrayCopy.filter((e) => e.id !== id);
        return { ...prev, data: filteredArr };
      });
    } else {
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
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
