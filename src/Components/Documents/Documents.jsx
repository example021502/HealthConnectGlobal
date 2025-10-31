import React, { useState, useCallback } from "react";
import {
  Settings,
  Moon,
  Bell,
  User,
  ChevronDown,
  Save,
  Loader,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

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
 * Gets the Firestore document reference for user settings.
 * @param {import('firebase/firestore').Firestore} dbInstance
 * @param {string} currentUserId
 * @returns {import('firebase/firestore').DocumentReference}
 */
const getSettingsDocRef = (dbInstance, currentUserId) => {
  // MANDATORY: Use __app_id for collection path
  const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";
  // Path: /artifacts/{appId}/users/{userId}/settings/user_preferences
  return doc(
    dbInstance,
    `/artifacts/${appId}/users/${currentUserId}/settings/user_preferences`
  );
};

/**
 * Main component wrapper for the settings panel.
 * @returns {JSX.Element}
 */
const App = () => {
  // Database and Auth States
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  // Settings States (Default Values)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotifications, setIsEmailNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState("chime");
  const [profileName, setProfileName] = useState("Jane Doe");
  const [sessionTimeout, setSessionTimeout] = useState("60"); // New setting

  // UI States
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // --- Firebase Initialization and Data Listener ---
  React.useEffect(() => {
    const initFirebase = async () => {
      try {
        const firebaseConfig = JSON.parse(
          typeof __firebase_config !== "undefined" ? __firebase_config : "{}"
        );
        if (Object.keys(firebaseConfig).length === 0) {
          throw new Error("Firebase configuration is missing.");
        }

        const app = initializeApp(firebaseConfig);
        const firestoreDb = getFirestore(app);
        const auth = getAuth(app);
        setDb(firestoreDb);

        let currentUser = null;
        if (typeof __initial_auth_token !== "undefined") {
          const userCredential = await signInWithCustomToken(
            auth,
            __initial_auth_token
          );
          currentUser = userCredential.user;
        } else {
          const userCredential = await signInAnonymously(auth);
          currentUser = userCredential.user;
        }

        const currentUserId = currentUser?.uid || crypto.randomUUID();
        setUserId(currentUserId);

        // Setup real-time listener for user settings
        const settingsDocRef = getSettingsDocRef(firestoreDb, currentUserId);
        const unsubscribe = onSnapshot(
          settingsDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              // Load settings from Firestore, falling back to current state if null
              setIsDarkMode(data.isDarkMode ?? isDarkMode);
              setIsEmailNotifications(
                data.isEmailNotifications ?? isEmailNotifications
              );
              setNotificationSound(data.notificationSound ?? notificationSound);
              setProfileName(data.profileName ?? profileName);
              setSessionTimeout(data.sessionTimeout ?? sessionTimeout);
            }
            setIsLoading(false);
          },
          (err) => {
            console.error("Firestore Listener Error:", err);
            setDbError("Failed to load settings. Check console for details.");
            setIsLoading(false);
          }
        );

        return () => unsubscribe(); // Cleanup listener
      } catch (e) {
        console.error("Firebase Initialization Error:", e);
        setDbError(
          e.message || "An unknown database error occurred during setup."
        );
        setIsLoading(false);
      }
    };
    initFirebase();
  }, []);

  // --- Dark Mode Apply Effect ---
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // --- Save Function ---
  const handleSave = useCallback(async () => {
    if (!db || !userId) {
      setDbError("Error: Database connection failed. Cannot save.");
      return;
    }

    setIsSaving(true);
    setStatusMessage("Saving...");
    setDbError(null);

    const settingsToSave = {
      isDarkMode,
      isEmailNotifications,
      notificationSound,
      profileName,
      sessionTimeout,
      lastUpdated: new Date().toISOString(),
    };

    try {
      const settingsDocRef = getSettingsDocRef(db, userId);
      // Using setDoc with merge: true to avoid overwriting the entire document
      await setDoc(settingsDocRef, settingsToSave, { merge: true });
      setStatusMessage("Settings saved successfully!");
    } catch (e) {
      console.error("Save Error:", e);
      setDbError("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setStatusMessage("");
        setDbError(null);
      }, 3000);
    }
  }, [
    db,
    userId,
    isDarkMode,
    isEmailNotifications,
    notificationSound,
    profileName,
    sessionTimeout,
  ]);

  // --- Options Data ---
  const soundOptions = [
    { value: "none", label: "None" },
    { value: "chime", label: "Chime (Default)" },
    { value: "bell", label: "Ringing Bell" },
    { value: "swoosh", label: "Swoosh" },
  ];

  const timeoutOptions = [
    { value: "30", label: "30 Minutes" },
    { value: "60", label: "1 Hour (Default)" },
    { value: "240", label: "4 Hours" },
    { value: "never", label: "Never (Not recommended)" },
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader className="w-8 h-8 animate-spin text-indigo-500 mr-3" />
        <span className="text-gray-700 dark:text-gray-300 text-lg">
          Loading Settings...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition duration-500 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <Settings className="w-7 h-7 mr-3 text-indigo-600" />
            User Settings
          </h1>
        </header>

        {/* --- Database Error Message --- */}
        {dbError && (
          <div className="flex items-center p-4 mb-6 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 font-medium shadow-md">
            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-sm">{dbError}</span>
          </div>
        )}

        {/* --- Appearance Settings --- */}
        <SettingSection icon={Moon} title="Appearance">
          <ToggleSwitch
            label="Enable Dark Mode"
            enabled={isDarkMode}
            setEnabled={setIsDarkMode}
          />
          <ToggleSwitch
            label="Use System Font (Inter)"
            enabled={true}
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

        {/* --- Privacy & Security Settings (NEW FEATURE) --- */}
        <SettingSection icon={Lock} title="Privacy & Security">
          <SelectInput
            label="Auto-Logout Session Timeout"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            options={timeoutOptions}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">
            Your unique session ID is:{" "}
            <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded text-xs font-mono">
              {userId || "N/A"}
            </code>
          </p>
        </SettingSection>

        {/* --- Save Button & Status --- */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !!dbError}
            className={`w-full sm:w-auto flex items-center justify-center rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-150 transform active:scale-95 ${
              isSaving || dbError
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 hover:scale-[1.01]"
            }`}
          >
            {isSaving ? (
              <Loader className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          {(statusMessage || dbError) && (
            <div
              className={`text-sm font-medium p-2.5 rounded-lg transition duration-300 ${
                dbError
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50"
                  : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50"
              }`}
            >
              {statusMessage || dbError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
