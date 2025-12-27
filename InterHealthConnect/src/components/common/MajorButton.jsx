import React from "react";

function MajorButton({ text, bg = true, onclick }) {
  return (
    <button
      onClick={() => onclick(text)}
      className={`rounded-lg px-4 w-full py-1.5 transition-all cursor-pointer duration-100 ease-in-out ${
        bg
          ? "bg-gradient text-white hover:scale-[1.02] transition-all ease-in-out duration-100"
          : "bg-white text-dark-blue hover:bg-hover-light-blue hover:border border-bg-light-white"
      }`}
    >
      {text}
    </button>
  );
}

export default MajorButton;
