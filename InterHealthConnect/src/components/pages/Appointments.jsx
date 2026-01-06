import React, { useRef, useEffect, useState, use } from "react";
import DoughnutChartsData from "../Charts/DoughnutCommonData.json";
import DoughnutCommon from "../common/DoughnutCommon";
import AppointmentsCalendar from "../layouts/Appointments/AppointmentsCalendar";
import TodayTimeLine from "../layouts/Appointments/TodayTimeLine";
import AppointmentsLegend from "../layouts/Appointments/AppointmentsLegend";
import AppointmentsWorkLoadDisplay from "../layouts/Appointments/AppointmentsWorkLoadDisplay";
import AppointmentsTotalPatients from "../layouts/Appointments/AppointmentsTotalPatients";
import AppointmentsDetails from "../layouts/Appointments/AppointmentsDetails";
import Label from "../common/Label";
import { motion } from "framer-motion";
import Icon from "../common/Icon";
function Appointments() {
  const DoughnutData = DoughnutChartsData;
  const containerRef = useRef(null);
  const BigCalendarContainerRef = useRef(null);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const scrolled = containerRef.current;

    if (!scrolled) return;

    const updateBlur = () => {
      const { scrollTop } = scrolled;

      if (scrollTop > 20) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };

    scrolled.addEventListener("scroll", updateBlur);

    return () => scrolled.removeEventListener("scroll", updateBlur);
  }, []);

  const ScrollReset = () => {
    if (BigCalendarContainerRef.current && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ClickListenerUpdater = (event) => {
      if (
        BigCalendarContainerRef &&
        !BigCalendarContainerRef.current.contains(event.target)
      ) {
        ScrollReset();
      }
    };

    document.addEventListener("mousedown", ClickListenerUpdater);

    return () =>
      document.removeEventListener("mousedown", ClickListenerUpdater);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full gap-6 overflow-y-auto overflow-x-hidden flex flex-col items-start justify-start p-4 relative"
    >
      <div className="flex w-full h-70 flex-row gap-6 items-center justify-center sticky top-0">
        <AppointmentsCalendar />
        <TodayTimeLine />
        <div className="h-full w-full flex-1 border border-lightBorder rounded-standard shadow-lg flex flex-col items-center justify-around p-2 gap-2">
          <AppointmentsWorkLoadDisplay />
          <AppointmentsTotalPatients />
          <div className="w-full h-fit flex flex-col items-center justify-center border-t border-lightBorder pt-2">
            <Label
              text="Patients By Condition"
              class_name="font-semibold text-md text-text text-center"
            />
            <div className="w-full h-fit flex flex-row items-center justify-around">
              <div className="w-20 h-20 flex items-center justify-center relative">
                <DoughnutCommon
                  data={DoughnutData.patientsByCondition.data}
                  options={DoughnutData.patientsByCondition.options}
                />
              </div>
              <AppointmentsLegend />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{
          scale: blur ? 1.02 : 1,
          transition: {
            ease: "easeInOut",
            duration: 0.2,
            type: "tween",
          },
        }}
        className={`h-125 ${
          blur
            ? "backdrop-blur-standard bg-background-white"
            : "bg-bg-light-white"
        } relative rounded-standard w-full shadow-xl`}
        ref={BigCalendarContainerRef}
      >
        {blur && (
          <span
            onClick={ScrollReset}
            className={`absolute text-blue -top-8 right-0 left-0 mx-auto w-12 z-50 h-12 font-bold text-2xl  rounded-full items-center justify-center backdrop-blur-standard bg-background-white`}
          >
            <Icon
              icon="ri-arrow-down-line"
              class_name="w-full h-full flex items-center justify-center z-4"
            />
          </span>
        )}
        <AppointmentsDetails />
      </motion.div>
    </div>
  );
}

export default Appointments;
