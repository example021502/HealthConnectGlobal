import { motion } from "framer-motion";
import React, { useState } from "react";

function PlainButton({ text, class_name }) {
  const [hover, setHover] = useState(false);
  const handleOnClick = () => {
    alert(`The button ${text} cliked`);
  };
  return (
    <button
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
        className={`m-auto -z-1 top-0 bottom-0 absolute left-0 right-0 rounded-full w-0.5 h-0.5 bg-b_green`}
      />
      {text}
    </button>
  );
}

export default PlainButton;
