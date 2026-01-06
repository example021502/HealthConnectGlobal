import React, { useLayoutEffect, useRef, useState } from "react";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import { motion } from "framer-motion";

function TodayTimeLine() {
  const targetRefs = useRef([]);
  const linesContainerRef = useRef(null);
  const [hover, setHover] = useState(false);

  const [linesCoords, setLinesCoords] = useState([]);

  useLayoutEffect(() => {
    const linesContainerRec = linesContainerRef.current.getBoundingClientRect();

    const newCoords = targetRefs.current.filter(Boolean).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - linesContainerRec.left + rect.width / 2,
        y: rect.top - linesContainerRec.top + rect.height / 2,
      };
    });

    setLinesCoords(newCoords);
  }, []);
  const timeline = [
    {
      from: "04:30",
      to: "05:30",
      label: "Brief & Patient rounds",
      venue: "Conference hall and chambers",
    },
    {
      from: "09:30",
      to: "03:00",
      label: "Consultations",
      venue: "Cabinet 204",
    },
    {
      from: "15:30",
      to: "16:45",
      label: "Surgeries",
      venue: "",
    },
    {
      from: "01:30",
      to: "2:50",
      label: "ER shift",
      venue: "",
    },
  ];

  return (
    <div className="flex flex-col relative gap-2 rounded-standard p-2 shadow-lg items-center overflow-y-hidden justify-start w-full max-w-70 h-full">
      <div className="absolute inset-0 backdrop-blur-standard bg-bg-light-white z-0" />
      <h1 className="z-2 flex items-center justify-center flex-row text-lg w-full font-semibold text-blue-light">
        <Label text="Today's timeline" class_name="" />
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`m-auto border
            ${hover ? "text-white" : "text-blue"}
            overflow-hidden relative flex-1 text-center mx-4 rounded-standard font-bold border-lightBorder`}
        >
          <motion.div
            animate={{
              scale: hover ? 80 : 1,
              backgroundColor: hover
                ? "var(--color-blue)"
                : "var(--color-light-apple-green)",
              zIndex: -1,
            }}
            transition={{
              ease: "easeInOut",
              type: "tween",
              duration: 0.4,
            }}
            className={`absolute top-0 bottom-0 rounded-standard 
             w-0.5 h-0.5 
            m-auto left-0 right-0 mx-auto`}
          ></motion.div>
          <Icon icon="ri-arrow-right-s-line" class_name={``} />
        </span>
      </h1>
      <div
        ref={linesContainerRef}
        className="flex z-2 w-full relative rounded-standard overflow-y-auto flex-col items-start justify-start p-2"
      >
        {timeline.map((appt, index) => {
          return (
            <React.Fragment key={index}>
              <div
                ref={(el) => (targetRefs.current[index] = el)}
                className="z-2 border-2 border-lightBorder text-text font-bold p-2.5 w-3 h-3 rounded-full flex items-center justify-center"
              >
                {index + 1}
              </div>
              <div className="ml-6 z-2 flex w-fit pr-2 flex-row text-xs text-text items-center justify-start rounded-standard border border-lightBorder gap-2">
                <p className="bg-hover-light-blue rounded-standard rounded-tr-none rounded-br-none font-semibold text-blue flex flex-col items-center justify-center p-1 pr-1.5 h-full">
                  <span>{appt.from}</span>
                  <span className="-m-0.5">-</span>
                  <span>{appt.to}</span>
                </p>
                <p className="flex flex-col items-start justify-center">
                  <span className="font-semibold text-[1em]">{appt.label}</span>
                  {appt.venue && <span>{appt.venue}</span>}
                </p>
              </div>
            </React.Fragment>
          );
        })}
        {linesCoords.map((point, index) => {
          const nextPoint = linesCoords[index + 1];
          if (!nextPoint) return null;
          console.log(nextPoint);
          return (
            <svg className="rounded-standard min-h-80 w-full absolute top-0 left-0 z-1">
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke="#cbd5e1"
                strokeWidth="1"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
}

export default TodayTimeLine;
