import { AuthContext } from "../Context/Context";
import { useContext, useEffect } from "react";

function Home() {
  const { view, setView } = useContext(AuthContext);

  useEffect(() => {
    console.log("Home View State:", view);
  }, [view]);

  const handleSignin = () => {
    setView("signin");
  };
  const handleSignup = () => {
    setView("signup");
  };
  return (
    <div className="w-full relative flex items-center justify-center h-screen bg-[rgb(0,0,0)]">
      <img
        src="https://i.ibb.co/zVTTrXmV/b.jpg"
        alt="Welcome to InterHealthConnect"
        className="absolute w-full h-full object-cover opacity-90"
      />
      <div className="z-1 shadow-sm max-w-[80%] max-h-[90%] flex flex-col justify-center items-center px-6 py-4 overflow-y-hidden gap-4 rounded-2xl before:absolute relative before:backdrop-blur-xs before:inset-0 before:z-[-1] before:bg-[rgba(255,255,255,0.8)] before:rounded-2xl">
        {/* nav bar */}
        <div className="z-50 text-[rgb(22,101,22,0.8)] flex py-2 px-4 bg-[rgba(255,255,255,0.8)] rounded-lg shadow-2xl min-w-full">
          <div
            className="min-h-10 min-w-20 my-2 mx-4"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/jZsMsxgS/Untitled-1.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
          <div className=" mx-4 flex flex-row justify-center items-center gap-4 text-xs font-lighter">
            <a
              href="#"
              className="flex items-center transition-all duration-200 hover:text-[rgb(22,101,22)] hover:-translate-y-px"
            >
              <i className="ri-globe-line mr-1" />
              Language
              <i className="ri-expand-up-down-fill ml-0.5 text-xs" />
            </a>
            <a
              href="#"
              className="flex items-center transition-all duration-200 hover:text-[rgb(22,101,22)] hover:-translate-y-px"
            >
              Customer Support
              <i className="ri-customer-service-2-line ml-0.5" />
            </a>
            <a
              href="#"
              className="flex items-center transition-all duration-200 hover:text-[rgb(22,101,22)] hover:-translate-y-px"
            >
              About
              <i className="ri-information-line ml-0.5" />
            </a>
          </div>

          <div className="tracking-wider ml-auto mr-4 flex gap-6 items-center justify-center">
            <a
              onClick={handleSignup}
              className="text-sm bg-[rgba(35,73,43,0.09)] transition-all duration-200 ease-in-out cursor-pointer px-5 py-1 rounded-md shadow-md hover:bg-[rgb(37,73,43,0.2)]"
            >
              Sign up
            </a>
            <button
              onClick={handleSignin}
              className="text-sm bg-[rgba(37,73,43,0.09)] cursor-pointer font-lighter px-5 py-[10px] rounded-md tracking-wider transition-all duration-200 ease-in-out hover:bg-[rgb(37,73,43,0.2)] hover:transition-all hover:ease-in-out shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
        {/* bottom */}
        <div className="h-fit flex items-center justify-center flex-row w-full relative">
          <div className="flex flex-col h-fit items-start justify-center px-10 gap-4 py-10 mr-[-4em] shadow-2xl bg-[rgba(255,255,255,1)] z-1 rounded-2xl before:absolute relative before:backdrop-blur-xm before:inset-0 before:z-[-1]">
            <p className="text-md text-primary-green font-semibold tracking-wider text-left m-0">
              Global care. Local ease.
            </p>
            <h1 className="text-2xl text-left font-bold">
              We are here for your Care
            </h1>
            <p className="text-sm tracking-wider text-left">
              Finding the one specialist with experience in a rare condition can
              be a challenge. Our intelligent matching algorithm connects you to
              the precise international expertise you need in minutes,
              drastically reducing diagnostic delays.
            </p>

            <button className="mt-4 text-[rgb(54,154,70)] text-md py-1 px-4 rounded-md shadow-md tracking-wider text-[rgba(37,73,43,0.8 transition-all duration-200 bg-[rgb(54,154,70,0.08)] hover:bg-[rgb(54,154,70,0.2)]">
              Learn More
            </button>

            <div className="flex justify-start items-start gap-8 mt-4">
              <button
                onClick={handleSignin}
                className="text-sm font-lighter bg-[rgba(37,73,43,0.08)] text-[rgba(37,73,43,1)] rounded-md py-1 px-5 transition-all duration-200 hover:bg-[rgba(37,73,43,0.2)] shadow-md"
              >
                Sign in
              </button>
              <button
                onClick={handleSignup}
                className="text-sm font-lighter py-1 px-5 text-[rgb(35,25,171)] bg-[rgba(35,25,171,0.08)] rounded-md transition-all duration-200 hover:bg-[rgba(35,25,171,0.2)] shadow-md"
              >
                Sign up
              </button>
            </div>
          </div>
          <img
            src="https://i.ibb.co/5WCwrkf7/interaction1.jpg"
            alt=""
            className="rounded-lg opacity-80 m-0 max-h-[26em] min-w-[36em] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
