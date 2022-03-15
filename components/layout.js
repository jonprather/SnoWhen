import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "./nav";
// import Footer from './Footer'

// import styles from '@/styles/Layout.scss'

export default function Layout({
  title = "SnoWhen",
  keywords = "Snow, forecast, App, Simple, Resorts, Mountains",
  description = "App for quick Snow Reports for local Mountains",
  children,
}) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Nav />

      <div className='layout'>{children}</div>
    </div>
  );
}
