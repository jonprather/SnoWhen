import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  function handleClick() {
    router.push("/weather");
  }

  return (
    <section className='landing-page'>
      <header className='landing-page-header'>
        <div className='landing-page-header__container'>
          <div className='landing-page-header__container__header-box'>
            <h1 className='landing-page-header__container__heading'>
              Know When It's Snowing
            </h1>
            <h2 className='landing-page-header__container__subheading'>
              The Simplest way to find your next powder day
            </h2>
          </div>
          {/* <p className='landing-page-header__container__text'> </p> */}
          <button
            onClick={handleClick}
            className='btn--check-snow landing-page-header__container__button'
          >
            check snow
          </button>
        </div>
      </header>
    </section>
  );
}
