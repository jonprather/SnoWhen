import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Nav from "./nav";

export default function Layout({
  title = "SnoWhen",
  keywords = "Snow, forecast, App, Simple, Resorts, Mountains",
  description = "App for quick Snow Reports for local Mountains",
  children,
}) {
  const router = useRouter();

  return (
    <div>
      <Nav />
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <div className='layout'>{children}</div>
    </div>
  );
}
