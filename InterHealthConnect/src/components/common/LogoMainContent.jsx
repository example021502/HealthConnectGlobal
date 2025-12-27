import React from "react";

function LogoMainContent() {
  const hosted = "https://i.ibb.co/Lf34C75/Logo-frame.png ";
  return (
    <img
      src={hosted}
      alt=""
      className={`w-full h-80 md:w-120 md:h-120 aspect-square rounded-full object-cover`}
    />
  );
}

export default LogoMainContent;
