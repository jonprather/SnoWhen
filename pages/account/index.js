import Layout from "@/components/layout";

import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import AccountPage from "@/components/templates/Account";
import { API_URL } from "@/config/index";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/AuthContext";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
//this is the strapi endpoint

export default function index({ resorts, token }) {
  const { user } = React.useContext(AuthContext);

  const router = useRouter();
  console.log(resorts);
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  // TODO This error isnt set up look to weather index to se tit right
  // TODO something jank on line 24 here hmm object isntead of jsx type
  //HIT API
  const getWeather = async function (resortCode) {
    try {
      const { data } = await axios.get(`/api/snowReport?ID=${resortCode}`);
      setError("");
      // console.log("GET WEATHER", data);
      return data;
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  function handleEmit({ label, value: resortID }) {
    if (label === undefined || resortID === undefined) return;
    // console.log(label, resortID);
    setResort(resortID);
    router.push(`/weather/${label}/search?resortId=${resortID}`);
  }
  const results = useQueries(
    resorts.data?.map((resort, i) => {
      const resortCode = resort.attributes.resort.data.attributes.code;
      return {
        queryKey: [resortCode, resort],
        queryFn: (resort) => getWeather(resortCode),
        onSuccess: console.log(""),
      };
    }) ?? []
  );

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
  console.log("RESULTS", results);
  return (
    <Layout title='SnoWhen - Account' description='snoWhen Account page'>
      {/* Resorts is based off seach history historically maybe i can just resluts its just so 
      to show no results section
       */}

      <AccountPage
        handleEmit={handleEmit}
        error={error}
        resorts={resorts}
        results={results}
      >
        <h1> {user?.username}</h1>
      </AccountPage>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  // TODO  just checkin gfor a token Doesnt prevent old or fake tokens i dont think
  // will resorts having a value be usable like
  //could check token against an auth route like make a req to strapi BE but will lag more
  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await fetch(`${API_URL}/api/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resorts = await res.json();
  console.log("IN SSR", resorts);
  return {
    props: {
      resorts,
      token,
    },
  };
}
