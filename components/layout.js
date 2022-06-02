import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Nav from "./nav";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({
  title = "SnoWhen",
  keywords = "Snow, forecast, App, Simple, Resorts, Mountains",
  description = "App for quick Snow Reports for local Mountains",
  children,
}) {
  const router = useRouter();

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Nav />
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <motion.div className='layout'>{children}</motion.div>
    </motion.div>
  );
}
