import React from "react";

function Background() {
  return (
    <div className="w-full h-full flex flex-row absolute">
      <div className="w-full h-1/2 bg-blue-dark absolute top-0 left-0 right-0 z-0" />
      <div className="w-3/6 h-full bg-blue-dark rounded-br-round z-1"></div>
      <div className="w-3/6 h-full bg-white rounded-tl-round z-1"></div>
    </div>
  );
}

export default Background;
