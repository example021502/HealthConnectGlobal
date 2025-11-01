import { useContext, useState } from "react";
import { Lock, Mail, BriefcaseMedical, LogIn, Cross } from "lucide-react";
import { AuthContext } from "../Context/Context";

function Signin() {
  // Access the view state setter from context
  const { setView } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [closeOverlay, setCloseOverlay] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setView("patient");
    // setError("");

    // if (!email || !password) {
    //   setError("Please enter both email and password.");
    //   return;
    // }

    // // 2. SIMULATE DATABASE LOOKUP (Checking patient table then specialist table)
    // const userFound = mockUsers.find(
    //   (user) => user.email === email && user.password === password
    // );

    // if (userFound) {
    //   const targetView = userFound.role;

    //   console.log(
    //     `Mock Login Success: Routing user as ${userFound.role} to view: ${targetView}`
    //   );

    //   // ***In a real app, you would sign in the user here using Firebase Auth
    //   // ***For now, we simulate success and route based on the derived role.
    //   // ***Use the setView function from context to navigate
    //   setView(targetView);
    // } else {
    //   setError("Invalid credentials. Please check your email and password.");
    // }
  };

  const navigateToSignup = () => {
    setView("signup");
  };

  const handleCancel = () => {
    setCloseOverlay(true);
  };

  const handleConfirmed = () => {
    setView("home");
    setCloseOverlay(false);
  };

  return (
    <div className="flex justify-center relative items-center w-full min-h-screen bg-gray-50 p-4">
      {closeOverlay && (
        <div className="w-full h-full absolute top-0 left-0 z-1000 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
          <div className="h-fit w-60 flex flex-col items-center justify-center gap-4 p-5 shadow-lg bg-indigo-50 rounded-2xl">
            <p className="flex flex-row text-lg gap-1">
              <span>Confirm to</span>
              <span className="text-red-600 font-bold">Close</span>
            </p>
            <div className="flex items-center justify-center gap-4 w-full">
              <button
                onClick={handleConfirmed}
                className="p-1 w-full text-sm flex items-center justify-center rounded-2xl font-semibold bg-indigo-500 text-white"
              >
                Yes
              </button>
              <button
                onClick={() => setCloseOverlay(false)}
                className="p-1 w-full rounded-2xl flex items-center justify-center text-sm text-white font-semibold bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full max-w-md relative bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 hover:shadow-3xl">
        <button
          id="cancel"
          type="cancel"
          onClick={handleCancel}
          className="h-10 w-10 flex absolute top-10 right-10 rounded-full justify-center items-center border border-transparent shadow-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 ease-in-out transform hover:scale-[1.01] hover:rotate-[180deg] hover:shadow-sm"
        >
          <Cross className="h-5 w-5 object-cover rotate-[45deg]" />
        </button>
        <div className="text-center mb-8">
          <BriefcaseMedical className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
          <p className="text-gray-500 mt-2">
            Log in to access your secure health portal.
          </p>
        </div>

        {error && (
          <div
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                // required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="you@health.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                // required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base"
                placeholder="••••••••"
              />
            </div>
          </div>
          {/* Submit Button */}

          <button
            id="login"
            type="submit"
            onClick={handleLogin}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:scale-[1.01]"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={navigateToSignup}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
