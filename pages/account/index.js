import Layout from "@/components/layout";

import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import AccountPage from "@/components/templates/Account";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import FavoritesContext from "@/context/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
//this is the strapi endpoint

export default function index() {
  const { user, checkUserLoggedIn, dispatchMsg, message } =
    React.useContext(AuthContext);
  const {
    searchHistory,
    getResorts,
    error: favError,
    msg,
    setMsg,
  } = React.useContext(FavoritesContext);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  // TODO This error isnt set up look to weather index to se tit right

  useEffect(() => {
    // setToken(token);  this will be broken need to pass token a diff way or
    //encapsults the delete and update calls in api calls
    getResorts();
    return () => {
      () => {};
    };
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
    return () => {
      () => {};
    };
  }, []);
  useEffect(() => {
    //TODO so two are logged or rather it keeps the one from first page and they are stacked its weird
    if (error) {
      toast.error(error);
      setError("");
    }
    if (favError) {
      toast.error(favError);
      setFavErrorMsg("");
    }
  }, [error, favError]);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
      setMsg(null);
    }
  }, [msg]);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatchMsg({});
    }
  }, [message]);

  const getWeather = async function (resortCode) {
    try {
      // TODO if this errors out sends no data still fills ui with stuff
      //bc has resorts this is then called but returns no data but still ui shows half baked stuff
      const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);
      setError("");
      return data;
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  function handleEmit({ label, value: resortID }) {
    if (label === undefined || resortID === undefined) return;
    setResort(resortID);
    router.push(`/weather/${label}/search?resortId=${resortID}`);
  }
  const results = useQueries(
    searchHistory?.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data?.attributes?.code;
      return {
        queryKey: [resortCode, resort],
        queryFn: (resort) => getWeather(resortCode),
        onSuccess: console.log(""),
      };
    }) ?? []
  );
  const isLoading = results.some((query) => query.isLoading);
  searchHistory?.data?.map((searchHistoryItem, i) => {
    results.forEach((ele, j) => {
      //yeah how do i map an id from history to be an id on the results obj(snow data)
      //can i trust it to be in same order and do it by id
      if (i === j) {
        ele.searchHistoryId = searchHistoryItem.id;
        ele.liked = searchHistoryItem.attributes.liked;
      }
    });
  });

  // maybe this can just call teh auth context methods that way i can toast.erro
  //i mean if can toast from context would be dope but idk how that works
  // can always just return delte error and if so then toast that
  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setError(error);
      } else {
        // router.reload();
        //TODO shouldnt i toast a succesufl crud op as well like for delete
      }
    }
  };
  // if (!searchHistory) return "";
  return (
    <Layout title='SnoWhen - Account' description='snoWhen Account page'>
      {/* Resorts is based off seach history historically maybe i can just resluts its just so 
      to show no results section
       */}

      <AccountPage
        handleEmit={handleEmit}
        error={error}
        resortsSearchHistory={searchHistory}
        results={results}
        isLoading={isLoading}
      >
        <h1> {user?.username}</h1>
      </AccountPage>
    </Layout>
  );
}

// export async function getServerSideProps({ req }) {
//   const { token } = parseCookies(req);

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/account/login",
//         permanent: false,
//       },
//     };
//   }

//   const res = await fetch(`${API_URL}/api/favorites`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const resortsSearchHistory = await res.json();

//   return {
//     props: {
//       resortsSearchHistory,
//       token,
//     },
//   };
// }
