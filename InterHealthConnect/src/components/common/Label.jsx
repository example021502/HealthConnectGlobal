import React, { useState, useContext } from "react";
import { LogSectionContext } from "../contexts/SigninSignupContext";

function Label({
  color = "",
  text,
  font_size = "18px",
  font_weight = "font-lighter",
  border_b = false,
}) {
  const { section, sectionSelection } = useContext(LogSectionContext);

  const handleClicking = () => {
    sectionSelection(text);
  };
  return (
    <p
      onClick={handleClicking}
      className={`${color ? color : "text-blue-light"} text-${font_size} ${
        font_weight ? font_weight : ""
      } ${section === text ? `after:w-full` : "after:w-0"} ${
        border_b
          ? "after:absolute relative after:mx-auto after:bg-blue-dark after:rounded-full cursor-pointer after:h-0.5 after:transition-all after:duration-100 after:ease-in-out after:bottom-0 after:left-0 after:right-0"
          : ""
      }`}
    >
      {text}
    </p>
  );
}

export default Label;
