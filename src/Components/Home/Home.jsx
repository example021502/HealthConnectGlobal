import { useState } from "react";

function Home() {
  // START: State
  const [hover, setHover] = useState(false);

  // START: Handlers
  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  // START: Render
  return (
    <div className="w-full relative pt-36 flex items-center justify-center min-h-screen">
      {/* START: Navbar */}
      <div className="z-50 fixed top-0 left-0 right-0 text-[#166516] shadow-xl backdrop-blur-md bg-gray-200/80">
        {/* Top Navbar Container (Dark Bar) */}
        <div className="mx-8 my-1 p-0.5 flex relative text-white bg-primary-green rounded-md">
          <div className="flex items-center gap-4 ml-2 text-sm font-['Cambria']">
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

          <div className="flex items-center gap-4 ml-auto mr-4 h-6">
            <a
              href="#"
              className="flex items-center justify-center p-0.5 h-6 w-6 text-base rounded-full transition-all duration-200 hover:bg-white/30 hover:-translate-y-px"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {hover ? (
                <i className="ri-user-fill h-full w-full flex items-center justify-center rounded-full" />
              ) : (
                <i className="ri-user-line h-full w-full flex items-center justify-center rounded-full" />
              )}
            </a>
            <a
              href="#"
              className="flex items-center text-base transition-all duration-200 hover:text-[#1d8b1d] hover:border-b hover:border-[#166516] hover:-translate-y-px"
            >
              Login
              <i className="ri-login-box-line ml-0.5" />
            </a>
          </div>
        </div>

        {/* Bottom Navbar Container (Logo and Links) */}
        <div className="flex items-center relative">
          <div
            className="h-12 w-20 py-4 px-8 m-3 ml-16"
            style={{
              backgroundImage:
                "url('https://i.ibb.co/jZsMsxgS/Untitled-1.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />

          <div className="flex-1 tracking-wider flex items-center justify-start">
            <a
              href="#"
              className="group relative mx-4 px-1 py-0.5 text-lg transition-all duration-200 font-['Segoe_UI']"
            >
              Home
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1d8b1d] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="group relative mx-4 px-1 py-0.5 text-lg transition-all duration-200 font-['Segoe_UI']"
            >
              Doctors
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1d8b1d] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="group relative mx-4 px-1 py-0.5 text-lg transition-all duration-200 font-['Segoe_UI']"
            >
              Hospitals
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1d8b1d] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="group relative mx-4 px-1 py-0.5 text-lg transition-all duration-200 font-['Segoe_UI']"
            >
              Blog
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1d8b1d] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="group relative mx-4 px-1 py-0.5 text-lg transition-all duration-200 font-['Segoe_UI']"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1d8b1d] transition-all duration-300 group-hover:w-full"></span>
            </a>

            <button className="text-xl py-1 px-4 rounded-lg bg-primary-green text-gray-200 tracking-wider border-none transition-all duration-200 ml-auto mr-8 hover:bg-[#1d8b1d] hover:-translate-y-0.5">
              Appointments
            </button>
          </div>
        </div>
      </div>

      {/* START: Landing Section */}
      <div className="m-0 h-[571px] flex w-full p-4 relative">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-50 z-0"
          style={{
            backgroundImage: "url('https://i.ibb.co/ccS4K3Nk/group4.jpg')",
          }}
        />

        <div className="w-[500px] flex flex-col p-12 ml-24 z-10">
          <p className="text-xl text-primary-green font-semibold tracking-wider text-left m-0">
            Global care. Local ease.
          </p>
          <h1 className="text-4xl text-left my-1.5 font-bold m-0">
            We are here for your Care
          </h1>
          <p className="text-lg tracking-wider text-left m-0">
            Finding the one specialist with experience in a rare condition can
            be a challenge. Our intelligent matching algorithm connects you to
            the precise international expertise you need in minutes, drastically
            reducing diagnostic delays.
          </p>

          <button className="my-8 w-fit text-lg py-1.5 px-4 rounded-lg tracking-wider text-white bg-primary-green border-2 border-white transition-all duration-200 hover:bg-[#1d8b1d] hover:-translate-y-0.5">
            Learn More
          </button>

          <div className="flex justify-start items-start gap-4 h-fit">
            <button className="my-0.5 mr-4 text-lg font-['Segoe_UI'] py-1.5 px-8 text-white bg-primary-green rounded-lg font-semibold border-2 border-white transition-all duration-200 hover:bg-[#1d8b1d] hover:-translate-y-0.5">
              Sign in
            </button>
            <button className="my-0.5 mr-12 text-lg font-['Segoe_UI'] py-1.5 px-8 bg-secondary-gold text-white rounded-lg font-semibold border-2 border-white transition-all duration-200 hover:bg-[#635911] hover:-translate-y-0.5">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
