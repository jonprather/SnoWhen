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
  const subtitle = "The Simplest way to find your next powder day";
  const title = "Know When It's Snowing";
  const { user, msg, setMsg } = React.useContext(AuthContext);
  useEffect(() => {
    if (msg && msg.msg) {
      toast.success(msg.msg);
      setMsg(null);
    }
  }, [msg]);
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
