import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState } from "react";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
const getResorts = async () => {
  //let errors propagate to RQ to be handled there
  //TODO either handle bad status or use axios
  const res = await axios.get(`${NEXT_URL}/api/resorts`);
  console.log("RES", res);
  return res.data;
  // var data = await res.json();
  // if (res.ok) {
  //   return data;
  // } else {
  // }
};
export default function useSearchHistory() {
  //dont need to pass anything bc it gets user info from cookie bc signed in
  // TODO
  // so this will be about the fetching of the history
  //can have other hooks for the mutations: ie delete update add new
  // useRemoveSearchHistory , useSaveSearchHistory, useLikeResort

  // So need to take the call  put it here use RQ instead and return the data
  //does it need anything like a user obj is it dependent on that?

  const { data = [] } = useQuery([queryKeys.resorts], getResorts, {
    // enabled: true,
  });
  // ok so i got confused its called data the feild i wanted to pull off
  //taking off a needless wrapper object
  return {
    searchHistory: data.resortsSearchHistory,
  };
}
