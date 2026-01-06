import React, { useEffect, useRef, useState } from "react";

const ActionDots = () => {
  const [actionDiv, setActionDiv] = useState(false);
  const popRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        setActionDiv(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = () => {
    setActionDiv(!actionDiv);
  };

  const buttons = ["Accept", "Reschedule", "See record", "Decline"];
  return (
    <span
      ref={popRef}
      onClick={handleAction}
      className={`relative w-fit h-fit flex flex-row gap-1 cursor-pointer px-1 py-0.5 rounded-standard hover:px-2 hover:py-1 transition-all duration-120 ease-in-out ${
        actionDiv ? "bg-blue" : ""
      }`}
    >
      <i className="w-1 h-1 rounded-full bg-blue-light" />
      <i className="w-1 h-1 rounded-full bg-blue-light" />
      <i className="w-1 h-1 rounded-full bg-blue-light" />
      {actionDiv && (
        <div className="w-30 h-fit shadow-sm gap-1 py-4 rounded-xl rounded-br-none flex flex-col items-center justify-center z-50 absolute bottom-1.5 right-[90%] border border-blue-light bg-background-white backdrop-blur-standard">
          {buttons.map((button, index) => {
            return (
              <p
                key={index}
                className={`text-sm py-1 w-full  transition-all duration-120 ease-in-out hover:font-semibold ${
                  index === 3
                    ? "text-red-dark hover:bg-red-hover"
                    : "hover:bg-light-gray text-blue-light"
                }`}
              >
                {button}
              </p>
            );
          })}
        </div>
      )}
    </span>
  );
};

export default ActionDots;
