import { useRouter } from "next/router";
import PageContainer from "@/components/PageContainer";
import Layout from "@/components/layout";
import AuthContext from "@/context/AuthContext.js";
import React from "react";
export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/account");
  }
  const subtitle = "The Simplest way to find your next powder day";
  const title = "Know When It's Snowing";
  const { user } = React.useContext(AuthContext);
  console.log("USEr in home", user);
  return (
    <Layout>
      <PageContainer title={title} subtitle={subtitle}>
        {/* <p className='landing-page-header__container__text'> TEST TEXT</p> */}
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
