import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { queryKeys } from "src/react-query/constants";
import { NEXT_URL } from "@/config/index";

const toggleLikeResort = async ({ searchHistoryId, liked, user }) => {
  const favoriteData = {
    user: user.id,
    createdBy: user.id,
    updatedBy: user.id,
    liked: !liked,
  };

  const res = await fetch(`${NEXT_URL}/api/toggleLike/${searchHistoryId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { ...favoriteData } }),
  });

  var strapiToggleData = await res.json();
  if (res.ok) {
    return "Success";
  } else {
    // setError(strapiToggleData.message);
    //TODO go through make sure these errors are handled globally corectly by RQ default and that apis ( next) are sending
    //right data fo rerrors not that nested stuff from v 3 of strapie
    //TODO fix where loading spinner shows up seems to not work as well as it once did when i set them
    // from isLoading manually rather than is fetching in the component
  }
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
      queryClient.setQueryData(
        [queryKeys.snowReports, resort],
        context.previous
      );
    },
  });

  return mutate;
}
