import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import WeekCalendar from "./Calendar";
import Documents from "../Documents/Documents";
import Charts from "../Charts/Charts";
import RatingStars from "../ProfileHome/RatingStars";

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

function ProfileHome() {
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
    let backgroundColor;

    switch (activeMetric) {
      case "Appointments":
        dataSet = [450, 550, 600, 700, 950, 800, 750];
        backgroundColor = [
          "#4299E1",
          "#48BB78",
          "#ECC94B",
          "#F6AD55",
          "#F56565",
          "#9F7AEA",
          "#38B2AC",
        ];
        break;
      case "Patients":
        dataSet = [850, 350, 450, 500, 150, 600, 650];
        backgroundColor = [
          "#9AE6B4",
          "#68D391",
          "#48BB78",
          "#38A169",
          "#2F855A",
          "#276749",
          "#22543D",
        ];
        break;
      case "Reviews":
      default:
        dataSet = [400, 800, 400, 200, 850, 650, 550];
        backgroundColor = [
          "#3102CE",
          "#4299E1",
          "#63B3ED",
          "#38B2AC",
          "#A0EC6A",
          "#ED8936",
          "#E53E3E",
        ];
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: activeMetric,
          data: dataSet,
          backgroundColor: backgroundColor,
          borderRadius: 3,
          barPercentage: 0.6,
          categoryPercentage: 0.7,
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
    <div className="flex items-center justify-center m-0 w-full bg-[white]">
      <div
        className={`w-full h-full relative flex gap-2 text-black bg-[transparent] ${
          expand ? "pl-45" : "pl-[48px]"
        }`}
      >
        {/* START: Left Panel */}
        <div
          className={`mr-0 flex z-50 shadow-lg h-screen fixed left-0 top-0 pt-[4em] flex-col justify-start items-center text-left text-sidebar-text transition-all duration-200 ease-in-out bg-transparent before:absolte before:absolute before:inset-0 before:backdrop-blur-2xl ${
            expand ? "w-48" : "w-[60px]"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              onClick={() => setDisplay(item.name)}
              className={`m-[0.4em] ml-[1em] py-[0.1em] text-sm w-[90%] tracking-wider transition-all duration-300 relative no-underline text-inherit before:border-color-[rgba(37, 73, 43, 1)] before:inset-[100%_0_0_0] before:scale-0 before:border-b-1 hover:before:scale-100 before:h-[1px] before:content-[""] before:transition-all before:ease-in-out before:duration-300 before:absolute before:z-1 ease-in-out ${
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
        <div className="w-full flex flex-col items-start justify-start p-4 bg-[white] relative">
          {/* START: Expand Arrow Button */}
          <i
            className={`transition-all z-100 duration-200 ease-in-out fixed left-4 top-4 flex justify-center items-center text-sidebar-text text-3xl cursor-pointer ${
              expand
                ? "ri-arrow-left-double-line"
                : "ri-arrow-right-double-line"
            }`}
            onClick={handleExpanding}
          />

          {/* START: Right Top Panel (Header) */}
          <div className="w-full z-50 flex items-center shadow-md bg-header-bg/40 rounded-sm p-2">
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
              <div className="flex flex-col items-start justify-start p-3 w-3/4">
                {/* START: Right Middle Panel */}
                <div className="flex flex-row items-start justify-start w-full h-90">
                  {/* START: Profile Card Info */}
                  <div className="rounded-lg max-w-2/4 flex flex-col items-center justify-center p-3 shadow-lg relative before:content-[''] before:absolute before:z-[-1] before:scale-100 before:inset-0 before:bg-green before:backdrop-blur-lg">
                    <div
                      className="shadow-xl border-t-1 border-gray-300 h-[120px] w-[120px] rounded-full bg-center bg-no-repeat bg-cover relative"
                      style={{
                        backgroundImage:
                          "url('https://i.ibb.co/607r6z0v/d6-removebg-preview.png')",
                      }}
                      title="Profile image"
                    >
                      <i
                        className="ri-camera-fill absolute bottom-2 right-0 text-sm w-[20px] h-[20px] flex align-center justify-center rounded-full transition-all duration-200 ease-in-out bg-white text-primary-green cursor-pointer hover:border-gray-600 hover:-translate-y-0.5"
                        title="Change Image"
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="text-sm font-semibold w-full p-1 rounded-sm shadow-md tracking-wider mt-4 mb-2 text-left flex items-center">
                        Dr. Name{" "}
                        <i className="ri-edit-line text-sm font-light ml-auto relative flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer transform hover:translate-y-[-2px]" />
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
                          className="text-left text-sm w-full flex items-center wrap justify-start  mt-1 mb-1 text-gray-600"
                        >
                          <span className="w-[6em]">{detail.label}: </span>
                          <span className="font-xs text-black">
                            {" "}
                            {detail.value}
                          </span>
                        </p>
                      ))}
                      <div className="flex items-center justify-start gap-4 mt-4">
                        <a
                          href="#"
                          aria-label="Phone"
                          className="w-[2em] h-[2em] no-underline text-gray-600 shadow-md border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-[rgba(37,73,43,0.8)] hover:-translate-y-0.5"
                        >
                          <i className="ri-phone-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="Email"
                          className="w-[2em] h-[2em] no-underline text-gray-600 shadow-md border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-[rgba(37,73,43,0.8)] hover:-translate-y-0.5"
                        >
                          <i className="ri-mail-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="LinkedIn"
                          className="w-[2em] h-[2em] no-underline text-gray-600 shadow-md border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-[rgba(37,73,43,0.8)] hover:-translate-y-0.5"
                        >
                          <i className="ri-linkedin-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="Facebook"
                          className="w-[2em] h-[2em] no-underline text-gray-600 shadow-md border-gray-600 flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-[rgba(37,73,43,0.8)] hover:-translate-y-0.5"
                        >
                          <i className="ri-facebook-fill" />
                        </a>
                        <a
                          href="#"
                          aria-label="Twitter"
                          className="w-[2em] h-[2em] no-underline text-gray-600 border-gray-600 shadow-md flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out hover:text-white hover:bg-[rgba(37,73,43,0.8)] hover:-translate-y-0.5"
                        >
                          <i className="ri-twitter-fill" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* START: Analytics Container */}
                  <div className="rounded-lg shadow-lg h-90 w-full flex flex-col items-center p-3 ml-4">
                    <div className="flex items-center w-full">
                      <h2 className="m-0 text-sm">Analytics: {activeMetric}</h2>
                      <p className="m-0 ml-auto text-xs cursor-pointer">
                        Weekly{" "}
                        <i className="ml-1.5 text-sm ri-arrow-down-s-line" />
                      </p>
                    </div>
                    <div className="mt-3 mb-2 flex gap-2.5 items-center justify-start w-full">
                      {["Reviews", "Appointments", "Patients", "4+"].map(
                        (metric) => (
                          <button
                            key={metric}
                            onClick={() => setActiveMetric(metric)}
                            className={`py-1 px-3 text-xs rounded-xl border border-gray-300 tracking-wider text-black transition-all duration-200 ease-in-out cursor-pointer hover:text-white hover:bg-[rgba(37,73,43,0.4)] hover:-translate-y-0.5 ${
                              activeMetric === metric
                                ? "text-white bg-[rgb(48,99,56)]"
                                : ""
                            }`}
                          >
                            {metric}
                          </button>
                        )
                      )}
                    </div>
                    <div className="h-full w-full flex items-center">
                      <Bar
                        data={chartData}
                        options={{
                          maintainAspectRatio: true,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              grid: {
                                display: true,
                              },
                            },
                            y: {
                              grid: {
                                display: true,
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* START: Right Bottom Panel (Table) */}
                <div className="w-full flex items-start justify-start py-2">
                  <div className="flex flex-col p-4 shadow-lg rounded-lg mt-4 mb-2 w-full">
                    <h3 className="text-base mb-3">
                      Latest Patient/Doctor Onboarding
                    </h3>
                    <div className="flex justify-center items-start text-sm w-full flex-1 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            {keyValues.map((key) => (
                              <th
                                key={key}
                                className="text-left py-2 px-1 font-semibold border-b-2 border-gray-300"
                              >
                                {key === "specialty"
                                  ? "Role"
                                  : key === "appointment"
                                  ? "Appt."
                                  : key === "contact"
                                  ? "Contact No."
                                  : key.charAt(0).toUpperCase() + key.slice(1)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dataValues.map((record) => (
                            <tr key={record.id}>
                              {keyValues.map((key) => {
                                const refProp =
                                  key === "contact" ? { ref: tdref } : {};

                                if (key === "image") {
                                  return (
                                    <td key={key}>
                                      <img
                                        src={record.image}
                                        alt={record.alt}
                                        className="h-10 w-10 rounded-full object-cover"
                                      />
                                    </td>
                                  );
                                }

                                if (key === "status") {
                                  let isOnline = record.status === "online";
                                  return (
                                    <td key={key}>
                                      <span
                                        className={`${
                                          isOnline
                                            ? "text-green-500"
                                            : "text-red-500"
                                        }`}
                                      >
                                        {record.status}
                                      </span>
                                    </td>
                                  );
                                }

                                if (key === "contact") {
                                  let number = record.contact.replace(
                                    /\s/g,
                                    ""
                                  );
                                  let length = number.length;
                                  let contactNumber = record.contact;

                                  if (cellWidth > 0 && length > cellWidth) {
                                    contactNumber =
                                      number.slice(0, cellWidth - 3) + "...";
                                  }

                                  return (
                                    <td
                                      key={key}
                                      {...(record.id === dataValues[0].id
                                        ? refProp
                                        : {})}
                                    >
                                      {contactNumber}
                                    </td>
                                  );
                                }

                                if (key === "rating") {
                                  let rate = record.rating;
                                  return (
                                    <td key={key}>
                                      <RatingStars rate={rate} />
                                    </td>
                                  );
                                }

                                return <td key={key}>{record[key]}</td>;
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* START: Far Right Panel */}
              <div
                className="ml-auto flex flex-col items-center justify-center mt-0 transition-all duration-300 ease-in-out"
                style={{ width: expand ? "300px" : "350px" }}
              >
                <div className="rounded-lg shadow-lg flex w-[90%] h-full m-4 flex-col justify-start items-center p-3 pt-4">
                  {/* START: Far Right Top Row Buttons */}
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

                  {/* START: Doc Profile Card */}
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

                  {/* START: More Doc Info */}
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

                  {/* START: Appointment Div (Calendar) */}
                  <div className="m-0 p-1 flex flex-col items-center justify-start w-[90%] relative border border-gray-300 rounded-lg">
                    <WeekCalendar />
                  </div>

                  {/* START: Events List Div */}
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
