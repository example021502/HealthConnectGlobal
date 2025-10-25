import { useState, useContext } from "react";
import { AuthContext } from "../Context/Context";

function Signin() {
  const { view, setView } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (formData.email === "user" && formData.password === "password") {
        console.log("Sign-in successful with email!");
        // Example: Set view to dashboard on successful login
        // setView("specialist");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    setView("signup");
  };

  const handleCancel = () => {
    setFormData({ username: "", password: "" });
    setView("home");
  };

  return (
    <div className="m-0 flex flex-col items-center justify-center h-screen relative overflow-hidden bg-[rgba(0,0,0)] font-sans">
      <img
        src="https://i.ibb.co/cKYXHWMv/4ac8c907a861b930604dcd5f35339288.jpg"
        alt=""
        className="absolute w-full h-full object-cover"
      />
      <div className="flex flex-row-reverse w-[70%] h-[80%] items-center z-1 rounded-2xl relative before:bg-[rgba(255,255,255,0.2)] before:absolute before:inset-0 before:backdrop-blur-sm before:rounded-2xl before:shadow-2xl shadow-2xl">
        <div className="rounded-tr-2xl rounded-br-2xl h-full w-[60%] flex justify-center items-center p-10">
          <form
            onSubmit={handleSignIn}
            className="h-full w-full flex flex-col items-center justify-center gap-6 bg-[rgba(255,255,255,1)] z-3 rounded-2xl text-[rgba(37,73,43,1)]"
          >
            <h1 className="text-2xl font-bold w-[60%] tracking-wider">
              Sign in
            </h1>

            <div className="flex flex-col items-center justify-center gap-4 w-[60%]">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email id"
                value={formData.email}
                onChange={handleInputChange}
                className="text-sm w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-[rgba(37,73,43,0.6)]"
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="text-sm w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-[rgba(37,73,43,0.6)]"
              />

              {error && (
                <p className="text-red-500 text-sm w-[60%] text-left">
                  {error}
                </p>
              )}
            </div>
            <div className="w-[60%] flex items-center justify-center gap-4">
              <button
                type="submit"
                className="flex-1 text-sm py-1.5 shadow-lg border-t-1 border-[rgba(37,73,43,1)] rounded-md text-[rgba(37,73,43,1)] transition-all duration-200 hover:bg-[rgba(37,73,43,0.08)] hover:-translate-y-0.5 hover:shadow-md"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign in"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 text-sm py-1.5 border-t-1 rounded-md text-red-700 border-red-700 transition-all duration-200 shadow-lg hover:bg-red-100 hover:-translate-y-0.5 hover:shadow-md"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-600 mt-1 w-[60%]">
              Don't have an account?{" "}
              <a
                onClick={handleSignup}
                className="text-[rgba(37,73,43,1)] font-semibold transition-all duration-200 hover:border-b-2 hover:border-green-700"
              >
                Click here
              </a>
            </p>
          </form>
        </div>

        <div className="z-2 w-[80%] h-full relative rounded-tl-2xl rounded-bl-2xl flex items-center justify-center">
          <img
            src="https://i.ibb.co/0RM7X5Pz/How-To-Find-The-Right-Healthcare-App-Development-Company-For-Your-Needs.jpg"
            alt=""
            className="absolute w-full h-full object-cover z-3 rounded-tl-2xl rounded-bl-2xl"
          />
          <div className="text-[rgba(37,73,43,1)] z-4 bg-[rgba(255,255,255,0.8)] p-4 rounded-2xl h-fit w-[64%] m-auto flex shadow-2xl items-start gap-3 justify-center flex-col">
            <h2 className="text-xl flex flex-col gap-1 font-bold tracking-wide poppins-medium uppercase">
              <span>Welcome</span>
              <span className="text-[0.5em] font-lighter tracking-wide">
                Beyond the Local Search.
                <br />
                Your World of Care.
              </span>
            </h2>

            <p className="text-sm">
              World-class healthcare has no borders. We connect you securely and
              seamlessly with top global doctors and hospitals, eliminating
              complexity, distance, and the wait.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
