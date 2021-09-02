import "../styles/global.scss";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/nav"));
export default function MyApp({ Component, pageProps }) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: twentyFourHoursInMs,
          },
        },
      })
  );
  //   const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>SnoWhen</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='Snow Report for Resort Locations App'
        />
        <meta
          name='keywords'
          content='HTML, CSS, JavaScript,API, Snow, Resorts, California'
        />
        <meta name='author' content='Jon' />

        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Nav />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
