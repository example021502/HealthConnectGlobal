import React from "react";
import { motion } from "framer-motion";

function Header({
  text,
  class_name = "font-semibold text-4xl w-full text-left",
}) {
  return (
    <motion.h1
      initial={{ x: 75, opacity: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "tween",
        duration: 1.5,
        delay: 0.1,
        ease: "easeInOut",
      }}
      className={class_name}
    >
      {text}
    </motion.h1>
  );
}

export default Header;
