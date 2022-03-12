import { useRouter } from "next/router";
import Page from "../components/page";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }
  const subtitle = "Our Story";
  const title = "About Us";

  return (
    <>
      <Page title={title} subtitle={subtitle}>
        <p className='about'>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
          rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
        </p>
      </Page>
    </>
  );
}
