import React from "react";
import Content from "./Content";
import LogoMainContent from "../../common/LogoMainContent";

function MainHomeContent() {
  return (
    <div className="grid grid-cols-1 md:flex flex-row rounded-lg w-full items-center justify-center">
      <Content />
      <LogoMainContent />
    </div>
  );
}

export default MainHomeContent;
