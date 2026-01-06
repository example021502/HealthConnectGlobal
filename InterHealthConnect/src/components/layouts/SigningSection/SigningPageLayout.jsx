import Label from "../../common/Label";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import { LogSectionContext } from "../../contexts/SigninSignupContext";
import { useContext } from "react";

function SigningPageLayout() {
  const { section } = useContext(LogSectionContext);
  return (
    <div
      className={`w-full h-full ${
        section === "Signup" ? "p-2" : section === "Signin" ? "p-8" : ""
      } flex-1 flex items-start justify-center`}
    >
      <div className="flex bg-light-gray backdrop-standard shadow-light border border-bg-light-white h-fit w-[75%] rounded-standard pt-4 flex-col items-center justify-start">
        <span className="flex flex-row items-center justify-center gap-8 w-full">
          <Label
            text="Signin"
            border_b={true}
            class_name="text-lg font-bold text-blue-light"
          />
          <Label
            text="Signup"
            class_name="text-lg font-bold text-blue-light"
            border_b={true}
          />
        </span>
        {section === "Signin" ? <SigninForm /> : <SignupForm />}
      </div>
    </div>
  );
}

export default SigningPageLayout;
