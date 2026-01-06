import { motion } from "framer-motion";
import React, { useState } from "react";

function PlainButton({
  text,
  type,
  handleButtonClick,
  class_name,
  click_bg = "bg-b_green",
}) {
  const [hover, setHover] = useState(false);
  const handleOnClick = (name) => {
    handleButtonClick
      ? handleButtonClick(name)
      : alert(`The button ${text} cliked`);
  };
  return (
    <button
      type={type}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleOnClick(text)}
      className={`relative overflow-hidden z-1 ${class_name}`}
    >
      <motion.span
        animate={{
          scale: hover ? 150 : 1,
          transition: {
            ease: "easeInOut",
            type: "tween",
            duration: 0.2,
          },
        }}
        className={`m-auto -z-1 top-0 bottom-0 absolute left-0 right-0 rounded-full w-0.5 h-0.5 ${click_bg}`}
      />
      {text}
    </button>
  );
}

export default PlainButton;
