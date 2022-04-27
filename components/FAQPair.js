import React from "react";

export default function FAQPair({ question, response }) {
  const [toggled, setToggled] = React.useState(false);

  function handleClick() {
    setToggled(!toggled);
  }

  const drawer = React.useRef(null);
  React.useEffect(() => {
    console.log(drawer, drawer.current);
    if (toggled) {
      var height = drawer.current.scrollHeight;
      drawer.current.style.setProperty("height", height + "px");
      drawer.current.style.setProperty("margin-top", "1.6rem");
    } else {
      drawer.current.style.setProperty("height", "0");
      drawer.current.style.setProperty("margin-top", "0rem");
    }
    return () => {};
  }, [toggled]);
  return (
    <div className='faq overlay'>
      <div className='faq__wrapper'>
        <p className='faq__question'>{question}</p>
        <button onClick={handleClick}>
          <i className='fa fa-solid fa-chevron-down faq__icon'></i>
        </button>
      </div>

      <div
        ref={drawer}
        className={toggled ? `faq__response is-open` : "faq__response "}
      >
        {toggled && response}
      </div>
    </div>
  );
}
