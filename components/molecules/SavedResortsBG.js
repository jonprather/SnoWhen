import CardContainer from "../organisms/CardContainer";
import useNullElementMessage from "../hooks/useNullElementMessage";
export default function SavedResortsBG({
  results,
  filtered,
  isLoading,
  showFavs,
}) {
  const nullCaseMessage = useNullElementMessage({
    showFavs,
    results,
    filtered,
  });

  return (
    <div className='home__heading-container'>
      <div className='home__heading-container__svg-wrapper'>
        <svg
          width='2126'
          height='985'
          viewBox='0 0 2126 985'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0 0C688.784 136.861 1454.23 51.1291 2100.41 0L2126 985C1705.43 919.41 921.173 863.633 0 901.291C133.279 584.565 229.401 343.513 0 0Z'
            fill='#BBE1FA'
          />
        </svg>
      </div>

      <CardContainer
        isLoading={isLoading}
        filtered={filtered}
        message={nullCaseMessage}
      ></CardContainer>
    </div>
  );
}
