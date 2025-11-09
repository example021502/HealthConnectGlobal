import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import isValidPhoneNumber from "libphonenumber-js";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Lucide Icons
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

  // START: Handlers
  function handlePhoneChange(value) {
    setPhoneNumber(value);
    // if (value && !isValidPhoneNumber(value)) {
    //   setErrorColor(true);
    // } else {
    //   setErrorColor(false);
    // }
  }

  const handleGenderDropDownChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!firstName) {
      setSignupError("Enter your first name");
    } else if (!lastName) {
      setSignupError("Enter your last name");
    } else if (selectedGender === "") {
      setSignupError("Choose gender please!");
    } else if (!phoneNumber) {
      setSignupError("Enter your contact number please!");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setErrorColor(true);
    } else if (!dateOfBirth) {
      setSignupError("Enter your date of birth");
    } else if (!email) {
      setSignupError("Enter you email Id");
    }
    setSignupError("");
    setErrorColor(false);
    setNext(true);
    return;
  };

  const handleBack = () => {
    setNext(false);
    setSignupError("");
  };

  const handleSignupasDropDownChange = (e) => {
    setSelectedRole(e.target.value);

    // Only allow specialty input if the role is 'specialist'
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

    // Final check for specialty if role is specialist
    if (selectedRole === "specialist" && !specialty) {
      setSignupError("Please specify your specialty.");
      return;
    }

    console.log("Attempting to create account...");
    const targetView = selectedRole === "patient" ? "patient" : "specialist";
    setView(targetView);
  };

  // START: Render
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-2 font-sans">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[450px] transition-all duration-500 ease-in-out">
        {/* Left Panel: Messaging / Branding */}
        <div className="hidden md:flex flex-col justify-center p-5 w-1/2 bg-indigo-600 text-white transition-opacity duration-500">
          <BriefcaseMedical className="w-16 h-16 mb-6" />
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            {next ? "Account Details" : "Welcome Aboard!"}
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Join now to transform your workflow and instantly expand your
            referral network. Access secure patient records and achieve true
            continuity of care with the community built by providers, for
            providers.
          </p>
          <p className="text-indigo-300 mt-6 text-sm">
            {next
              ? "Almost done! Set your secure password and specify your professional role."
              : "Start your journey to integrated, efficient healthcare today."}
          </p>
        </div>

        {/* Right Panel: Form */}
        <div className="w-lg m-auto lg:w-1/2 p-8 md:p-10 md:w-1/2 flex flex-col justify-center relative">
          <div className="mb-4 mt-4 text-center lg:text-left">
            <h2 className="text-[1.5em] font-bold text-gray-900 mb-2">
              {next ? "Set Account Security" : "Create Your Profile"}
            </h2>
            <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleSignin}
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-all duration-200 ml-1"
              >
                Sign in
              </button>
            </p>
          </div>

          {signupError && (
            <div
              className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              {signupError}
            </div>
          )}

          {next ? (
            // START: Second Form (Account Details)
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-indigo-600 hover:text-indigo-800 transition duration-150 flex items-center text-sm font-medium absolute left-10 top-4 shadow-md px-4 py-2 rounded-2xl bg-gray-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              {/* Country Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Home Address Input */}
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Home Address"
                  id="homeaddress"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  id="setpassword"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmpassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Role Dropdown */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedRole}
                  onChange={handleSignupasDropDownChange}
                  id="signupas"
                  className="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
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

              {/* Specialty Input (Conditional) */}
              <div className="relative">
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
                      : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  }`}
                />
              </div>

              {/* Terms Checkbox */}
              <p className="text-left text-xs flex items-center justify-start tracking-wide w-full">
                <input
                  type="checkbox"
                  required
                  className="mr-2 accent-indigo-600 rounded"
                />{" "}
                <span>I accept the</span>
                <a
                  href="#"
                  className="cursor-pointer text-indigo-600 font-medium ml-1 hover:text-indigo-800 transition-all duration-200 border-b border-transparent hover:border-indigo-800"
                >
                  Terms & Conditions.
                </a>
              </p>

              {/* Buttons */}
              <div className="flex gap-4 items-center justify-center w-full pt-1">
                <button
                  type="submit"
                  className="flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-white bg-indigo-600 transition-all duration-200 ease-in-out shadow-lg hover:bg-indigo-700 hover:shadow-xl flex items-center justify-center"
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
            <form className="space-y-4" onSubmit={handleNext}>
              {/* First Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Last Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  required
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Gender Dropdown */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedGender}
                  onChange={handleGenderDropDownChange}
                  id="gender"
                  className="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
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

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                  placeholder="Email ID ~ eg: example@gmail.com"
                />
              </div>

              <div className="relative">
                {/* Custom Lucide Icon positioned absolutely */}
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />

                <PhoneInput
                  required
                  international
                  country={"in"}
                  placeholder="Contact Number"
                  className="phone-input-override-wrapper"
                  inputProps={{
                    required: true,
                    autoformat: "true",
                    className:
                      "w-full pl-20 pr-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 " +
                      "transition-all duration-200 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none",
                  }}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                />

                {errorColor && (
                  <p className="text-red-500 text-xs mt-1 absolute right-0 -bottom-1">
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
                              { border: "none", borderColor: "indigo-500" },
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

              {/* Buttons */}
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
                  className="flex-1 py-3 text-sm rounded-lg tracking-wider font-semibold text-white bg-indigo-600 transition-all duration-200 ease-in-out shadow-lg hover:bg-indigo-700 hover:shadow-xl"
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
