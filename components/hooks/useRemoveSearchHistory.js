import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";

const deleteSearchHistory = async ({ id }) => {
  if (!confirm("Delete this item from seach history?")) {
    return;
  }
  const res = await fetch(`${NEXT_URL}/api/deleteHistory/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
  }
};

export default function useRemoveSearchHistory(resort) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteSearchHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.resorts]),
        queryClient.invalidateQueries([queryKeys.snowReports, resort], {
          refetchActive: false,
        });
    },
  });
  //TODO consider could also maybe update cahce instead or  set stale time or diff refetch options

  return mutate;
}
