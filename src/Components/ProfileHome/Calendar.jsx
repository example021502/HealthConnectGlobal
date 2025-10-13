import React, { useState, useMemo, useEffect } from "react";
import {
  format,
  add,
  startOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// START: Helper Functions and Data
const initialEvents = [
  { id: 1, title: "Team Meeting", date: add(new Date(), { days: 2 }) },
  { id: 2, title: "Code Review", date: add(new Date(), { days: 0 }) },
  {
    id: 3,
    title: "Project Demo",
    date: add(new Date(), { weeks: 1, days: 3 }),
  },
];

const getInitialEvents = () => {
  const storedEvents = localStorage.getItem("calendarEvents");
  if (storedEvents) {
    try {
      const parsedEvents = JSON.parse(storedEvents);
      return parsedEvents.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
    } catch (e) {
      console.error("Error parsing stored events:", e);
      return initialEvents;
    }
  }
  return initialEvents;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const WEEK_START_DAY = 0; // Sunday
// END: Helper Functions and Data

// START: EventForm Component
function EventForm({ day, onAdd, onClose }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <div className="mt-2 pt-1 border-t border-gray-200">
      <h3 className="text-xs font-semibold text-gray-700 m-0">
        Add Event on {format(day, "MMM d")}
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-1 mt-1">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="flex-grow px-1 py-0.5 border border-gray-300 rounded text-xs tracking-tight focus:border-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-1.5 py-0.5 border-none rounded cursor-pointer text-2xs font-medium bg-gray-400 text-white hover:bg-gray-600 transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-1.5 py-0.5 border-none rounded cursor-pointer text-2xs font-medium bg-gray-400 text-white hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </form>
    </div>
  );
}
// END: EventForm Component

// START: WeekCalendar Component
export default function WeekCalendar() {
  const today = new Date();

  // START: State
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: WEEK_START_DAY })
  );

  const [events, setEvents] = useState(getInitialEvents);
  const [selectedDay, setSelectedDay] = useState(null);
  // END: State

  // START: Effects & Memos
  useEffect(() => {
    const eventsToStore = events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
    }));
    localStorage.setItem("calendarEvents", JSON.stringify(eventsToStore));
  }, [events]);

  const weekDays = useMemo(() => {
    return eachDayOfInterval({
      start: currentWeekStart,
      end: add(currentWeekStart, { days: 6 }),
    });
  }, [currentWeekStart]);

  const headerDateRange = `${format(currentWeekStart, "MMM d")} – ${format(
    add(currentWeekStart, { days: 6 }),
    "MMM d, yyyy"
  )}`;

  const selectedDayEvents = selectedDay
    ? events.filter((event) => isSameDay(event.date, selectedDay))
    : [];
  // END: Effects & Memos

  // START: Handlers
  function previousWeek() {
    const newStart = add(currentWeekStart, { weeks: -1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
  }

  function nextWeek() {
    const newStart = add(currentWeekStart, { weeks: 1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
  }

  const isDayWithEvents = (day) => {
    return events.some((event) => isSameDay(event.date, day));
  };

  const addEvent = (title) => {
    if (selectedDay && title) {
      const newEvent = {
        id: Date.now(),
        title: title,
        date: selectedDay,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };
  // END: Handlers

  // START: Render
  return (
    <div className="w-full mx-auto bg-white font-sans transition-all duration-300">
      <div className="flex justify-between items-center mb-1 p-0">
        <h2 className="text-xs font-semibold text-primary-green m-0">
          {headerDateRange}
        </h2>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={previousWeek}
            className="flex items-center justify-center p-1 bg-white border border-gray-300 rounded-full text-gray-500 cursor-pointer transition-colors duration-300 h-6 w-6 hover:bg-gray-100 hover:text-gray-800"
          >
            <span className="sr-only">Previous week</span>
            <ChevronLeftIcon className="w-full h-full" aria-hidden="true" />
          </button>
          <button
            onClick={nextWeek}
            type="button"
            className="flex items-center justify-center p-1 bg-white border border-gray-300 rounded-full text-gray-500 cursor-pointer transition-colors duration-300 h-6 w-6 hover:bg-gray-100 hover:text-gray-800"
          >
            <span className="sr-only">Next week</span>
            <ChevronRightIcon className="w-full h-full" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Day Names Row */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 leading-tight">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days Row */}
      <div className="grid grid-cols-7 text-xs pb-1">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className={classNames(
              "flex flex-col justify-center items-center h-8 w-full",
              isSameDay(day, selectedDay) && "is-selected",
              isDayWithEvents(day) && "has-events"
            )}
          >
            <button
              type="button"
              onClick={() => setSelectedDay(day)}
              className={classNames(
                "flex items-center justify-center w-5 h-5 rounded-full border-none cursor-pointer font-medium transition-colors text-gray-700 bg-transparent hover:bg-gray-100",
                isToday(day) &&
                  "text-red-500 font-semibold border border-red-500 hover:bg-red-50",
                isSameDay(day, selectedDay) &&
                  "bg-primary-green text-white border-primary-green hover:bg-primary-green/80",
                isSameDay(day, selectedDay) &&
                  isToday(day) &&
                  "bg-primary-green text-white border-primary-green hover:bg-primary-green/80"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>

            {/* Event Dot */}
            {isDayWithEvents(day) && (
              <div
                className={classNames(
                  "w-1 h-1 rounded-full mt-0.5",
                  isSameDay(day, selectedDay) ? "bg-white" : "bg-primary-green"
                )}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Event Form and List */}
      {selectedDay && (
        <>
          <EventForm
            day={selectedDay}
            onAdd={addEvent}
            onClose={() => setSelectedDay(null)}
          />

          {selectedDayEvents.length > 0 && (
            <ul className="list-none p-0 m-0 mt-2 text-xs">
              {selectedDayEvents.map((event) => (
                <li
                  key={event.id}
                  className="py-1 px-2 border-l-3 border-primary-green bg-green-50 text-primary-green mb-0.5 w-full font-medium"
                >
                  {event.title}
                </li>
              ))}
            </ul>
          )}
          {selectedDayEvents.length === 0 && (
            <p className="mt-2 pt-1 border-t border-gray-200 text-center text-xs text-gray-500">
              No events scheduled for this day.
            </p>
          )}
        </>
      )}
      <div className="mt-1">{}</div>
    </div>
  );
}
