import React from "react";
import { motion } from "framer-motion";

function Header({
  text,
  class_name = "font-semibold text-4xl w-full text-left",
}) {
  return (
    <motion.h1
      initial={{ y: -75, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 8, delay: 0.5, stiffness: 120 }}
      className={class_name}
    >
      {text}
    </motion.h1>
  );
}

export default Header;
