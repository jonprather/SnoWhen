import Layout from "@/components/layout";

import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";

import { API_URL } from "@/config/index";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useQueries } from "react-query";
import { useQueryClient } from "react-query";
//this is the strapi endpoint

export default function index({ resorts, token }) {
  console.log(resorts.data[1].attributes.resort.data.attributes.code);
  const router = useRouter();
  console.log(resorts);
  const queryClient = useQueryClient();

  //HIT API
  const getWeather = async function (resort) {
    try {
      const { data } = await axios.get(
        `/api/snowReport?ID=${resort?.queryKey[1]?.resortCode}`
      );
      setError("");

      return data;
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

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

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title='SnoWhen - Account' description='snoWhen Account page'>
      <div className='account'> WIP- Nothing Here Yet</div>;
      {/* <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div> */}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  // TODO havent done this method yet can prob just use auth/local routes instead
  // this will call the finall method and auto get all favs from this user
  // for delte jsut need ot make sure pass it the id then we good.../
  //so this works to get the favs for this user
  //but what about snow report
  //i could still have local storage??
  //
  // hmm so i suppose my question is to chain calls ie serially or on same request get all the data
  //so it swould look like
  //go to account
  //hits BE for Fav Resorts
  //do i A- on Backend get relevant data from another table and send it with it
  //     Would be like service for snowReports and filter by either date or sort by asc (or is it desc) then fetch that
  //   repeat for each resort so it would  several proises i guess the react query calls like i already have been doin
  // So prospective think about best way maybe google around for advice then try one
  //yeah i think it would work any big probs? makes that call dep on another but nobody would use that fav info without the data
  //but could use it just for crud data of that fav
  //another option could have a query param flag to also send that data
  // ?getForecast=true
  //if thats true then also fetch that shit in the controller //or vice versa
  //that way if jsut want it without it dont have to worry about it

  //also can maybe prefer to keep seperate bc want to only do more req to the snowData api with react query
  //this is all technical ill probably not have time to pick perfect approach here so probably aim for flexibity first can go for speed later

  //or B- do another call
  const res = await fetch(`${API_URL}/api/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resorts = await res.json();

  return {
    props: {
      resorts,
      token,
    },
  };
}
