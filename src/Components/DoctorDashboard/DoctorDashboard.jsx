import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";
import { Table, Users } from "lucide-react";
import Charts from "../Charts/Charts";
import { tr } from "@faker-js/faker";

function DoctorDashboard() {
  const { setView, view, specialists, userName, patients } =
    useContext(AuthContext);
  const [exitOverlay, setExitOverlay] = useState(false);
  const [profileExpand, setProfileExpand] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState("Overview");

  const [searchKey, setSearchKey] = useState("");

  const ProfileExpand = () => {
    const user_D_O_B = user.date_of_birth.split("T")[0];
    const age = 2025 - user_D_O_B.split("-")[0];
    if (user) {
      return (
        <div className="w-50 absolute top-full right-full flex flex-col items-start justify-center bg-gray-100 p-4 rounded-tl-xl rounded-br-xl rounded-bl-xl gap-2 text-gray-500 text-sm tracking-wide">
          <h2 className="text-md font-bold uppercase">{userName}</h2>
          <p>Age: {age}</p>
          <p>Country: {user.country}</p>
          <p>email: {user.email}</p>
          <p>Specialty: {user.specialty}</p>
          <p className="text-gray-800 font-semibold cursor-pointer hover:border-b-1 pb-0.5 transition-all duration-100 ease-in">
            Edit
          </p>
        </div>
      );
    } else {
      <p>No data to display</p>;
    }
  };

  let user = "";
  if (view === "specialist") {
    user = specialists.find(
      (user) =>
        user.first_name === userName.split(" ")[0] &&
        user.last_name === userName.split(" ")[1]
    );
  }

  const PatientsTable = (serachKey) => {
    if (patients) {
      return (
        <table>
          <thead>
            <tr className="text-sm text-gray-600 border-b-1 border-gray-400">
              <th className="text-left p-2 w-12"></th>
              <th className="text-left p-2 border-1">First name</th>
              <th className="text-left p-2">Last name</th>
              <th className="text-left p-2">Country</th>
              <th className="text-left p-2">Work Address</th>
              <th className="text-left p-2">Emergence Contact</th>
              <th className="text-left p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr className="border-2">
                <td>
                  <img
                    src={
                      patient.image ||
                      "https://i.ibb.co/7vDLJFb/Default-Profile-Pic.png"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-2 text-sm">{patient.first_name}</td>
                <td className="px-2 text-sm">{patient.last_name}</td>
                <td className="px-2 text-sm">{patient.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <p className="text-gray-500 fornt-semibold text-xl">
          No data to display
        </p>
      );
    }
  };

  const current_time = todayDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const current_date = todayDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleNotConfirmed = () => {
    setExitOverlay(false);
  };

  const handleConfirmed = () => {
    setView("home");
    setExitOverlay(false);
  };

  const handleExpandProfile = () => {
    setProfileExpand(!profileExpand);
  };

  const navButtons = {
    dashboard: [
      { name: "Overview", icon: "ri-dashboard-line" },
      { name: "Appointments", icon: "ri-calendar-fill" },
      { name: "Documents", icon: "ri-folders-line" },
      { name: "Messages", icon: "ri-message-3-line" },
      { name: "Profile", icon: "ri-user-line" },
      { name: "Resources", icon: "ri-database-line" },
    ],
    extras: [
      { name: "Find Doctor", icon: "ri-stethoscope-line" },
      { name: "Find Hospital", icon: "ri-hospital-line" },
      { name: "Support Center", icon: "ri-customer-service-2-line" },
      { name: "About", icon: "ri-info-i" },
    ],
    account: [
      { name: "Settings", icon: "ri-settings-2-line" },
      { name: "Billing & Payments", icon: "ri-secure-payment-line" },
      { name: "Logout", icon: "ri-logout-box-line" },
    ],
  };

  const handleSelecting = (btn_name) => {
    setSelectedItem(btn_name);
    if (btn_name === "Logout") {
      setExitOverlay(true);
    }
  };

  const DisplayButtons = ({ button, onSelect, isActive }) => {
    return (
      <button
        onClick={() => onSelect(button.name)}
        title={button.name}
        className={`flex w-full text-sm flex-row cursor-pointer items-center justify-start px-2 ml-2 py-1 rounded-lg gap-2 ${
          isActive
            ? "bg-[rgba(46,132,100,1)]"
            : "hover:bg-[rgba(46,132,100,0.2)]"
        }`}
      >
        <i
          className={`${button.icon}    
          text-[#13521d]        
           w-6 h-6 flex text-sm items-center justify-center bg-gray-100 rounded-full`}
        />
        <span className={`${isActive ? "text-gray-100" : "text-[#13521d]"}`}>
          {button.name}
        </span>
      </button>
    );
  };

  return (
    <div className="relative w-full h-screen bg-gray-200">
      {exitOverlay && (
        <div className="absolute z-10000  inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
          <div className="py-4 px-8 flex flex-col items-center gap-4 justify-center bg-gray-100 rounded-xl">
            <p>Do you want to Close?</p>
            <div className="flex flex-wrap items-center justify-between px-4 py-1 shadow-2xl w-full bg-50">
              <button
                onClick={handleConfirmed}
                className="w-fit h-fit text-lg font-semibold text-green-700 hover:scale-[1.1] cursor-pointer transition-all duration-100 ease-in"
              >
                Yes
              </button>
              <button
                onClick={handleNotConfirmed}
                className="w-fit h-fit text-red-700 text-lg font-semibold cursor-pointer hover:scale-[1.1] transition-all duration-100 ease-in"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {/* desktop view */}
      <div className="hidden md:flex flex-row items-center justify-center gap-2 relative h-full w-full overflow-hidden">
        <div
          className={`absolute inset-0 z-1 w-full [background:radial-gradient(125%_125%_at_50%_10%,rgba(84,144,86,0.2)_30%,rgba(46,132,100,0)_100%)]`}
        ></div>
        <div className="w-full overflow-hidden h-full z-10 flex flex-row">
          <section
            className={`text-gray-700 bg-gray-100 flex flex-col h-full w-2/11`}
          >
            <div className="flex items-center justify-start mx-6 gap-1 my-2">
              <img
                src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
                alt=""
                title=""
                className={`w-fit h-10 object-cover py-2 text-2xl flex items-center justify-center`}
              />
              <h2 className="text-md font-semibold">InterHealthConnect</h2>
            </div>
            <div className="flex flex-col items-center justify-start gap-2 px-2 h-full w-full">
              {Object.keys(navButtons).map((category, index) => {
                const cat = navButtons[category];
                return (
                  <div
                    key={index}
                    className="rounded-xl flex flex-col items-start justify-center px-4 w-full gap-1"
                  >
                    <h2 className=" border-b-1 w-full text-[#13521d] font-semibold border-[#13521d] pb-0.5">
                      {category}
                    </h2>
                    {cat.map((button, index) => {
                      return (
                        <DisplayButtons
                          key={index}
                          button={button}
                          onSelect={handleSelecting}
                          isActive={button.name === selectedItem}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </section>
          <div className="grid overflow-hidden border-1 grid-cols-1 flex-1 items-start justify-start overflow-y-auto">
            <section className="bg-gray-50 text-[#13521d] py-2 px-2 flex items-center justify-end">
              <div className="flex gap-2 w-full items-center justify-end transition-all ease-in-out duration-200">
                <div className="flex-1 relative flex items-center justify-start">
                  <i className="ri-search-line absolute my-auto left-2 z-1000" />
                  <input
                    type="text"
                    placeholder="Enter something..."
                    onChange={(e) => setSearchKey(e)}
                    className="w-100 text-sm tracking-wide border-1 border-gray-500 focus:outline-none focus:ring-1 py-2 pl-8 pr-5 z-1 rounded-md"
                  />
                </div>
                <div className="flex w-fit gap-2 items-center justify-center text-sm text-[#13521d] tracking-wide font-lighter">
                  <p>{current_date}</p>
                  <p>{current_time}</p>
                </div>
                <div className="flex relative flex-row items-center justify-center gap-0.5 ml-auto">
                  <img
                    src="https://i.ibb.co/KxPQ4f9L/Secure-Appointment.jpg"
                    alt=""
                    className="object-cover h-8 w-8 border-1 border-[#569054] rounded-full"
                  />
                  <h2 className="text-xs font-semibold text-[#13521d]">
                    {userName}
                  </h2>
                  <i
                    onClick={handleExpandProfile}
                    className={`transition-all text-lg text-[#13521d] hover:scale-[1.1] ease-in-out duration-200 ${
                      profileExpand
                        ? "ri-arrow-drop-up-line"
                        : "ri-arrow-drop-down-line"
                    }`}
                  />
                  {profileExpand && <ProfileExpand />}
                </div>
              </div>
            </section>
            <section className="p-5 xl:grid grid-cols-3 xl:gap-5 flex flex-wrap items-start justify-start">
              <div className="w-full h-100 bg-gray-50 text-gray-700 rounded-2xl shadow-lg">
                <Charts />
              </div>
              <div className="w-full h-100 bg-gray-50 text-gray-700 rounded-2xl shadow-lg">
                <Charts />
              </div>
              <div className="w-full h-100 bg-gray-50 text-gray-700 rounded-2xl shadow-lg">
                <Charts />
              </div>
            </section>
            <section className="p-2 min-h-30">
              <h2 className="text-lg tracking-wide flex justify-start items-center text-gray-700 w-full border-b-1 border-gray-400 pb-1">
                Patients
                <span className="flex items-center justify-center w-fit gap-4 px-2 rounded-sm text-sm ml-auto py-1">
                  <span className="text-xs font-semibold text-green-700">
                    Total: {patients.length}
                  </span>
                  <span className="relative flex items-center">
                    <input
                      type="text"
                      className="min-w-80 pl-4 pr-10 py-1.5 rounded-full bg-gray-100"
                    />
                    <i className="ri-search-line absolute my-auto right-2 text-xl z-1000" />
                  </span>
                </span>
              </h2>
              <PatientsTable searchKey={searchKey} />
            </section>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="grid grid-cols-1 md:hidden"></div>
    </div>
  );
}

export default DoctorDashboard;
