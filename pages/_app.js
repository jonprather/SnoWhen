import "../styles/global.scss";
import React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import dynamic from "next/dynamic";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps, router }) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const tenSecondsInMs = 1000 * 10;

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            refetchOnmount: true,
            refetchOnReconnect: true,
            retry: true,
            staleTime: tenSecondsInMs,
            onError: (error) =>
              toast.error(`Something Went Wrong: ${error}`, {
                toastId: "1-" + error.message,
              }),
          },
          //TODO instead of printing status codes print something more user friendly
          mutations: {
            onError: (error) =>
              toast.error(`Something Went Wrong: ${error}`, {
                toastId: "2-" + error.message,
              }),
          },
        },
      })
  );
  // TODO might be better to have local error handling eg for when try to add resort thats already there
  // give a message indicating resort already addedlike i had in fav ctx b4 switching to RQ

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
          <AuthProvider>
            <FavoritesProvider>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </FavoritesProvider>
          </AuthProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}
