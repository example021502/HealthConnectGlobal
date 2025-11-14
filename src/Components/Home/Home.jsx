import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/Context";

function Home() {
  const { setView } = useContext(AuthContext);
  return (
    <div className="w-full h-screen flex flex-col">
      {/* top section */}
      <section className="flex items-center py-4 shadow-lg px-10 w-full bg-gray-50">
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
      {/* landing image */}
      <section className="w-full min-h-100 relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-[rgba(0,0,0,0.8)] after:via-[rgba(0,0,0,0.2)] after:to-[rgba(0,0,0,0)] after:z-1 px-10">
        <img
          src="https://i.ibb.co/6JT0kqYD/518d5d32a9cd8c6ca130b4f4bd0ad541.jpg"
          alt="InterHealthConnect"
          className="w-full h-100 z-[-1] object-cover absolute top-0 left-0"
        />
        <div className="mr-auto w-80 z-4 border-2 text-white flex flex-col items-center justify-center">
          <h1>Welcome to InterHealthConnect</h1>
          <p>
            Finding the one specialist with experience in a rare condition can
            be a challenge. Our intelligent matching algorithm connects you to
            the precise international expertise you need in minutes, drastically
            reducing diagnostic delays.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
