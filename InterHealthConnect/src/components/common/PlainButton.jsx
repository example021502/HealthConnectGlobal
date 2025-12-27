import React from "react";

function PlainButton({ text }) {
  const handleOnClick = () => {
    alert(`The button ${text} cliked`);
  };
  return (
    <button
      onClick={() => handleOnClick(text)}
      className="rounded-lg w-full shadow-light hover:bg-hover-light-blue hover:border border-bg-light-white transition-all ease-in-out duration-100 py-1 px-4 text-dark-blue font-lighter hover:font-semibold text-md cursor-pointer"
    >
      {text}
    </button>
  );
}

export default PlainButton;
