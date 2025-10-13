import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Signup() {
  // START: State
  const [errorColor, setErrorColor] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedRole, setSelectedRole] = useState("");
  const [disable, setDisable] = useState(false);
  const [next, setNext] = useState(false);

  const genderOptions = [
    { label: "Choose an option", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "prefer not to say" },
  ];

  const SigningRoles = [
    { label: "Choose an option", value: "" },
    { label: "Patient", value: "patient" },
    { label: "Health Specialist", value: "specialist" },
    { label: "Hospital", value: "hospital" },
    { label: "General Doctor", value: "general doctor" },
    { label: "Nurse", value: "nurse" },
  ];

  // START: Handlers
  function handleChange(value) {
    setPhoneNumber(value);
    if (value && !isValidPhoneNumber(value)) {
      setErrorColor(true);
    } else {
      setErrorColor(false);
    }
  }

  const handleGenderDropDownChange = (e) => {
    e.preventDefault();
    setSelectedGender(e.target.value);
  };

  const handleNext = () => {
    setNext(true);
  };

  const handleSignupasDropDownChange = (e) => {
    e.preventDefault();
    setSelectedRole(e.target.value);
    // Note: The original logic checked the *old* state value after setting the new one.
    // I'm updating the logic here to check the *new* value for immediate effect.
    if (e.target.value === "specialist") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  // START: Render
  return (
    <div className="m-0 h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-400 to-blue-300">
      {next ? (
        // START: Second Form (Account Details)
        <div className="w-[80%] h-[80%] flex items-center justify-center rounded-md p-4 relative overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 transition-all duration-300">
          <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] rounded-full backdrop-blur-sm [background-image:radial-gradient(circle,rgba(190,185,228,0.6),rgba(190,185,228,0.4),rgba(190,185,228,0),transparent,transparent)]"></div>

          <div className="m-0 flex-1 flex flex-col justify-center items-start font-sans tracking-wider text-primary-green">
            <h1 className="font-semibold text-3xl m-0 mx-auto w-[80%] text-left relative mb-1 pt-1 before:content-[''] before:absolute before:h-0.5 before:w-[90px] before:bg-primary-green before:bottom-0 before:left-0">
              Sign Up
            </h1>
            <p className="text-base leading-snug m-4 mx-auto text-left w-[80%] relative pl-4 before:content-[''] before:bg-primary-green before:absolute before:w-1 before:rounded-lg before:h-full before:top-0 before:left-0">
              Join now to transform your workflow and instantly expand your
              referral network. Access secure patient records and achieve true
              continuity of care with the community built by providers, for
              providers. Register your verified practice today and start
              experiencing integrated, efficient healthcare.
            </p>
          </div>

          <form className="w-[350px] h-full flex flex-col justify-center p-6 text-primary-green relative before:content-[''] before:absolute before:w-px before:h-full before:bg-primary-green before:top-0 before:left-[-1rem]">
            {/* Profile Image */}
            <div className="h-[120px] w-[120px] rounded-full mx-auto flex justify-center items-center border border-gray-400 relative mb-4">
              <img
                src="https://i.ibb.co/8n95vXRy/signingin.jpg"
                alt="profile image"
                className="rounded-full w-full h-full object-cover"
              />
              <i className="ri-camera-fill absolute text-xl rounded-full p-0.5 top-[80%] right-2 text-primary-green cursor-pointer transition-all duration-200 hover:font-medium hover:text-green-700 hover:border hover:border-primary-green hover:-translate-y-0.5" />
            </div>

            <div className="flex justify-center items-center gap-4 w-full mt-2">
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">Country:</label>
                <input
                  type="text"
                  id="country"
                  required
                  className="w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">Home Address:</label>
                <input
                  type="text"
                  id="homeaddress"
                  required
                  className="w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 w-full mt-4">
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">Signing up As:</label>
                <select
                  value={selectedRole}
                  onChange={handleSignupasDropDownChange}
                  id="signupas"
                  className="w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                  required
                >
                  {SigningRoles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">Specialty:</label>
                <input
                  type="text"
                  id="specialty"
                  disabled={disable}
                  className={`w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:outline-none ${
                    disable
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : "focus:border-2 focus:border-primary-green"
                  }`}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 w-full mt-4">
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">Set Password:</label>
                <input
                  type="password"
                  id="setpassword"
                  required
                  className="w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                />
              </div>
              <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
                <label className="text-sm tracking-wide">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  required
                  className="w-full text-sm mt-0.5 p-1 px-1.5 rounded-sm border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                />
              </div>
            </div>

            <p className="text-left text-xs font-serif tracking-wide mt-4">
              <input
                type="checkbox"
                required
                className="mr-1 accent-primary-green"
              />{" "}
              I have read and understood the{" "}
              <a
                href="#"
                className="cursor-pointer text-primary-green font-semibold relative transition-all duration-200 hover:border-b-2 hover:border-primary-green"
              >
                Terms & Conditions.
              </a>
            </p>

            <div className="flex gap-4 items-center justify-center w-full mt-6">
              <button
                type="submit"
                className="flex-1 py-1 text-base rounded-md tracking-wider border-none text-white bg-primary-green transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
              >
                Create Account
              </button>
              <button
                type="button"
                className="flex-1 py-1 text-base rounded-md tracking-wider border-none text-white bg-red-700 transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5"
              >
                Cancel
              </button>
            </div>

            <i className="text-xs tracking-wide text-gray-700 mt-4 mx-auto">
              ©copyright 2025 InterHealthCon.Pvt Ld
            </i>
          </form>
        </div>
      ) : (
        // START: First Form (Personal Details)
        <div className="w-[80%] h-[80%] flex items-center justify-center rounded-md p-8 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200 transition-all duration-300">
          <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] rounded-full backdrop-blur-sm [background-image:radial-gradient(circle,rgba(190,185,228,0.6),rgba(190,185,228,0.4),rgba(190,185,228,0),transparent,transparent)]"></div>

          <div className="flex-1 z-0 text-primary-green relative">
            <h1 className="text-2xl font-medium font-['Arial'] text-left w-[90%] mx-auto relative pb-1 mb-4 after:content-[''] after:absolute after:h-0.5 after:w-[100px] after:bottom-0 after:left-0 after:bg-primary-green after:rounded-lg">
              Let's Make it Happen <br />
              Together!
            </h1>
            <p className="text-base font-['Arial'] w-[80%] text-left mx-auto relative pl-4 before:content-[''] before:bg-primary-green before:absolute before:w-1 before:rounded-lg before:h-full before:top-0 before:left-0">
              Join now to transform your workflow and instantly expand your
              referral network. Access secure patient records and achieve true
              continuity of care with the community built by providers, for
              providers. Register your verified practice today.
            </p>
          </div>

          <form className="flex-1 flex flex-col justify-center items-center relative h-full w-full m-4 p-4 text-primary-green z-10">
            <div className="w-full flex flex-row items-center justify-center m-0">
              <div
                className="w-[10%] h-full bg-center bg-no-repeat bg-contain mr-3"
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co/jZsMsxgS/Untitled-1.png')",
                }}
              />
              <p className="flex-1 text-sm font-['Times_New_Roman'] tracking-wider text-left text-green-700">
                Already have an accont?{" "}
                <a
                  href="#"
                  className="text-primary-green font-semibold transition-all duration-200 relative cursor-pointer hover:after:content-[''] hover:after:absolute hover:after:border-b-2 hover:after:border-green-700 hover:after:animate-fadeIn hover:after:bottom-0 hover:after:left-0"
                >
                  Sign in here!
                </a>
              </p>
            </div>

            <div className="w-full flex flex-col items-start pt-4">
              <h1 className="w-full text-2xl font-semibold my-0.5 font-['Times_New_Roman'] tracking-wider">
                Create An Account
              </h1>

              <div className="flex my-1 justify-start items-start w-full gap-4">
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">
                    First Name(s):
                  </label>
                  <input
                    required
                    className="w-[95%] text-base mt-0.5 p-1 px-1 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                  />
                </div>
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">Last Name:</label>
                  <input
                    required
                    className="w-[95%] text-base mt-0.5 p-1 px-1 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex my-1 justify-start items-start w-full gap-4">
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">Gender:</label>
                  <select
                    value={selectedGender}
                    onChange={handleGenderDropDownChange}
                    id="gender"
                    className="w-[98%] text-base mt-0.5 p-1 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                    required
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">Contact No:</label>
                  <PhoneInput
                    value={phoneNumber}
                    onChange={handleChange}
                    placeholder="eg. 98765 43210"
                    defaultCountry="IN"
                    className={`w-[95%] text-base mt-0.5 p-1 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus-within:border-2 focus-within:border-primary-green focus-within:outline-none ${
                      errorColor ? "border-red-500 ring-1 ring-red-500" : ""
                    }`}
                    inputProps={{
                      id: "phone",
                      required: true,
                    }}
                  />
                </div>
              </div>

              <div className="flex my-1 justify-start items-start w-full gap-4">
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">
                    Date of Birth:
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: "small",
                          className: "w-full focus:ring-0",
                        },
                      }}
                      value={date}
                      onChange={(value) => setDate(value)}
                      className="w-[95%] mt-0.5"
                    />
                  </LocalizationProvider>
                </div>
                <div className="flex flex-col items-start justify-center w-full font-['Times_New_Roman']">
                  <label className="text-sm tracking-wider">Email Id:</label>
                  <input
                    type="email"
                    required
                    className="w-[95%] text-base mt-0.5 p-1 px-1 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-2 focus:border-primary-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center w-full mt-6">
                <button
                  type="button"
                  className="flex-1 py-1 text-lg rounded-md tracking-wider border-none text-white bg-red-700 transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-1 text-lg rounded-md tracking-wider border-none text-white bg-primary-green transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
