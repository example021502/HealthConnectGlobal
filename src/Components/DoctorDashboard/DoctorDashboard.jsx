import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Chart from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import WeekCalendar from "./Calendar";
import Documents from "../Documents/Documents";
import Charts from "../Charts/Charts";
import GraphSummery from "./GraphSummery";

const recipient = "manager@yourcompany.com";
const subject = "Query Regarding Account Setup";
const body =
  "Dear Support Team,\n\nI am writing regarding my account. [Insert details here].\n\nThank you.";
const cc = "musarafudesire36@gmail.com";
const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
  subject
)}&body=${encodeURIComponent(body)}&cc=${encodeURIComponent(cc)}`;

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

function DoctorDashboard() {
  // START: State Management
  const [expand, setExpand] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMetric, setActiveMetric] = useState("Reviews");
  const tdref = useRef(null);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellheight, setCellHeight] = useState(0);
  const [allCalendarEvents, setAllCalendarEvents] = useState(
    getCalendarEventsFromLocalStorage
  );
  const [display, setDisplay] = useState("Profile");

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

  const width = window.innerWidth;
  useEffect(() => {
    const setDimensions = () => {
      if (tdref.current) {
        setCellWidth(tdref.current.offsetWidth);
        setCellHeight(tdref.current.offsetHeight);
      }
    };
    setDimensions();
    window.addEventListener("resize", setDimensions);
    return () => window.removeEventListener("resize", setDimensions);
  }, [width]);

  const keyValues = [
    "image",
    "name",
    "rating",
    "contact",
    "specialty",
    "appointment",
    "status",
  ];
  const dataValues = [
    {
      id: 1,
      image: "https://i.ibb.co/mmnT5J7/d7.jpg",
      alt: "Denny Jordan",
      name: "Denny Jordan",
      rating: 4,
      contact: "+91 23089 12341",
      specialty: "Doctor",
      appointment: "yes",
      status: "online",
    },
    {
      id: 2,
      image: "https://i.ibb.co/r2P4GKQ1/d8.jpg",
      alt: "Jack Smith",
      name: "Jack Smith",
      rating: 5,
      contact: "+91 90089 12341",
      specialty: "Nurse",
      appointment: "yes",
      status: "offline",
    },
    {
      id: 3,
      image: "https://i.ibb.co/WNqMScKq/d10.jpg",
      alt: "Johnson",
      name: "Johnson",
      rating: 3,
      contact: "+91 45689 12341",
      specialty: "Cardiology",
      appointment: "yes",
      status: "offline",
    },
    {
      id: 4,
      image: "https://i.ibb.co/WNqMScKq/d10.jpg",
      alt: "Rampad Ramio",
      name: "Rampad Ramio",
      rating: 2,
      contact: "+91 55389 12341",
      specialty: "Cardiology",
      appointment: "no",
      status: "online",
    },
  ];

  // START: Chart Data Memoization
  const chartData = useMemo(() => {
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let dataSet;
    let backgroundColor = [];

    switch (activeMetric) {
      case "Appointments":
        dataSet = [450, 550, 600, 700, 950, 800, 750];
        dataSet.forEach((item) => {
          if (item < 500) {
            backgroundColor.push("#e68a8a");
          }
          if (item >= 500 && item <= 600) {
            backgroundColor.push("#F6AD55");
          }
          if (item > 600 && item <= 700) {
            backgroundColor.push("#9F7AEA");
          }
          if (item > 700) {
            backgroundColor.push("#48BB78");
          }
        });
        break;
      case "Patients":
        dataSet = [850, 350, 450, 500, 150, 600, 650];
        dataSet.forEach((item) => {
          if (item < 300) {
            backgroundColor.push("#e68a8a");
          }
          if (item >= 300 && item <= 500) {
            backgroundColor.push("#F6AD55");
          }
          if (item > 500 && item <= 700) {
            backgroundColor.push("#9F7AEA");
          }
          if (item > 700) {
            backgroundColor.push("#48BB78");
          }
        });
        break;
      case "Reviews":
        dataSet = [400, 800, 400, 200, 850, 650, 550];
        dataSet.forEach((item) => {
          if (item < 300) {
            backgroundColor.push("#e68a8a");
          }
          if (item >= 300 && item <= 500) {
            backgroundColor.push("#F6AD55");
          }
          if (item > 500 && item <= 700) {
            backgroundColor.push("#9F7AEA");
          }
          if (item > 700) {
            backgroundColor.push("#48BB78");
          }
        });
        break;
      case "4+":
      default:
        dataSet = [400, 800, 400, 200, 850, 650, 550];
        dataSet.forEach((item) => {
          if (item < 300) {
            backgroundColor.push("#e68a8a");
          }
          if (item >= 300 && item <= 500) {
            backgroundColor.push("#F6AD55");
          }
          if (item > 500 && item <= 700) {
            backgroundColor.push("#9F7AEA");
          }
          if (item > 700) {
            backgroundColor.push("#48BB78");
          }
        });
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: activeMetric,
          data: dataSet,
          backgroundColor: backgroundColor,
          hoverOffset: 2,
        },
      ],
    };
  }, [activeMetric]);

  // START: Header Time and Icons
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

  // START: Component Render
  return (
    <div className="flex items-center justify-center m-0 w-full bg-[white] overflow-y-hidden h-screen realtive">
      <img
        src="https://i.ibb.co/j9X72ZRQ/35fefcee-9a75-4fe6-abbd-043600e7fa1f.jpg"
        alt="Background image"
        className="absolute z-0 top-0 left-0 object-cover w-full h-full aspect-auto opacity-[0.8]"
      />
      <div className="w-[90%] h-[90%] p-4 rounded-lg overflow-y-hidden shadow-[0_0_2px_rgba(0,0,0,0.3)] relative flex justify-center items-center text-black bg-transparent before:inset-0 before:absolute before:bg-[rgba(255,255,255,0.8)] before:backdrop-blur-xl">
        {/* START: Left Panel */}
        <div
          className={`p-2 flex rounded-lg z-100 absolute left-4 top-4 bottom-0 flex-col justify-center items-center text-left transition-all duration-300 ease-in-out ${
            expand
              ? "shadow-lg w-60 bg-[rgba(255,255,255,0.8)] before:inset-0 before:absolute before:backdrop-blur-sm before:rounded-lg "
              : "bg-transparent"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={() => setDisplay(item.name)}
              className={`m-[0.4em] ml-[1em] text-sm w-[90%] tracking-wider transition-all duration-300 relative no-underline text-inherit before:inset-[100%_0_0_0] before:scale-0 hover:before:scale-100 before:border-b-[0.5px] before:content-[""] before:transition-all before:ease-in-out before:duration-300 before:absolute before:z-1 ease-in-out ${
                expand ? "text-left" : "text-center"
              }
              ${
                item.name === display
                  ? "text-white bg-[rgba(37,73,43,0.8)] px-2 rounded-full "
                  : ""
              }
              `}
            >
              <i className={`text-lg mr-2 ${item.icon}`} />
              {expand && item.name}
            </a>
          ))}
        </div>

        {/* START: Right Panel */}
        <div className="w-full pt-2 h-full flex flex-col items-center justify-center bg-transparent relative">
          {/* START: Expand Arrow Button */}
          <i
            className={`transition-all rounded-tr-xl rounded-br-xl z-1000 duration-200 ease-in-out absolute top-2 flex justify-center items-center text-2xl font-lighter cursor-pointer ${
              expand
                ? "ri-arrow-left-double-line left-60 bg-[rgba(255,255,255,0.8)] before:inset-0 before:rounded-lg before:backdrop-blur-sm shadow-lg"
                : "ri-arrow-right-double-line left-10 bg-[rgba(255,255,255,0.4)] shadow-[2px_0_2px_rgba(0,0,0,0.2)]"
            }`}
            onClick={handleExpanding}
          />

          {/* START: Right Top Panel (Header) */}
          <div className="w-[80%] z-50 flex items-center shadow-md bg-header-bg/40 rounded-full p-1 mt-2">
            <h2 className="mx-6 text-md font-['Trebuchet_MS'] tracking-wider">
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
          <div className="overflow-y-auto pt-8 w-full flex justify-start items-center flex-col">
            {/* START: Main Content Area */}
            {display === "Profile" ? (
              <div className="flex flex-row w-full flex-1 m-0 items-start justify-start relative transition-all duration-300 ease-in-out">
                <div className="flex flex-col items-start justify-start p-2 ml-14 w-3/4">
                  {/* START: Right Middle Panel */}
                  <div className="flex flex-col items-start gap-4 justify-start w-full">
                    {/* START: Profile Card Info */}
                    <div className="rounded-xl w-full shadow-lg hover:shadow-sm max-w-11/12 flex flex-row items-center justify-center mx-6 px-4 transition-all duration-200 relative before:content-[''] before:absolute before:z-[-1] before:scale-100 before:inset-0 before:bg-green before:backdrop-blur-lg">
                      <div
                        className="h-[150px] w-2/5 mr-auto rounded-lg bg-center bg-no-repeat bg-contain relative"
                        style={{
                          backgroundImage:
                            "url('https://i.ibb.co/607r6z0v/d6-removebg-preview.png')",
                        }}
                      >
                        <i className="ri-camera-fill text-xl border-t-[0.5px] border-gray-300 w-[2em] h-[2em] shadow-lg hover:shandow-sm  p-1 top-2 rounded-full transition-all duration-200 ease-in-out bg-white text-[rgba(37,73,43,1)] cursor-pointer relative hover:after:absolute hover:bg-[rgba(37,73,43,0.08)] hover:after:content-[choose image] hover:after:bottom-[100%] hover:after:left-[100%] hover:after:text-[rgba(37,73,43,1)] hover:after:z-1 hover:after:text-xs" />
                      </div>
                      <div className="w-3/5 absolute bottom-0 right-1 flex flex-col items-start justify-center transition-all duration-200">
                        <h2 className="text-md font-semibold w-full tracking-wider mb-1 text-left flex items-center border-b-1 border-gray-400">
                          Dr. Dwayne{" "}
                          <i className="ri-edit-line text-sm font-light ml-auto relative flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer transform hover:translate-y-[-2px]" />
                        </h2>
                        {[
                          {
                            label: "Credentials",
                            value: "MD, MPH, Board-Certified",
                          },
                          { label: "Specialty", value: "Cardiology" },

                          {
                            label: "Bio",
                            value:
                              "Trained at Johns Hopkins and completed residency at the Cleveland Clinic",
                          },
                        ].map((detail) => (
                          <p
                            key={detail.label}
                            className="text-left gap-1 text-xs w-full flex flex-row items-start justify-center mb-1 text-gray-600"
                          >
                            <span>{detail.label}: </span>
                            <span className="font-xs text-xs text-black flex-1">
                              {detail.value}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* START: Analytics Container */}
                    <div className="w-full max-w-11/12 flex flex-col items-center justify-center mx-10 my-6 p-4 transition-all duration-200 ease-in-out">
                      <div className="flex items-center w-full">
                        <h2 className="my-2 text-md">
                          Analytics: {activeMetric}
                        </h2>
                        <p className="m-0 ml-auto text-xs cursor-pointer">
                          weekly
                          <i className="ml-1 text-sm ri-arrow-down-s-line transition-all duration-200 ease-in-out" />
                        </p>
                      </div>
                      <div className="my-3 flex gap-3 items-center justify-start w-full z-1">
                        {["Reviews", "Appointments", "Patients", "4+"].map(
                          (metric) => (
                            <button
                              key={metric}
                              onClick={() => setActiveMetric(metric)}
                              className={`py-1 px-3 text-xs rounded-xl shadow-lg border-t-[0.5px] border-gray-300 tracking-wider transition-all duration-200 ease-in-out cursor-pointer text-[rgba(37,73,43,1)] hover:bg-[rgba(37,73,43,0.08)] hover:shadow-sm ${
                                activeMetric === metric
                                  ? "bg-[rgba(48,99,56,0.2)] shadow-sm"
                                  : ""
                              }`}
                            >
                              {metric}
                            </button>
                          )
                        )}
                      </div>
                      <div className="w-full flex flex-col items-start justify-center ">
                        <div className="h-[16rem] overflow-x-auto my-[-2em] w-full flex flex-row items-center justify-center gap-2 z-0">
                          <Doughnut
                            data={chartData}
                            options={{
                              responsive: true,
                              cutout: "60%",
                              plugins: {
                                legend: {
                                  display: true,
                                  position: "right",
                                },
                              },
                            }}
                          />
                          <Doughnut
                            data={chartData}
                            options={{
                              responsive: true,
                              cutout: "60%",
                              plugins: {
                                legend: {
                                  display: true,
                                  position: "right",
                                },
                              },
                            }}
                          />
                        </div>

                        <div className="w-full">
                          <GraphSummery />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* START: Far Right Panel */}
                <div className="ml-auto mr-16 max-w-[300px] flex flex-col items-center justify-center mt-0 transition-all duration-300 ease-in-out">
                  <div className="rounded-lg shadow-md flex w-full h-full m-4 flex-col justify-start items-center p-3 pt-4">
                    {/* START: Far Right Top Row Buttons */}
                    <div className="w-full flex items-center justify-start mb-3 pb-1 px-2 transition-all duration-300 ease-in-out">
                      <button className="transition-all duration-300 ease-in-out text-xs text-black py-1 px-4 rounded-full shadow-lg border-t-[1px] border-gray-300 tracking-wider mx-1 font-sans cursor-pointer hover:bg-[rgba(37,73,43,0.08)] hover:shadow-sm hover:text-[rgb(37,73,43)]">
                        Profile
                      </button>
                      <button className="transition-all duration-300 ease-in-out text-xs text-black py-1 px-4 rounded-full border-t-[1px] shadow-lg border-gray-300 tracking-wider mx-1 font-sans cursor-pointer hover:bg-[rgba(37,73,43,0.08)] hover:shadow-sm hover:text-[rgb(37,73,43)]">
                        History
                      </button>
                      <button className="transition-all duration-300 ease-in-out text-xs text-black py-1 px-1 rounded-full border-t-[1px] shadow-lg border-gray-300 tracking-wider mx-1 font-sans cursor-pointer w-8 h-8 flex items-center justify-center hover:bg-[rgba(37,73,43,0.08)] hover:shadow-sm hover:text-[rgb(37,73,43)]">
                        4+
                      </button>
                    </div>

                    {/* START: Doc Profile Card */}
                    <div
                      className="w-full flex items-end justify-center relative h-48 border-gray-300 rounded-lg shadow-md mb-1"
                      style={{
                        backgroundImage:
                          "url('https://i.ibb.co/r2P4GKQ1/d8.jpg')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="flex items-center justify-center z-10 border border-gray-300 rounded-lg w-full p-2 mx-4 mb-4 relative bg-white/60 backdrop-blur-xs">
                        <div className="flex flex-col items-start justify-center w-full z-10">
                          <h1 className="text-[0.9em] font-semibold m-0">
                            Dr. Jackson Smith
                          </h1>
                          <p className="m-0 text-xs">
                            <i className="not-italic">15 Yrs Exp.</i>{" "}
                            <span className="ml-1">Male</span>
                          </p>
                        </div>
                        <a
                          href="tel:+910787246713"
                          className="text-[rgb(37,73,43)] w-[2em] h-[2em] rounded-full font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out no-underline hover:font-semibold hover:-translate-y-0.5"
                        >
                          <i
                            className="ri-phone-fill text-xl p-0.5 rounded-full transition-all duration-300 ease-in-out right-0.5 text-[rgba(37,73,43,1)] cursor-pointer px-2 py-1 border border-primary-green/40 hover:bg-[rgba(37, 73, 43, 0.8)] hover:text-white hover:border-[rgba(37,73,43,0.8)] hover:bg-[rgba(37,73,43,0.8)]"
                            title="Call"
                          />
                        </a>
                      </div>
                    </div>

                    {/* START: More Doc Info */}
                    <div className="w-full flex flex-col my-4 px-2 py-2 shadow-lg hover:shadow-sm ease-in-out duration-300 transition-all bg-[rgba(37,73,43,0.1)]">
                      <p className="my-1 text-sm text-left text-gray-600">
                        5th street, Tompstone, Eden House, Gokwe
                      </p>
                      <p className="my-1 flex gap-4 items-center justify-start w-full text-md py-2 text-left text-gray-600">
                        <a
                          href={mailtoLink}
                          className="text-[rgb(37,73,43) w-[2em] h-[2em] rounded-full text-[1.2em] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out no-underline shadow-lg hover:shadow-sm hover:bg-[rgba(37,73,43,0.1)]"
                        >
                          <i className="ri-mail-send-line flex items-center justify-center p-1 w-full h-full my-0 rounded-full" />
                        </a>
                        <a
                          href="https://wa.me/"
                          className="text-[rgb(37,73,43)] w-[2em] h-[2em] rounded-full text-[1.2em] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out no-underline shadow-lg hover:shadow-sm hover:bg-[rgba(37,73,43,0.1)]"
                        >
                          <i className="ri-whatsapp-line flex items-center justify-center p-1 w-full h-full my-0 rounded-full" />
                        </a>
                        <a
                          href="https://twitter.com/Google"
                          className="text-[rgb(37,73,43)] w-[2em] h-[2em] rounded-full text-[1.2em] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out no-underline shadow-lg hover:shadow-sm hover:bg-[rgba(37,73,43,0.1)]"
                        >
                          <i className="ri-twitter-line flex items-center justify-center p-1 w-full h-full my-0 rounded-full" />
                        </a>
                        <a
                          href="https://www.facebook.com/Meta"
                          className="text-[rgb(37,73,43)] w-[2em] h-[2em] rounded-full text-[1.2em] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out no-underline shadow-lg hover:shadow-sm hover:bg-[rgba(37,73,43,0.1)]"
                        >
                          <i className="ri-facebook-line flex items-center justify-center p-1 w-full h-full my-0 rounded-full" />
                        </a>
                      </p>
                      <p className="my-1 text-xs text-left text-gray-600">
                        Last Appointment: 14 Jun 2014
                      </p>
                    </div>

                    {/* START: Appointment Div (Calendar) */}
                    <div className="m-4 py-1 px-2 flex flex-col items-center justify-start w-full relative shadow-sm border-gray-300 rounded-sm">
                      <WeekCalendar />
                    </div>

                    {/* START: Events List Div */}
                    <div className="w-full my-2">
                      <h4 className="text-sm font-semibold mb-2 text-left">
                        Upcoming Appointments
                      </h4>
                      {allCalendarEvents.length > 0 ? (
                        <ul className="list-none p-0 m-0">
                          {allCalendarEvents.slice(0, 5).map((event) => (
                            <li
                              key={event.id}
                              className="text-sm border-l-2 border-[rgba(37,73,43)] mb-2 pl-2 flex gap-2 items-baseline"
                            >
                              <span className="font-semibold text-primary-green">
                                {event.date.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                                :
                              </span>
                              <span className="text-gray-700">
                                {event.title}
                              </span>
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
    </div>
  );
}

export default DoctorDashboard;
