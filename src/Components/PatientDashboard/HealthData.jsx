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

  const [switching, setSwitching] = useState("");

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
        className={`text-gray-50 cursor-pointer font-lighter tracking-wide gap-2 hover:bg-[#83b45f] flex items-center justify-start px-3 py-1 rounded-full w-full transition-all ease-in duration-100 hover:-translate-y-1 
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
    <div className="flex flex-col overflow-y-auto h-full w-full rounded-xl shadow-2xl p-4 gap-2">
      {/* top  section */}
      <section className="flex flex-row w-full h-fit p-2 items-center gap-6">
        <h3 className="flex items-start justify-center flex-col py-2 pr-4">
          <span className="text-2xl font-extrabold text-[#549056]">
            Welcome Alice Vilsha
          </span>
          <span className="text-xs font-semibold text-[#549056]">
            Everything looks good!
          </span>
        </h3>
        <div className="flex items-center justify-between flex-1">
          <div className="shadow-md min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1f3854] to-[#274364] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-lg tracking-wider">89%</h2>
            <p className="text-xs text-white font-lighter tracking-wide">
              Meds Score Rate
            </p>
          </div>
          <div className="shadow-md min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#13c2c2] to-[#13bab9] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-lg tracking-wider">60%</h2>
            <p className="text-xs text-white font-lighter tracking-wide">
              Dose Miss Rate
            </p>
          </div>
          <div className="shadow-md min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#008a95] to-[#005e7d] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-lg tracking-wider">70%</h2>
            <p className="text-xs text-white font-lighter tracking-wide">
              Exercises Score
            </p>
          </div>
          <div className="shadow-md min-w-35 px-5 py-3 rounded-xl bg-gradient-to-r from-[#1ab385] to-[#007d53] cursor-pointer hover:shadow-xl">
            <h2 className="text-white font-bold text-lg tracking-wider">90%</h2>
            <p className="text-xs text-white font-lighter tracking-wide">
              Diet Score
            </p>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="w-full flex items-st[art justify-start gap-4 flex-1 p-2">
        <div className="w-1/4 h-full gap-4 flex flex-col">
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
              className={`flex-1 rounded-full p-1 text-sm font-semibold hover:scale-[1.02] transition-all duration-100 ease-in-out ${
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
              className={`flex-1 rounded-full p-1 text-sm font-semibold hover:scale-[1.02] transition-all duration-100 ease-in-out ${
                switching === "monthly"
                  ? "bg-[#549056] text-white"
                  : "bg-gray-300"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <div className="w-3/4 h-full px-4">
          <Graphs key={selectedName} graphType={selectedName} />
        </div>
      </section>
    </div>
  );
}

export default HealthData;
