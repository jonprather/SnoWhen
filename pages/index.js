import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Layout from "../components/layout";
// import { fetchPosts } from "../hooks";

const Home = () => {
  return <Layout>BRO</Layout>;
};

// export async function getStaticProps() {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(["posts", 10], () => fetchPosts(10));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }

export default Home;
