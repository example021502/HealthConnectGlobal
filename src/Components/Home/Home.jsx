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
        className={`flex z-1000 fixed items-center py-1 shadow-lg px-15 w-full h-fit bg-gray-50 transition-all duration-300 ease-in-out
          ${isScrollUp ? "translate-y-[0]" : "-translate-y-[100%]"}`}
      >
        <div className="flex flex-row items-center justify-center">
          <img
            src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
            alt="InterHealthConnect"
            className="w-14 h-14 object-contain cursor-pointer"
          />
          <h1 className="cursor-pointer ml-2 text-4xl font-extrabold text-[#549056]">
            InterHealthConnect
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm text-[#1f3854]">
          <a
            className="transition-all ease-in duration-all hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-globe-line mr-0.5" />
            Language
          </a>
          <a
            className="transition-all ease-in duration hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-customer-service-2-line mr-0.5" />
            Support
          </a>
          <a
            className="transition-all ease-in duration-100 hover:scale-[1.05]"
            href="#"
          >
            <i className="ri-information-line mr-0.5" />
            <span>About</span>
          </a>
          <button
            onClick={handleSignup}
            className="border-2 border-[#549056] transition-all duration-all ease-in py-0.5 px-2 rounded-full hover:scale-[1.05] font-semibold cursor-pointer shadow-lg hover:border-[#497c4b]"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="transition-all duration ease-in px-3 py-1 rounded-full bg-[#549056] font-semibold text-white cursor-pointer hover:bg-[#497c4b] shadow-lg hover:scale-[1.05]"
          >
            Sign In
          </button>
        </div>
      </section>
      {/* middle section */}
      <section className="w-full min-h-145 mt-13 overflow-y-hidden flex items-center relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-[rgba(0,0,0,0.8)] after:via-[rgba(0,0,0,0.2)] after:to-[rgba(0,0,0,0)] after:z-[-1] px-10">
        <img
          src="https://i.ibb.co/Nd4pHLCV/bg.jpg"
          alt="InterHealthConnect"
          className="w-full z-[-1] object-cover aspect-auto transition-all duration-100 ease-in absolute top-0 left-0"
        />
        <div className="mr-auto gap-4 p-4 w-88 h-100 z-10 rounded-xl text-white flex flex-col items-center justify-center">
          <h1 className="text-2xl w-full text-left font-bold border-b-1 pb-4 mb-0">
            Yes, Just a call away
          </h1>
          <p className="text-left w-full text-sm font-light tracking-wider">
            Your gateway to doctors, specialists, and hospitals worldwide.
            Manage your health with{" "}
            <span className={`inline-block overflow-hidden h-7 align-middle`}>
              <span
                key={currentIndex}
                className={`text-lg text-[#49c258] font-semibold transition-transform duration-300 ease-in-out inline-block
                        ${rollUp ? "-translate-y-full" : "translate-y-0"}`}
              >
                {rotatingText[currentIndex]}
              </span>
            </span>
          </p>
          <div className="flex w-full gap-4 items-center">
            <button
              onClick={handleLogin}
              className="flex-1 text-sm font-semibold cursor-pointer p-1.5 bg-[#549056] hover:bg-[#497c4b] transition-all duration-100 ease-in rounded-full"
            >
              Find Care
            </button>
            <button
              onClick={handleLogin}
              className="flex-1 bg-gray-50 text-sm font-semibold cursor-pointer p-1.5 text-[#274364] rounded-full hover:bg-gray-300 transition-all ease-in duration-100"
            >
              Manage Your Health
            </button>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="w-full p-10 flex flex-col items-center justify-center mt-10">
        <h3 className="w-[60%] mb-2 text-lg font-medium text-[#274364]">
          Key Features
        </h3>
        <div className="flex w-full items-center justify-center flex-wrap">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 w-fit flex flex-col items-center justify-center transition-all ease-in-out duration-100 hover:bg-[rgba(39,67,100,0.1)] ${
                service.id % 2 === 0
                  ? "border-r-1 border-gray-300 border-l-1"
                  : ""
              }${service.id === 1 ? "rounded-bl-lg rounded-tl-lg" : ""} ${
                service.id === 3 ? "rounded-br-lg rounded-tr-lg" : ""
              }`}
            >
              <i className={`${service.icon} text-4xl text-[#549056]`} />
              <div
                className={`text-sm flex flex-col px-4 items-center justify-center text-gray-600`}
              >
                <p>{service.title}</p>
                <p>{service.description1}</p>
                <p>{service.description2}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full p-10 flex flex-col items-center justify-center">
        <h3 className="w-[60%] text-lg font-medium text-[#274364]">
          Testimonials
        </h3>
        <div className="flex w-full items-center justify-center flex-wrap">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`p-4 w-fit flex flex-row text-xs items-center justify-start transition-all ease-in-out duration-100 rounded-lg hover:bg-[rgba(39,67,100,0.1)] `}
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
                <p>{testimonial.description.slice(0, 20) + "..."}</p>
                <p>{testimonial.comment.slice(0, 20) + "..."}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* footer */}
      <section className="flex text-sm tracking-wide flex-row text-white bg-[#274364] items-center justify-center p-4 gap-6">
        <div className="flex flex-row gap-4">
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
            Legal Privacy
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
          <div className="flex flex-row gap-1 rounded-full items-center justify-center bg-gray-50 py-1 px-2 hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
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
