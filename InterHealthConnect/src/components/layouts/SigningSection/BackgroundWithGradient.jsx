import React from "react";

function Background() {
  return (
    <div className="w-full h-full flex flex-row absolute bg-white rounded-standard">
      <div className="w-full h-1/2 bg-gradient-end absolute top-0 left-0 right-0 z-0 rounded-standard" />
      <div className="w-3/6  h-full bg-gradient rounded-br-round z-1 rounded-standard"></div>
      <div className="w-3/6  h-full bg-white rounded-tl-round z-1 rounded-standard"></div>
    </div>
  );
}

export default Background;
