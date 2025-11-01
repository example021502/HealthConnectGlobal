import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/Context";

import {
  History,
  Calendar,
  Stethoscope,
  Clock,
  FileText,
  User,
  Check,
  MessageCircle,
  LogOut,
  Bell,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// MOCK NOTIFICATION COUNT
let noteNumber = 31;
let HealthStatus = "Everything looks good!";

const MOCK_CARE_TEAM = [
  {
    id: 1,
    name: "Dr. Evelyn Reed",
    specialty: "Cardiology",
    status: "Active",
    nextAppt: "Dec 15",
  },
  {
    id: 2,
    name: "Nurse Michael Chen",
    specialty: "Post-Op Care",
    status: "Active",
    nextAppt: "Nov 30",
  },
  {
    id: 3,
    name: "Dr. Alex Lee",
    specialty: "Primary Care",
    status: "Inactive",
    nextAppt: "N/A",
  },
];

const UPCOMING_APPOINTMENT = {
  date: "November 20, 2025",
  time: "2:00 PM",
  doctor: "Dr. Evelyn Reed",
  location: "Main Clinic, Room 302",
  reason: "Routine Consultation",
};

// MOCK HISTORY DATA
const historydata = [
  {
    id: 1,
    date: "15 Mar 2024",
    type: "Prescription",
    summery: "Refill of Atenolol 50mg",
    ProviderLocation: "Dr. Smith",
  },
  {
    id: 2,
    date: "01 Mar 2024",
    type: "Hospital Visit",
    summery: "Emergency Room Visit",
    ProviderLocation: "St. Jude's Medical Center",
  },
  {
    id: 3,
    date: "10 Feb 2024",
    type: "Appointment",
    summery: "Follow up for blood pressure",
    ProviderLocation: "Cardiology Department",
  },
  {
    id: 4,
    date: "20 Jan 2024",
    type: "Lab Results",
    summery: "Cholesterol levels reviewed",
    ProviderLocation: "Dr. Smith",
  },
  {
    id: 5,
    date: "12 Oct 2022",
    type: "Procedure",
    summery: "Seasonal Flu Vaccination",
    ProviderLocation: "Pharmaco Wellness Center",
  },
];

// DOCTORS TABLE DATA
const LATEST_ONBOARDING = [
  {
    id: 1,
    image: "https://placehold.co/40x40/4c7c8c/ffffff?text=DR",
    alt: "Dr. Jane Smith",
    name: "Dr. Jane Smith",
    specialty: "Neurologist",
    appointment: "Today",
    contact: "555-123-4567",
    status: "online",
    rating: 5,
  },
  {
    id: 2,
    image: "https://placehold.co/40x40/00b894/ffffff?text=PT",
    alt: "John Doe",
    name: "John Doe",
    specialty: "Cardiologist",
    appointment: "N/A",
    contact: "555-987-6543",
    status: "offline",
    rating: 4,
  },
  {
    id: 3,
    image: "https://placehold.co/40x40/9c67ad/ffffff?text=DR",
    alt: "Dr. Kim Lee",
    name: "Dr. Kim Lee",
    specialty: "Pediatrics",
    appointment: "Tomorrow",
    contact: "555-333-2222",
    status: "online",
    rating: 4,
  },
];

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

// --- Reusable Stat Card Component (Copied for consistency) ---
const StatCard = ({ icon: Icon, title, value, color }) => (
  <div
    className={`p-5 rounded-xl shadow-lg flex items-center justify-between bg-white border-l-4 border-${color}-500 transition-shadow hover:shadow-xl`}
  >
    <div>
      <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
      <p className={`text-2xl font-bold text-${color}-700 mt-1`}>{value}</p>
    </div>
    <Icon className={`w-8 h-8 text-${color}-400 opacity-70`} />
  </div>
);

// --- Rating Stars Component (New Addition) ---
function RatingStars({ rate }) {
  const [rating, setRating] = useState("");
  const GOLD_STAR = "★";
  const LIGHT_STAR = "☆";
  const rateValue = parseInt(rate) || 0;
  const emptyRate = 5 - rateValue;

  useEffect(() => {
    // Generate star string based on rating
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setPatientName(", Alice Johnson");
      } else {
        setPatientName("");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  // Main render
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 font-sans p-6 overflow-y-auto">
      {exiting && (
        <div className="absolute top-0 left-0 z-10000 w-full h-full bg-[rgba(0,0,0,0.4)] transition-all duration-200 ease-in-out flex items-center justify-center">
          <div className="w-fit h-fit p-8 gap-8 transition-all duration-200 ease-in-out flex flex-col rounded-2xl shadow-2xl items-center justify-center before:inset-0 before:absolute relative before:bg-[rgba(255,255,255,0.8)] before:top-0 before:left-0 before:z-[-1] z-1 before:rounded-2xl ">
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
      {/* Header */}
      <header className="rounded-2xl relative gap-4 p-4 mb-8 flex items-center justify-start flex-wrap">
        <img
          src="https://i.ibb.co/Wps552Cd/back.png"
          alt="BACKGROUND"
          className="w-full z-1 h-full object-cover rounded-2xl repeat absolute top-0 left-0"
        />

        <img
          src="https://i.ibb.co/KxPQ4f9L/Secure-Appointment.jpg"
          alt="Alice Johnson"
          className="md:w-40 z-2 md:h-40 sm:w-25 sm:h-25  w-20 h-20 object-cover shadow-2xl rounded-full border-2 border-gray-100"
        />
        <div className="bg-gray-50 pl-4 relative z-2 rounded-2xl shadow-2xl h-full flex flex-row flex-1 items-center justify-start">
          <img
            src="https://i.ibb.co/FqWLt6PL/e74f53c5f659fed2e65ccb28dcec5386-removebg-preview.png"
            allt=""
            className={`md:w-20 md:h-20 w-16 h-16 mr-3 sm:flex hidden`}
          />
          <div className="">
            <h1
              className={`md:text-3xl text-2xl font-extrabold text-indigo-700 flex items-center`}
            >
              Welcome{patientName}
            </h1>
            <p className="text-green-700 mt-1 text-sm md:text-md">
              {HealthStatus}
            </p>
          </div>
          <div className="z-2 absolute right-2 top-2 flex flex-row items-center justify-center gap-4 w-fit">
            <div className={`w-fit h-fit relative`}>
              <p className="bg-red-500 tracking-tighter absolute bottom-[100%] left-[50%] md:w-3.5 md:h-3.5 w-3 h-3 rounded-tr-full rounded-tl-full rounded-br-full text-[8px] font-bold text-white flex items-center justify-center z-2 transition-all duration-200 ease-in-out">
                {noteNumber}
              </p>
              <Bell className="md:w-5 md:h-5 w-4 h-4" />
            </div>
            <User className="md:w-10 md:h-10 w-6 h-6 rounded-full bg-white shadow-sm text-gray-700 border-2 border-indigo-200" />
            <div
              className="flex flex-row w-fit h-fit transition-all duration-200 ease-in-out gap-[2px] md:text-sm text-[10px] text-indigo-700 hover:scale-[1.1]"
              onClick={handleExiting}
            >
              <LogOut
                className={`md:w-5 md:h-5 w-4 h-4 text-indigo-700 relative `}
              />
              <p>Exit</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={`p-4 rounded-xl shadow-lg flex items-center justify-between bg-white border-l-4 border-emerald-500 transition-shadow hover:shadow-xl`}
        >
          <div className="w-full flex items-center justify-between">
            <p className="w-full display-none sm:flex text-sm font-semibold text-gray-500 uppercase">
              Appointment History
            </p>
            {expandHistory ? (
              <ChevronUp
                onClick={handleCollapseHistory}
                className="w-8 h-8 z-1 cursor-pointer opacity-70"
              />
            ) : (
              <ChevronDown
                onClick={handleExpandHistory}
                className="w-8 h-8 z-1 cursor-pointer opacity-70 hover:scale-[1.1] transition-all duration-200 ease-in-out"
              />
            )}
            <History className={`w-8 h-8 ml-2 text-gray-800 opacity-70`} />
          </div>
          {expandHistory && (
            <div className="fl">
              {historydata.map((data) => {
                <p key={data.id} className=""></p>;
              })}
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

      {/* Main Content: Appointment Details & Care Team (Top Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-8">
        {/* Upcoming Appointment Section (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Your Next Appointment
          </h2>
          <div className="p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500 flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-indigo-800">
                {UPCOMING_APPOINTMENT.date}
              </p>
              <p className="text-lg text-indigo-600 mt-1">
                {UPCOMING_APPOINTMENT.time} with {UPCOMING_APPOINTMENT.doctor}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Reason: {UPCOMING_APPOINTMENT.reason}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Add to Calendar
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Reschedule
              </button>
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2" /> Request Prescription Refill
            </button>
            <button className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center">
              <MessageCircle className="w-5 h-5 mr-2" /> Message Your Care Team
            </button>
          </div>
        </div>

        {/* Care Team Quick List (1/3 width on desktop) */}
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

      {/* --- NEW: Latest Patient/Doctor Onboarding Table (Bottom Panel) --- */}
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
                            {...(record.id === dataValues[0].id ? refProp : {})}
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

        <div className="flex flex-col p-6 bg-white shadow-xl rounded-xl w-full border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Available Hospitals
          </h3>
          <div className="flex justify-center items-start text-sm w-full flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  {keyValues.map((key) => (
                    <th
                      key={key}
                      className="text-left py-3 px-1 font-semibold text-gray-600 uppercase text-xs"
                    >
                      {key === "specialty"
                        ? "Role/Specialty"
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
                        "py-3 px-1 align-middle text-gray-800";

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

                        // Simplified truncation logic check
                        if (cellWidth > 0 && length > 15) {
                          contactNumber = number.slice(0, 12) + "...";
                        }

                        return (
                          <td
                            key={key}
                            className={cellClasses}
                            {...(record.id === dataValues[0].id ? refProp : {})}
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
  );
};

export default PatientDashboard;
