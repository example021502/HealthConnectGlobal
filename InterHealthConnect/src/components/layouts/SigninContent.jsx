import React from "react";
import Logo from "../common/Logo";
import ImageLogo from "../common/ImageLogo";
import Label from "../common/Label";

function SigninContent() {
  return (
    <div className="flex-1 flex flex-col h-full w-full items-start justify-between">
      <span className="mr-auto flex items-center justify-center gap-2 text-lg text-background-white tracking-wide">
        <Logo />
        InterHealthConnect
      </span>
      <span className="h-[80%]">
        <ImageLogo />
      </span>
      <Label
        text="Copyright ©2025. All rights reserved"
        color="text-background-white"
        font_size="xs"
        font_weight="font-lighter"
      />
    </div>
  );
}

export default SigninContent;
