import React, { useState, useContext } from "react";
import { Bell, User, LogOut } from "lucide-react";
import HealthData from "./HealthData";
import Performance from "./Performance";
import Appointments from "./Appointments";
import FindCare from "./FindCare";
import Messages from "./Messages";
import Settings from "./Settings";

import { AuthContext } from "../Context/Context";

const nav_buttons = [
  { name: "My Health Data", icon: "ri-heart-fill" },
  { name: "Performance", icon: "ri-dashboard-2-fill" },
  { name: "Appointments", icon: "ri-calendar-event-fill" },
  { name: "Find Care", icon: "ri-search-eye-fill" },
  { name: "Messages", icon: "ri-wechat-fill" },
  { name: "Settings", icon: "ri-equalizer-fill" },
];

function PatientDashboard() {
  let noteNumber = 21;
  const [selectedName, setSelectedName] = useState(nav_buttons[0]?.name || ""); // Lift state up
  const [exiting, setExiting] = useState(false);

  const handleSelect = (name) => {
    setSelectedName(name);
  };

  const { setView } = useContext(AuthContext);
  // displaying the buttons

  function Nav_buttons_display({ button, onSelect, isSelected }) {
    const [hovered, setHovered] = useState(false);

    return (
      <button
        onClick={() => onSelect(button.name)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`text-gray-50 cursor-pointer font-lighter tracking-wide gap-2 hover:bg-[#549056] flex items-center justify-start px-3 py-1 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1 
        
          ${
            isSelected
              ? "after:absolute relative after:bg-white after:top-[40%] after:bottom-[45%] after:left-[102%] after:w-3 after:h-4 after:rounded-tl-full after:rounded-bl-full after:rounded-tr-full after:rounded-br-full"
              : ""
          }
          ${
            hovered
              ? "after:absolute relative after:bg-[#549056] after:top-[40%] after:bottom-[45%] after:left-[102%] after:w-3 after:h-4 after:rounded-tl-full after:rounded-bl-full after:rounded-tr-full after:rounded-br-full"
              : ""
          }
        `}
      >
        <i
          className={`${button.icon} w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[rgba(255,255,255,1)] text-[#549056]`}
        />
        <span>{button.name}</span>
      </button>
    );
  }

  const handleCancelExiting = () => {
    setExiting(false);
  };
  const handleConfirmExiting = () => {
    setExiting(false);
    setView("home");
  };

  return (
    <div className="relative overflow-y-hidden flex flex-col bg-gray-50 h-screen w-full">
      {/* Exiting ovelay */}
      {exiting && (
        <div className="absolute flex items-center justify-center h-full w-full bg-[rgba(0,0,0,0.3)] z-20000">
          <div className="flex items-center justify-center p-6 gap-2 text-white bg-[rgba(255,255,255,0.8)] rounded-xl min-w-100 min-h-40">
            <button
              onClick={handleConfirmExiting}
              className="bg-[#2e6d49] flex-1 py-1 rounded-xl shadow-lg cursor-pointer transition-all duration-100 ease-in hover:-translate-y-[2px] hover:bg-[#296142]"
            >
              Confirm
            </button>
            <button
              onClick={handleCancelExiting}
              className="bg-[#b93636] flex-1 py-1 rounded-xl shadow-lg cursor-pointer transition-all duration-100 ease-in hover:-translate-y-[2px] hover:bg-[#9c2e2e]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Top section */}
      <section className="py-4 px-7 shadow bg-white flex flex-row items-center -justify-start">
        <img
          src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
          alt=""
          className="h-10 w-10 object-contain mr-2"
        />
        <h1 className="text-2xl font-bold text-[#549056]">
          InterHealthConnect
        </h1>
        <div className="ml-auto border-1 flex flex-row gap-4 text-white items-center justify-center w-fit">
          <div className="relative w-fit hover:scale-[1.1] transition-all ease-in duration-100 p-1 rounded-full">
            <p className="absolute p-1 bottom-[80%] text-[0.6em] w-4 h-4 flex items-center justify-center rounded-full bg-[#2e6d49] text-white font-semibold right-0">
              {noteNumber}
            </p>
            <Bell className="w-6 h-6 p-1 bg-[#2e6d49] rounded-full" />
          </div>
          <User className="w-10 h-10 rounded-full p-1 bg-[#2e6d49] transition-all duration-100 ease-in hover:scale-[1.1]" />
          <LogOut
            onClick={() => setExiting(true)}
            className="w-6 h-6 p-1 bg-[#2e6d49] rounded-full hover:scale-[1.1] transition-all ease-in duration-100"
          />
        </div>
      </section>

      {/* middle section */}
      <section className="bg-white flex flex-row justify-start h-full w-full">
        {/* left div */}
        <div className="bg-gradient-to-r from-[#274364] to-[#1f3854] text-lg text-[#2e6d49] h-full w-1/5 flex flex-col items-start p-4 gap-6">
          {nav_buttons.map((button, index) => (
            <Nav_buttons_display
              key={index}
              button={button}
              isSelected={selectedName === button.name}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* right div */}
        <div className="bg-gray-100 h-full w-4/5 p-4 flex items-center justify-center">
          {selectedName === "My Health Data" && <HealthData />}
          {selectedName === "Performance" && <Performance />}
          {selectedName === "Appointments" && <Appointments />}
          {selectedName === "Find Care" && <FindCare />}
          {selectedName === "Messages" && <Messages />}
          {selectedName === "Settings" && <Settings />}
        </div>
      </section>

      {/* footer section */}
      <section className="px-7 h-18 bg-[#213c5a] text-white w-full flex items-center justify-center">
        <div className="transition-all duration-100 ease-in flex items-center justify-center w-fit h-fit py-2 px-6 gap-6">
          <a
            href="#"
            className="text-sm cursor-pointer font-light tracking-wide py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm cursor-pointer font-light tracking-wide py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Support
          </a>
          <a
            href="#"
            className="text-sm cursor-pointer font-light tracking-wide py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Legal Policy
          </a>
          <a
            href="#"
            className="cursor-pointer text-sm font-light tracking-wide py-[1px] before:content-[''] before:transition-all before:duration-100 before:ease-in hover:before:w-full before:w-0 before:absolute relative before:bg-white before:h-[2px] before:bottom-0 before:left-0 transition-all duration-300 ease-in"
          >
            Terms
          </a>
        </div>
        {/* contact icons */}
        <div className="flex items-center justify-center gap-4 h-fit px-1">
          <i className="cursor-pointer ri-whatsapp-fill text-[#25d366] hover:scale-[1.1] text-[1.4em] rounded-full bg-[rgba(255,255,255,1)] h-8 w-8 flex items-center justify-center transition-all duration-100 ease-in" />
          <i className="cursor-pointer ri-instagram-fill bg-gradient-to-tr from-[#ffdf9e] via-[#c1558b] to-[#8a49a1] hover:scale-[1.1] text-[1.4em] rounded-full bg-[rgba(255,255,255,0.4)] h-8 w-8 flex items-center justify-center transition-all duration-100 ease-in" />
          <i className="cursor-pointer ri-twitter-fill text-[#1DA1F2] hover:scale-[1.1] text-[1.4em] rounded-full h-8 w-8 bg-[rgba(255,255,255,1)] flex items-center justify-center" />
          <p className="cursor-pointer flex items-center justify-center transition-all duration-100 ease-in bg-[rgba(255,255,255,1)] text-[#0f4a38] rounded-full px-2">
            <i className="ri-global-line text-[1.4em] rounded-full h-8 w-8 flex items-center justify-center transition-all duration-100 ease-in" />
            <span className="text-xs ml-[-1px] tracking-wide rounded-full px-1">
              Languages
            </span>
            <i className="ri-expand-up-down-line ml-[-1px] text-xs flex items-center justify-center transition-all duration-100 ease-in mr-2 hover:scale-[1.1]" />
          </p>
        </div>
      </section>
    </div>
  );
}

export default PatientDashboard;
