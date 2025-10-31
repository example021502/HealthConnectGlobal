import { useContext } from "react";
import { AuthContext } from "../Context/Context";

import {
  Users,
  Calendar,
  MessageCircle,
  Stethoscope,
  Clock,
  FileText,
  User,
  ArrowRight,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_PATIENTS = [
  {
    id: 101,
    name: "Alice Johnson",
    age: 45,
    status: "Stable",
    lastVisit: "Yesterday",
  },
  {
    id: 102,
    name: "Robert Lee",
    age: 62,
    status: "Needs Follow-up",
    lastVisit: "1 week ago",
  },
  {
    id: 103,
    name: "Maria Garcia",
    age: 31,
    status: "New Patient",
    lastVisit: "N/A",
  },
];

const TODAY_APPOINTMENTS = [
  { time: "10:00 AM", patient: "Robert Lee", reason: "Post-op check-up" },
  {
    time: "11:30 AM",
    patient: "Alice Johnson",
    reason: "Routine consultation",
  },
];

// --- MAIN COMPONENT ---
const DoctorDashboard = () => {
  const { view, setView } = useContext(AuthContext);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 font-sans p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
          <Stethoscope className="w-8 h-8 mr-3" />
          Dr. Evelyn Reed's Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Cardiology Specialist — Welcome back, Dr. Reed.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Active Caseload"
          value="48"
          color="indigo"
        />
        <StatCard
          icon={Calendar}
          title="Today's Appointments"
          value={TODAY_APPOINTMENTS.length}
          color="emerald"
        />
        <StatCard
          icon={MessageCircle}
          title="Unread Messages"
          value="3"
          color="amber"
        />
      </section>

      {/* Main Content: Appointments & Patient List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Appointments Section (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Upcoming Schedule
          </h2>
          <div className="space-y-4">
            {TODAY_APPOINTMENTS.map((appt, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {appt.time}
                  </p>
                  <p className="text-sm text-gray-600">{appt.patient}</p>
                </div>
                <span className="text-sm text-indigo-600 font-medium">
                  {appt.reason}
                </span>
                <button className="text-indigo-500 hover:text-indigo-700 transition-colors flex items-center text-sm">
                  View Record <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
            {TODAY_APPOINTMENTS.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No appointments scheduled for today.
              </p>
            )}
          </div>
        </div>

        {/* Patient Quick List (1/3 width on desktop) */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            Patient Quick List
          </h2>
          <ul className="space-y-3">
            {MOCK_PATIENTS.map((patient) => (
              <li
                key={patient.id}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-xs text-gray-500">
                    Last visit: {patient.lastVisit}
                  </p>
                </div>
                <button className="ml-4 text-sm px-3 py-1 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
                  Action
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
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

export default DoctorDashboard;
