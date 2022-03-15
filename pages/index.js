import { useRouter } from "next/router";
import Page from "../components/Page";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }
  const subtitle = "The Simplest way to find your next powder day";
  const title = "Know When It's Snowing";

  return (
    <>
      <Page title={title} subtitle={subtitle}>
        {/* <p className='landing-page-header__container__text'> TEST TEXT</p> */}
        <button
          onClick={handleClick}
          className='btn--check-snow landing-page-header__container__button'
        >
          check snow
        </button>
      </Page>
    </>
  );
}
