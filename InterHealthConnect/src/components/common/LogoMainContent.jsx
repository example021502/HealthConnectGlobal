import React from "react";

function LogoMainContent() {
  const hosted = "https://i.ibb.co/Lf34C75/Logo-frame.png ";
  return (
    <img
      src={hosted}
      alt=""
      className={`w-1/2 h-100 aspect-square object-contain`}
    />
  );
}

export default LogoMainContent;
