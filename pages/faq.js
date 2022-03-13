import Link from "next/link";
import React from "react";

import { useRouter } from "next/router";
import Page from "../components/page";
import FAQPair from "../components/FAQPair";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }
  const subtitle = "What people ask";
  const title = "FAQ";
  // TODO make the bg image passable
  const FAQS = [
    {
      question: "Why does this site exist?",
      response: "To provide the simplest resort snow forecast.",
    },
    {
      question: "Why is this site Awesome?",
      response: "It's simple",
    },
  ];

  return (
    <>
      <Page title={title} subtitle={subtitle}>
        <>
          {FAQS.map((ele) => {
            return (
              <FAQPair
                question={ele.question}
                response={ele.response}
              ></FAQPair>
            );
          })}
        </>
      </Page>
    </>
  );
}
