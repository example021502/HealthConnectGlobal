import React, { useContext } from "react";
import Button from "../../common/Button";
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
    <div className="flex z-4 flex-col gap-8 items-start h-fit rounded-standard p-2 w-1/2 mr-auto mt-auto justify-start">
      <Header
        text="Make an Appointment Today"
        class_name="font-bold text-5xl"
      />
      <Label
        text={homeText}
        class_name="text-md font-lighter p-2 rounded-standard"
      />
      <span className="w-50">
        <Button
          onclick={handleSigningButton}
          click_bg="bg-green_light"
          text="Login"
          type="button"
          handleButtonClick={handleSigningButton}
          class_name="w-full border py-1 rounded-standard font-semibold text-lg"
        />
      </span>
    </div>
  );
}

export default Content;
