import { useState } from "react";
import { AuthContext } from "../Context/Context";
import { useContext } from "react";

function Home() {
  const { setView } = useContext(AuthContext);
  const [hover, setHover] = useState(false);
  // START: Render
  return (
    <div className="w-full relative flex items-center justify-center h-screen bg-[rgba(255,255,255,1)]">
      <img
        src="https://i.ibb.co/LLm7hT3/e38cc443-3acb-4e33-bb94-28f1e65ff5bf.jpg"
        alt="Welcome to InterHealthConnect"
        className="absolute w-full h-full object-cover opacity-60"
      />
      <div className="z-1 shadow-lg w-[90%] h-[90%] flex flex-col justify-center items-center px-4 py-2 rounded-lg overflow-y-hidden before:absolute relative before:backdrop-blur-md before:inset-0 before:z-[-1] before:bg-[rgba(255,255,255,0.5)]">
        {/* START: Navbar */}
        <div className="z-50 text-[#166516] flex py-1.5 px-5 bg-transparent rounded-lg w-full">
          <div
            className="h-10 w-20 my-2 mx-4"
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
              className="flex items-center transition-all duration-200 hover:text-gray-300 hover:-translate-y-px"
            >
              <i className="ri-globe-line mr-1" />
              Language
              <i className="ri-expand-up-down-fill ml-0.5 text-xs" />
            </a>
            <a
              href="#"
              className="flex items-center transition-all duration-200 hover:text-gray-300 hover:-translate-y-px"
            >
              Customer Support
              <i className="ri-customer-service-2-line ml-0.5" />
            </a>
            <a
              href="#"
              className="flex items-center transition-all duration-200 hover:text-gray-300 hover:-translate-y-px"
            >
              About
              <i className="ri-information-line ml-0.5" />
            </a>
          </div>

          <div className="tracking-wider ml-auto mr-4 flex gap-6 items-center justify-center">
            <a
              onClick={() => setView("signup")}
              className="text-sm transition-all duration-200 ease-in-out font-['Segoe_UI'] hover:translate-y-[-1.5px] cursor-pointer"
            >
              Sign up
            </a>
            <button
              onClick={() => setView("signin")}
              className="text-sm  cursor-pointer font-lighter px-4 py-1 rounded-md bg-linear-to-r from-[rgb(52,155,52)] via-[rgba(54,159,54,1)] to-[rgb(52,155,52)] text-white tracking-wider border-none transition-all duration-200 hover:to-[rgb(20,78,20,1)] hover:via-[#2c802c] hover:from-[rgb(20,78,20,1)] hover:transition-all hover:ease-in-out shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* START: Landing Section */}
        <div className="m-0 h-full flex items-center justify-center flex-row gap-4 w-full p-4 relative">
          <div className="flex flex-col h-fit items-start justify-center px-10 gap-4 py-10 mr-[-4em] shadow-lg bg-[rgba(255,255,255,0.8)] z-1 rounded-lg before:absolute relative before:backdrop-blur-xm before:inset-0 before:z-[-1]">
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

            <button className="mt-4 bg-[#369a46] text-white text-md py-0.5 px-4 rounded-lg tracking-wider text-[rgba(37,73,43,0.8 transition-all duration-200 hover:-translate-y-0.5">
              Learn More
            </button>

            <div className="flex justify-start items-start gap-8 mt-4">
              <button
                onclick={() => setView("signin")}
                className="text-sm font-lighter font-['Segoe_UI'] border-1 border-[rgba(37,73,43,1)] text-[rgba(37,73,43,1)] rounded-md py-0.5 px-4 transition-all duration-200 hover:bg-[rgba(37,73,43,1)] hover:-translate-y-0.5"
              >
                Sign in
              </button>
              <button
                onclick={() => setView("signup")}
                className="text-sm font-['Segoe_UI'] font-lighter py-0.5 px-4 border-[rgb(171,25,25)] text-[rgb(171,25,25)] rounded-md border-1 transition-all duration-200 hover:bg-[rgba(37,73,43,1)] hover:-translate-y-0.5"
              >
                Sign up
              </button>
            </div>
          </div>
          <img
            src="https://i.ibb.co/M51WP2RH/group5.jpg"
            alt=""
            className="rounded-lg opacity-80 h-[26em]"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
