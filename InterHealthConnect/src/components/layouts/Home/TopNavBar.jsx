import React, { useContext } from "react";
import Button from "../../common/Button";
import Image from "../../common/Image";
function TopNavBar() {
  const handleButtonClick = (name) => {
    alert(`Button ${name} Clinked in TopNav`);
  };
  const nav_buttons = ["Testimonials", "Services", "Doctors", "Contact Us"];
  return (
    <div className="w-full px-4 py-2 mx-4 shadow-lg rounded-standard bg-green_light backdrop-blur-standard flex justify-between items-center">
      <span className="flex items-center justify-start gap-1 text-lg tracking-wider font-poppins">
        <Image
          class_name="w-20 h-ful"
          imgLink="https://i.ibb.co/MknLXjtX/9900695d0074ed7306102da522b64a35.jpg rounded-standard"
        />
        InterHealthConnect
      </span>
      <div className="hidden md:flex flex-row items-center gap-4 justify-center">
        {nav_buttons.map((button, index) => {
          return (
            <span key={index}>
              <Button
                text={button}
                click_bg="bg-b_green"
                type="button"
                handleButtonClick={handleButtonClick}
                class_name="rounded-lg w-full border border-b_white py-1 px-4 text-md cursor-pointer"
              />
            </span>
          );
        })}
      </div>
      <span className="w-40">
        <Button
          click_bg="bg-b_green"
          type="button"
          text="View Updates"
          handleButtonClick={handleButtonClick}
          class_name="font-semibold rounded-standard px-4 w-full py-1.5 cursor-pointer border text-b_white border-b_white"
        />
      </span>
    </div>
  );
}

export default TopNavBar;
