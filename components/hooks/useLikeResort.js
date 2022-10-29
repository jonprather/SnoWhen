import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";
import axios from "axios";
import { toast } from "react-toastify";

const toggleLikeResort = async ({ searchHistoryId, liked, user }) => {
  const favoriteData = {
    user: user.id,
    createdBy: user.id,
    updatedBy: user.id,
    liked: !liked,
  };

  const res = await axios.post(
    `${NEXT_URL}/api/toggleLike/${searchHistoryId}`,
    {
      data: {
        ...favoriteData,
      },
    }
  );
  return res;
};

export default function useLikeResort(resort) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(toggleLikeResort, {
    onMutate: async (toggledResortData) => {
      await queryClient.cancelQueries([queryKeys.snowReports, resort]);
      const previous = queryClient.getQueryData([
        queryKeys.snowReports,
        resort,
      ]);

      const updatedSnowData = Object.assign({}, previous);

      updatedSnowData.snowReport = {
        ...updatedSnowData.snowReport,
        liked: !updatedSnowData.snowReport.liked,
      };

      queryClient.setQueryData(
        [queryKeys.snowReports, resort],
        updatedSnowData
      );
      return { previous, updatedSnowData };
    },
    onError: (err, updatedSnowData, context) => {
      toast.error(err.message, { toastId: err.message });
      queryClient.setQueryData(
        [queryKeys.snowReports, resort],
        context.previous
      );
    },
  });

  return mutate;
}

