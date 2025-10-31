import React, { useState } from "react";
import {
  MessageCircle,
  Video,
  Phone,
  Send,
  User,
  MoreVertical,
  Search,
  CheckCircle,
  X,
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_CONTACTS = [
  {
    id: 1,
    name: "Dr. Evelyn Reed",
    type: "Doctor",
    lastMessage: "Please follow up next week.",
    status: "online",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "St. Jude Hospital",
    type: "Hospital",
    lastMessage: "Your appointment is confirmed for tomorrow.",
    status: "offline",
    time: "Yesterday",
  },
  {
    id: 3,
    name: "Nurse Michael Chen",
    type: "Nurse",
    lastMessage: "The pre-op instructions are attached.",
    status: "online",
    time: "1 hour ago",
  },
  {
    id: 4,
    name: "Patient John Smith",
    type: "Patient",
    lastMessage: "Is this the correct dosage?",
    status: "offline",
    time: "Mon",
  },
  {
    id: 5,
    name: "Dr. Alex Lee",
    type: "Doctor",
    lastMessage: "Thanks, talk soon.",
    status: "online",
    time: "Just now",
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "Doctor",
    text: "Good morning! How are you feeling today?",
    time: "9:00 AM",
  },
  {
    id: 2,
    sender: "User",
    text: "I feel much better, thank you! I just have a quick question about my prescription.",
    time: "9:05 AM",
  },
  {
    id: 3,
    sender: "Doctor",
    text: "Of course. What is your concern?",
    time: "9:06 AM",
  },
  {
    id: 4,
    sender: "User",
    text: "I wanted to confirm if I should take the medicine before or after meals.",
    time: "9:10 AM",
  },
  {
    id: 5,
    sender: "Doctor",
    text: "Please take it *after* meals. Do you want to quickly jump on a voice call to clarify anything else?",
    time: "9:15 AM",
  },
];

// --- Helper Components ---

// Status dot for contacts
const StatusIndicator = ({ status }) => (
  <div
    className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white ${
      status === "online" ? "bg-green-500" : "bg-gray-400"
    }`}
    title={status === "online" ? "Online" : "Offline"}
  />
);

// Generic Modal for Call Simulation
const CallSimulationModal = ({ type, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <CheckCircle className="w-6 h-6 text-emerald-500 mr-2" />
          Initiating {type} Call
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        A real-world application would now attempt to connect via WebRTC.
        <br />
        <br />
        **Feature simulation:** The call is now ringing...
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors flex items-center"
        >
          <Phone className="w-5 h-5 mr-2 transform rotate-12" />
          End Call
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const Messaging = () => {
  const [selectedContact, setSelectedContact] = useState(MOCK_CONTACTS[0]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Handler for text input
  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      // In a real app, you would save this to Firestore
      MOCK_MESSAGES.push({
        id: Date.now(),
        sender: "User",
        text: inputText.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setInputText("");
    }
  };

  // Handler for call buttons
  const handleCall = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 antialiased font-sans">
      {/* Contact Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Messages <MessageCircle className="w-5 h-5 ml-2 text-emerald-500" />
          </h2>
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className={`
                flex items-center p-4 border-b cursor-pointer transition-colors
                ${
                  selectedContact.id === contact.id
                    ? "bg-emerald-50 border-l-4 border-emerald-500"
                    : "hover:bg-gray-100"
                }
              `}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <User className="w-6 h-6" />
                </div>
                <StatusIndicator status={contact.status} />
              </div>
              <div className="ml-4 flex-1 overflow-hidden">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {contact.name}
                </div>
                <div
                  className={`text-xs ${
                    contact.status === "online"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {contact.type} ({contact.status})
                </div>
              </div>
              <div className="text-xs text-gray-500 ml-2 text-right">
                <p className="mb-0">{contact.time}</p>
                {/* Unread message count placeholder */}
                {contact.id === 5 && (
                  <span className="inline-block px-2 py-0.5 mt-1 text-white bg-emerald-500 rounded-full text-[10px] font-bold">
                    1
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Panel */}
      <div className="hidden md:flex md:flex-col flex-1 bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b shadow-sm">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                <User className="w-5 h-5" />
              </div>
              <StatusIndicator status={selectedContact.status} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">
                {selectedContact.name}
              </h4>
              <p
                className={`text-sm ${
                  selectedContact.status === "online"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {selectedContact.type}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleCall("Video")}
              className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-md flex items-center"
              title="Start Video Call"
            >
              <Video className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCall("Voice")}
              className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors shadow-md flex items-center"
              title="Start Voice Call"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              title="More Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-100">
          {MOCK_MESSAGES.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-xl shadow-sm ${
                  message.sender === "User"
                    ? "bg-emerald-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                }`}
              >
                <p className="text-sm m-0">{message.text}</p>
                <span
                  className={`text-xs block mt-1 ${
                    message.sender === "User"
                      ? "text-emerald-200"
                      : "text-gray-400"
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
          {/* Always scroll to bottom placeholder */}
          <div
            ref={(el) => {
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSend} className="flex items-center space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              aria-label="Message input"
            />
            <button
              type="submit"
              className={`p-3 rounded-full text-white shadow-lg transition-all ${
                inputText.trim()
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!inputText.trim()}
              title="Send Message"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Responsive Overlay for Mobile - Placeholder */}
      <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-2xl m-4">
          <h5 className="text-lg font-bold text-red-500 mb-2">
            Device Too Small
          </h5>
          <p className="text-gray-600">
            Please use a tablet or desktop size to view the full chat panel.
          </p>
        </div>
      </div>

      {/* Call Simulation Modal */}
      {isModalOpen && (
        <CallSimulationModal
          type={modalType}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Messaging;
