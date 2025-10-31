import React, { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  Mail,
  Send,
  Loader,
  Search,
  CheckCircle,
} from "lucide-react";

// --- MOCK DATA ---
const FAQS = [
  {
    id: 1,
    question: "How do I securely access my lab results?",
    answer:
      "Your lab results are available under the 'Documents' section. You must authenticate using two-factor verification (2FA) before viewing sensitive health information. If you have trouble, click the 'Forgot Password' link on the login page.",
  },
  {
    id: 2,
    question: "Can I join a video call with my doctor through this platform?",
    answer:
      "Yes. Use the 'Messaging' component to select your doctor, then click the 'Video Call' icon. Ensure your browser has camera and microphone permissions enabled before the scheduled time.",
  },
  {
    id: 3,
    question:
      "What is the typical response time for a submitted support ticket?",
    answer:
      "Critical system issues are addressed within 1 hour. General inquiries regarding platform usage or billing are typically resolved within 24-48 business hours. You can track the status of your ticket in the 'Ticket History' section.",
  },
];

const RECENT_TICKETS = [
  {
    id: "TKT-1002",
    subject: "Trouble linking wearable device data",
    status: "In Progress",
    priority: "Medium",
    date: "Oct 25",
  },
  {
    id: "TKT-1001",
    subject: "Question about billing for recent visit",
    status: "Resolved",
    priority: "Low",
    date: "Oct 20",
  },
  {
    id: "TKT-1000",
    subject: "Application freezing on mobile device",
    status: "Waiting on User",
    priority: "High",
    date: "Oct 18",
  },
];

// --- Helper Components ---

// FAQ Accordion Item
const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-indigo-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-gray-600 bg-white rounded-b-lg">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

// Component for Submitting a New Request
const NewRequestForm = ({ setView }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          Ticket Submitted!
        </h3>
        <p className="text-center text-green-800 mb-6">
          Thank you. Your support ticket (TKT-1003) has been successfully
          created. You can track its progress in the Ticket History tab.
        </p>
        <button
          onClick={() => setView("history")}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
        >
          View Ticket History
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Mail className="w-5 h-5 mr-2 text-indigo-600" />
        Submit a New Support Ticket
      </h3>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Problem viewing my records"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
        >
          <option value="">Select a category...</option>
          <option value="technical">Technical Support</option>
          <option value="billing">Billing Inquiry</option>
          <option value="medical">Medical Record Access</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description of Issue
        </label>
        <textarea
          id="description"
          rows="5"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Describe your issue in detail, including steps to reproduce it."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-colors shadow-md flex items-center justify-center ${
          isSubmitting
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Ticket
          </>
        )}
      </button>
    </form>
  );
};

// Component for Viewing Recent Tickets
const TicketHistory = () => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Waiting on User":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-indigo-600" />
        Recent Support Tickets
      </h3>
      <div className="space-y-3">
        {RECENT_TICKETS.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-indigo-600">
                {ticket.id}
              </span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClasses(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </span>
            </div>
            <p className="font-semibold text-gray-900 mb-1">{ticket.subject}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Priority: {ticket.priority}</span>
              <span>Submitted: {ticket.date}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-center text-gray-500">
        Showing last 3 tickets. Contact support for full archive.
      </p>
    </div>
  );
};

// --- MAIN COMPONENT ---
const SupportComponent = () => {
  // State to manage the active view: 'faq', 'new', or 'history'
  const [activeView, setActiveView] = useState("faq");

  let ContentComponent;
  switch (activeView) {
    case "new":
      ContentComponent = <NewRequestForm setView={setActiveView} />;
      break;
    case "history":
      ContentComponent = <TicketHistory />;
      break;
    case "faq":
    default:
      ContentComponent = (
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-indigo-600" />
            Frequently Asked Questions
          </h3>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search the knowledge base..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-100">
            {FAQS.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-800 p-4">
      {/* 1. Left Sidebar: Navigation & Contact Options */}
      <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col overflow-hidden mr-4">
        <div className="p-4 border-b bg-indigo-600 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <HelpCircle className="w-6 h-6 mr-2" />
            Support Hub
          </h2>
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1">
          {[
            { key: "faq", label: "Knowledge Base (FAQ)", icon: FileText },
            { key: "new", label: "Submit New Ticket", icon: Mail },
            { key: "history", label: "Ticket History", icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveView(item.key)}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors font-semibold mb-1 ${
                  isActive
                    ? "bg-indigo-500 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Live Chat/Contact Footer */}
        <div className="p-4 border-t bg-gray-50">
          <h4 className="text-sm font-bold mb-2">Need Immediate Help?</h4>
          <button className="w-full px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-md flex items-center justify-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Live Chat (M-F, 9-5)
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Average wait time: 1 minute
          </p>
        </div>
      </div>

      {/* 2. Right Panel: Content Area */}
      <div className="w-full md:w-3/4 bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto">
        {ContentComponent}
      </div>
    </div>
  );
};

export default SupportComponent;
