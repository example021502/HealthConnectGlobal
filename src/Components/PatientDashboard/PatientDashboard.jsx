import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../Context/Context";

import {
  Heart,
  Calendar,
  Shield,
  Stethoscope,
  Clock,
  FileText,
  User,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

// --- MOCK DATA ---
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

// --- NEW MOCK DATA FOR ONBOARDING TABLE ---
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
    specialty: "Patient",
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
      <p className={`text-3xl font-extrabold text-${color}-700 mt-1`}>
        {value}
      </p>
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
    <span className="text-yellow-500 font-bold tracking-widest text-lg">
      {rating}
    </span>
  );
}

// --- MAIN PATIENT DASHBOARD COMPONENT ---
const PatientDashboard = () => {
  // Mock references and width for the table logic (simplified as the complex logic isn't needed here)
  const tdref = useRef(null);
  const cellWidth = 120; // Mock width to allow truncation logic to run if desired

  // context referencing
  const { view, setView } = useContext(AuthContext);

  // Main render
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
          <Shield className="w-8 h-8 mr-3" />
          Welcome, Alice Johnson
        </h1>
        <p className="text-gray-600 mt-1">
          Your Personal Health Overview — Everything looks good!
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Heart}
          title="Current Vitals"
          value="Stable"
          color="emerald"
        />
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
      <div className="w-full flex p-4 items-start justify-start py-2">
        <div className="flex flex-col p-6 bg-white shadow-xl rounded-xl w-full border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Latest Patient/Doctor Onboarding
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
