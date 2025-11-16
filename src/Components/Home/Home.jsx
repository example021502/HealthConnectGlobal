import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/Context";

const services = [
  {
    id: 1,
    title: "Access to global Health Network",
    icon: "ri-shield-user-line",
    description1: "Appointment Booking",
    description2: "Personal Health Records",
  },
  {
    id: 2,
    title: "Expand your reach",
    icon: "ri-briefcase-2-line",
    description1: "Patient Management tools",
    description2: "Collaborations",
  },
  {
    id: 3,
    title: "Streamlined referrals",
    icon: "ri-community-line",
    description1: "Integrated patient data",
    description2: "Global presence",
  },
];

const testimonials = [{ image: "", name: "Alex Johnson", comment: "" }];

function Home() {
  const [rotatingText] = useState(["Ease", "Finesse", "Flair", "Expertise"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lastScroll, setLastScroll] = useState(0);
  const [isScrollUp, setIsScrollUp] = useState(false);

  const handleScrolling = () => {
    const currentScroll = window.scrollY;

    if (currentScroll < lastScroll) {
      setIsScrollUp(true);
    } else if (currentScroll > lastScroll && currentScroll > 50) {
      setIsScrollUp(false);
    }

    if (currentScroll > 50) {
      setLastScroll(currentScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [lastScroll]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingText.length);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [rotatingText.length, currentIndex]);

  const { setView } = useContext(AuthContext);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* top section */}
      <section
        className={`flex z-1000 fixed items-center py-2 shadow-lg px-10 w-full bg-gray-50 transition-transform duration-300 ease-in-out
          ${isScrollUp ? "translate-y-[0]" : "-translate-y-[100%]"}`}
      >
        <div className="flex flex-row items-center justify-center">
          <img
            src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
            alt="InterHealthConnect"
            className="w-12 h-12 object-contain cursor-pointer"
          />
          <h1 className="cursor-pointer ml-2 text-3xl font-extrabold text-[#549056]">
            InterHealthConnect
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm text-[#1f3854]">
          <a className="" href="#">
            <i className="ri-globe-line mr-0.5" />
            Language
          </a>
          <a className="" href="#">
            <i className="ri-customer-service-2-line mr-0.5" />
            Support
          </a>
          <a className="" href="#">
            <i className="ri-information-line mr-0.5" />
            <span>About</span>
          </a>
          <button className="border-2 border-[#0abfb8] transition-all duration-all ease-in py-0.5 px-2 rounded-full hover:-translate-y-[1px] font-semibold cursor-pointer shadow-lg hover:border-[#0d8c88]">
            Sign Up
          </button>
          <button className="transition-all duration ease-in px-3 py-1 rounded-full bg-[#2e5178] font-semibold text-white cursor-pointer hover:bg-[#1f3854] shadow-lg hover:-translate-y-[1px]">
            Sign In
          </button>
        </div>
      </section>
      {/* middle section */}
      <section className="w-full mt-[64px] overflow-y-hidden min-h-100 flex items-center relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-[rgba(0,0,0,0.8)] after:via-[rgba(0,0,0,0.2)] after:to-[rgba(0,0,0,0)] after:z-[-1] px-10">
        <img
          src="https://i.ibb.co/8DPy3crD/298d3ee56ee93edc539db38782a25961.jpg"
          alt="InterHealthConnect"
          className="w-full h-150 z-[-1] object-cover aspect-auto transition-all duration-100 ease-in absolute top-0 left-0"
        />
        <div className="mr-auto gap-4 p-4 w-88 z-10 rounded-xl text-white flex flex-col items-center justify-center">
          <h1 className="text-xl w-full text-left font-bold border-b-1 pb-4 mb-0">
            Connecting Health. Globally.
          </h1>
          <p className="text-left w-full text-sm">
            Your gateway to doctors, specialists, and hospitals worldwide.
            Manage your health with{" "}
            <span
              className={`text-lg font-semibold transition-all ease-in duration-300 ${
                currentIndex % 2 === 0 ? "text-[#1DA1F2]" : "text-[#8a49a1]"
              }`}
            >
              {rotatingText[currentIndex]}
            </span>
          </p>
          <div className="flex w-full gap-4 items-center">
            <button className="flex-1 text-sm p-1 bg-[#13bab9] hover:bg-[#159797] transition-all duration-100 ease-in rounded-full">
              Find Care
            </button>
            <button className="flex-1 bg-gray-50 text-sm p-1 text-[#274364] rounded-full hover:bg-gray-300 transition-all ease-in duration-100">
              Manage Your Health
            </button>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="w-full p-10">
        <h3 className="px-4 py-1 border-b-1 border-gray-300 mb-4 text-lg font-medium text-[#274364]">
          Key Features
        </h3>
        <div className="flex w-full items-center justify-center flex-wrap mt-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-4 w-fit flex flex-col items-center justify-center ${
                service.id % 2 === 0
                  ? "border-r-1 border-gray-200 border-l-1"
                  : ""
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
          <div className="flex flex-row gap-1 rounded-full items-center justify-center bg-gray-50 p-1 hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
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
