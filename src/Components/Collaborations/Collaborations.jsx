import React, { useState } from "react";
import {
  Folder,
  User,
  Clock,
  Edit,
  FileText,
  MessageSquare,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";

// --- MOCK DATA ---
const WORKSPACES = [
  {
    id: 1,
    name: "Dr. Smith's Post-Op Care Plan",
    type: "Treatment Plan",
    lastUpdated: "2 minutes ago",
    collaborators: ["Dr. Smith", "Nurse Jane", "You"],
    content:
      "## Post-Operative Recovery Guide\n\n### Medications\n* **Pain:** Tylenol 500mg, 2 tablets every 6 hours.\n* **Antibiotic:** Amoxicillin 250mg, twice daily for 7 days.\n\n### Activity Restrictions\n* No lifting over 10 lbs for 4 weeks.\n* Light walking encouraged.\n\n### Follow-up\nSchedule in 14 days for suture removal.",
    role: "Editor",
  },
  {
    id: 2,
    name: "Recent Lab Results (Blood Panel)",
    type: "Document",
    lastUpdated: "4 hours ago",
    collaborators: ["Dr. Evelyn", "Lab Staff", "You"],
    content:
      "## Complete Blood Count (CBC)\n\n| Parameter | Value | Normal Range |\n| :--- | :--- | :--- |\n| WBC | 7.5 | 4.5 - 11.0 |\n| Hemoglobin | 13.8 | 12.0 - 16.0 |\n| Platelets | 250 | 150 - 450 |\n\n**Note:** All values within normal limits. Interpretation added by Dr. Evelyn: 'Routine follow-up needed.'",
    role: "Viewer",
  },
  {
    id: 3,
    name: "Physical Therapy Notes - Week 1",
    type: "Notes",
    lastUpdated: "Yesterday",
    collaborators: ["Therapist Ken", "You"],
    content:
      "## Session 1 Summary\n\n* **Focus:** Range of motion exercises (Passive and Active).\n* **Observation:** Patient tolerance was high; slight stiffness noted in the left knee.\n* **Plan:** Increase resistance by 10% next session.",
    role: "Editor",
  },
];

const ACTIVITY_LOG = [
  {
    time: "10:15 AM",
    user: "Nurse Jane",
    action: "edited the Activity Restrictions section.",
  },
  {
    time: "9:45 AM",
    user: "Dr. Smith",
    action: "added a note regarding medication timing.",
  },
  {
    time: "9:00 AM",
    user: "You",
    action: "created the Post-Op Care Plan workspace.",
  },
];

// --- Helper Components ---

// Renders the icon based on workspace type
const TypeIcon = ({ type }) => {
  switch (type) {
    case "Treatment Plan":
      return <FileText className="w-5 h-5 text-indigo-500" />;
    case "Document":
      return <Folder className="w-5 h-5 text-teal-500" />;
    case "Notes":
      return <Edit className="w-5 h-5 text-orange-500" />;
    default:
      return <FileText className="w-5 h-5 text-gray-500" />;
  }
};

// --- MAIN COMPONENT ---
const Collaborations = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(WORKSPACES[0]);

  // Determine if the current user has editing rights
  const isEditor = selectedWorkspace.role === "Editor";

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-800 p-4">
      {/* 1. Left Sidebar: Workspace List */}
      <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden mr-4">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">Shared Workspaces</h2>
          <button
            className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-md"
            title="New Collaboration"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {WORKSPACES.map((workspace) => (
            <div
              key={workspace.id}
              className={`
                flex items-start p-4 border-b cursor-pointer transition-all duration-200
                ${
                  selectedWorkspace.id === workspace.id
                    ? "bg-indigo-50 border-l-4 border-indigo-500"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => setSelectedWorkspace(workspace)}
            >
              <TypeIcon type={workspace.type} />
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate m-0">
                  {workspace.name}
                </p>
                <p className="text-xs text-gray-500 m-0 mt-0.5">
                  <Clock className="w-3 h-3 inline mr-1 -mt-0.5" />
                  Updated {workspace.lastUpdated}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-2 mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* 2. Center Panel: Document Viewer/Editor */}
      <div className="w-full md:w-2/4 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden mr-4">
        <div className="p-4 border-b bg-indigo-600 text-white">
          <h2 className="text-xl font-bold">{selectedWorkspace.name}</h2>
          <div className="flex items-center text-sm mt-1 space-x-4">
            <span className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              Your Role:{" "}
              <strong className="ml-1">{selectedWorkspace.role}</strong>
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                isEditor
                  ? "bg-green-400 text-green-900"
                  : "bg-yellow-400 text-yellow-900"
              }`}
            >
              {isEditor ? "Ready to Edit" : "View Only"}
            </span>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {/* Mock Markdown Rendering - In a real app, use a markdown library */}
          <div className="prose max-w-none">
            {selectedWorkspace.content.split("\n").map((line, index) => {
              if (line.startsWith("##")) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                    {line.substring(2).trim()}
                  </h3>
                );
              }
              if (line.startsWith("*")) {
                return (
                  <li
                    key={index}
                    className="ml-4 text-sm text-gray-700 list-disc"
                  >
                    {line.substring(1).trim()}
                  </li>
                );
              }
              if (line.startsWith("|")) {
                // Simple table mock for demonstration
                return (
                  <p
                    key={index}
                    className="text-sm font-mono bg-gray-100 p-2 rounded-md my-1"
                  >
                    {line}
                  </p>
                );
              }
              return (
                <p key={index} className="text-base text-gray-700 my-1">
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Action Bar (Only visible to Editors) */}
        {isEditor && (
          <div className="p-4 border-t flex justify-end bg-gray-50">
            <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-md flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* 3. Right Sidebar: Collaborators & Activity Feed */}
      <div className="w-full md:w-1/4 flex flex-col space-y-4">
        {/* Collaborators List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-500" />
            Active Collaborators
          </h3>
          <ul className="space-y-2">
            {selectedWorkspace.collaborators.map((user, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-700"
              >
                <User
                  className={`w-4 h-4 mr-2 ${
                    user === "You" ? "text-green-500" : "text-gray-400"
                  }`}
                />
                {user}
                {user === "You" && (
                  <span className="text-xs font-semibold ml-auto text-green-600">
                    (Online)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex-1 overflow-hidden">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-500" />
            Recent Activity
          </h3>
          <div className="space-y-4 overflow-y-auto h-[calc(100%-50px)]">
            {ACTIVITY_LOG.map((activity, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-0 h-full border-l border-gray-300"></div>
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-gray-400 border-2 border-white"></div>
                <p className="text-xs text-gray-500">{activity.time}</p>
                <p className="text-sm leading-snug">
                  <strong className="font-semibold">{activity.user}</strong>{" "}
                  {activity.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Message Button */}
        <button className="w-full px-4 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Jump to Chat
        </button>
      </div>
    </div>
  );
};

export default Collaborations;
