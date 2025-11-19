import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/Context";
import Testimonials from "./Testimonials.json";
import Services from "./Services.json";

function Home() {
  const [rotatingText] = useState(["Ease", "Finesse", "Flair", "Expertise"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lastScroll, setLastScroll] = useState(0);
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [services, setServices] = useState(Services);
  const [testimonials, setTestimonials] = useState(Testimonials);
  const [rollUp, setRollup] = useState(false);

  useEffect(() => {
    const totalCycleTime = 5000;
    const animationDuration = 300;

    const interval = setInterval(() => {
      setRollup(true);

      const resetTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingText.length);
        setRollup(false);
      }, animationDuration);

      return () => clearTimeout(resetTimer);
    }, totalCycleTime);

    return () => clearInterval(interval);
  }, [rotatingText.length]);

  useEffect(() => {
    const handleScrolling = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        setIsScrollUp(true);
      } else if (currentScroll > lastScroll && currentScroll > 50) {
        setIsScrollUp(false);
      }

      if (currentScroll > 50 || currentScroll === 0) {
        setLastScroll(currentScroll);
      } else if (currentScroll <= 50) {
        setIsScrollUp(true);
      }
    };
    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [lastScroll]);

  const handleLogin = () => {
    setView("signin");
  };
  const handleSignup = () => {
    setView("signup");
  };

  const { setView } = useContext(AuthContext);

  return (
    <div className="w-full h-screen flex flex-col relative">
      <img
        src="https://i.ibb.co/S7RBTzJH/inter1.jpg"
        alt="InterHealthConnect"
        className="w-full h-full object-cover opacity-10 z-[-3] aspect-auto transition-all duration-100 ease-in fixed bg-blend-saturation top-0 left-0"
      />
      {/* top section */}
      <section
        className={`flex z-1000 fixed items-center md:py-1 py-0.5 shadow-lg md:px-15 px-2 w-full h-fit bg-gray-50 transition-all duration-300 ease-in-out
          ${isScrollUp ? "translate-y-[0]" : "-translate-y-[100%]"}`}
      >
        <div className="flex w-full md:w-fit flex-row items-center md:justify-center justify-start">
          <img
            src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
            alt="InterHealthConnect"
            className="md:w-14 md:h-14 w-10 h-10 object-contain cursor-pointer"
          />
          <h1 className="cursor-pointer md:ml-2 ml-1 md:text-4xl text-2xl font-extrabold text-[#549056]">
            InterHealthConnect
          </h1>
        </div>
        <div className="flex md:hidden flex-row gap-1 rounded-full items-center justify-center bg-gray-50 py-1 px-2 hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
          <i className="ri-global-line text-[#274364] cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100" />
          <i className="ri-translate-2 text-[#274364] cursor-pointer hover:scale-[1.1] transition-all duration-100 ease-in" />
        </div>
        <div className="ml-auto hidden md:flex items-center gap-4 text-sm text-[#1f3854]">
          <a
            className="transition-all flex ease-in duration-all hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-globe-line mr-0.5" />
            <span className="md:flex hidden">Language</span>
          </a>
          <a
            className="transition-all flex ease-in duration hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-customer-service-2-line mr-0.5" />
            <span className="md:flex hidden">Support</span>
          </a>
          <a
            className="transition-all flex ease-in duration-100 hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-information-line mr-0.5" />
            <span className="md:flex hidden"> About</span>
          </a>
          <button
            onClick={handleSignup}
            className="border-2 md:flex hidden border-[#549056] transition-all duration-all ease-in py-0.5 px-2 rounded-full hover:scale-[1.05] font-semibold cursor-pointer shadow-lg hover:border-[#497c4b]"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="transition-all md:flex hidden duration ease-in px-3 py-1 rounded-full bg-[#549056] font-semibold text-white cursor-pointer hover:bg-[#497c4b] shadow-lg hover:scale-[1.05]"
          >
            Sign In
          </button>
        </div>
      </section>
      {/* middle section */}
      <section className="w-full md:min-h-145 gap-10 md:gap-0 min-h-fit md:mt-13 mt-10 overflow-y-hidden flex items-start md:items-center flex-col md:flex-row relative after:absolute after:inset-0 after:bg-gradient-to-r md:after:from-[rgba(0,0,0,0.8)] md:after:via-[rgba(0,0,0,0.2)] md:after:to-[rgba(0,0,0,0)] after:z-[-1] md:px-10 px-0">
        <img
          src="https://i.ibb.co/Nd4pHLCV/bg.jpg"
          alt="InterHealthConnect"
          className="w-full z-[-1] h-66 md:h-fit after:absolute relative after:bg-gradient-to-t after:from-[rgba(255,255,255,0.8)] after:via-[rgba(255,255,255,0)] after:to-[rgba(255,255,255,0)] after:bottom-0 after:h-10 after:w-full after:left-0 object-cover aspect-auto transition-all duration-100 ease-in md:absolute top-0 left-0"
        />
        <div className="md:mr-auto gap-2 md:gap-4 md:px-10 md:py-2 px-4 md:w-105 w-full md:h-100 h-fit z-10 rounded-xl md:text-white text-[#274364] flex flex-col items-center justify-center after:inset-0 after:bg-gradient-to-t after:from-[rgba(255,255,255,0)] after:via-[rgba(255,255,255,0.2)] after:to-[rgba(255,255,255,0)] after:absolute after:top-0 after:left-0 relative after:z-[-1] after:rounded-xl">
          <h1 className="text-2xl w-full md:text-left text-center font-bold border-b-1 pb-4 mb-0">
            Yes, Just a call away
          </h1>
          <p className="text-left w-full gap-2 flex flex-col text-sm font-lighter tracking-wider">
            <span>
              Instantly access your complete medical history, communicate
              securely with your doctors, and manage appointments—all from a
              single, intuitive platform.
            </span>
            <span>
              Your gateway to doctors, specialists, and hospitals worldwide.
              Manage your health with{" "}
              <span
                className={`inline-block overflow-hidden h-fit md:w-full w-fit text-center align-middle`}
              >
                <span
                  key={currentIndex}
                  className={`md:text-lg text-md text-[#49c258] font-semibold transition-transform duration-300 ease-in-out inline-block
                  ${rollUp ? "-translate-y-full" : "translate-y-0"}`}
                >
                  {rotatingText[currentIndex]}
                </span>
              </span>
            </span>
          </p>
          <div className="flex w-full mt-4 gap-4 items-center">
            <button
              onClick={handleLogin}
              className="flex-1 text-sm font-semibold cursor-pointer p-1.5 bg-[#549056] text-white hover:bg-[#497c4b] transition-all duration-100 ease-in rounded-full"
            >
              Find Care
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 border-[#274364] border-1 md:border-none bg-gray-100 text-sm font-semibold cursor-pointer p-1.5 text-[#274364] rounded-full hover:bg-gray-300 transition-all ease-in duration-100"
            >
              Manage Your Health
            </button>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="w-full md:p-10 px-4 py-8 flex flex-col items-center justify-center mt-10">
        <h3 className="md:w-[60%] w-full md:mb-2 mb-4 text-lg font-medium text-[#274364]">
          Key Features
        </h3>
        <div className="flex w-full items-center justify-center flex-wrap">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 md:w-fit w-full flex md:flex-col md:items-center items-start md:justify-center justify-start transition-all ease-in-out duration-100 hover:bg-[rgba(39,67,100,0.1)] ${
                service.id % 2 === 0
                  ? "md:border-r-1 md:border-gray-300 md:border-l-1"
                  : ""
              }${service.id === 1 ? "md:rounded-bl-lg md:rounded-tl-lg" : ""} ${
                service.id === 3 ? "md:rounded-br-lg md:rounded-tr-lg" : ""
              }`}
            >
              <i className={`${service.icon} text-4xl text-[#549056]`} />
              <div
                className={`text-sm flex md:flex-col flex-col px-4 md:items-center items-start justify-center text-gray-600`}
              >
                <p>{service.title}</p>
                <p>{service.description1}</p>
                <p>{service.description2}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full md:p-10 px-4 py-8 flex flex-col items-center justify-center">
        <h3 className="md:w-[60%] w-full text-lg font-medium text-[#274364]">
          Testimonials
        </h3>
        <div className="flex w-full items-center justify-center flex-wrap">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`p-4 md:w-fit w-full flex flex-row text-xs items-center justify-start transition-all ease-in-out duration-100 rounded-lg hover:bg-[rgba(39,67,100,0.1)] `}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className={`border-1 text-[#549056] w-10 h-10 rounded-full object-cover`}
              />
              <div
                className={`flex flex-col px-4 items-start justify-center text-gray-600`}
              >
                <p className="font-semibold">{testimonial.name}</p>
                <p className="md:flex hidden">
                  {testimonial.description.slice(0, 20) + "..."}
                </p>
                <p className="flex md:hidden">{testimonial.description}</p>
                <p className="md:flex hidden">
                  {testimonial.comment.slice(0, 40) + "..."}
                </p>
                <p className="flex md:hidden">
                  {testimonial.comment.slice(0, 80) + "..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* footer */}
      <section className="md:flex hidden md:text-sm text-xs tracking-wide flex-row text-white bg-[#274364] items-center justify-center p-4 gap-0 md:gap-6">
        <div className="flex flex-row gap-2 md:gap-4">
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            About
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            Support
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            Terms
          </a>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <i className="ri-facebook-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <i className="ri-twitter-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <i className="ri-linkedin-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <div className="flex flex-row gap-1 rounded-full items-center justify-center bg-gray-50 py-1 px-2 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
            <i className="ri-global-line text-[#274364] cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100" />
            <p className="text-[#274364] text-xs">language</p>
            <i className="ri-translate-2 text-[#274364] cursor-pointer hover:scale-[1.1] transition-all duration-100 ease-in" />
          </div>
        </div>
      </section>
      {/* mobile navigation bar */}
      <section className="flex md:hidden md:text-sm text-xs tracking-wide flex-row text-white bg-[#274364] items-center justify-center p-4 gap-0 md:gap-6">
        <div className="flex flex-row gap-2 md:gap-4">
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            <i className="ri-arrow-left-s-line" />
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            <i className="ri-arrow-right-s-line" />
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
          >
            Terms
          </a>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <i className="ri-facebook-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <i className="ri-twitter-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <i className="ri-linkedin-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
          <div className="flex flex-row gap-1 rounded-full items-center justify-center bg-gray-50 py-1 px-2 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
            <i className="ri-global-line text-[#274364] cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100" />
            <p className="text-[#274364] text-xs">language</p>
            <i className="ri-translate-2 text-[#274364] cursor-pointer hover:scale-[1.1] transition-all duration-100 ease-in" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
