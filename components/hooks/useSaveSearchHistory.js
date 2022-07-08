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
    // so if want to do setQueryClient cache then need to get cache for a given key ( resorts)
    //then update it
    //but might be better to do that in useMutaiton or here or at call site whre? maybe onSuccess?
    // const arrayCopy = searchHistory ? searchHistory.data.slice() : [];
    // arrayCopy.push(data.data.data);
    // setSearchHistory((favArrObjs) => {
    //   return { ...favArrObjs, data: arrayCopy };
    // });
    // router.push("/account/");
  } else {
    // setError(data.message);
    // setError(null);
  }
};

export default function useSaveSearchHistory() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(saveSearchHistory, {
    onSuccess: () => queryClient.invalidateQueries([queryKeys.resorts]),
  });
  // ok so i got confused its called data the feild i wanted to pull off
  //taking off a needless wrapper object
  return mutate;
}

// // TODO: update return type
// export function useCancelAppointment(): (appointment: Appointment) => void {
//   const queryClient = useQueryClient();
//   // const toast = useCustomToast();
//   const { mutate } = useMutation(
//     (appointment: Appointment) => removeAppointmentUser(appointment),
//     {
//       onSuccess: () => queryClient.invalidateQueries([queryKeys.appointments]),
//     }
//   );
//   // TODO: replace with mutate function
//   return mutate;
// }
