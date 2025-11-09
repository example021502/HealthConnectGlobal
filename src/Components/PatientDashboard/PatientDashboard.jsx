import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/Context";
import history_data from "./HistoryData.json";
import HistoryDisplay from "./HistoryDisplay";
import MOCK_CARE_TEAM from "./CareTeam.json";
import LATEST_ONBOARDING from "./HealthCareSpecialists.json";
import "./patientDashboard.css";
import {
  History,
  Calendar,
  Stethoscope,
  Clock,
  FileText,
  Mail,
  Check,
  MessageSquareText,
  LogOut,
  Bell,
  ChevronDown,
  ChevronUp,
  Trash,
} from "lucide-react";

const profileImage = "https://i.ibb.co/KxPQ4f9L/Secure-Appointment.jpg";

let noteNumber = 31;
let mails = 12;
let chats = 20;
let HealthStatus = "Everything looks good!";

const UPCOMING_APPOINTMENT = {
  date: "November 20, 2025",
  time: "2:00 PM",
  doctor: "Dr. Evelyn Reed",
  location: "Main Clinic, Room 302",
  reason: "Routine Consultation",
};

const TheadStyles =
  "text-sm text-left font-bold py-1 border-gray-300 pl-1 tracking-wide text-gray-600";

const keyValues = [
  "image",
  "name",
  "specialty",
  "appointment",
  "contact",
  "status",
  "rating",
];

const dataValues = LATEST_ONBOARDING;

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div
    className={`p-5 rounded-xl shadow-lg flex items-center justify-between bg-white border-l-4 border-${color}-500 transition-shadow hover:shadow-xl`}
  >
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <p className={`text-xl font-bold text-${color}-700 mt-1`}>{value}</p>
    </div>
    <Icon className={`w-6 h-6 text-${color}-400 opacity-70`} />
  </div>
);

function RatingStars({ rate }) {
  const [rating, setRating] = useState("");
  const GOLD_STAR = "★";
  const LIGHT_STAR = "☆";
  const rateValue = parseInt(rate) || 0;
  const emptyRate = 5 - rateValue;

  useEffect(() => {
    const stars = GOLD_STAR.repeat(rateValue) + LIGHT_STAR.repeat(emptyRate);
    setRating(stars);
  }, [rateValue, rate]);

  return (
    <span className="text-yellow-500 font-bold tracking-widest text-sm">
      {rating}
    </span>
  );
}

const PatientDashboard = () => {
  const tdref = useRef(null);
  const cellWidth = 10;
  const [exiting, setExiting] = useState(false);
  const [expandHistory, setExpandHistory] = useState(false);
  const [patientName, setPatientName] = useState("");
  const { setView } = useContext(AuthContext);

  const [historyData, setHistoryData] = useState(history_data);
  const [checkedListIds, setCheckedListIds] = useState([]);
  const [check, setCheck] = useState(false);

  const [wiggle, setWiggle] = useState(false);
  const notificationsRef = useRef(null);

  let User_Name = "Alice Johnson";
  useEffect(() => {
    if (User_Name) {
      setPatientName(`, ${User_Name}`);
    }
  }, [User_Name]);
  // SETTING TH LATEST HISTORY
  let current_history = historyData.at(0);
  const handleExiting = () => {
    setExiting(true);
  };

  const handleConfirmClosing = () => {
    setExiting(false);
    setView("home");
  };

  const handleCancelClosing = () => {
    setExiting(false);
  };

  const handleExpandHistory = () => {
    setExpandHistory(true);
  };

  const handleCollapseHistory = () => {
    setExpandHistory(false);
  };

  const handleCheckboxSelect = () => {
    const newCheck = !check;
    setCheck(newCheck);

    if (newCheck) {
      const allIds = historyData.map((data) => data.id);
      setCheckedListIds(allIds);
    } else {
      setCheckedListIds([]);
    }
  };

  const handleUpdateCheckedListIds = (id, isChecked) => {
    setCheckedListIds((prevIds) => {
      if (isChecked) {
        if (!prevIds.includes(id)) {
          return [...prevIds, id];
        }
      } else {
        return prevIds.filter((checkedId) => checkedId !== id);
      }
      return prevIds;
    });

    if (!isChecked && check) {
      setCheck(false);
    }
  };

  const handleDeleteSelected = () => {
    if (checkedListIds.length === 0) {
      alert("Please select items to delete.");
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${checkedListIds.length} history records?`
      )
    ) {
      const newHistoryData = historyData.filter(
        (data) => !checkedListIds.includes(data.id)
      );

      setHistoryData(newHistoryData);
      setCheckedListIds([]);
      setCheck(false);
    }
  };

  const startShake = () => {
    setWiggle(true);
    notificationsRef.current.classList.add("animate-wiggle");
  };
  const stopShake = () => {
    setWiggle(false);
    notificationsRef.current.classList.remove("animate-wiggle");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50 overflow-y-hidden pt-14 md:pt-10">
      <div className="flex flex-col h-full w-full bg-gray-50 font-sans p-6 overflow-y-auto">
        {exiting && (
          <div className="absolute top-0 left-0 z-10000 w-full h-full bg-[rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out flex items-center justify-center">
            <div className="w-fit h-fit p-8 gap-8 z-10001 transition-all duration-200 ease-in-out flex flex-col rounded-2xl shadow-2xl items-center justify-center before:inset-0 before:absolute relative before:bg-[rgba(255,255,255,0.8)] before:top-0 before:left-0 before:z-[-1] before:rounded-2xl ">
              <p className="text-lg">
                <span className="text-red-500 font-lighter">!Warning: </span>
                Confirm to close
              </p>
              <div className="flex w-full flex-wrap sm:flex-nowrap text-md text-white font-bold tracking-wide gap-2 items-center">
                <button
                  onClick={handleConfirmClosing}
                  className="w-full py-2 px-8 rounded-xl flex items-center justify-center flex-row bg-[rgba(67,56,202,1)] hover:bg-[#2f278e] transition-all duration-200 ease-in-out"
                >
                  <Check className="min-w-2" />
                  <span>Confirm</span>
                </button>
                <button
                  onClick={handleCancelClosing}
                  className="w-full py-2 px-8 rounded-xl flex items-center justify-center flex-row bg-[#821313] hover:bg-[#691212] transition-all duration ease-in-out"
                >
                  <i className="ri-close-line font-lighter mr-1" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <header className="rounded-2xl relative gap-4 mb-8 flex items-center justify-start flex-col ">
          <div className="z-20000 fixed flex flex-row items-center justify-center gap-6 px-4 rounded-full md:w-fit w-[90%] md:right-10 top-4 bg-indigo-700 text-[rgba(255,255,255,1)] shadow-2xl">
            <div
              title={`You have ${noteNumber} notifications`}
              onMouseOver={startShake}
              onMouseOut={stopShake}
              className={`w-fit h-fit relative rounded-full cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100 hover:bg-emerald-500 hover:p-1`}
            >
              <p className="bg-red-500 tracking-tighter absolute bottom-[100%] left-[50%] md:w-3.5 md:h-3.5 w-3 h-3 rounded-tr-full rounded-tl-full rounded-br-full text-[8px] font-bold text-white flex items-center justify-center z-2 transition-all duration-200 ease-in-out">
                {noteNumber}
              </p>
              <Bell ref={notificationsRef} className="md:w-4 md:h-4 w-5 h-5" />
            </div>
            <div
              title={`You have ${mails} mails`}
              className={`w-fit h-fit relative rounded-full cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100 hover:bg-emerald-500 hover:p-1`}
            >
              <p className="bg-red-500 tracking-tighter absolute bottom-[100%] left-[50%] md:w-3.5 md:h-3.5 w-3 h-3 rounded-tr-full rounded-tl-full rounded-br-full text-[8px] font-bold text-white flex items-center justify-center z-2 transition-all duration-200 ease-in-out">
                {mails}
              </p>
              <Mail className="md:w-4 md:h-4 w-5 h-5" />
            </div>

            <div
              title={`You have ${chats} unread unread chats`}
              className={`w-fit h-fit relative rounded-full cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100 hover:bg-emerald-500 hover:p-1`}
            >
              <p className="bg-red-500 tracking-tighter absolute bottom-[100%] left-[50%] md:w-3.5 md:h-3.5 w-3 h-3 rounded-tr-full rounded-tl-full rounded-br-full text-[8px] font-bold text-white flex items-center justify-center z-2 transition-all duration-200 ease-in-out">
                {chats}
              </p>
              <MessageSquareText className="md:w-4 md:h-4 w-5 h-5" />
            </div>
            <img
              src={profileImage}
              alt="profile"
              title="profile"
              className="md:w-8 md:h-8 w-10 h-10 rounded-full bg-white border-1 border-indigo-200 cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100"
            />
            <div
              className="flex flex-row w-fit h-fit transition-all duration-100 ease-in-out gap-[2px] md:text-4 text-[10px] hover:scale-[1.1] cursor-pointer hover:bg-emerald-500 rounded-full hover:p-1"
              onClick={handleExiting}
              title="log out"
            >
              <LogOut className={`md:w-4 md:h-4 w-5 h-5 relative `} />
            </div>
          </div>

          <div className="w-full flex flex-row items-center justify-start gap-4">
            <img
              src={profileImage}
              alt="Alice Johnson"
              className="md:w-30 z-2 md:h-30 sm:w-24 sm:h-24 w-20 h-20 object-cover shadow-2xl rounded-full border-2 border-gray-100"
            />
            <div className="relative md:bg-transparent shadow-sm border-1 border-indigo-200 px-4 py-2 z-2 rounded-2xl h-full w-full flex flex-row items-center justify-start">
              <img
                src="https://i.ibb.co/FqWLt6PL/e74f53c5f659fed2e65ccb28dcec5386-removebg-preview.png"
                alt=""
                className={`md:w-20 md:h-20 w-16 h-16 mr-3 sm:flex hidden`}
              />
              <div>
                <h1
                  className={`md:text-3xl text-xl font-extrabold text-indigo-700 flex items-center`}
                >
                  Welcome{patientName}
                </h1>
                <p className="text-green-700 mt-1 text-sm md:text-md">
                  {HealthStatus}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-8">
          <div className=" bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h2 className="md:text-xl text-lg font-bold text-gray-600 mb-4 flex items-center">
              <Clock className="md:w-5 md:h-5 w-4 h-4 mr-2 text-indigo-600" />
              Your Next Appointment
            </h2>
            <div className="p-4 bg-indigo-50 space-y-4 rounded-lg border-l-4 border-indigo-500 flex flex-wrap justify-between items-start">
              <div className="w-full">
                <p className="md:text-xl text-lg font-bold text-indigo-800">
                  {UPCOMING_APPOINTMENT.date}
                </p>
                <p className="md:text-md text:sm text-indigo-600 mt-1">
                  {UPCOMING_APPOINTMENT.time} with {UPCOMING_APPOINTMENT.doctor}
                </p>
                <p className="md:text-sm text-xs text-gray-600 mt-1">
                  Reason: {UPCOMING_APPOINTMENT.reason}
                </p>
              </div>
              <div className="flex flex-col md:space-y-2 space-y-3 w-full">
                <button className="md:px-4 md:py-2 p-2 bg-indigo-600 text-white text-sm md:text-lg rounded-lg font-semibold hover:bg-indigo-700 transition-all ease-in duration-100">
                  Check Calendar
                </button>
                <button className="md:px-4 md:py-2 p-2 bg-gray-300 text-gray-600 text-sm md:text-lg rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" /> Request Prescription
                Refill
              </button>
              <button className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center">
                <MessageSquareText className="w-5 h-5 mr-2" /> Message Your Care
                Team
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" />
              Your Care Team
            </h2>
            <ul className="space-y-3">
              {MOCK_CARE_TEAM.map((member) => (
                <li
                  key={member.id}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.specialty}</p>
                  </div>
                  <button className="ml-4 text-sm px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
                    Contact
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 h-30">
          <div
            className={`p-4 rounded-xl relative shadow-lg flex flex-col items-center ${
              expandHistory ? "justify-betweem mb-4 border-1" : "justify-center"
            } bg-white border-l-4 border-emerald-500 transition-shadow hover:shadow-xl`}
          >
            <div className="w-full flex flex-row items-center justify-around z-2">
              <p
                className={`${
                  expandHistory ? "w-fit" : "w-full"
                } display-none sm:flex text-sm font-semibold text-gray-500 uppercase`}
              >
                Appointment History
              </p>

              {expandHistory && (
                <div className="flex items-center justify-center w-fit mx-2 transition-all duration-200 ease-in-out py-1">
                  <div className="flex flex-row items-center justify-center mr-2">
                    <input
                      onClick={handleCheckboxSelect}
                      type="checkbox"
                      checked={check}
                      className={`border-1 border-gray-500 hover:scale-[1.1] transition-all duration-200 ease-in-out hover:border-[#0467f1]`}
                    />
                    <p className="text-xs ml-1 whitespace-nowrap">Select All</p>
                  </div>

                  <Trash
                    className={`h-4 ${
                      checkedListIds.length > 0
                        ? "text-red-500 cursor-pointer hover:scale-[1.1]"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleDeleteSelected}
                  />
                </div>
              )}
              {expandHistory ? (
                <ChevronUp
                  onClick={handleCollapseHistory}
                  className={`${
                    expandHistory ? "w-6 h-6" : "w-8 h-8"
                  } z-1 cursor-pointer opacity-70`}
                />
              ) : (
                <ChevronDown
                  onClick={handleExpandHistory}
                  className={`${
                    expandHistory ? "w-6 h-6" : "w-8 h-8"
                  } z-1 cursor-pointer opacity-70 hover:scale-[1.1] transition-all duration-200 ease-in-out`}
                />
              )}
              <History
                className={`${
                  expandHistory ? "w-6 h-6" : "w-8 h-8 ml-4"
                } ml-2 text-gray-800 opacity-70`}
              />
            </div>
            {!expandHistory && historyData.length != 0 && (
              <div className="w-full h-fit flex flex-col items-left justify-center">
                <p className="text-sm text-gray-400">Most recent History:</p>
                <p className="text-sm text-gray-400 whitespace-nowrap">
                  {current_history.date} {current_history.type}{" "}
                  {current_history.providerLocation}
                </p>
              </div>
            )}
            {expandHistory && (
              <div
                className={`w-full h-auto bg-[rgba(255,255,255,1)] transition-all duration-200 ease-in-out z-[1] shadow-lg ${
                  expandHistory ? "absolute top-[50%] left-0" : ""
                }`}
              >
                <div className="w-full px-2 py-4">
                  <table className="gap-4 w-full min-h-30 relative">
                    <thead className="w-full rounded-lg border-gray-300">
                      <tr className="gap-1 w-full my-4 rounded-lg bg-[rgba(177,177,177,0.5)]">
                        <th
                          className={`${TheadStyles} rounded-tl-lg rounded-bl-lg`}
                        ></th>
                        <th className={`${TheadStyles}`}>Date</th>
                        <th className={TheadStyles}>Description</th>
                        <th
                          className={`${TheadStyles} rounded-tr-lg rounded-br-lg`}
                        >
                          Provider/Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="max-h-40 overflow-y-auto">
                      {historyData.length === 0 ? (
                        <p className="text-gray-400 absolute top-[50%] left-0 tracking-wide whitespace-nowrap text-sm md:text-lg font-semibold w-full text-center">
                          No History
                        </p>
                      ) : (
                        historyData.map((data) => (
                          <HistoryDisplay
                            data={data}
                            key={data.id}
                            check={check}
                            onUpdateCheckedListIds={handleUpdateCheckedListIds}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <StatCard
            icon={Calendar}
            title="Next Appointment"
            value="Nov 20"
            color="indigo"
          />
          <StatCard
            icon={FileText}
            title="Unread Records"
            value="1 New"
            color="amber"
          />
        </section>

        <div className="w-full flex p-4 gap-4 items-start justify-center py-2">
          <div className="flex flex-col p-6 bg-white shadow-xl rounded-xl w-full border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Available Specialists
            </h3>
            <div className="flex justify-center items-start text-sm w-full flex-1 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    {keyValues.map((key) => (
                      <th
                        key={key}
                        className="text-left py-3 px-1 font-lighter text-gray-600 uppercase text-xs"
                      >
                        {key === "specialty"
                          ? "Specialty"
                          : key === "appointment"
                          ? "Appt. Status"
                          : key === "contact"
                          ? "Contact No."
                          : key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataValues.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {keyValues.map((key) => {
                        const refProp = key === "contact" ? { ref: tdref } : {};
                        const cellClasses =
                          "py-1 whitespace-nowrap max-w-16 px-1 overflow-hidden align-middle text-gray-800";

                        if (key === "image") {
                          return (
                            <td key={key} className={cellClasses}>
                              <img
                                src={record.image}
                                alt={record.alt}
                                className="h-10 w-10 rounded-full object-cover shadow-sm"
                              />
                            </td>
                          );
                        }

                        if (key === "status") {
                          let isOnline = record.status === "online";
                          return (
                            <td key={key} className={cellClasses}>
                              <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                  isOnline
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {record.status}
                              </span>
                            </td>
                          );
                        }

                        if (key === "contact") {
                          let number = record.contact.replace(/\s/g, "");
                          let length = number.length;
                          let contactNumber = record.contact;

                          if (length > cellWidth) {
                            contactNumber =
                              number.slice(0, cellWidth - 2) + "...";
                          }

                          return (
                            <td
                              key={key}
                              className={cellClasses}
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
                            <td key={key} className={cellClasses}>
                              <RatingStars rate={rate} />
                            </td>
                          );
                        }

                        return (
                          <td key={key} className={cellClasses}>
                            {record[key]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
