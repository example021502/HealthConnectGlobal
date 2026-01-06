import React, { useState, useContext, useEffect } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { useNavigate } from "react-router-dom";
import { navButtonsContext } from "../../contexts/NavigationContext";

function NavBar() {
  const { display, change } = useContext(navButtonsContext);
  const navigate = useNavigate();

  const navbuttons = [
    {
      name: "Dashboard",
      icon: "ri-dashboard-2-line",
    },
    {
      name: "Appointments",
      icon: "ri-calendar-event-line",
    },
    {
      name: "Doctors",
      icon: "ri-stethoscope-line",
    },
    {
      name: "Patients",
      icon: "ri-user-heart-line",
    },
    {
      name: "Payments",
      icon: "ri-wallet-3-line",
    },
    {
      name: "Messages",
      icon: "ri-message-3-line",
    },
    {
      name: "Settings",
      icon: "ri-settings-4-line",
    },
  ];

  const handleButtonClick = (name) => {
    change(name);
  };

  useEffect(() => {
    if (display === "Dashboard") {
      navigate(``);
    } else {
      navigate(`${display}`);
    }
  }, [display]);

  return (
    <div className="w-2/9 backdrop-blur-standard bg-bg-light-white border-r border-lightBorder h-full flex flex-col items-start pl-6 pt-8 justify-start gap-4 transition-all duration-150 ease-in-out overflow-y-auto">
      {navbuttons.map((button, index) => {
        return (
          <span
            onClick={() => handleButtonClick(button.name)}
            key={index}
            className={`transition-all duration-100 ease-in-out cursor-pointer backdrop-blur-standard rounded-standard shadow-button flex flex-row items-center justify-start gap-2 px-4 py-1 min-w-56 ${
              display === button.name
                ? "bg-gradient text-white"
                : "bg-background-white border border-gradient-start"
            }`}
          >
            <span className="">
              <Icon icon={button.icon} />
            </span>
            <span>
              <Button text={button.name} />
            </span>
            {display === button.name && (
              <span className="ml-auto">
                <Icon icon="ri-arrow-right-s-fill" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default NavBar;
