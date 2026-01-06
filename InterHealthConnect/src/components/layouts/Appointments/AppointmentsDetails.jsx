import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
const localizer = momentLocalizer(moment);

function AppointmentsDetails() {
  const myEventList = [
    {
      title: "Patient Consultation",
      start: new Date(2026, 0, 10, 10, 0),
      end: new Date(2026, 0, 10, 11, 0),
    },
  ];
  return (
    <div className="w-full h-125 sticky top-5 p-2 border border-lightBorder shadow-lg flex rounded-tr-lg rounded-tl-lg">
      <Calendar
        localizer={localizer}
        events={myEventList}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        className="h-full w-full"
      />
    </div>
  );
}

export default AppointmentsDetails;
