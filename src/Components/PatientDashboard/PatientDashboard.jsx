import React from "react";
import { Bell, User, LogOut } from "lucide-react";

function PatientDashboard() {
  let noteNumber = 21;
  return (
    <div className="flex flex-col bg-gray-50 h-screen w-full">
      {/* Top section */}
      <section className="py-4 px-7 shadow bg-white flex flex-row items-center -justify-start">
        <img
          src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
          alt=""
          className="h-10 w-10 object-contain mr-2"
        />
        <h1 className="text-2xl font-bold">InterHealthConnect</h1>
        <div className="ml-auto border-1 flex flex-row gap-4 text-white items-center justify-center w-fit">
          <div className="relative w-fit bg-[#2e6d49] hover:scale-[1.1] transition-all ease-in duration-100 p-1 rounded-full">
            <p className="absolute p-1 bottom-[90%] text-[0.6em] w-4 h-4 flex items-center justify-center rounded-full bg-[#2e6d49] text-white font-semibold right-0">
              {noteNumber}
            </p>
            <Bell className="w-6 h-6" />
          </div>
          <User className="w-10 h-10 rounded-full p-1 bg-[#2e6d49] transition-all duration-100 ease-in hover:scale-[1.1]" />
          <LogOut className="w-8 h-8 p-1 bg-[#2e6d49] rounded-full hover:scale-[1.1] transition-all ease-in duration-100" />
        </div>
      </section>

      {/* middle section */}
      <section className="bg-white flex flex-row justify-start h-full w-full">
        {/* left div */}
        <div className="bg-gradient-to-r from-[#549056] to-[#2e6d49] text-lg text-white h-full w-1/5 flex flex-col items-start p-4 gap-6">
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>My Health Data</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Performance</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Appointments</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Find Care</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Messages</span>
          </button>
          <button className="font-semibold tracking-wide gap-2 bg-[#bad767] hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1">
            <i className="ri-heart-fill w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,0.4)]" />
            <span>Settings</span>
          </button>
        </div>

        {/* right div */}
        <div className="bg-gray-100 h-full w-4/5 p-4 flex items-center justify-center">
          Add New Patient
        </div>
      </section>

      {/* footer section */}
      <section className="relative px-7 py-2 bg-[#0f4a38] text-white w-full flex items-center justify-center">
        <div className="transition-all duration-100 ease-in flex items-center justify-center w-fit h-fit py-2 px-6 gap-4">
          <a
            href="#"
            className="text-sm font-light tracking-wide px-1 py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm font-light tracking-wide px-1 py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Support
          </a>
          <a
            href="#"
            className="text-sm font-light tracking-wide px-1 py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Legal Policy
          </a>
          <a
            href="#"
            className="text-sm font-light tracking-wide px-1 py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Terms
          </a>
        </div>
        <div className="absolute flex items-center justify-end right-7 top-0 bottom-0 border-1 gap-2">
          <i className="ri-whatsapp-fill hover:scale-[1.1] text-[1.8em]" />
          <i className="ri-instagram-fill hover:scale-[1.1] text-[1.8em]" />
          <i className="ri-twitter-fill hover:scale-[1.1] text-[1.8em]" />
        </div>
      </section>
    </div>
  );
}

export default PatientDashboard;
