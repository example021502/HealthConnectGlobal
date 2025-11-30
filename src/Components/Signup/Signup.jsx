import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/Context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  BriefcaseMedical,
  User,
  Mail,
  Phone,
  Calendar,
  Lock,
  ChevronDown,
  MapPin,
  Building,
  GraduationCap,
  ArrowLeft,
  Check,
} from "lucide-react";

function Signup() {
  const [checkingAuthentication, setCheckAuthentication] = useState(false);
  const { setView } = useContext(AuthContext);
  const [errorColor, setErrorColor] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [disable, setDisable] = useState(false);
  const [next, setNext] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [countryCode, setCountryCode] = useState("in");

  const primaryColor = "text-[#104d5e]";
  const accentBg = "bg-[#549056]";
  const accentText = "text-[#549056]";
  const accentHoverBg = "hover:bg-green-700";
  const accentHoverText = "hover:text-green-700";
  const primaryBg = "bg-[#104d5e]";
  const primaryLightText = "text-[#104d5e]/80";
  const focusRing = "focus:ring-[#549056]";
  const focusBorder = "focus:border-[#549056]";

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "prefer not to say" },
  ];

  const SigningRoles = [
    { label: "Select Role", value: "" },
    { label: "Patient", value: "patient" },
    { label: "Health Specialist", value: "specialist" },
    { label: "Hospital", value: "hospital" },
    { label: "General Doctor", value: "general doctor" },
    { label: "Nurse", value: "nurse" },
  ];

  function handlePhoneChange(value) {
    setPhoneNumber(value);
  }

  const handleCountryChange = (value) => {
    setCountryCode(value);
  };

  const handleGenderDropDownChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setSignupError("");
    setErrorColor(false);

    if (!firstName) {
      setSignupError("Enter your first name");
      return;
    }
    if (!lastName) {
      setSignupError("Enter your last name");
      return;
    }
    if (selectedGender === "") {
      setSignupError("Choose gender please!");
      return;
    }
    if (!email) {
      setSignupError("Enter you email Id");
      return;
    }
    if (!dateOfBirth) {
      setSignupError("Enter your date of birth");
      return;
    }
    if (!phoneNumber) {
      setSignupError("Enter your contact number please!");
      return;
    }

    let parsed;
    let fullE164Number;

    try {
      fullE164Number = `+${phoneNumber}`;
      parsed = parsePhoneNumberFromString(fullE164Number);
    } catch (error) {
      setSignupError("Invalid phone number format or missing country code.");
      setErrorColor(true);
      return;
    }

    const isValid = parsed && parsed.isValid();

    if (!isValid) {
      setSignupError("Invalid phone number format.");
      setErrorColor(true);
      return;
    }

    setNext(true);
  };

  const handleBack = () => {
    setNext(false);
    setSignupError("");
  };

  const handleSignupasDropDownChange = (e) => {
    setSelectedRole(e.target.value);

    if (e.target.value !== "specialist") {
      setDisable(true);
      setSpecialty("");
    } else {
      setDisable(false);
    }
  };

  const handleSignin = () => {
    setView("signin");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setSignupError("");

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    if (selectedRole === "specialist" && !specialty) {
      setSignupError("Please specify your specialty.");
      return;
    }

    setView("signin");
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-2 font-sans">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden h-[90%] transition-all duration-500 ease-in-out">
        <div
          className={`hidden md:flex flex-col justify-center p-5 w-2/3 ${primaryBg} text-gray-200 transition-opacity duration-500`}
        >
          <BriefcaseMedical className="w-16 h-16 mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold tracking-tight mb-4 trakcing-wide">
            {next ? "Account Details" : "Welcome Aboard!"}
          </h1>
          <p className="text-gray-200 text-md leading-relaxed">
            Join now to transform your workflow and instantly expand your
            referral network. Access secure patient records and achieve true
            continuity of care with the community built by providers, for
            providers.
          </p>
          <p className="text-gray-300 mt-6 text-xs">
            {next
              ? "Almost done! Set your secure password and specify your professional role."
              : "Start your journey to integrated, efficient healthcare today."}
          </p>
        </div>
        <div
          className={`w-full p-6 md:p-10 flex flex-col items-start justify-center relative ${
            next ? "transition-opacity duration-500 pt-12" : ""
          }`}
        >
          <div className="text-left mb-1">
            <h2 className={`text-[1.4em] font-bold ${primaryColor}`}>
              {next ? "Set Account Security" : "Create Your Profile"}
            </h2>
            <p className="text-sm text-gray-500 flex items-start justify-center lg:justify-start">
              <span>Already have an account?</span>
              <button
                type="button"
                onClick={handleSignin}
                className={`font-semibold ${accentText} ${accentHoverText} transition-all duration-200 ml-1`}
              >
                Sign in
              </button>
            </p>
          </div>
          {signupError && (
            <div
              className="text-sm text-red-700 bg-red-100 px-2 rounded-sm mb-1"
              role="alert"
            >
              {signupError}
            </div>
          )}
          {next ? (
            <form onSubmit={handleCreateAccount} className="space-y-4 w-full">
              <button
                type="button"
                onClick={handleBack}
                className={`${accentText} hover:text-white ${accentHoverBg} transition-all ease-in hover:duration-100 duration-150 flex items-center justify-center text-sm font-medium absolute md:left-10 md:top-4 top-4 shadow-md px-4 py-2 rounded-2xl bg-gray-200`}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span>Back</span>
              </button>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Home Address"
                  id="homeaddress"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  id="setpassword"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedRole}
                  onChange={handleSignupasDropDownChange}
                  id="signupas"
                  className={`appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                  required
                >
                  {SigningRoles.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <div className={`relative ${disable ? "hidden" : "flex"} `}>
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="specialty"
                  placeholder="Specialty (e.g., Cardiology, General Practice)"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  disabled={disable}
                  required={!disable}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border text-gray-700 transition-all duration-200 focus:outline-none ${
                    disable
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                      : `${focusRing} ${focusBorder} border-gray-300`
                  }`}
                />
              </div>
              <p className="text-left text-xs flex items-center justify-start tracking-wide w-full">
                <input
                  type="checkbox"
                  required
                  className={`mr-2 accent-[#549056] rounded`}
                />
                <span>I accept the</span>
                <a
                  href="#"
                  className={`cursor-pointer ${accentText} font-medium ml-1 ${accentHoverText} transition-all duration-200 border-b border-transparent hover:border-[#549056]`}
                >
                  Terms & Conditions.
                </a>
              </p>
              <div className="flex gap-4 items-center justify-center w-full pt-1">
                <button
                  type="submit"
                  className={`flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-white ${accentBg} transition-all duration-200 ease-in-out shadow-lg ${accentHoverBg} hover:shadow-xl flex items-center justify-center`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-gray-600 bg-gray-200 transition-all duration-200 ease-in-out shadow-lg hover:bg-gray-300 hover:shadow-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-4 w-full" onSubmit={handleNext}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                />
              </div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedGender}
                  onChange={handleGenderDropDownChange}
                  id="gender"
                  className={`appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                  required
                >
                  {genderOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.value === ""}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`}
                  placeholder="Email ID ~ eg: example@gmail.com"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                <PhoneInput
                  required
                  international
                  country={countryCode}
                  placeholder="Contact Number"
                  className="phone-input-override-wrapper"
                  inputProps={{
                    required: true,
                    autoformat: "false",
                    className:
                      `w-full pl-20 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 ` +
                      `transition-all duration-200 ${focusRing} ${focusBorder} focus:outline-none`,
                  }}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  onCountryChange={handleCountryChange}
                />
                {errorColor && (
                  <p className="text-red-500 text-xs my-auto absolute left-2 bottom-full">
                    Invalid phone number
                  </p>
                )}
              </div>
              <div className="relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      required
                      size="small"
                      onChange={(val) => setDateOfBirth(val)}
                      label="Date of Birth"
                      name="startDate"
                      className="w-full text-sm text-gray-300 !border-none"
                      fullWidth
                      slotProps={{
                        textField: {
                          size: "small",
                          margin: "",
                          className:
                            "w-full !rounded-lg !border-none !border-gray-300",
                          sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                              { border: "none", borderColor: "#549056" },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              { border: "none" },
                            "& .MuiInputBase-input": {
                              fontSize: "5px",
                              color: "red",
                              border: "none",
                            },
                            "& .MuiInputBase-root": {
                              padding: 0,
                              border: "none",
                            },
                          },
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="flex gap-4 items-center justify-center w-full pt-6">
                <button
                  type="button"
                  onClick={() => setView("home")}
                  className="flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-gray-600 bg-gray-200 transition-all duration-200 ease-in-out shadow-lg hover:bg-gray-300 hover:shadow-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-white ${accentBg} transition-all duration-200 ease-in-out shadow-lg ${accentHoverBg} hover:shadow-xl`}
                >
                  Next
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
