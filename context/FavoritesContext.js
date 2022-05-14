import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL, API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";
import React from "react";
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  //ok so the id will be easy to get off user
  //the token is not on the user though
  //so will need to get it from headers which is a API level thing
  //or in getServerSide props
  // so in account area i will hav etoken so can pass that at function time
  //as for id can also pass that at call time or get it here
  const { user } = React.useContext(AuthContext);
  //would be nice to get favs off user
  const [favorites, setFavorites] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {}, [token]);

  const saveSearchHistory = async ({ resortID }) => {
    console.log("USER IN LIKE RESORT", user.id);

    //   bBY default it only gives back "data": {
    //     "id": 75,
    //     "attributes": {
    //         "createdAt": "2022-05-07T19:53:35.011Z",
    //         "updatedAt": "2022-05-07T19:53:35.011Z",
    //         "publishedAt": "2022-05-07T19:53:35.006Z"
    //     }
    // },

    const favoriteData = {
      user: user.id,
      resort: resortID,
      createdBy: user.id,
    };

    const res = await fetch(`${API_URL}/api/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { ...favoriteData } }),
    });

    const data = await res.json();
    console.log("RES!!!,", res);
    if (res.ok) {
      setFavorites(data.user);
      console.log("RES.OK....", data);

      router.push("/account/");
    } else {
      console.log(data.message);
      setError(data.message);
      setError(null);
    }
  };

  const toggleLikeResort = async ({ searchHistoryId, liked }) => {
    console.log("USER IN LIKE RESORT", user.id);
    console.log("Liked in context area", liked);
    const favoriteData = {
      user: user.id,
      createdBy: user.id,
      updatedBy: user.id,
      liked: !liked,
    };

    const res = await fetch(`${API_URL}/api/favorites/${searchHistoryId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { ...favoriteData } }),
    });

    const data = await res.json();
    console.log("RES!!!,", res);
    if (res.ok) {
      setFavorites(data.user);
      console.log("RES.OK....", data);

      // router.push("/account/");  do i want this??? or not
      //well doesnt update ui wihout it currently but maybe if i
      // had local state for it that was inited by the data then can change it... hmm is that jank
      //or do i use that articles way https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
    } else {
      console.log(data.message);
      setError(data.message);
      setError(null);
    }
  };
  // TODO make undoLike will be much like
  //last in fact is there some way to toggle it?
  //i mean i could pass down the value i get from favorites as a prop
  //yeah same way i did id
  const deleteSearchHistory = async ({ id }) => {
    const res = await fetch(`${API_URL}/api/favorites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!confirm("Are you sure?")) {
      return;
    }

    if (res.ok) {
      setFavorites((prev) => {});
      router.push("/account/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        toggleLikeResort,
        deleteSearchHistory,
        setToken,
        saveSearchHistory,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
