import React from "react";

import PageContainer from "../components/PageContainer";

import FAQPair from "../components/FAQPair";

export default function index() {
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
      <PageContainer title={title} subtitle={subtitle}>
        <>
          {FAQS.map((ele) => {
            return (
              <FAQPair
                key={ele.question}
                question={ele.question}
                response={ele.response}
              ></FAQPair>
            );
          })}
        </>
      </PageContainer>
    </>
  );
}
