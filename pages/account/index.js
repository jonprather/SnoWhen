import Layout from "@/components/layout";

import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import AccountPage from "@/components/templates/Account";
import { API_URL } from "@/config/index";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";
import FavoritesContext from "@/context/FavoritesContext";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
//this is the strapi endpoint

export default function index() {
  const { user, checkUserLoggedIn } = React.useContext(AuthContext);
  const { searchHistory, likeResort, setToken, getResorts } =
    React.useContext(FavoritesContext);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  // TODO This error isnt set up look to weather index to se tit right
  // TODO something jank on line 24 here hmm object isntead of jsx type
  //HIT API
  // const handleScroll = () => {
  //   var scrollpos = sessionStorage.getItem("scrollpos");
  //   if (scrollpos) {
  //     window.scrollTo(0, scrollpos);
  //     sessionStorage.removeItem("scrollpos");
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);

  //     sessionStorage.setItem("scrollpos", window.scrollY);
  //   };
  // });
  // TODO wtf after all that work shit still scrolls to the top when i fetch new data wtf now it stutters wtf man
  //shits wack
  useEffect(() => {
    // setToken(token);  this will be broken need to pass token a diff way or
    //encapsults the delete and update calls in api calls
    getResorts();
    return () => {
      () => {};
    };
  }, []);
  console.log("Search HISTORY in account page", searchHistory);

  useEffect(() => {
    checkUserLoggedIn();
    return () => {
      () => {};
    };
  }, []);

  const getWeather = async function (resortCode) {
    try {
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
  searchHistory?.data?.map((searchHistoryItem, i) => {
    results.forEach((ele) => {
      ele.searchHistoryId = searchHistoryItem.id;
      ele.liked = searchHistoryItem.attributes.liked;
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
      //TODO look up more about sending tokens this way is it safe?
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  if (!searchHistory) return "";
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
