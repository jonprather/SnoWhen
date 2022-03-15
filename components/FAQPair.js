import React from "react";

export default function FAQPair({ question, response }) {
  const [toggled, setToggled] = React.useState(false);

  function handleClick() {
    setToggled(!toggled);
  }
  return (
    <div className='faq'>
      <div className='faq__wrapper'>
        <p className='faq__question'>{question}</p>
        <button onClick={handleClick}>
          <i className=' fa fa-solid fa-chevron-down faq__icon'></i>
        </button>
      </div>

      {toggled && <p className='faq__response'>{response}</p>}
    </div>
  );
}
