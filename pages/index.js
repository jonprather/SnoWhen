import { useRouter } from "next/router";
import PageContainer from "@/components/PageContainer";
import Layout from "@/components/layout";
import AuthContext from "@/context/AuthContext.js";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/account");
  }
  //TODO important!! WHY is api/user getting called on this page and redir you to login why is it called just by reffering to auth?

  const subtitle = "The Simplest way to find your next powder day";
  const title = "Know When It's Snowing";
  const { dispatchMsg, message } = React.useContext(AuthContext);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatchMsg({});
    }
  }, [message]);
  return (
    <Layout>
      <PageContainer title={title} subtitle={subtitle}>
        <button
          onClick={handleClick}
          className='btn--check-snow landing-page-header__container__button'
        >
          check snow
        </button>
      </PageContainer>
    </Layout>
  );
}
