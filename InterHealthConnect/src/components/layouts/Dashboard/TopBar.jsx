import React, { useContext, useRef, useState, useEffect } from "react";
import Logo from "../../common/Logo";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import Button from "../../common/Button";
import { navButtonsContext } from "../../contexts/NavigationContext";
function TopNavBar() {
  const { change } = useContext(navButtonsContext);
  const [expand, setExpand] = useState(false);
  const [confirmClosing, setConfirmClosing] = useState(false);
  const ProfileRef = useRef();
  const navigate = useNavigate();

  const handleExpanding = (e) => {
    if (expand) {
      setConfirmClosing(false);
    }
    setExpand(!expand);
  };

  const handleExiting = () => {
    setConfirmClosing(true);
  };

  const handleCanceling = () => {
    setConfirmClosing(false);
    setExpand(false);
    return;
  };

  const handleConfirm = () => {
    change("Dashboard");
    navigate("/");
    setConfirmClosing(false);
    setExpand(false);
  };

  const onchange = (e) => {
    console.log(e.target.value);
  };

  const handleButtonClick = (e, name) => {
    e.stopPropagation();
    alert(`Button ${name} clicked`);
  };
  const icons = ["ri-mail-line", "ri-notification-line", "ri-user-line"];

  return (
    <div className="w-full py-2 px-8 border-b border-lightBorder backdrop-blur-standard bg-bg-light-white flex justify-between items-center">
      <span className="flex items-center justify-start gap-1 text-lg tracking-wider font-poppins">
        <Logo dimensions="w-15 h-15" />
        InterHealthConnect
      </span>
      <div className={`flex items-center justify-end flex-1 gap-8`}>
        <span className="w-120 border border-inputBorder rounded-standard">
          <Input
            type="text"
            onChange={onchange}
            placeholder="Search anything from here..."
          />
        </span>
        <div className="flex flex-row gap-4 items-center justify-center text-white relative">
          {icons.map((icon, index) => {
            return (
              <Icon
                icon={`${icon}`}
                key={index}
                class_name={`${
                  index === 2 ? "w-12 h-12 text-2xl" : "w-8 h-8"
                } rounded-full bg-lightBorder flex items-center justify-center`}
              />
            );
          })}
          <span
            onClick={handleExpanding}
            className={`relative ${
              expand ? "border-3 border-blue" : ""
            } cursor-pointer w-8 h-8 rounded-full bg-lightBorder flex items-center justify-center`}
          >
            <Icon
              class_name="w-full h-full rounded-full items-center justify-center flex"
              icon={`${expand ? "ri-arrow-up-s-fill" : "ri-arrow-down-s-fill"}`}
            />
          </span>

          {expand && (
            <div
              ref={ProfileRef}
              className={`absolute flex flex-col items-center justify-center z-50 backdrop-standard bg-secondary top-full right-0 border-lightBorder rounded-standard w-40 h-fit py-2 gap-2 border`}
            >
              {[
                "Manage Schedule",
                "Credintials",
                "Security & Privacy",
                "Consultation rates",
                "Exit",
              ].map((button, index) => (
                <button
                  onClick={
                    index === 4
                      ? handleExiting
                      : (e) => handleButtonClick(e, button)
                  }
                  key={index}
                  className={`text-sm w-full py-1 px-4 transition-all ease-in-out duration-120  hover:font-semibold ${
                    index === 4
                      ? "text-red-dark after:bg-red-light hover:font-bold after:absolute relative hover:after:w-full after:inset-0 after:transition-all ease-in-out duration-100 after:z-1 z-2 after:w-0 after:top-0 after:m-auto"
                      : "text-blue after:bg-hover-light-blue hover:font-bold after:absolute relative hover:after:w-full after:inset-0 after:transition-all ease-in-out duration-100 after:z-1 z-2 after:w-0 after:top-0 after:m-auto"
                  }`}
                >
                  {button}
                </button>
              ))}
              {confirmClosing && (
                <div className="bg-bg-light-white rounded-standard backdrop-blur-xs z-10 absolute inset-0 text-sm font-semibold flex flex-col items-center justify-center text-blue gap-2 p-4">
                  <Button
                    type="button"
                    text="Confirm"
                    handleButtonClick={handleConfirm}
                    class_name="bg-blue text-white text-center hover:font-semibold py-0.5 transition-all duration-120 ease-in-out"
                  />
                  <Button
                    type="button"
                    text="Cancel"
                    handleButtonClick={handleCanceling}
                    class_name="bg-red-light text-red-dark hover:bg-red-hover py-0.5 text-center hover:font-semibold transition-all duration-120 ease-in-out"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopNavBar;
