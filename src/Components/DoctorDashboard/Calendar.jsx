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
      <form onSubmit={handleSubmit} className="flex gap-1 mt-1 w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-sm tracking-tight focus:border-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className={`ri-add-line px-2 border-none rounded cursor-pointer text-sm font-lighter bg-[rgba(37,73,43,0.8)] text-white hover:bg-[rgba(37,73,43,1)] transition-all duration-200 hover:after:content-["add"] hover:after:absolute relative hover:after:bottom-[100%] hover:after:left-[50%] hover:after:text-xs hover:after:text-[rgba(37,73,43,1)] hover:after:z-1`}
        ></button>
        <button
          type="button"
          title="close"
          onClick={onClose}
          className={`ri-close-line px-2 border-none rounded cursor-pointer text-sm font-lighter bg-[rgb(131,16,16,0.8)] text-white hover:bg-[rgb(131,16,16,1)] transition-all duration-200 hover:after:content-["close"] hover:after:absolute relative hover:after:bottom-[100%] hover:after:left-[50%] hover:after:text-xs hover:after:text-[rgba(37,73,43,1)] hover:after:z-1`}
        ></button>
      </form>
    </div>
  );
}

// START: WeekCalendar Component
export default function WeekCalendar() {
  const today = new Date();

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: WEEK_START_DAY })
  );

  const [events, setEvents] = useState(getInitialEvents);
  const [selectedDay, setSelectedDay] = useState(null);

  // New states for editing functionality
  const [editingEventId, setEditingEventId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

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

  // START: Handlers
  function previousWeek() {
    const newStart = add(currentWeekStart, { weeks: -1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
    setEditingEventId(null); // Clear edit state on week change
  }

  function nextWeek() {
    const newStart = add(currentWeekStart, { weeks: 1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
    setEditingEventId(null); // Clear edit state on week change
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

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const editEventTitle = (id, title) => {
    if (title.trim() === "") {
      // Prevent saving an empty title
      return;
    }
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, title: title.trim() } : event
      )
    );
    setEditingEventId(null); // Exit editing mode
    setNewTitle(""); // Clear the temporary state
  };

  // Function to prepare for editing
  const startEdit = (event) => {
    setEditingEventId(event.id);
    setNewTitle(event.title);
  };

  // START: Render
  return (
    <div className="w-full bg-white font-sans transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xs font-semibold text-[rgba(37,73,43,1)] m-0">
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
              onClick={() => {
                setSelectedDay(day);
                setEditingEventId(null); // Close edit mode when selecting a new day
              }}
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
                  className="py-1 px-2 border-l-2 border-[rgba(37,73,43,1)] bg-green-50 text-[rgba(37,73,43,1)] mb-1 w-full font-medium flex flex-col justify-start"
                >
                  {editingEventId === event.id ? (
                    // Render input for editing
                    <div className="flex gap-1 items-center w-full">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-sm tracking-tight focus:border-gray-500 focus:outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editEventTitle(event.id, newTitle);
                          }
                          if (e.key === "Escape") {
                            setEditingEventId(null);
                            setNewTitle("");
                          }
                        }}
                        autoFocus
                      />
                      <button
                        type="button"
                        title="Save"
                        onClick={() => editEventTitle(event.id, newTitle)}
                        className="ri-check-line text-sm px-2 py-0.5 text-green-700 hover:text-green-900"
                      />
                      <button
                        type="button"
                        title="Cancel"
                        onClick={() => {
                          setEditingEventId(null);
                          setNewTitle("");
                        }}
                        className="ri-close-line text-sm px-2 py-0.5 text-red-700 hover:text-red-900"
                      />
                    </div>
                  ) : (
                    // Render event title and action buttons
                    <div className="flex items-center justify-start w-full">
                      <span>{event.title}</span>
                      <div className="ml-auto gap-2 flex items-center justify-center">
                        {/* Edit Button */}
                        <i
                          className="ri-edit-line font-lighter text-sm text-[rgba(37,73,43,0.8)] hover:text-[rgba(37,73,43,1)] hover:shadow-xl hover:transform hover:translate-y-[-0.5px] duration-100 transition-all px-1 py-0.5 mx-1 rounded-full cursor-pointer"
                          title="Edit Event"
                          onClick={() => startEdit(event)}
                        />
                        {/* Delete Button */}
                        <i
                          className="ri-delete-bin-line font-lighter text-sm text-[rgba(37,73,43,0.8)] hover:text-red-600 hover:shadow-xl hover:transform hover:translate-y-[-0.5px] duration-100 transition-all px-1 py-0.5 rounded-full cursor-pointer"
                          title="Delete Event"
                          onClick={() => deleteEvent(event.id)}
                        />
                      </div>
                    </div>
                  )}
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
