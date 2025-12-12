import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";
import Analytics from "../Charts/Analytics";
import SummeryChart from "../Charts/SummeryChart";
import axios from "axios";
import "../Charts/Charts.css";

function DoctorDashboard() {
  const {
    setView,
    view,
    specialists,
    userName,
    patients,
    status,
    setStatus,
    fetchData,
  } = useContext(AuthContext);
  const [exitOverlay, setExitOverlay] = useState(false);
  const [profileExpand, setProfileExpand] = useState(false);
  const [todayDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState("Overview");

  const [searchKey, setSearchKey] = useState("");

  let targetTable = "";
  if (view === "patients") {
    targetTable = "patients";
  } else if (view === "specialist") {
    targetTable = "specialists";
  }
  const first_name = userName.split(" ")[0];
  const last_name = userName.split(" ")[1];

  useEffect(() => {
    setStatus("online");
    const updateStatus = async (targetTable, first_name, last_name, status) => {
      const dataToSend = { targetTable, first_name, last_name, status };
      try {
        const response = await axios.post("http://localhost:8081", dataToSend);
        if (response.status === 200) {
          console.log("Status updated successfully", response.data);
          if (fetchData) {
            await fetchData();
          }
        } else {
          console.log("Failed to updated the status", response.data);
        }
      } catch (err) {
        console.log("Error updating status:", err);
      }
    };

    updateStatus(targetTable, first_name, last_name, status);
  }, [first_name, last_name, setStatus, status, targetTable, fetchData]);

  let user = "";
  if (view === "specialist") {
    user = specialists.find(
      (user) =>
        user.first_name === userName.split(" ")[0] &&
        user.last_name === userName.split(" ")[1]
    );
  }

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

  const PatientsTable = () => {
    if (patients) {
      return (
        <table className="w-full">
          <thead className="w-full">
            <tr className="text-sm text-gray-600 border-b-1 border-gray-400 bg-gray-300">
              <th className="text-left p-2 w-14"></th>
              <th className="text-left p-2">First name</th>
              <th className="text-left p-2">Last name</th>
              <th className="text-left p-2">Country</th>
              <th className="text-left p-2">Language</th>
              <th className="text-left p-2">Emergence Contact</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody className="mt-2">
            {patients.map((patient, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"}`}
              >
                <td className="">
                  <div className="m-2">
                    <img
                      src={patient.image || "https://placehold.co/600x400"}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                </td>
                <td className="text-sm">
                  <div className="px-2">{patient.first_name}</div>
                </td>
                <td className="px-2 text-sm">
                  <div className="pb-2">{patient.last_name}</div>
                </td>
                <td className="px-2 text-sm">
                  <div className="pb-2">{patient.country}</div>
                </td>
                <td className="px-2 text-sm">
                  <div className="pb-2">{patient.prefered_language}</div>
                </td>
                <td className="px-2 text-sm">
                  <div className="pb-2">
                    <a href="/">
                      {patient.emergency_contact}
                      <i className="ri-phone-fill text-green-700 bg-green-100 ml-2 rounded-full p-1 text-lg" />
                    </a>
                  </div>
                </td>
                <td className="px-2 text-sm">
                  <div className="pb-2">{patient.email}</div>
                </td>
                <td className="px-2 text-sm">
                  <div
                    className={`pb-2 ${
                      patient.status === "offline"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {patient.status}
                  </div>
                </td>
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
    setStatus("offline");
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
        <div className="absolute z-10000 inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
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
          <div className="grid overflow-hidden h-full w-full grid-cols-1 flex-1 items-start justify-start relative">
            <section className="bg-gray-50 fixed top-0 left-2/11 right-0 px-5 text-[#13521d] py-2 px- flex items-center justify-end">
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
            <div className="flex flex-col mt-13 p-2 pb-16 w-full h-full overflow-y-auto">
              <section className="m-5 xl:grid grid-cols-3 xl:gap-5 gap-10 flex flex-wrap items-start justify-start">
                <div className="w-full p-5 h-100 bg-gray-50 text-gray-700 rounded-2xl shadow-lg">
                  <h1>Summery</h1>

                  <SummeryChart />
                </div>
                <div className="w-full h-full flex flex-col items-start justify-center p-5 gap-2 bg-gray-50 text-gray-700 rounded-2xl shadow-lg">
                  <h1>Analytics</h1>
                  <Analytics />
                </div>
                <div className="w-full h-100 bg-gray-50 text-gray-700 rounded-2xl shadow-lg"></div>
              </section>
              <section className="p-4 m-5 flex flex-col items-start justify-start bg-gray-50 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-sm shadow-lg">
                <h2 className="text-lg tracking-wide flex justify-start items-center text-gray-700 w-full pb-2">
                  Health Specialists
                  <span className="flex items-center justify-center w-fit gap-4 px-2 rounded-sm text-sm ml-auto py-1">
                    <span className="text-xs font-semibold text-green-700">
                      Total: {patients.length}
                    </span>
                    <span className="relative flex items-center">
                      <input
                        type="text"
                        className="min-w-80 pl-4 pr-10 py-1.5 rounded-full bg-gray-100 border-1 border-gray-300 focus:outline-none text-sm tracking-wider text-gray-600 focus:ring-1 focus:ring-green-700"
                      />
                      <i className="ri-search-line absolute my-auto right-2 text-xl z-1000 cursor-pointer" />
                    </span>
                  </span>
                </h2>
                <PatientsTable searchKey={searchKey} />
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="grid grid-cols-1 md:hidden"></div>
    </div>
  );
}

export default DoctorDashboard;
