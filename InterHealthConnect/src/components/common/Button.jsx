import React from "react";

function Button({
  type,
  text,
  handleButtonClick,
  class_name,
  main_class_name = `${class_name} cursor-pointer transition-all ease-in-out duration-120 w-full py-1 rounded-standard tranition-all duration-100 ease-in-out font-lighter font-sans`,
}) {
  return (
    <button
      onClick={() => handleButtonClick(text)}
      type={type}
      className={`${main_class_name}`}
    >
      {text}
    </button>
  );
}

export default Button;
