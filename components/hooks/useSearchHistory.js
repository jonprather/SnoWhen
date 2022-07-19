import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState } from "react";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
const getResorts = async () => {
  //let errors propagate to RQ to be handled there

  const res = await axios.get(`${NEXT_URL}/api/resorts`);
  console.log("RES", res);
  return res.data;
};
export default function useSearchHistory() {
  //dont need to pass anything bc it gets user info from cookie bc signed in

  const { data = [] } = useQuery([queryKeys.resorts], getResorts, {
    // enabled: true,
    // TODO could make this enabled based on having a logged in user
  });

  //taking off a needless wrapper object
  return {
    searchHistory: data.resortsSearchHistory,
  };
}
