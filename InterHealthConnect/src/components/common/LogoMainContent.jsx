import React from "react";

function LogoMainContent() {
  const hosted = "https://i.ibb.co/Lf34C75/Logo-frame.png ";
  return (
    <img
      src={hosted}
      alt=""
      className={`w-full h-60 md:w-110 md:h-110 aspect-square object-contain`}
    />
  );
}

export default LogoMainContent;
