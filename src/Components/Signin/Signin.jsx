import { useContext, useState } from "react";
import { Lock, Mail, LogIn, MoveLeft } from "lucide-react";
import { AuthContext } from "../Context/Context";
import "./Signin.css";

function Signin() {
  const [isTwoAccounts, setIsTwoAccounts] = useState(false);
  const { setView, patients, specialists, setUserName } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const radialGradient =
    "[background:radial-gradient(125%_125%_at_50%_10%,rgba(16,77,94,0.8)_40%,rgba(84,144,86,0.3)_100%)]";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setIsTwoAccounts(false);
      setError("Please enter both email and password.");
      return;
    }

    const from_patients = patients.find(
      (user) => user.email === email && user.password === password
    );

    const from_specialists = specialists.find(
      (user) => user.email === email && user.user_password === password
    );

    if (from_patients && from_specialists) {
      setError("Error: Maxmum accounts per User = 1");
      setIsTwoAccounts(true);
      return;
    }
    if (from_patients && !from_specialists) {
      setView("patient");
      setIsTwoAccounts(false);

      setUserName(from_patients.first_name + " " + from_patients.last_name);
      return;
    }
    if (from_specialists && !from_patients) {
      setView("specialist");
      setIsTwoAccounts(false);

      setUserName(
        from_specialists.first_name + " " + from_specialists.last_name
      );
      return;
    }

    setError("Invalid credentials. Please check your email and password.");
  };

  const navigateToSignup = () => {
    setView("signup");
  };

  const handleBack = () => {
    setView("home");
  };

  return (
    <div
      className={`flex justify-center relative items-center w-full h-dvh bg-gray-50`}
    >
      {/* desktop signin */}
      <div className="hidden md:flex w-full h-full items-center justify-center">
        <div
          className={`absolute inset-0 z-1 h-full w-full items-center px-5 py-24 ${radialGradient}`}
        ></div>
        <div className="z-10 w-full h-full items-center justify-center flex">
          <div
            className={`w-full max-w-xl relative bg-white p-8 md:p-10 rounded-xl transition-all duration-300 hover:shadow-2xl`}
          >
            <button
              id="cancel"
              type="button"
              onClick={handleBack}
              className={`h-10 w-10 flex absolute top-10 left-10 rounded-full justify-center items-center border border-transparent font-medium text-white bg-[#549056] hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-[1.01]`}
            >
              <MoveLeft className="h-5 w-5 object-cover" />
            </button>
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-extrabold text-[#104d5e]`}>
                Inter
                <span className={`text-[#549056]`}>Health</span>Connect
              </h1>
              <p className="text-gray-500">
                Log in to access your secure health portal.
              </p>
            </div>
            {error && (
              <div
                className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                {error}
                {". "}
                {isTwoAccounts && (
                  <a
                    href="/"
                    className="hover:border-b-1 transition-all ease-in duration-100"
                  >
                    Send Email to <b>Resolve</b>
                  </a>
                )}
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
                    id="logEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#549056] focus:border-[#549056] text-base`}
                    placeholder="eg. you@health.com"
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
                    id="logPassword"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#549056] focus:border-[#549056] text-base`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                id="loginBtn"
                type="submit"
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-[#549056] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#549056] transition duration-200 ease-in-out transform hover:scale-[1.01]`}
              >
                <LogIn className="w-5 h-5 mr-2" /> Sign In
              </button>
            </form>
            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 tracking-wider">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={navigateToSignup}
                  className={`font-semibold text-base text-[#549056] hover:text-green-700 hover:scale-[1.01] transition duration-150`}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile section */}
      <section className="w-full md:hidden h-dvh flex flex-col relative items-center justify-center">
        <div
          className={`absolute inset-0 z-1 h-full w-full items-center px-5 py-24 ${radialGradient}`}
        ></div>
        {/* Added logo for mobile view */}
        <div className="w-full z-10 gap-2 flex flex-col items-center justify-center text-center mb-8">
          <img
            src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
            alt=""
            className="image object-contain w-fit h-18 pb-1 rounded-lg bg-gray-100"
          />
          <h1 className={`header text-4xl  font-extrabold text-white`}>
            Inter<span className={`text-[#549056]`}>Health</span>
            Connect
          </h1>
          <p className="text-gray-200">Secure login. Global care. </p>
        </div>
        {error && (
          <div
            className="p-3 z-10 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="space-y-6 w-full z-10 p-4 gap-4 flex flex-col"
        >
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-200" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none text-gray-200 tracking-wide block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 text-base`}
                placeholder="you@health.com"
              />
            </div>
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-200" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none tracking-wide text-gray-200 placeholder-gray-200 block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 text-base`}
                placeholder="••••••••"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            id="login"
            type="submit"
            className={`w-full flex justify-center items-center py-2 xs:py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-[#549056] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#549056] transition duration-200 ease-in-out transform hover:scale-[1.01]`}
          >
            Sign In
          </button>
        </form>
        <p className="text-white z-10 text-sm font-light tracking-wider mt-4 w-full p-4 text-left leading-6">
          Don't have an account yet?{" "}
          <span
            onClick={navigateToSignup}
            className={`text-base font-semibold text-gray-200 hover:text-gray-100 hover:border-b-1 cursor-pointer`}
          >
            Create Account
          </span>
        </p>
        {/* Back button for mobile */}
        <button
          id="cancel-mobile"
          type="button"
          onClick={handleBack}
          className={`h-10 w-10 flex absolute top-4 left-4 rounded-full justify-center items-center border border-transparent font-medium text-white bg-[#549056] hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-[1.01] z-20`}
        >
          <MoveLeft className="h-5 w-5 object-cover" />
        </button>
      </section>
    </div>
  );
}

export default Signin;
