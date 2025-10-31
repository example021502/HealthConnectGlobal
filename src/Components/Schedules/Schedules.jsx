import React, { useState, useMemo, useEffect, useCallback, memo } from "react";
import {
  format,
  add,
  startOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";

// --- Configuration Constants ---
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const WEEK_START_DAY = 0; // Sunday
const PRIMARY_COLOR = "bg-emerald-600";
// Mandatory global variable for identifying the application in Firestore
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

// --- EventForm Component ---
/**
 * A memoized component for inputting and adding a new event.
 */
const EventForm = memo(({ day, onAdd, onClose }) => {
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
      <h3 className="text-xs font-semibold text-gray-700 m-0 mb-1">
        Add Event on {format(day, "MMM d")}
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-1 w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm tracking-tight focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
        />
        <button
          type="submit"
          title="Add Event"
          className={classNames(
            PRIMARY_COLOR,
            "flex items-center justify-center p-1 rounded text-white text-sm font-light transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md hover:shadow-lg"
          )}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          title="Close Form"
          onClick={onClose}
          className="flex items-center justify-center p-1 rounded text-white text-sm font-light transition-all duration-200 bg-gray-500 hover:bg-gray-600 active:scale-95 shadow-md hover:shadow-lg"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
});

// --- WeekCalendar Component ---
/**
 * Main component for viewing and managing weekly events using Firestore.
 * @param {object} props - Contains db (Firestore instance), userId, and isLoading state.
 */
export default function WeekCalendar({ db, userId, isLoading }) {
  const today = new Date();

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(today, { weekStartsOn: WEEK_START_DAY })
  );
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // 1. Fetch Events from Firestore (Real-time listener)
  useEffect(() => {
    // Only proceed if Firestore and user ID are available
    if (!db || !userId) return;

    // Construct the path for the user's private event collection
    const collectionPath = `artifacts/${appId}/users/${userId}/calendarEvents`;
    const eventsCollectionRef = collection(db, collectionPath);
    const q = query(eventsCollectionRef);

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          // Convert ISO string stored in Firestore back to a Date object
          date: new Date(doc.data().date),
        }));
        setEvents(fetchedEvents);
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
      }
    );

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [db, userId]);

  // Calculate the 7 days of the currently viewed week
  const weekDays = useMemo(() => {
    return eachDayOfInterval({
      start: currentWeekStart,
      end: add(currentWeekStart, { days: 6 }),
    });
  }, [currentWeekStart]);

  // Format the header date range for display
  const headerDateRange = `${format(currentWeekStart, "MMM d")} – ${format(
    add(currentWeekStart, { days: 6 }),
    "MMM d, yyyy"
  )}`;

  // Filter events for the currently selected day
  const selectedDayEvents = selectedDay
    ? events.filter((event) => isSameDay(event.date, selectedDay))
    : [];

  // --- Navigation Handlers ---
  const previousWeek = useCallback(() => {
    const newStart = add(currentWeekStart, { weeks: -1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
    setEditingEventId(null);
  }, [currentWeekStart]);

  const nextWeek = useCallback(() => {
    const newStart = add(currentWeekStart, { weeks: 1 });
    setCurrentWeekStart(newStart);
    setSelectedDay(null);
    setEditingEventId(null);
  }, [currentWeekStart]);

  const isDayWithEvents = (day) => {
    return events.some((event) => isSameDay(event.date, day));
  };

  // --- Firestore CRUD Operations ---

  // Create (Add) a new event
  const addEvent = async (title) => {
    if (selectedDay && title && db && userId) {
      const collectionPath = `artifacts/${appId}/users/${userId}/calendarEvents`;
      try {
        await addDoc(collection(db, collectionPath), {
          title: title.trim(),
          date: selectedDay.toISOString(), // Store as ISO string for reliable saving/retrieval
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // Delete an existing event
  const deleteEvent = async (id) => {
    if (db && userId) {
      const collectionPath = `artifacts/${appId}/users/${userId}/calendarEvents`;
      try {
        const docRef = doc(db, collectionPath, id);
        await deleteDoc(docRef);
        // Reset editing state if the deleted event was being edited
        if (editingEventId === id) {
          setEditingEventId(null);
          setNewTitle("");
        }
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  // Update an event's title
  const editEventTitle = async (id, title) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === "" || !db || !userId) {
      return;
    }
    const collectionPath = `artifacts/${appId}/users/${userId}/calendarEvents`;
    try {
      const docRef = doc(db, collectionPath, id);
      await updateDoc(docRef, {
        title: trimmedTitle,
      });
      setEditingEventId(null); // Exit editing mode upon successful update
      setNewTitle("");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const startEdit = (event) => {
    setEditingEventId(event.id);
    setNewTitle(event.title);
  };

  // --- Loading State UI ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <p className="ml-3 text-sm text-gray-500">Loading Calendar...</p>
      </div>
    );
  }

  // --- Main Calendar UI ---
  return (
    <div className="w-full bg-white font-sans transition-all duration-300 p-4 rounded-xl shadow-lg border border-gray-100">
      {/* Header and Navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 m-0">
          {headerDateRange}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousWeek}
            className="flex items-center justify-center p-1 bg-white border border-gray-300 rounded-full text-gray-500 cursor-pointer transition-colors duration-300 h-7 w-7 hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Previous week"
          >
            <ChevronLeftIcon className="w-full h-full" aria-hidden="true" />
          </button>
          <button
            onClick={nextWeek}
            type="button"
            className="flex items-center justify-center p-1 bg-white border border-gray-300 rounded-full text-gray-500 cursor-pointer transition-colors duration-300 h-7 w-7 hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Next week"
          >
            <ChevronRightIcon className="w-full h-full" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Day Names Row */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 border-b pb-2 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
          <div key={dayName}>{dayName}</div>
        ))}
      </div>

      {/* Days Row - Calendar Grid */}
      <div className="grid grid-cols-7 text-xs pb-1">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className="flex flex-col justify-start items-center h-10 w-full"
          >
            <button
              type="button"
              onClick={() => {
                // Toggle day selection
                setSelectedDay(isSameDay(day, selectedDay) ? null : day);
                setEditingEventId(null); // Exit editing mode when selecting a new day
              }}
              className={classNames(
                "flex items-center justify-center w-7 h-7 rounded-full border-none cursor-pointer font-medium transition-all duration-150 text-gray-700 hover:bg-gray-100 active:scale-95 shadow-sm",
                // Highlight today
                isToday(day) &&
                  "ring-2 ring-red-500 ring-offset-1 text-red-700 hover:bg-red-100",
                // Highlight selected day
                isSameDay(day, selectedDay) &&
                  `${PRIMARY_COLOR} !text-white !font-bold ring-0 shadow-lg hover:opacity-90`
              )}
              aria-label={`Select date ${format(day, "MMM d")}`}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>

            {/* Event Dot Indicator */}
            {isDayWithEvents(day) && (
              <div
                className={classNames(
                  "w-1.5 h-1.5 rounded-full mt-0.5",
                  isSameDay(day, selectedDay)
                    ? "bg-white"
                    : PRIMARY_COLOR.replace("bg-", "bg-")
                )}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Event Form and List Area */}
      {selectedDay && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
          {/* Form for adding a new event */}
          <EventForm
            day={selectedDay}
            onAdd={addEvent}
            onClose={() => setSelectedDay(null)}
          />

          {selectedDayEvents.length > 0 ? (
            <ul className="list-none p-0 m-0 mt-3 text-xs space-y-2">
              <h4 className="text-sm font-semibold text-gray-600">
                Events on {format(selectedDay, "EEEE, MMMM d")}:
              </h4>
              {selectedDayEvents.map((event) => (
                <li
                  key={event.id}
                  className="py-1.5 px-3 border-l-4 border-emerald-500 bg-white text-gray-800 shadow-sm rounded flex items-center justify-between transition-all duration-150"
                >
                  {editingEventId === event.id ? (
                    // Input field for editing
                    <div className="flex gap-2 items-center w-full">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-sm tracking-tight focus:border-emerald-500 focus:outline-none"
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
                        className="text-sm p-1 text-emerald-600 hover:text-emerald-800 active:scale-95 transition-all"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Cancel"
                        onClick={() => {
                          setEditingEventId(null);
                          setNewTitle("");
                        }}
                        className="text-sm p-1 text-red-600 hover:text-red-800 active:scale-95 transition-all"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    // Display event and action buttons
                    <div className="flex items-center justify-start w-full">
                      <span className="text-sm font-medium">{event.title}</span>
                      <div className="ml-auto flex items-center gap-1">
                        {/* Edit Button */}
                        <button
                          type="button"
                          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-emerald-600 transition-all active:scale-95"
                          title="Edit Event"
                          onClick={() => startEdit(event)}
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        {/* Delete Button */}
                        <button
                          type="button"
                          className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-all active:scale-95"
                          title="Delete Event"
                          onClick={() => deleteEvent(event.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-center text-xs text-gray-500">
              No events scheduled for {format(selectedDay, "MMM d")}.
            </p>
          )}
        </div>
      )}
      {/* User ID Display (Important for collaboration/debugging) */}
      <div className="mt-4 border-t pt-2 text-xs text-gray-400 text-center">
        User ID: <span className="text-gray-600">{userId || "N/A"}</span>
      </div>
    </div>
  );
}
