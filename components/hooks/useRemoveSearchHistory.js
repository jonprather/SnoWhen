import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
import { toast } from "react-toastify";
import axios from "axios";
const deleteSearchHistory = async ({ id }) => {
  try {
    if (!confirm("Delete this item from seach history?")) {
      return;
    }
    const res = await axios.delete(`${NEXT_URL}/api/deleteHistory/${id}`);

    // if (res.ok) {
    //   const data = await res.json();
    //   if (!data) throw new Error("Error deleting item");
    //   return data;
    // } else {
    //   throw new Error("Error deleting item");
    // }
    return res.data;
  } catch (e) {
    throw e;
  }
};

export default function useRemoveSearchHistory(resortCode) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteSearchHistory, {
    onSuccess: async (deletedResort) => {
      queryClient.setQueryData(queryKeys.searchHistory, (old = []) => {
        //TODO would be cool if passed error down to here
        // rather than throw error this way shouldnt get here shouldnt be success if no deletedResort
        // if (!deletedResort) throw new Error("Error Connecting to the server");
        // YEAH not working as expected it comes here even tho throwing error in api
        // not sure how it makes it to onSuccess given an error..>!???
        //bc fetch doesnt oby default on diff status
        const idToDelete = deletedResort?.data?.data?.id;
        const filteredArr = old?.resortsSearchHistory?.data?.filter(
          (ele) => ele?.id !== idToDelete
        );

        let tempObj = Object.assign({}, old);
        tempObj.resortsSearchHistory.data = filteredArr;
        return tempObj;
      });

      queryClient.invalidateQueries([queryKeys.snowReports, resortCode], {
        refetchActive: false,
      });
      toast.success("Resort Deleted!", {
        toastId: "removed" + resortCode,
      });
    },
  });

  return mutate;
}

//TODO why does trying to delete resutls in a 403 ERROR
// TODO finish checking null states- I was checking whether the ui will show both the add resorts and add Favorites
///
