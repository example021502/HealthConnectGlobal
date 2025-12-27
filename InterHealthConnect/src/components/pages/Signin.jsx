import React from "react";
import BackgroundWithGradient from "../layouts/BackgroundWithGradient";
import Background from "../layouts/Background";
import SigninForm from "../layouts/SigninForm";
import SigninContent from "../layouts/SigninContent";

function Signin() {
  return (
    <div className="absolute inset-0 bg-white flex items-center justify-center">
      <Background />
      <div className="w-[80%] h-[80%] flex m-auto relative z-2 bg-bg-light-white rounded-standard shadow-large">
        <BackgroundWithGradient />
        <div className="z-4 w-full p-10 h-full flex items-center justify-center">
          <SigninContent />
          <SigninForm />
        </div>
      </div>
    </div>
  );
}

export default Signin;
