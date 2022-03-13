import { useRouter } from "next/router";

export default function Page({ title, subtitle, children }) {
  return (
    <section className='landing-page'>
      <header className='landing-page-header'>
        <div className='landing-page-header__container'>
          <div className='landing-page-header__container__header-box'>
            <h1 className='landing-page-header__container__heading'>{title}</h1>
            <h2 className='landing-page-header__container__subheading'>
              {subtitle}
            </h2>
          </div>
          {/* <p className='landing-page-header__container__text'> TEST TEXT</p> */}
          {children}
        </div>
      </header>
    </section>
  );
}
