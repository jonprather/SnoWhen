import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState } from "react";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";

const saveSearchHistory = async ({ resort }) => {
  const res = await fetch(`${NEXT_URL}/api/storeHistory`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${1}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { resort } }),
  });
  //can just toast in the onSuccess handler of useMutation

  const data = await res.json();
  if (res.ok) {
    console.log("add res resp", data);

    return data;
  } else {
    // setError(data.message);
    // setError(null);
  }
};

export default function useSaveSearchHistory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(saveSearchHistory, {
    onSuccess: async (newResort) => {
      queryClient.setQueryData(queryKeys.resorts, (old = []) => {
        const oldArray = old.resortsSearchHistory.data;
        const newArray = newResort.data.data;
        const combindedArray = [...oldArray, newArray];
        let tempObj = Object.assign({}, old);
        tempObj.resortsSearchHistory.data = combindedArray;
        return tempObj;
      });
    },

    //() => queryClient.invalidateQueries([queryKeys.resorts]),
  });

  return mutate;
}
