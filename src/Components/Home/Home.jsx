import { AuthContext } from "../Context/Context";
import { useContext, useEffect, useState, useRef } from "react";

const services = [
  {
    id: 1,
    title: "Telehealth Consultations 🧑‍💻",
    icon: "ri-live-fill",
    description:
      "Secure, on-demand video and audio appointments with licensed healthcare providers.",
    attributes: [
      "Real-time video/audio",
      "Secure end-to-end encryption",
      "Multi-device accessibility",
      "Instant e-prescriptions",
    ],
  },
  {
    id: 2,
    title: "Centralized Health Records (EHR) 📄",
    icon: "ri-folder-open-fill",
    description:
      "A single, secure platform to store, view, and manage all your medical history and test results.",
    attributes: [
      "HIPAA/GDPR compliant storage",
      "Easy sharing with providers",
      "History timeline view",
      "Lab and imaging result access",
    ],
  },
  {
    id: 3,
    title: "Appointment Scheduling 📅",
    icon: "ri-calendar-fill",
    description:
      "Simplified booking, rescheduling, and cancellation of in-person or virtual appointments.",
    attributes: [
      "Provider search & filter (specialty, location)",
      "Real-time availability updates",
      "Automated SMS/Email reminders",
      "Integrated payment processing",
    ],
  },
  {
    id: 4,
    title: "Remote Patient Monitoring (RPM) 🌡️",
    icon: "ri-heart-pulse-fill",
    description:
      "Connect personal wearables and medical devices for continuous, automated health data tracking.",
    attributes: [
      "Integration with common wearables (e.g., Apple Health, Google Fit)",
      "Real-time vital sign dashboard",
      "Automated alert thresholds for providers",
      "Historical data trends analysis",
    ],
  },
  {
    id: 5,
    title: "Medication & Prescription Management 💊",
    icon: "ri-capsule-fill",
    description:
      "Track your current prescriptions, receive refill reminders, and request renewals digitally.",
    attributes: [
      "Dose and schedule reminders",
      "Digital refill requests",
      "Drug interaction checker",
      "Pharmacy locator and direct ordering",
    ],
  },
  {
    id: 6,
    title: "Secure Messaging & Chat 💬",
    icon: "ri-wechat-fill",
    description:
      "Direct, private communication channel between patients and their healthcare team.",
    attributes: [
      "Asynchronous Q&A",
      "File and image sharing (e.g., a rash photo)",
      "Triage and support chat-bots",
      "Provider response time guarantees",
    ],
  },
];

const connection_tools = [
  {
    id: 1,
    title: "Contact Support",
    icon: "ri-customer-service-2-line",
    description:
      "Need a quick answer or technical assistance? Our dedicated team is available 24/7 to resolve platform questions or security concerns.",
  },
  {
    id: 2,
    title: "Explore Our Health Library",
    icon: "ri-lightbulb-line",
    description:
      "Access thousands of curated articles, guides, and videos written by licensed practitioners to help you stay informed and empowered.",
  },
  {
    id: 3,
    title: "Join Our Community Forum",
    icon: "ri-user-community-line",
    description:
      "Connect with other patients, share your journey, and find a supportive, private space moderated by wellness professionals.",
  },
  {
    id: 4,
    title: "Partner With Us",
    icon: "ri-shake-hands-line",
    description:
      "Are you a clinic, hospital, or organization? Integrate our EHR, Telehealth, and RPM tools to deliver modern, connected care.",
  },
];

function Handle_tool(tool) {
  const [hover, setHover] = useState(false);

  const handle_mouse_over = () => {
    setHover(true);
  };
  const handle_mouse_out = () => {
    setHover(false);
  };
  return (
    <div
      onMouseOver={handle_mouse_over}
      onMouseLeave={handle_mouse_out}
      key={tool.id}
      className={`transition-all cursor-pointer duration-300 ease-in-out flex flex-col items-start p-4 justify-center w-46 h-fit rounded-xl relative z-1 before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.8)] before:backdrop-blur-sm before:top-0 before:left-0 before:z-[-1] before:rounded-lg after:border-1 hover:after:inset-0 after:bg-[rgba(0,107,255,1)] hover:text-white  hover:after:w-[100%] after:z-[-1] after:rounded-lg after:absolute after:top-0 after:left-0 after:w-2 after:h-2 hover:after:h-full hover:after:transition-all hover:after:duration-300 hover:after:ease-in-out
      `}
    >
      <p className="text-xs font-semibold m-0">{tool.title}</p>
      <i
        id="icon"
        className={`text-[2em] w-10 h-10 flex items-center justify-center font-semibold ${
          tool.icon
        } ${hover ? "text-white" : "text-[rgba(0,107,255,1)]"}`}
      />
      <p className="text-xs font-light tracking-wide">{tool.description}</p>
    </div>
  );
}

function Home() {
  const { setView } = useContext(AuthContext);

  const [attr_index, setAttr_index] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttr_index(Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSignin = () => {
    setView("signin");
  };
  const handleSignup = () => {
    setView("signup");
  };

  return (
    <div className="w-full bg-gradient-to-br from-[rgba(0,107,255,0.2)] via-[rgba(0,107,255,0.08)] to-[rgba(0,107,255,0.1)] flex items-center justify-center bg-[rgb(255,255,255)]">
      <div className="w-[70%] h-fit relative pt-2 flex flex-col items-center justify-start">
        {/* nav bar */}
        <div className="z-50 bottom-auto text-[rgba(255,255,255,0.8)] flex items-center justify-center gap-4 py-1 px-4 bg-[rgba(6,83,201,1)]  rounded-full shadow-2xl min-w-full">
          <div className="flex flex-row justify-center items-center gap-6 text-xs font-lighter">
            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] shadow-[0_0_4px_rgba(255,255,255,0.3)] p-1 m-1 rounded-lg"
            >
              <i className="ri-globe-line mr-1" />
              <span>Language</span>
              <i className="ri-expand-up-down-fill ml-0.5 hover:scale-[1.1]" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] shadow-[0_0_4px_rgba(255,255,255,0.3)] p-1 m-1 rounded-lg"
            >
              <span>Customer Support</span>
              <i className="ri-customer-service-2-line ml-0.5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] shadow-[0_0_4px_rgba(255,255,255,0.3)] p-1 m-1 rounded-lg"
            >
              About
              <i className="ri-information-line ml-0.5" />
            </a>
          </div>
          <button className="ml-auto text-sm text-[rgba(6,83,201,1)] hover:bg-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,1)] py-1 px-4 m-1 rounded-lg transition-all duration-200 ease-in-out hover:stroke-6">
            Create Account
          </button>
        </div>

        {/* middle */}
        <div className="w-full h-fit flex border-1 flex-col items-start p-4 m-2 justify-center text-white bg-[rgba(6,83,201,1)] rounded-tl-[3em] rounded-bl-[1em] rounded-tr-[1em] rounded-br-[3em]">
          <div className="flex flex-col items-start justify-center gap-0 my-6 mx-1">
            <h4 className="font-semibold tracking-wide text-2xl m-0">
              InterHealthConnect
            </h4>
            <p className="text-xs font-regular tracking-wide">
              Your Health, Our Priority
            </p>
          </div>
        </div>

        {/* Main section */}
        <div className="flex flex-row items-center justify-start py-12">
          <div className="flex flex-col h-fit w-[40%] items-start justify-center px-5 gap-2 py-5 z-1 rounded-lg">
            <p className="text-sm tracking-normal text-left m-0">
              Global care. Local ease.
            </p>
            <h1 className="text-lg text-left font-semibold ">
              We are here for your Care
            </h1>
            <p className="text-xs tracking-normal text-left">
              Finding the one specialist with experience in a rare condition can
              be a challenge. Our intelligent matching algorithm connects you to
              the precise international expertise you need in minutes,
              drastically reducing diagnostic delays.
            </p>

            <button className="mt-4 text-white text-sm py-1 px-4 rounded-md shadow-sm tracking-wide transition-all duration-200 ease-in-out bg-[rgb(6,83,201,0.9)] hover:bg-[rgb(6,83,201,1)]">
              Learn More
            </button>

            <div className="flex justify-start items-start gap-8 mt-4">
              <button
                onClick={handleSignin}
                className="text-sm font-lighter border-[1.5px] border-[rgba(37,73,43,0.5)] rounded-md py-2 px-8 transition-all duration-200 ease-in-out hover:border-[rgba(37,73,43,1)] hover:-translate-y-[1.5px]"
              >
                Sign in
              </button>
              <button
                onClick={handleSignup}
                className="text-sm font-lighter py-2 px-8 text-[rgb(6,83,201)] border-[1.5px] border-[rgba(6,83,201,0.5)] rounded-md transition-all duration-200 ease-in-out hover:border-[rgba(35,25,171,1)] hover:-translate-y-[1.5px]"
              >
                Sign up
              </button>
            </div>
          </div>
          <img
            src="https://i.ibb.co/W4bFrp52/familyvisits-removebg-preview.png"
            alt="InterHealthConnect"
            className="h-full w-[60%] object-contain text-2xl font-semibold tracking-wide"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 m-4 justify-center w-full h-fit">
          {services.map((item) => (
            <p
              key={item.id}
              className="gap-2 cursor-pointer text-xs w-68 bg-[rgba(160,160,160,0.2)] text-[#2b2c2c] h-50 p-4 m-2 rounded-lg flex flex-col items-start justify-center"
            >
              <span className="my-2 relative before:absolute before:h-[1.5px] before:w-full before:bg-[rgba(0,0,0,0.2)] before:bottom-[-1em] before:left-0  flex flex-col items-start justify-center">
                <i
                  className={`mr-2 text-[3em] text-[rgba(6,83,201,1)] ${item.icon}`}
                />
                <span className="font-semibold uppercase w-full">
                  {item.title}
                </span>
              </span>
              <span className="h-8 w-full transition-all duration-300 ease-in-out ">
                {item.attributes[attr_index]}
              </span>
              <span className="w-full">{item.description}</span>
            </p>
          ))}
        </div>
        <div className="w-full relative rounded-[2em] flex items-center justify-center my-20 px-4 gap-4 py-20 text-white z-3 bg-[rgba(0,107,255,1)]">
          <img
            src="https://i.ibb.co/Wps552Cd/back.png"
            alt="World of Specialists"
            className="absolute w-full h-full z-0 object-cover top-0 left-0 rounded-[2em]"
          />
          <div className="flex z-1 flex-col w-[50%] items-center justify-center ">
            <div className="w-full flex flex-col items-start justify-center">
              <h4 className="text-[2em] font-regular">
                World-Class Healthcare
                <br />
                Services for You and Your
                <br />
                Loved Ones
              </h4>
            </div>
            <img
              src="https://i.ibb.co/S7VWM2Kh/back1.png"
              alt="Accessing Global Care with Ease"
              className="h-100 object-contain"
            />
          </div>
          <div className="w-[50%] h-fit text-[rgba(0,0,0,1)] z-4 flex flex-wrap items-center justify-center gap-4">
            {connection_tools.map((tool) => Handle_tool(tool))}
          </div>
        </div>
        <div className="mt-10 px-6 pt-6 flex text-xs text-white bg-[rgba(0,107,255,1)] flex-col items-center justify-start w-full">
          <div className="flex items-center flex-wrap gap-10 justify-center w-full">
            <div className="w-56 bg-[#0467f1] h-fit shadow-[0_0_4px_rgba(255,255,255,0.3)] rounded-lg p-8 flex flex-col items-start justify-center gap-1">
              <div className="flex items-center justfy-start gap-4">
                <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                  Login
                </p>
                <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                  Sign up
                </p>
              </div>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Telehealth Consultations
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                EHR & RPM Access
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Provider Directory
              </p>
            </div>
            <div className="w-56 bg-[#0467f1] h-fit shadow-[0_0_4px_rgba(255,255,255,0.3)] rounded-lg p-8 flex flex-col items-start justify-center gap-1">
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Help Center
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                FAQs
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Health Library
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Community Forum
              </p>
            </div>
            <div className="w-56 bg-[#0467f1] h-fit shadow-[0_0_4px_rgba(255,255,255,0.3)] rounded-lg p-8 flex flex-col items-start justify-center gap-1">
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Privacy Policy
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Terms of Service
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                About Us
              </p>
              <p className="hover:font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-[2px]">
                Make Donation
              </p>
            </div>
          </div>
          <p className="font-mono text-xs font-lighter m-4">
            © [2025] InterHealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
