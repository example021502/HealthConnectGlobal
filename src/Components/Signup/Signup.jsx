import { useState, useContext } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AuthContext } from "../Context/Context";

function Signup() {
  const { setView } = useContext(AuthContext);
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
    setNext(!next);
  };

  const handleSignupasDropDownChange = (e) => {
    e.preventDefault();
    setSelectedRole(e.target.value);

    if (e.target.value !== "specialist") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleSignin = () => {
    setView("signin");
  };

  // START: Render
  return (
    <div className="m-0 h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[rgba(255,255,255,0.7)] to-[rgba(255,255,255,1)] before:inset-0 before:backdrop-blur-sm before:z-[-1]">
      <img
        src="https://i.ibb.co/bj1ddtQT/e616b3cb645a76073349196dc487a018.jpg"
        alt=""
        className="absolute w-full h-full object-cover"
      />
      {next ? (
        // START: Second Form (Account Details)
        <div className="w-[74%] h-[90%] flex items-center justify-center rounded-2xl p-10 relative transition-all duration-300 ease-in-out bg-[rgba(255,255,255,0.5)]">
          <div className="flex flex-col justify-center items-start tracking-wider max-w-[32em] h-[20em] m-auto shadow-lg p-10 pr-[5em] gap-2 transition-all ease-in-out duration-200 rounded-2xl bg-[rgba(255,255,255,1)]">
            <h1 className="uppercase font-bold text-2xl w-full text-left text-[rgba(37,73,43,1)]">
              Sign Up
            </h1>
            <p className="text-left w-full tracking-wide text-gray-600 text-md">
              Join now to transform your workflow and instantly expand your
              referral network. Access secure patient records and achieve true
              continuity of care with the community built by providers, for
              providers. Register your verified practice today and start
              experiencing integrated, efficient healthcare.
            </p>
          </div>

          <form className="w-full h-full flex flex-col justify-center items-start relative m-4 ml-[-4em] p-10 gap-3 rounded-2xl bg-[rgba(255,255,255,1)] z-10 shadow-2xl">
            <i
              onClick={handleNext}
              className="ri-arrow-left-double-line flex items-center justify-center text-lg absolute top-[1em] left-[2em] p-0 text-green-700 rounded-full shadow-lg w-[3.5em] h-[1.5em] cursor-pointer transition-all ease-in-out duration-200 hover:bg-gray-500 bg-gray-100 hover:text-white"
            >
              <span className="text-sm">Back</span>
            </i>
            <input
              type="text"
              id="country"
              placeholder="Country"
              required
              className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Home Address"
              id="homeaddress"
              required
              className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              id="setpassword"
              required
              className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmpassword"
              required
              className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
            />
            <div className="flex flex-col items-start justify-center w-full text-base font-serif tracking-wider">
              <label className="text-xs text-gray-500 tracking-wide">
                Signing up As:
              </label>
              <select
                value={selectedRole}
                onChange={handleSignupasDropDownChange}
                id="signupas"
                className="w-full text-sm py-1 px-1 rounded-md border border-gray-300 text-gray-500 transition-all duration-200 ease-in-out focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
                required
              >
                {SigningRoles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              id="specialty"
              placeholder="Specialty"
              disabled={disable}
              className={`w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:outline-none ${
                disable
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                  : "focus:border-2 focus:border-[rgba(37,73,43,0.6)]"
              }`}
              required
            />

            <p className="text-left text-xs flex flex-row items-center justify-start tracking-wide w-full">
              <input
                type="checkbox"
                required
                className="mr-1 accent-[rgba(37,73,43,0.6)]"
              />{" "}
              I accept the
              <a
                href="#"
                className="cursor-pointer text-[rgba(37,73,43,.6)] font-semibold relative transition-all duration-200 ml-1 hover:border-b-1 hover:border-[rgba(37,73,43,1)] hover:text-[rgba(37,73,43,1)]"
              >
                Terms & Conditions.
              </a>
            </p>

            <div className="flex gap-4 items-center justify-center w-full mt-4">
              <button
                type="submit"
                className="flex-1 py-1 text-sm rounded-md tracking-wider text-green-800 bg-[rgba(37,73,43,0.1)] transition-all duration-200 ease-in-out shadow-lg hover:bg-[rgba(37,73,43,0.2)]  hover:shadow-md"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setView("home")}
                className="flex-1 py-1 text-sm rounded-md tracking-wider text-red-700 bg-red-100 transition-all duration-200 ease-in-out shadow-lg hover:bg-red-200  hover:shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        // START: First Form (Personal Details)
        <div className="w-[74%] h-[90%] flex items-center justify-center rounded-2xl p-8 relative bg-[rgba(255,255,255,0.4)] transition-all duration-200 ease-in-out">
          <div className="max-w-[32em] min-h-[20em] flex flex-col items-center justify-center z-0 p-6 pr-[6em] gap-4 bg-[rgba(240,239,239,1)] relative rounded-2xl shadow-lg">
            <h1 className="text-xl uppercase font-bold text-left w-full tracking-wide text-[rgba(37,73,43,1)]">
              Let's Make it Happen <br />
              Together!
            </h1>
            <p className="text-sm w-full text-left relative tracking-wide">
              Join now to transform your workflow and instantly expand your
              referral network. Access secure patient records and achieve true
              continuity of care with the community built by providers, for
              providers. Register your verified practice today.
            </p>
          </div>

          <form className="w-full h-fit flex flex-col justify-center items-start relative m-4 ml-[-4em] p-8 rounded-2xl bg-[rgba(255,255,255,1)] z-10 shadow-2xl">
            <div className="w-full flex flex-col items-start gap-4 ">
              <p className="w-full text-xs tracking-wider text-left ">
                Already have an accont?{" "}
                <a
                  onClick={handleSignin}
                  className="font-semibold transition-all duration-200 relative cursor-pointer"
                >
                  Sign in
                </a>
              </p>
              <h1 className="w-full text-lg font-bold uppercase tracking-wider text-[rgba(37,73,43,1)]">
                Create An Account
              </h1>

              <input
                required
                placeholder="firstname"
                className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
              />
              <input
                required
                placeholder="lastname"
                className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
              />

              <select
                value={selectedGender}
                onChange={handleGenderDropDownChange}
                id="gender"
                className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
                required
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="email"
                required
                className="w-full text-sm py-1 px-2 rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus:border-1 focus:border-[rgba(37,73,43,0.6)] focus:outline-none"
                placeholder="email id ~ eg: example@gmail.com"
              />
              <PhoneInput
                inputStyle={{
                  outline: "none !important",
                  boxShadow: "none !important",
                }}
                value={phoneNumber}
                onChange={handleChange}
                placeholder="eg. 98765 43210"
                defaultCountry="IN"
                className={`w-full px-2 py-[5px] rounded-md border border-gray-300 text-gray-700 transition-all duration-200 focus-within:border-[rgba(37,73,43,0.6)] focus-within:border-1 focus-within:outline-none ${
                  errorColor ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                inputProps={{
                  id: "phone",
                  required: true,
                }}
              />

              <div className="flex flex-row items-center justify-center gap-2 w-full">
                <label className="text-sm text-gray-500">D.O.B:</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{
                      textField: {
                        size: "small", // Keep for smallest standard sizing
                        sx: {
                          // 1. Target the Root and InputBase Container
                          "& .MuiInputBase-root": {
                            // Reduces the height of the border/background area
                            padding: "0 8px",
                          },

                          // 2. Target the actual input element (for height control)
                          "& .MuiInputBase-input": {
                            // Adjust vertical padding to be even smaller
                            padding: "4px 8px",
                            // Crucially, set the line-height to control the intrinsic height
                            lineHeight: "1.2",
                            fontSize: "0.75rem", // A small, readable size (0.65rem might be too small)
                          },

                          // 3. Target the Input Label (If you are using one)
                          "& .MuiInputLabel-root": {
                            // Make the label smaller
                            fontSize: "0.75rem",
                            // Adjust the label position to match the reduced padding
                            transform: "translate(14px, 5px) scale(1)",

                            // For the shrink state (label is above the input)
                            "&.MuiInputLabel-shrink": {
                              transform: "translate(14px, -9px) scale(0.75)",
                            },
                          },

                          // 4. Target the Calendar Icon Adornment (for vertical centering)
                          "& .MuiInputAdornment-root": {
                            marginTop: "0 !important", // Ensures the icon is vertically aligned
                          },
                        },
                        // Remove 'p-2' as it conflicts with the precise 'sx' padding
                        className: "w-full focus:ring-0 text-sm",
                      },
                    }}
                    value={date}
                    onChange={(value) => setDate(value)}
                    className="w-full"
                  />
                </LocalizationProvider>
              </div>

              <div className="flex gap-4 items-center justify-center w-full mt-4">
                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="flex-1 bg-red-100 py-1 text-sm rounded-md tracking-wider shadow-lg border-red-300 transition-all duration-200 ease-in-out hover:bg-red-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-1 text-sm rounded-md tracking-wider text-[rgba(37,73,43,1)] bg-[rgba(37,73,43,0.08)] transition-all duration-200 ease-in-out shadow-lg hover:bg-[rgba(37,73,43,0.2)] hover:-translate-y-0.5 hover:shadow-md"
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
