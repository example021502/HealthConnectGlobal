import React from "react";
import Input from "../../common/Input";
import Label from "../../common/Label";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import Icon from "../../common/Icon";

function SignupForm() {
  const icons = [
    "ri-mail-line",
    "ri-linkedin-line",
    "ri-twitter-line",
    "ri-facebook-line",
  ];
  const handleFormSubmission = () => {
    alert("Form submitted successfully");
  };

  const handleInputOnchange = (input) => {
    console.log(`The input text is: ${input}`);
  };

  return (
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
        <Button
          type="submit"
          class_name="bg-button text-text-white hover:font-semibold border-lightBorder border"
          text="Sign up"
        />
        <span className="w-full">
          <Link to={"/"}>
            <Button
              type="button"
              text="Back"
              class_name="hover:font-semibold border-lightBorder border"
            />
          </Link>
        </span>
      </span>
      <Label text="Log in using :" font_size="xs" font_weight="font-lighter" />

      <div className="flex flex-row gap-4 flex-wrap border-t border-gray-200 w-full items-center justify-center pt-2">
        {icons.map((icon, index) => {
          return (
            <span
              key={index}
              className="bg-background-white text-blue-dark rounded-full w-8 h-8 flex items-center justify-center text-xl hover:border-5 cursor-pointer border-lightBorder border transition-all ease-in-out duration-100"
            >
              <Icon icon={icon} class_name="flex items-center justify-center" />
            </span>
          );
        })}
      </div>
    </form>
  );
}

export default SignupForm;
