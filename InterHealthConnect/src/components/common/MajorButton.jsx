import React from "react";

function MajorButton({ text, bg = true, onclick, class_name }) {
  return (
    <button
      onClick={() => onclick(text)}
      className={`${class_name} ${
        bg &&
        "bg-white text-dark-blue hover:bg-hover-light-blue hover:border border-bg-light-white"
      }`}
    >
      {text}
    </button>
  );
}

export default MajorButton;
