import Link from "next/link";
import { useRouter } from "next/router";
import Page from "../components/page";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }
  const subtitle = "What people ask";
  const title = "FAQ";
  // TODO make the bg image passable
  return (
    <>
      <Page title={title} subtitle={subtitle}>
        <div className='faq'>
          <p className='faq__question'>Why does this site exist?</p>

          <p className='faq__response'>
            To provide the simplest resort snow forecast.
          </p>
          <p className='faq__question'>
            Why does this site only have one resort(mammoth)?
          </p>

          <p className='faq__response'>
            Because more would cost more and we are currently bootstrapped.
          </p>
        </div>
      </Page>
    </>
  );
}
