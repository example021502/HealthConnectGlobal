import React from "react";
import { motion, spring } from "framer-motion";
import Button from "../../common/Button";

function SetAppointmentButton() {
  const handleSetAppt = (name) => {
    alert(`Button ${name} Clicked`);
  };
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: 75,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 1.5,
            type: "tween",
            ease: "easeInOut",
          },
        },
      }}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.2,
        type: "tween",
        ease: "easeInOut",
      }}
      whileHover={{
        boxShadow: "0 0 5px 1px rgba(255,255,255,0.2)",
        backgroundColor: `var(--color-green)`,
        scale: 1.03,
        transition: {
          duration: 0.1,
        },
      }}
      className="w-full mx-auto border border-lightBorder rounded-standard bg-green-darker text-white text-lg font-bold"
    >
      <Button
        type="Button"
        text="Set Appointment"
        handleButtonClick={handleSetAppt}
      />
    </motion.div>
  );
}

export default SetAppointmentButton;
