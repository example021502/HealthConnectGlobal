import React from "react";

function Logo({ dimensions = "w-10 h-10", zoom = false }) {
  return (
    <div
      className={`flex items-center hover:scale-[1.02] justify-center ml-auto rounded-full ${dimensions}`}
    >
      <img
        src="https://i.ibb.co/Lf34C75/Logo-frame.png"
        alt=""
        className={`w-full h-full aspect-square rounded-full object-cover`}
      />
    </div>
  );
}

export default Logo;
