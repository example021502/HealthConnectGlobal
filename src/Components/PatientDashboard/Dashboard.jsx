import React, { useState } from "react";
import Graphs from "./Graphs";

const graph_buttons = [
  { name: "Summery" },
  { name: "Meds Score Rate" },
  { name: "Dose Miss Rate" },
  { name: "Exercises Score" },
  { name: "Diet Score" },
];

function HealthData() {
  const [selectedName, setSelectedName] = useState(
    graph_buttons[0]?.name || ""
  );

  const [switching, setSwitching] = useState("weekly");

  const handleSelect = (name) => {
    setSelectedName(name);
  };

  // graph buttons display
  function Graph_buttons_display({ button, onSelect, isSelected }) {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        onClick={() => onSelect(button.name)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`text-gray-50 cursor-pointer font-semibold tracking-wide gap-2 hover:bg-[#83b45f] flex items-center justify-start px-3 py-2 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1 
          ${
            isSelected
              ? "bg-[#549056] text-white shadow-lg"
              : "bg-white text-gray-700 shadow-md"
          }
          ${hovered ? "bg-[#a3c79a] text-white shadow-lg" : ""}
        `}
      >
        <span className="ml-6">{button.name}</span>
      </button>
    );
  }

  const handleSwitchWeekly = () => {
    setSwitching("weekly");
  };
  const handleSwitchMonthly = () => {
    setSwitching("monthly");
  };

  return (
    <div className="flex flex-col relative overflow-y-auto h-full w-full rounded-xl shadow-2xl p-4 gap-4">
      <img
        src="https://i.ibb.co/PvYY7gkY/internation-Connect.jpg"
        alt=""
        className="w-full h-full absolute z-[1] opacity-20 object-cover top-0 left-0"
      />
      {/* top  section */}
      <section className="flex z-1 flex-row w-full h-fit p-2 items-center gap-6">
        <h3 className="w-2/6 flex items-start justify-center flex-col py-2 pr-4">
          <span className="text-4xl font-extrabold text-[#549056]">
            Welcome Alice Vilsha
          </span>
          <span className="text-sm font-semibold text-[#549056]">
            Everything looks good!
          </span>
        </h3>
        <div className="w-full gap-4 flex items-center justify-between flex-1">
          <div className="shadow-md flex-1 min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1f3854] to-[#274364] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-2xl tracking-wider">
              89%
            </h2>
            <p className="text-sm text-white font-lighter tracking-wide">
              Meds Score Rate
            </p>
          </div>
          <div className="shadow-md flex-1 min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#13c2c2] to-[#13bab9] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-2xl tracking-wider">
              60%
            </h2>
            <p className="text-sm text-white font-lighter tracking-wide">
              Dose Miss Rate
            </p>
          </div>
          <div className="shadow-md flex-1 min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#008a95] to-[#005e7d] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-2xl tracking-wider">
              70%
            </h2>
            <p className="text-sm text-white font-lighter tracking-wide">
              Exercises Score
            </p>
          </div>
          <div className="shadow-md flex-1 min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1ab385] to-[#007d53] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-2xl tracking-wider">
              90%
            </h2>
            <p className="text-sm text-white font-lighter tracking-wide">
              Diet Score
            </p>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="w-full z-1 flex items-start justify-start gap-4 flex-1 py-4">
        <div className="w-2/6 h-full gap-6 flex flex-col">
          {graph_buttons.map((button) => (
            <Graph_buttons_display
              key={button.name}
              button={button}
              isSelected={selectedName === button.name}
              onSelect={handleSelect}
            />
          ))}
          <div className="w-full text-[#274364] flex items-center justify-center">
            <button
              onClick={handleSwitchWeekly}
              className={`flex-1 rounded-full p-2 text-md font-semibold hover:scale-[1.02] transition-all duration-100 ease-in-out ${
                switching === "weekly"
                  ? "bg-[#549056] text-white"
                  : "bg-gray-300"
              }`}
            >
              Weekly
            </button>
            <button className="h-2 w-2 m-[-2px] rounded-full bg-gray-300"></button>

            <button
              onClick={handleSwitchMonthly}
              className={`flex-1 rounded-full p-2 text-md font-semibold hover:scale-[1.02] transition-all duration-100 ease-in-out ${
                switching === "monthly"
                  ? "bg-[#549056] text-white"
                  : "bg-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <div className="w-full h-full shadow-2xl bg-[rgba(255,255,255,0.5)] rounded-3xl px-4">
          <Graphs key={selectedName} graphType={selectedName} />
        </div>
      </section>
    </div>
  );
}

export default HealthData;
