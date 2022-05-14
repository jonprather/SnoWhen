import SavedResortsBG from "../molecules/SavedResortsBG";
import CardContainer from "../organisms/CardContainer";
import Header from "@/components/organisms/AccountHeader";
import Loading from "@/components/atoms/Loading";
import ErrorText from "@/components/molecules/error";
// import Loading from "@/components/atoms/Loading";
// Is this really an atom or a molecule im not sure it depends if uses more stuff like spinner
// TODO make this a molecule made up of atoms which incude some spinner library
export default function account({
  handleEmit,
  error,
  resortsSearchHistory,
  results,
}) {
  return (
    <section className='home'>
      {/* These together could be an organism
     This organism can slot into here or be like a header prop in the page
     */}
      {/* Could add this to context or something if becomes an issue to prop drill it */}
      <Header emit={handleEmit}></Header>
      <main className='home__main'>
        {/* Maybe to stay a template this stuff is slots or passed in components */}
        {/* Then in page can slo tthis stuff in as needed 
      For now this is fine but can make this a better template and resuable by using more slots for flexibilty
      */}
        <ErrorText error={error} />
        <SavedResortsBG resortsSearchHistory={resortsSearchHistory} />
        {/* THese props might have to change  dep on new api */}
        <Loading loading={results[results.length - 1]?.isLoading} />
        <CardContainer results={results}></CardContainer>
      </main>
    </section>
  );
}
