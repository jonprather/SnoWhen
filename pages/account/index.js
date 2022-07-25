import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import AuthContext from "@/context/AuthContext";
import useSnowData from "@/components/hooks/useSnowData";
import useSearchHistory from "@/components/hooks/useSearchHistory";

import Layout from "@/components/layout";
import AccountPage from "@/components/templates/Account";

export default function index() {
  const { user, checkUserLoggedIn, dispatchMsg, message } =
    useContext(AuthContext);

  const { searchHistory } = useSearchHistory();
  const { snowData } = useSnowData(searchHistory);

  const router = useRouter();

  const [error, setError] = useState("");
  // TODO This error isnt set up look to weather index to se tit right

  useEffect(() => {
    // checkUserLoggedIn();
    if (!user) {
      router.push("account/login");
    }
    //  TODO is this what i really want isnt it better to check user
  }, [user]);
  //TODO so when not logged in you get pushed to locgin but error still occurs and its a 500 error it should tell user to log in first
  //so that error is likely coming from the other hooks could make them rely on user ie enable:!!user
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatchMsg({});
    }
  }, [message]);

  function handleEmit({ label, value: resortID }) {
    if (label === undefined || resortID === undefined) return;
    setResort(resortID);
    router.push(`/weather/${label}/search?resortId=${resortID}`);
  }

  // TODO make this code irrelevant with react query
  const isLoading = snowData.some((query) => query.isLoading);
  // irrelevant bc have is fetching and the rest is stale while revalidate so shouldnt be an issue right?

  if (!user) return "";
  return (
    <Layout title='SnoWhen - Account' description='snoWhen Account page'>
      {/* TODO after refactorign laoding to use isFetching can eliminate passign it down
 prob is other componetns relied on it for sycrounous state which will be uneeded with RQ calls
 plus if not can get rid of state liek TKDODO said
 */}
      <AccountPage
        handleEmit={handleEmit}
        error={error}
        resortsSearchHistory={searchHistory}
        results={snowData}
        isLoading={isLoading}
      >
        <h1> {user?.username}</h1>
      </AccountPage>
    </Layout>
  );
}
