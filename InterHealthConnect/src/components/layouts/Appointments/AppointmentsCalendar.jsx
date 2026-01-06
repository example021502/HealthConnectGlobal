import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointments.css";

function AppointmentsCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAppt(true);
  };

  const handleDayClicked = () => {
    null;
  };

  const handleFormatAriaLabel = ({ date, view, locale }) => {
    if (view === "month") {
      return date.toLocaleDateString(locale, { year: "numeric" });
    }
    if (view === "year") {
      return date.toLocaleDateString(locale, { month: "numeric" });
    }

    return date.toLocaleDateString(locale);
  };

  const handleFormatRange = ({ date, view }) => {
    let rangeOffset = 9;

    if (view === "century") {
      rangeOffset = 99;
    }

    const startYear = date.getFullYear().toString().slice(-2);

    const endYear = (date.getFullYear() + rangeOffset).toString().slice(-2);

    return `${startYear}-${endYear}`;
  };
  return (
    <div className="w-full max-w-76 shadow-lg">
      <Calendar
        className="my-custom-calendar"
        onChange={handleDateChange}
        defaultView="month"
        value={selectedDate}
        onClickDay={handleDayClicked}
        formatAriaLabel={handleFormatAriaLabel}
        formatYearRange={handleFormatRange}
      />
    </div>
  );
}

export default AppointmentsCalendar;
