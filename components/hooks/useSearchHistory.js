import axios from "axios";
import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState } from "react";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";

const getSearchHistory = async () => {
  //let errors propagate to RQ to be handled there
  // TODO for demo mode this is fine but would need to filter off by active resorts to not
  //have stale data bc only active resorts will be updated ( ie paid resorts
  // also need to have selct location pull from here rather than hard coded)
  const res = await axios.get(`${NEXT_URL}/api/searchHistory`);
  return res.data;
};
export default function useSearchHistory() {
  const { user } = useContext(AuthContext);

  //dont need to pass anything bc it gets user info from cookie bc signed in
  const { data = [] } = useQuery([queryKeys.searchHistory], getSearchHistory, {
    staleTime: 1000,
    // enabled: !!user,
    // TODO could make this enabled based on having a logged in user
  });

  //taking off a needless wrapper object
  return {
    searchHistory: data.resortsSearchHistory,
  };
}
