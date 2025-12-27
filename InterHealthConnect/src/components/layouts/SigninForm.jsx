import React, { use, useContext, useState } from "react";
import Input from "../common/Input";
import Label from "../common/Label";
import { LogSectionContext } from "../contexts/SigninSignupContext";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { Link } from "react-router-dom";

function SigninForm() {
  const { section } = useContext(LogSectionContext);
  const handleFormSubmission = () => {
    alert("Form submitted successfully");
  };

  const handleInputOnchange = (input) => {
    console.log(`The input text is: ${input}`);
  };

  const icons = [
    "ri-mail-line",
    "ri-linkedin-line",
    "ri-twitter-line",
    "ri-facebook-line",
  ];

  return (
    <div
      className={`w-full h-full ${
        section === "Signup" ? "p-2" : section === "Signin" ? "p-8" : ""
      } flex-1 flex items-start justify-center`}
    >
      <div className="flex bg-background-white backdrop-standard shadow-light border border-bg-light-white h-full w-[75%] rounded-standard pt-4 flex-col items-center justify-start">
        <span className="flex flex-row items-center justify-center gap-8 w-full">
          <Label
            text="Signin"
            font_size="lg"
            font_weight="font-bold"
            border_b={true}
          />
          <Label
            text="Signup"
            font_size="lg"
            font_weight="font-bold"
            border_b={true}
          />
        </span>
        {section === "Signin" ? (
          <form
            className="bg-secondary h-full w-full flex flex-col items-center justify-start gap-6 p-6 rounded-standard mt-1"
            onSubmit={handleFormSubmission}
          >
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Email: eg. health@gmail.com"
            />
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Password: ****"
            />
            <span className="w-full flex flex-row items-center justify-centr gap-4">
              <Button type="submit" bg="bg-button" text="Login" />
              <span className="w-full">
                <Link to={"/"}>
                  <Button type="button" text="Back" />
                </Link>
              </span>
            </span>
            <Label
              text="Log in using :"
              font_size="xs"
              font_weight="font-lighter"
            />

            <div className="flex flex-row gap-4 flex-wrap">
              {icons.map((icon, index) => {
                return (
                  <span
                    key={index}
                    className="bg-background-white text-blue-dark rounded-full w-8 h-8 flex items-center justify-center text-xl"
                  >
                    <Icon icon={icon} />
                  </span>
                );
              })}
            </div>
          </form>
        ) : (
          <form
            className="bg-secondary h-full w-full flex flex-col items-center justify-start gap-4 p-6 rounded-standard mt-1"
            onSubmit={handleFormSubmission}
          >
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Full name: eg. John Monaccon"
            />
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Email: eg. health@gmail.com"
            />
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Password: ****"
            />
            <Input
              type="text"
              onChange={handleInputOnchange}
              placeholder="Confirm password: ****"
            />
            <span className="w-full flex flex-row items-center justify-centr gap-4">
              <Button type="submit" bg="bg-button" text="Sign up" />
              <span className="w-full">
                <Link to={"/"}>
                  <Button type="button" text="Back" />
                </Link>
              </span>
            </span>
            <Label
              text="Log in using :"
              font_size="xs"
              font_weight="font-lighter"
            />

            <div className="flex flex-row gap-4 flex-wrap">
              {icons.map((icon, index) => {
                return (
                  <span
                    key={index}
                    className="bg-background-white text-blue-dark rounded-full w-8 h-8 flex items-center justify-center text-xl"
                  >
                    <Icon icon={icon} />
                  </span>
                );
              })}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SigninForm;
