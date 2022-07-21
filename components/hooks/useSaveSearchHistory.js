import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import react, { useState } from "react";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
import { toast } from "react-toastify";

const saveSearchHistory = async ({ resort }) => {
  const res = await axios.post(`${NEXT_URL}/api/storeHistory`, {
    resort: resort,
  });
  //can just toast in the onSuccess handler of useMutation

  return res.data;
};
const onSuccessToast = function (message, { id }) {
  toast.success(`${message}`, {
    toastId: id,
  });
};
export default function useSaveSearchHistory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(saveSearchHistory, {
    onSuccess: async (newResort) => {
      let name = newResort.data.data.attributes.resort.data.attributes.name;
      let code = newResort.data.data.attributes.resort.data.attributes.code;

      queryClient.setQueryData(queryKeys.resorts, (old = []) => {
        const oldArray = old.resortsSearchHistory.data;
        const newArray = newResort.data.data;
        const combindedArray = [...oldArray, newArray];
        let tempObj = Object.assign({}, old);
        tempObj.resortsSearchHistory.data = combindedArray;

        return tempObj;
      });
      toast.success(`${name} added!`, { toastId: "added" + code });
    },

    //() => queryClient.invalidateQueries([queryKeys.resorts]),
  });

  return mutate;
}
