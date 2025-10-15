import { useState, useEffect, useMemo, useCallback } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import WeekCalendar from "./Calendar";
import Documents from "../Documents/Documents";
import Charts from "../Charts/Charts";

// START: Helper Functions
const getCalendarEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem("calendarEvents");
  if (storedEvents) {
    try {
      const parsedEvents = JSON.parse(storedEvents);
      return parsedEvents
        .map((event) => ({
          ...event,
          date: new Date(event.date),
        }))
        .sort((a, b) => a.date - b.date);
    } catch (e) {
      console.error("Error parsing stored calendar events:", e);
      return [];
    }
  }
  return [];
};
// END: Helper Functions

// START: Navigation Data
const navItems = [
  { icon: "ri-user-line", name: "Profile" },
  { icon: "ri-folders-line", name: "Documents" },
  { icon: "ri-health-book-line", name: "Patients" },
  { icon: "ri-calendar-schedule-line", name: "Schedules" },
  { icon: "ri-line-chart-line", name: "Charts" },
  { icon: "ri-message-2-line", name: "Messaging" },
  { icon: "ri-team-line", name: "Collaboration" },
  { icon: "ri-discuss-line", name: "Consults" },
  { icon: "ri-admin-line", name: "Administrative" },
  { icon: "ri-customer-service-2-line", name: "Support" },
  { icon: "ri-settings-4-line", name: "Settings" },
];
// END: Navigation Data

function ProfileHome() {
  // START: State Management
  const [expand, setExpand] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMetric, setActiveMetric] = useState("Heart Rate");
  const [allCalendarEvents, setAllCalendarEvents] = useState(
    getCalendarEventsFromLocalStorage
  );
  const [display, setDisplay] = useState("Profile");
  // END: State Management

  // START: Effects & Callbacks
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAllCalendarEvents(getCalendarEventsFromLocalStorage());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExpanding = useCallback(() => {
    setExpand((prev) => !prev);
  }, []);
  // END: Effects & Callbacks

  // START: Chart Data Memoization
  const chartData = useMemo(() => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let dataSet;

    switch (activeMetric) {
      case "Blood Pressure":
        dataSet = [450, 550, 600, 700, 950, 800, 750];
        break;
      case "Glucose":
        dataSet = [850, 350, 450, 500, 150, 600, 650];
        break;
      case "Heart Rate":
      default:
        dataSet = [100, 800, 400, 200, 850, 650, 550];
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: activeMetric,
          data: dataSet,
          backgroundColor: "#145c14",
          borderRadius: 4,
        },
      ],
    };
  }, [activeMetric]);

  // Time and Icons
  const { date, time, notifications, settings, exit } = {
    date: currentTime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    time: currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    notifications: "ri-notification-3-line",
    settings: "ri-settings-5-line",
    exit: "ri-logout-box-line",
  };

  // Component Render
  return (
    <div className="flex items-center justify-center m-0 bg-gradient-to-r from-bg1 to-bg2 h-screen w-full">
      <div className="w-full h-full flex text-black">
        {/* START: Left Panel */}
        <div
          className={`ml-0 flex flex-col justify-center items-center text-left text-sidebar-text transition-all duration-200 ease-in-out round-t-l-xl ${
            expand ? "w-48" : "w-[60px]"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={() => setDisplay(item.name)}
              className={`m-[0.4em] p-[0.2em] text-base w-[80%] tracking-wider transition-all duration-200 ease-in-out relative no-underline text-inherit hover:bg-primary-color border-b-1 border-primary-color ${
                expand ? "text-left" : "text-center"
              }
              `}
            >
              <i className={`text-lg mr-2 ${item.icon}`} />
              {expand && item.name}
              {/* Custom Pseudo-element styles for navigation hover effect */}
            </a>
          ))}
        </div>

        {/* START: Right Panel */}
        <div className="w-full h-full flex flex-col items-start justify-start bg-gradient-to-b from-gray-50 to-gray-200 rounded-tr-md overflow-y-auto relative z-10">
          {/* Expand Arrow Button */}
          <i
            className={`transition-all duration-200 ease-in-out fixed left-4 top-4 flex justify-center items-center text-sidebar-text text-xl cursor-pointer ${
              expand
                ? "ri-arrow-left-double-line"
                : "ri-arrow-right-double-line"
            }`}
            onClick={handleExpanding}
          />

          {/* Right Top Panel (Header) */}
          <div className="w-full z-50 flex items-center shadow-md bg-header-bg/40 rounded-tr-md h-12">
            <h2 className="my-0 mx-4 text-lg font-['Trebuchet_MS'] tracking-wider">
              {display} Overview
            </h2>
            <div className="pr-4 text-sm flex-1 flex flex-row items-center justify-end gap-4">
              <p className="flex items-center m-0 text-sm text-gray-600">
                <i className="ri-calendar-line" /> {date}
              </p>
              <p className="flex items-center m-0 text-sm text-gray-600">
                <i className="ri-time-line" /> {time}
              </p>
              <i
                className={`text-lg cursor-pointer ml-1 p-1 rounded transition-all duration-200 ease-in-out hover:text-primary-green hover:bg-gray-100 ${notifications}`}
                title="Notifications"
              />
              <i
                className="text-lg cursor-pointer ml-1 p-1 rounded transition-all duration-200 ease-in-out hover:text-primary-green hover:bg-gray-100 ri-mail-line"
                title="Messages"
              />
              <i
                className={`text-lg cursor-pointer ml-1 p-1 rounded transition-all duration-200 ease-in-out hover:text-primary-green hover:bg-gray-100 ${settings}`}
                title="Settings"
              />
              <i
                className={`text-lg cursor-pointer ml-1 p-1 rounded transition-all duration-200 ease-in-out hover:text-primary-green hover:bg-gray-100 ${exit}`}
                title="Log Out"
              />
            </div>
          </div>

          {/* START: Main Content Area */}
          {display === "Profile" ? (
            <div className="flex flex-row w-full flex-1 m-0 items-start justify-start relative transition-all duration-300 ease-in-out">
              <div className="flex flex-col items-start justify-start p-4 flex-1">
                {/* Right Middle Panel */}
                <div className="flex flex-row items-start justify-start w-full">
                  {/* Profile Card Info */}
                  <div className="rounded-sm flex flex-col items-center justify-center p-2 h-[90%] flex-1 shadow-md">
                    <div
                      className="border border-gray-300 h-[140px] w-[140px] rounded-full bg-center bg-no-repeat bg-cover relative"
                      style={{
                        backgroundImage:
                          "url('https://i.ibb.co/607r6z0v/d6-removebg-preview.png')",
                      }}
                    >
                      <i
                        className="ri-camera-fill absolute bottom-2 right-0 text-lg rounded-full p-0.5 transition-all duration-200 ease-in-out bg-white text-primary-green cursor-pointer hover:border hover:border-gray-600 hover:-translate-y-0.5"
                        title="Change Image"
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="p-0 text-base w-full tracking-wider mt-4 mb-2 text-left flex items-center">
                        Dr. Name{" "}
                        <i className="text-xs font-light ml-auto relative flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer text-primary-green before:absolute before:bottom-1 before:left-0 hover:before:bg-primary-green hover:before:w-full hover:before:h-px">
                          <span>Edit</span>
                        </i>
                      </h2>
                      {[
                        { label: "User Type", value: "Doctor/Specialist" },
                        { label: "Specialty", value: "Cardiology" },
                        { label: "Email", value: "example@healthconnect.com" },
                        { label: "Contact No", value: "+91 6766782362" },
                        { label: "Address", value: "India, Mumbai" },
                      ].map((detail) => (
                        <p
                          key={detail.label}
                          className="text-left text-sm w-full flex items-center justify-start mt-1 mb-1 text-gray-600"
                        >
                          {detail.label}{" "}
                          <span className="font-semibold text-black ml-auto w-[180px]">
                            {detail.value}
                          </span>
                        </p>
                      ))}
                      <div className="flex gap-3 mt-4 mb-2">
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          className="no-underline text-gray-600 border border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:border-primary-green hover:bg-primary-green hover:-translate-y-0.5"
                        >
                          <i className="ri-linkedin-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="Facebook"
                          className="no-underline text-gray-600 border border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:border-primary-green hover:bg-primary-green hover:-translate-y-0.5"
                        >
                          <i className="ri-facebook-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="Twitter"
                          className="no-underline text-gray-600 border border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:border-primary-green hover:bg-primary-green hover:-translate-y-0.5"
                        >
                          <i className="ri-twitter-fill" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Container */}
                  <div className="rounded-sm shadow-md flex flex-col items-center p-3 ml-4 h-[90%] flex-1">
                    <div className="flex items-center w-full">
                      <h2 className="m-0 text-base p-0">
                        Analytics: {activeMetric}
                      </h2>
                      <p className="m-0 ml-auto text-xs cursor-pointer">
                        Weekly{" "}
                        <i className="ml-1.5 text-sm ri-arrow-down-s-line" />
                      </p>
                    </div>
                    <div className="mt-3 mb-2 flex gap-2.5 items-center justify-start w-full">
                      {["Heart Rate", "Blood Pressure", "Glucose", "4+"].map(
                        (metric) => (
                          <button
                            key={metric}
                            onClick={() => setActiveMetric(metric)}
                            className={`py-1 px-3 text-xs rounded-xl border border-gray-300 tracking-wider text-black bg-transparent transition-all duration-200 ease-in-out cursor-pointer hover:text-white hover:bg-gray-600 hover:-translate-y-0.5 ${
                              activeMetric === metric
                                ? "bg-primary-green text-white border-primary-green"
                                : ""
                            }`}
                          >
                            {metric}
                          </button>
                        )
                      )}
                    </div>
                    <div className="w-full h-72 flex items-center">
                      <Bar
                        data={chartData}
                        options={{ maintainAspectRatio: true }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Bottom Panel (Table) */}
                <div className="w-full flex items-start justify-start py-2">
                  <div className="flex flex-col p-4 shadow-md rounded-sm mt-4 mb-2 w-full">
                    <h3 className="text-base mb-3">
                      Latest Patient/Doctor Onboarding
                    </h3>
                    <div className="flex justify-center items-start text-sm w-full flex-1 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Image
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Name
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Rating
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Contact No.
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Role
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Appt.
                            </th>
                            <th className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300">
                              Note
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Table Row 1 */}
                          <tr>
                            <td>
                              <img
                                src="https://i.ibb.co/mmnT5J7/d7.jpg"
                                alt="Denny Jordan"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td>Denny Jordan</td>
                            <td>4/5</td>
                            <td>+91...12341</td>
                            <td>Doctor</td>
                            <td>Yes</td>
                            <td>
                              <i
                                className="ri-notification-fill text-lg text-primary-green"
                                title="Notes ON"
                              />
                            </td>
                          </tr>
                          {/* Table Row 2 */}
                          <tr>
                            <td>
                              <img
                                src="https://i.ibb.co/r2P4GKQ1/d8.jpg"
                                alt="Jackson Smith"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td>Jackson Smith</td>
                            <td>5/5</td>
                            <td>+91...6548</td>
                            <td>Cardiology</td>
                            <td>No</td>
                            <td>
                              <i
                                className="ri-notification-off-fill text-lg text-red-500"
                                title="Notes OFF"
                              />
                            </td>
                          </tr>
                          {/* Table Row 3 */}
                          <tr>
                            <td>
                              <img
                                src="https://i.ibb.co/WNqMScKq/d10.jpg"
                                alt="Johnson"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            </td>
                            <td>Johnson</td>
                            <td>3/5</td>
                            <td>+91...3245</td>
                            <td>Nurse</td>
                            <td>Yes</td>
                            <td>
                              <i
                                className="ri-notification-fill text-lg text-primary-green"
                                title="Notes ON"
                              />
                            </td>
                          </tr>
                          {/* Style rule for table data border */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Far Right Panel */}
              <div
                className="ml-auto flex flex-col items-center justify-center mt-0 transition-all duration-300 ease-in-out"
                style={{ width: expand ? "360px" : "300px" }}
              >
                <div className="rounded-sm shadow-md flex w-[90%] h-full m-4 flex-col justify-start items-center p-3 pt-4">
                  {/* Far Right Top Row Buttons */}
                  <div className="w-full flex items-center justify-center mb-3 pt-0.5 pb-0 transition-all duration-300 ease-in-out">
                    <button className="transition-all duration-300 ease-in-out text-xs text-black py-0.5 px-3 rounded-full border border-gray-300 tracking-wider mx-1 font-sans cursor-pointer hover:bg-primary-green hover:text-white">
                      Profile
                    </button>
                    <button className="transition-all duration-300 ease-in-out text-xs text-black py-0.5 px-3 rounded-full border border-gray-300 tracking-wider mx-1 font-sans cursor-pointer hover:bg-primary-green hover:text-white">
                      History
                    </button>
                    <button className="transition-all duration-300 ease-in-out text-xs text-black py-0.5 px-1.5 rounded-full border border-gray-300 tracking-wider mx-1 font-sans cursor-pointer hover:bg-primary-green hover:text-white w-8 h-8 flex items-center justify-center">
                      4+
                    </button>
                  </div>

                  {/* Doc Profile Card */}
                  <div
                    className="w-[90%] flex items-end justify-center relative h-48 border border-gray-300 rounded mb-1"
                    style={{
                      backgroundImage:
                        "url('https://i.ibb.co/r2P4GKQ1/d8.jpg')",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="flex items-center justify-center z-10 border border-gray-300 rounded w-[80%] p-1.5 mb-4 relative bg-white/60 backdrop-blur-sm">
                      <div className="flex flex-col items-start justify-center w-full z-10">
                        <h1 className="text-base font-semibold m-0">
                          Dr. Jackson Smith
                        </h1>
                        <p className="m-0 text-xs">
                          <i className="not-italic">15 Yrs Exp.</i>{" "}
                          <span className="ml-1">Male</span>
                        </p>
                      </div>
                      <i
                        className="ri-phone-fill text-xl p-0.5 rounded-full transition-all duration-300 ease-in-out right-0.5 text-primary-green cursor-pointer border border-primary-green/40 hover:bg-primary-green hover:text-white hover:border-primary-green"
                        title="Call"
                      />
                    </div>
                  </div>

                  {/* More Doc Info */}
                  <div className="w-[90%] flex flex-col mt-1 mb-1">
                    <p className="my-0.5 text-sm text-left text-gray-600">
                      5th street, Tompstone, Eden House, Gokwe
                    </p>
                    <p className="my-0.5 text-sm text-left text-gray-600">
                      <a
                        href="tel:+910787246713"
                        className="cursor-pointer transition-all duration-300 ease-in-out text-primary-green font-medium no-underline hover:font-semibold hover:-translate-y-0.5"
                      >
                        +91 07872 46713
                      </a>
                    </p>
                    <p className="my-0.5 text-sm text-left text-gray-600">
                      Last Appointment: 14 Jun 2014
                    </p>
                  </div>

                  {/* Appointment Div (Calendar) */}
                  <div className="m-0 p-1 flex flex-col items-center justify-start w-[90%] relative border border-gray-300 rounded-lg">
                    <WeekCalendar />
                  </div>

                  {/* Events List Div */}
                  <div className="w-[90%] mt-4 pt-2 border-t border-gray-200">
                    <h4 className="text-base font-semibold m-0 mb-1 text-left">
                      Upcoming Appointments
                    </h4>
                    {allCalendarEvents.length > 0 ? (
                      <ul className="list-none p-0 m-0">
                        {allCalendarEvents.slice(0, 5).map((event) => (
                          <li
                            key={event.id}
                            className="py-1 text-sm border-l-4 border-primary-green mb-1 pl-2 flex gap-1.5 items-baseline"
                          >
                            <span className="font-semibold text-primary-green">
                              {event.date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                              :
                            </span>
                            <span className="text-gray-700">{event.title}</span>
                          </li>
                        ))}
                        {allCalendarEvents.length > 5 && (
                          <li className="text-xs text-gray-600 pt-1 pb-0.5 text-center block">
                            + {allCalendarEvents.length - 5} more events
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-600 pt-1 pb-0.5 text-center block">
                        No upcoming appointments found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : display === "Documents" ? (
            <Documents />
          ) : display === "Charts" ? (
            <Charts />
          ) : (
            // START: Placeholder Sections
            <div className="w-full h-full flex flex-col content-center justify-center">
              <h2 className="text-lg text-gray-600 text-center w-full">
                {display} Section
              </h2>
              <p className="text-center text-gray-600">
                This is where {display.toLowerCase()} features will be.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHome;
