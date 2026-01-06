import React, { useContext } from "react";
import MajorButton from "../../common/MajorButton";
import Label from "../../common/Label";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";

function Content() {
  const navigate = useNavigate();

  const handleSigningButton = (id) => {
    if (id === "Login") {
      navigate(`SigningPage`);
    }
  };

  const homeText =
    "Take the first step toward better health by connecting with our world-class medical network. Please select a convenient time slot from our live interactive calendar to speak with a certified specialist who matches your specific needs. Our platform ensures your data remains encrypted and compliant with international health standards while providing you with a seamless, high-definition video experience from the comfort of your home.";
  return (
    <div className="flex flex-col items-start h-full mr-auto justify-center gap-8">
      <Label
        text="WELCOME TO OUR HEALTH APP"
        class_name="font-lighter text-lg text-text "
      />
      <Header text="Make an appointment" class_name="font-bold text-6xl" />
      <Label text={homeText} class_name="text-md font-lighter text-text" />
      <div className="flex flex-row gap-4 w-fit flex-wrap">
        <span className="w-50">
          <MajorButton onclick={handleSigningButton} text="Login" />
        </span>
      </div>
    </div>
  );
}

export default Content;
