import React from "react";
import BackgroundWithGradient from "../layouts/SigningSection/BackgroundWithGradient";
import Background from "../layouts/SigningSection/Background";
import SigningPageLayout from "../layouts/SigningSection/SigningPageLayout";
import SigninContent from "../layouts/SigningSection/SigninContent";

function SigningPage() {
  return (
    <div className="absolute inset-0 bg-background-white flex items-center justify-center">
      <Background />
      <div className="w-[80%] h-[80%] flex m-auto relative z-2 bg-bg-light-white rounded-standard shadow-large">
        <BackgroundWithGradient />
        <div className="z-4 w-full p-10 h-full flex items-center justify-center rounded-standard">
          <SigninContent />
          <SigningPageLayout />
        </div>
      </div>
    </div>
  );
}

export default SigningPage;
