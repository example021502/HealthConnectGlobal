import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Context";

const userDetails = {
  BrianMusarafu: {
    age: 20,
    address: "Chinhoyi Caves",
    specialty: "Cardiologist",
    email: "brian2@gmail.com",
  },
  SimonMusarafu: {
    age: 15,
    address: "Great Zimbabwe Ruins",
    specialty: "Neurologist",
    email: "simon2@gmail.com",
  },
  DesireMusarafu: {
    age: 30,
    address: "Nyasco",
    specialty: "Dentist",
    email: "desire2@gmail.com",
  },
};

function DoctorDashboard() {
  const [exitOverlay, setExitOverlay] = useState(false);
  const [profileExpand, setProfileExpand] = useState(false);
  const [todayDate, setTodayDate] = useState(new Date());

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

  const { setView, view, userName } = useContext(AuthContext);

  const handleExpandProfile = () => {
    setProfileExpand(!profileExpand);
  };

  const comparison = userName.replace(" ", "");

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

  const DisplayButtons = ({ button }) => {
    const [selected, setSelected] = useState("");
    const [click, setClick] = useState(false);

    const handleClick = (button) => {
      setSelected(button);
      setClick(!click);
    };

    return (
      <button
        onClick={(button) => handleClick(button)}
        title={button.name}
        className={`flex text-sm flex-row items-center justify-start px-2 ml-2 py-1 rounded-lg gap-2`}
      >
        <i className={`${button.icon} w-fit h-fit`} />
        <span className="">{button.name}</span>
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
      <div className="hidden md:flex flex-row gap-2 relative h-full w-full">
        <section
          className={`text-gray-700 bg-gray-300 flex flex-col h-full w-2/11`}
        >
          <img
            src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
            alt=""
            title=""
            className={`w-18 h-18 object-contain mx-auto py-4 text-2xl flex items-center justify-center`}
          />
          <div className="flex flex-col items-center justify-start gap-4 px-2 h-full w-full">
            {Object.keys(navButtons).map((category, index) => {
              const cat = navButtons[category];
              return (
                <div
                  key={index}
                  className="rounded-xl flex flex-col items-start justify-center px-4 w-full gap-1"
                >
                  <h2 className=" border-b-1 w-full border-gray-500 pb-1">
                    {category}
                  </h2>
                  {cat.map((button, index) => {
                    return <DisplayButtons button={button} key={index} />;
                  })}
                </div>
              );
            })}
          </div>
        </section>
        <div className="grid grid-cols-1 flex-1 items-start justify-start">
          <section className="bg-gray-200 rounded-xl py-4 px-2 flex items-center justify-start">
            <div className="flex w-full items-center justify-center gap-4 transition-all ease-in-out duration-200">
              <h2
                className={`flex items-center justify-start gap-2 text-gray-700`}
              >
                <span className="font-semibold text-lg text-gray-600">
                  Welcome{" "}
                </span>
                <span className="font-bold text-xl">{userName}</span>
              </h2>
              <div className="flex flex-1 gap-2 items-center justify-center text-sm text-gray-600 tracking-wide font-lighter">
                <p>{current_date}</p>
                <p>{current_time}</p>
              </div>
              <div className="flex relative flex-row items-center justify-center gap-2 ml-auto">
                <img
                  src="https://i.ibb.co/KxPQ4f9L/Secure-Appointment.jpg"
                  alt=""
                  className="object-cover h-8 w-8 border-1 border-[#569054] rounded-full"
                />
                <h2 className="text-xs text-gray-700 tracking-wide">
                  {userName}
                </h2>
                <i
                  onClick={handleExpandProfile}
                  className={`transition-all text-lg text-gray-700 hover:scale-[1.1] ease-in-out duration-200 ${
                    profileExpand
                      ? "ri-arrow-up-double-line"
                      : "ri-arrow-down-double-line"
                  }`}
                />
                {profileExpand &&
                  Object.keys(userDetails).map((itemObject, index) => {
                    if (itemObject === comparison) {
                      return (
                        <div
                          key={index}
                          className="w-50 absolute top-full right-full flex flex-col items-start justify-center bg-gray-100 p-4 rounded-tl-xl rounded-br-xl rounded-bl-xl gap-2 text-gray-500 text-sm tracking-wide"
                        >
                          <h2 className="text-md font-bold uppercase">
                            {userName}
                          </h2>
                          <p>Age: {userDetails[itemObject].age}</p>
                          <p>Address: {userDetails[itemObject].address}</p>
                          <p>email: {userDetails[itemObject].email}</p>
                          <p>Specialty: {userDetails[itemObject].specialty}</p>
                          <p className="text-gray-800 font-semibold cursor-pointer hover:border-b-1 pb-0.5 transition-all duration-100 ease-in">
                            Settings
                          </p>
                        </div>
                      );
                    } else {
                      <p>No data to display</p>;
                    }
                  })}
              </div>
            </div>
          </section>
          <section className="p-2">middle section</section>
          <section className="p-2">bottom section</section>
        </div>
      </div>
      {/* mobile view */}
      <div className="grid grid-cols-1 md:hidden"></div>
    </div>
  );
}

export default DoctorDashboard;
