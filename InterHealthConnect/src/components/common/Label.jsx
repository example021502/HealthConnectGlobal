import React, { useState, useContext } from "react";
import { LogSectionContext } from "../contexts/SigninSignupContext";
import { motion } from "framer-motion";

function Label({
  text,
  border_b = false,
  class_name = "font-lighter text-sm text-text-light",
}) {
  const { section, sectionSelection } = useContext(LogSectionContext);

  const handleClicking = () => {
    sectionSelection(text);
  };
  return (
    <>
      <motion.p
        initial={{ x: 75, opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          duration: 1.5,
          delay: 0.1,
          ease: "easeInOut",
        }}
        onClick={handleClicking}
        className={`${class_name} ${
          section === text ? `after:w-full` : "after:w-0"
        } ${
          border_b
            ? "after:absolute relative after:mx-auto after:bg-blue after:rounded-full cursor-pointer after:h-0.5 after:transition-all after:duration-100 after:ease-in-out after:bottom-0 after:left-0 after:right-0"
            : ""
        }`}
      >
        {text}
      </motion.p>
    </>
  );
}

export default Label;
