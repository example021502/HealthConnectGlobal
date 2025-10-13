import { useState } from "react";

function Signin() {
  // START: State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // START: Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Attempting to sign in with:", formData);
      // NOTE: Using 'username' for the check, but input names are 'email'/'password'
      if (formData.username === "user" && formData.password === "password") {
        console.log("Sign-in successful!");
        // setView("signed");
      } else {
        // Fallback for actual input names if the user changes the form's name properties
        if (formData.email === "user" && formData.password === "password") {
          console.log("Sign-in successful with email!");
        } else {
          throw new Error("Invalid username or password.");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ username: "", password: "" });
    // setView("");
  };

  // START: Render
  return (
    <div className="m-0 flex flex-col items-center justify-center h-screen relative overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-300 font-sans">
      <div className="relative flex w-[80%] h-[80%] justify-center items-center overflow-hidden z-10 rounded-md bg-gradient-to-br from-blue-50 to-blue-200 p-4">
        <div className="h-[80%] w-[90%] flex flex-row items-center justify-center shadow-lg rounded-md z-10 p-1.5 bg-white/70 backdrop-blur-sm">
          {/* START: Absolute Circles (Decorative Background) */}
          <div className="absolute top-[-55%] left-0 h-[450px] w-[450px] rounded-full bg-indigo-300 opacity-30"></div>
          <div className="absolute top-[-15%] left-[20%] h-[200px] w-[200px] rounded-full bg-indigo-300 opacity-60"></div>
          <div className="absolute bottom-[-30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-300 opacity-20 z-0"></div>

          {/* START: Signin Text Section */}
          <div className="flex-1 p-0 flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl m-0 mt-0 text-left w-[80%] font-bold text-gray-800">
              Sign In
            </h1>
            <p className="text-base text-left w-[80%] m-0 leading-relaxed tracking-wider relative before:content-[''] before:absolute before:left-[-15px] before:top-0 before:w-1.5 before:h-full before:bg-gray-700 before:rounded-lg text-gray-600 pl-4">
              Welcome Back. Log in to instantly connect with your global care
              network and manage your health.
            </p>
          </div>

          {/* START: Form Section */}
          <form
            onSubmit={handleSignIn}
            className="border border-indigo-300 ml-auto mr-8 w-[350px] h-fit flex flex-col items-center justify-start gap-4 rounded-md p-4 bg-white shadow-xl z-20"
          >
            <div className="h-12 w-full flex items-center justify-center py-4 gap-4">
              <div
                className="h-full w-20 bg-center bg-no-repeat bg-contain"
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co/jZsMsxgS/Untitled-1.png')",
                }}
              />
              <h1 className="text-xl font-semibold tracking-wider text-gray-800">
                HealthCare
              </h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 w-full">
              {/* Email Input */}
              <div className="flex flex-wrap items-start justify-start w-[90%]">
                <label
                  htmlFor="email"
                  className="w-20 text-left text-lg text-gray-700"
                >
                  Email Id:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 text-lg px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-400"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-wrap items-start justify-start w-[90%]">
                <label
                  htmlFor="password"
                  className="w-20 text-left text-lg text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="flex-1 text-lg px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-400"
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm w-[90%] text-center">
                  {error}
                </p>
              )}

              {/* Buttons */}
              <div className="w-[90%] flex items-center justify-center gap-4 mt-2">
                <button
                  type="submit"
                  className="flex-1 text-lg py-1.5 border-none rounded-lg text-white bg-primary-green transition-all duration-200 hover:bg-green-700 hover:-translate-y-0.5"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign in"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 text-lg py-1.5 border-none rounded-lg text-white bg-red-700 transition-all duration-200 hover:bg-red-600 hover:-translate-y-0.5"
                >
                  Cancel
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-sm text-gray-600 mt-2">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-primary-green font-semibold transition-all duration-200 hover:border-b-2 hover:border-green-700"
                >
                  Click here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
