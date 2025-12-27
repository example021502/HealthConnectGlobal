import React from "react";
import Logo from "../common/Logo";
import MajorButton from "../common/MajorButton";
import PlainButton from "../common/PlainButton";

function TopNavBar() {
  const nav_buttons = ["Testimonials", "Services", "Doctors", "Contact Us"];
  return (
    <div className="w-full flex justify-between items-center">
      <span className="flex items-center justify-start gap-1 text-lg tracking-wider font-poppins">
        <Logo dimensions="w-15 h-15" />
        InterHealthConnect
      </span>

      <div className="hidden md:flex flex-row items-center gap-4 justify-center">
        {nav_buttons.map((button, index) => {
          return (
            <span key={index}>
              <PlainButton text={button} />
            </span>
          );
        })}
      </div>
      <span className="w-40">
        <MajorButton text="View Updates" />
      </span>
    </div>
  );
}

export default TopNavBar;
