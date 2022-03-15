import PageContainer from "../components/PageContainer";

export default function index() {
  const subtitle = "Our Story";
  const title = "About Us";

  return (
    <>
      <PageContainer title={title} subtitle={subtitle}>
        <p className='about'>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl
          rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
        </p>
      </PageContainer>
    </>
  );
}
