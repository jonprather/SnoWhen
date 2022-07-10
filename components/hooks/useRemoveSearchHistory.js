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
    onSuccess: async (deletedResort) => {
      queryClient.setQueryData(queryKeys.resorts, (old = []) => {
        const idToDelete = deletedResort.data.data.id;
        const filteredArr = old.resortsSearchHistory.data.filter(
          (ele) => ele.id !== idToDelete
        );

        let tempObj = Object.assign({}, old);
        tempObj.resortsSearchHistory.data = filteredArr;
        return tempObj;
      });

      queryClient.invalidateQueries([queryKeys.snowReports, resort], {
        refetchActive: false,
      });
    },
  });

  return mutate;
}
