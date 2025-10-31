import React, { useState, useCallback } from "react";
import { Settings, Moon, Bell, User, ChevronDown, Save } from "lucide-react";

// --- Utility Components ---

/**
 * A reusable, styled toggle switch component.
 */
const ToggleSwitch = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50">
    <span className="text-gray-700 dark:text-gray-300 font-medium">
      {label}
    </span>
    <button
      onClick={() => setEnabled((prev) => !prev)}
      className={`${
        enabled ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  </div>
);

/**
 * A reusable select/dropdown component.
 */
const SelectInput = ({ label, value, onChange, options }) => (
  <div className="py-3 border-b border-gray-100 dark:border-gray-700/50">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="block w-full appearance-none rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 py-2 pl-3 pr-10 text-base text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm shadow-sm transition duration-150"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-5 text-gray-400 mr-3"
        aria-hidden="true"
      />
    </div>
  </div>
);

/**
 * A reusable text input component.
 */
const TextInput = ({ label, value, onChange, placeholder }) => (
  <div className="py-3">
    <label
      htmlFor={label.replace(/\s/g, "-")}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      type="text"
      id={label.replace(/\s/g, "-")}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm shadow-sm transition duration-150"
    />
  </div>
);

/**
 * Main component wrapper for the settings panel.
 * @returns {JSX.Element}
 */
const App = () => {
  // State for different settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState("chime");
  const [profileName, setProfileName] = useState("Jane Doe");
  const [statusMessage, setStatusMessage] = useState("");

  // Handle dark mode change and apply to the document root
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle saving settings (mock function)
  const handleSave = useCallback(() => {
    setStatusMessage("Settings saved successfully!");
    console.log({
      isDarkMode,
      isEmailNotifications,
      notificationSound,
      profileName,
    });
    setTimeout(() => setStatusMessage(""), 3000);
  }, [isDarkMode, isEmailNotifications, notificationSound, profileName]);

  const soundOptions = [
    { value: "none", label: "None" },
    { value: "chime", label: "Chime (Default)" },
    { value: "bell", label: "Ringing Bell" },
    { value: "swoosh", label: "Swoosh" },
  ];

  const SettingSection = ({ icon: Icon, title, children }) => (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition duration-300">
      <h2 className="flex items-center text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-3 border-gray-100 dark:border-gray-700">
        <Icon className="w-5 h-5 mr-3 text-indigo-500" />
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition duration-500 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <Settings className="w-7 h-7 mr-3 text-indigo-600" />
            User Settings
          </h1>
        </header>

        {/* --- Appearance Settings --- */}
        <SettingSection icon={Moon} title="Appearance">
          <ToggleSwitch
            label="Enable Dark Mode"
            enabled={isDarkMode}
            setEnabled={setIsDarkMode}
          />
          <ToggleSwitch
            label="Use System Font"
            enabled={true} // Example of a setting that's always true
            setEnabled={() => {}}
          />
        </SettingSection>

        {/* --- Notifications Settings --- */}
        <SettingSection icon={Bell} title="Notifications">
          <ToggleSwitch
            label="Email Notifications"
            enabled={isEmailNotifications}
            setEnabled={setIsEmailNotifications}
          />
          <ToggleSwitch
            label="In-App Popup Alerts"
            enabled={true}
            setEnabled={() => {}}
          />
          <SelectInput
            label="Notification Sound"
            value={notificationSound}
            onChange={(e) => setNotificationSound(e.target.value)}
            options={soundOptions}
          />
        </SettingSection>

        {/* --- Profile Settings --- */}
        <SettingSection icon={User} title="User Profile">
          <TextInput
            label="Display Name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter your full name"
          />
          <TextInput
            label="Username (Cannot be changed)"
            value="janedoe42"
            onChange={() => {}} // Disabled input
            placeholder=""
          />
        </SettingSection>

        {/* --- Save Button & Status --- */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition duration-150 transform hover:scale-[1.01] active:scale-95"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </button>
          {statusMessage && (
            <div className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 p-2.5 rounded-lg transition duration-300">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
