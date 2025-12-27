import React from "react";
import { useNavigate } from "react-router-dom";
function Button({ type, text, bg = "" }) {
  const handleButtonClick = () => {
    if (type != "submit") {
      useNavigate("/");
    }
  };
  return (
    <button
      onClick={handleButtonClick}
      type={type}
      className={`${
        bg ? `${bg} text-white` : "border-2 border-light-gray"
      } w-full py-1 rounded-standard tranition-all duration-100 cursor-pointer ease-in-out hover:bg-background-white font-lg font-semibold font-poppins text-blue-dark`}
    >
      {text}
    </button>
  );
}

export default Button;
