import React, { useContext } from "react";
import MajorButton from "../common/MajorButton";
import Label from "../common/Label";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";
import { LogSectionContext } from "../contexts/SigninSignupContext";

function Content() {
  const navigate = useNavigate();
  const { setSelection } = useContext(LogSectionContext);

  const handleSigningButton = (id) => {
    if (id === "Login") {
      navigate(`Signin`);
    }
  };

  const homeText =
    "Take the first step toward better health by connecting with our world-class medical network. Please select a convenient time slot from our live interactive calendar to speak with a certified specialist who matches your specific needs. Our platform ensures your data remains encrypted and compliant with international health standards while providing you with a seamless, high-definition video experience from the comfort of your home.";
  return (
    <div className="flex flex-col items-start h-full mr-auto justify-center gap-8">
      <Label
        text="WELCOME TO OUR HEALTH APP"
        font_size="18px"
        font_weight="lighter"
      />
      <Header text="Make an appointment" />
      <Label text={homeText} font_size="sm" font_weight="lighter" />
      <div className="flex flex-row gap-4 w-fit flex-wrap">
        <span className="w-40">
          <MajorButton onclick={handleSigningButton} text="Login" />
        </span>
      </div>
    </div>
  );
}

export default Content;
