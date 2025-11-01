import { AuthContext } from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { Mail, HandHeart } from "lucide-react";
function ToolCard({ tool }) {
  const [hover, setHover] = useState(false);

  const cardClasses = `
    transition-all cursor-pointer duration-300 ease-in-out flex flex-col items-start p-4 justify-center w-full max-w-[250px] h-fit rounded-xl relative 
    bg-[rgba(255,255,255,0.8)] backdrop-blur-sm shadow-md text-gray-800
    overflow-hidden
    after:absolute after:inset-0 after:z-[-1] after:rounded-xl 
    after:bg-[rgba(0,107,255,1)] 
    after:scale-x-[0] after:origin-left
    hover:after:scale-x-[1] hover:after:transition-transform hover:after:duration-300 hover:after:ease-in-out
    hover:text-white gap-2
    ${tool.id % 2 === 0 ? "xl:translate-y-20" : "xl:-translate-y-20"}
  `;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={tool.id}
      className={cardClasses}
    >
      <p className="text-md font-semibold m-0 transition-colors duration-300">
        {tool.title}
      </p>
      <i
        id="icon"
        className={`text-[3em] w-10 h-10 flex items-center justify-center font-semibold transition-colors duration-300 ${
          tool.icon
        } ${hover ? "text-white" : "text-[rgba(0,107,255,1)]"}`}
      />
      <p className="text-sm font-light tracking-wide transition-colors duration-300">
        {tool.description}
      </p>
    </div>
  );
}

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

function Home() {
  const { setView } = useContext(AuthContext);

  const [attr_index, setAttr_index] = useState(0);

  const servicesLength = services[0].attributes.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setAttr_index((prevIndex) => (prevIndex + 1) % servicesLength);
    }, 5000);

    return () => clearInterval(interval);
  }, [servicesLength]);

  const handleSignin = () => setView("signin");
  const handleSignup = () => setView("signup");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[rgba(0,107,255,0.2)] via-[rgba(0,107,255,0.08)] to-[rgba(0,107,255,0.1)] flex items-center justify-center bg-[rgb(255,255,255)]">
      <div className="w-full max-w-7xl h-fit relative pt-2 flex flex-col items-center justify-start px-4 md:px-8">
        {/* Nav Bar */}
        <div className="z-50 text-[rgba(255,255,255,0.8)] flex flex-wrap items-center justify-center gap-4 py-1 px-4 bg-[rgba(6,83,201,1)] rounded-full shadow-2xl w-full">
          <div className="flex flex-row justify-center items-center gap-6 text-md font-lighter">
            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] p-1 m-1 rounded-lg"
            >
              <i className="ri-globe-line mr-1" />
              <span>Language</span>
              <i className="ri-expand-up-down-fill ml-0.5 hover:scale-[1.1]" />
            </a>

            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] p-1 m-1 rounded-lg"
            >
              <span>Customer Support</span>
              <i className="ri-customer-service-2-line ml-0.5" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center transition-all duration-200 ease-in-out hover:text-[rgba(255,255,255,1)] hover:bg-[rgba(255,255,255,0.1)] p-1 m-1 rounded-lg"
            >
              About
              <i className="ri-information-line ml-0.5" />
            </a>
          </div>
          <button
            onClick={handleSignup}
            className="ml-auto text-lg text-[rgba(6,83,201,1)] hover:bg-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,1)] py-1 px-4 m-1 rounded-lg transition-all duration-200 ease-in-out"
          >
            Create Account
          </button>
        </div>

        {/* Header/Branding Section */}
        <div className="w-full h-fit flex flex-col items-start p-4 m-2 justify-center text-white bg-[rgba(6,83,201,1)] rounded-tl-[3em] rounded-bl-[1em] rounded-tr-[1em] rounded-br-[3em]">
          <div className="flex flex-col items-start justify-center gap-0 my-6 mx-1">
            <h4 className="font-extrabold tracking-wide text-4xl m-0">
              InterHealthConnect
            </h4>
            <p className="text-lg font-regular tracking-wide">
              Your Health, Our Priority
            </p>
          </div>
        </div>

        {/* Main section (Text and Image) */}
        <div className="flex flex-col md:flex-row items-center justify-start py-12 w-full">
          <div className="flex flex-col h-fit w-full md:w-[40%] items-start justify-center px-5 gap-2 py-5 z-1 rounded-lg">
            <p className="text-lg tracking-normal text-left m-0">
              Global care. Local ease.
            </p>
            <h1 className="text-3xl text-left font-extrabold text-[rgb(6,83,201)]">
              We are here for your Care
            </h1>
            <p className="text-md tracking-normal text-left text-gray-600">
              Finding the one specialist with experience in a rare condition can
              be a challenge. Our intelligent matching algorithm connects you to
              the precise international expertise you need in minutes,
              drastically reducing diagnostic delays.
            </p>

            <button className="mt-4 text-white text-md py-2 px-6 rounded-lg shadow-lg tracking-wide transition-all duration-200 ease-in-out bg-[rgb(6,83,201,0.9)] hover:bg-[rgb(6,83,201,1)]">
              Learn More
            </button>

            <div className="flex justify-start items-start gap-8 mt-6">
              <button
                onClick={handleSignin}
                className="text-md font-medium border-2 border-[rgba(6,83,201,0.5)] text-gray-700 rounded-lg py-2 px-8 transition-all duration-200 ease-in-out hover:border-[rgba(6,83,201,1)] hover:shadow-md"
              >
                Sign in
              </button>
              <button
                onClick={handleSignup}
                className="text-md font-medium py-2 px-8 text-white bg-[rgb(6,83,201)] border-2 border-[rgb(6,83,201)] rounded-lg transition-all duration-200 ease-in-out hover:bg-white hover:text-[rgb(6,83,201)] hover:shadow-md"
              >
                Sign up
              </button>
            </div>
          </div>

          <img
            src="https://i.ibb.co/W4bFrp52/familyvisits-removebg-preview.png"
            alt="InterHealthConnect"
            className="h-full w-full md:w-[60%] object-contain"
          />
        </div>

        {/* Services Grid */}
        <div className="flex flex-wrap items-stretch gap-4 m-4 justify-center w-full">
          {services.map((item) => (
            <div
              key={item.id}
              className="gap-2 cursor-pointer text-sm w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] xl:w-[20em] bg-[rgba(160,160,160,0.2)] text-[#2b2c2c] p-4 rounded-xl flex flex-col items-start justify-start shadow-inner hover:shadow-lg transition-shadow duration-300"
            >
              <span className="mb-2 relative pb-4 before:absolute before:h-[1.5px] before:w-full before:bg-[rgba(0,0,0,0.2)] before:bottom-0 before:left-0 flex flex-col items-start justify-center">
                <i
                  className={`mr-2 text-[3em] text-[rgba(6,83,201,1)] ${item.icon}`}
                />
                <span className="font-semibold uppercase text-base mt-1">
                  {item.title}
                </span>
              </span>
              <span className="h-10 w-full text-sm font-medium text-[rgb(6,83,201)] transition-all duration-300 ease-in-out">
                {item.attributes[attr_index]}
              </span>
              <span className="text-sm tracking-wide text-gray-700 mt-1">
                {item.description}
              </span>
            </div>
          ))}
        </div>

        {/* Connected Services/Tools Section */}
        <div className="w-full relative rounded-[2em] flex flex-col lg:flex-row items-center justify-center my-20 px-4 gap-4 py-20 text-white z-3 bg-[rgba(0,107,255,1)] overflow-hidden">
          <img
            src="https://i.ibb.co/Wps552Cd/back.png"
            alt="World of Specialists"
            className="absolute w-full h-full z-0 object-cover top-0 left-0 rounded-[2em] opacity-30"
          />

          <div className="flex z-1 flex-col w-full lg:w-[50%] items-center justify-center p-4">
            <div className="w-full flex flex-col items-start justify-center">
              <h4 className="text-[2em] font-light leading-tight">
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
              className="xl:h-full h-100 mt-8 object-contain"
            />
          </div>

          <div className="w-full lg:w-[60%] h-fit text-gray-800 z-4 flex flex-wrap items-center justify-center gap-8 p-4">
            {connection_tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 px-6 pt-6 flex text-md text-white bg-[rgba(0,107,255,1)] flex-col items-center justify-start w-full">
          <p className="font-mono text-sm font-lighter m-4 pb-4 border-b border-[rgba(255,255,255,0.2)] w-full text-center">
            © [2025] InterHealthConnect. All rights reserved.
          </p>
          <div className="flex items-start flex-wrap gap-10 justify-center w-full pb-10">
            <div className="w-fit h-fit rounded-lg p-8 flex flex-col items-start justify-center gap-2">
              <h2 className="text-xl font-bold tracking-wide">Policies</h2>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full text-md rounded-sm px-2">
                Ethics
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Information disclosure
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Permission & Licensing
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Terms of Use
              </a>
            </div>
            <div className="w-fit h-fit rounded-lg p-8 flex flex-col items-start justify-center gap-2">
              <h2 className="text-xl font-bold tracking-wide">About Us</h2>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full text-md rounded-sm px-2">
                Health Library
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Frequently Asked Questions
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Community Forum
              </a>
              <a className="hover:bg-[#084aa7] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-sm px-2">
                Make a Donation
              </a>
            </div>
            <div className="w-fit h-fit rounded-lg p-8 flex flex-col items-start justify-center gap-2">
              <h2 className="text-xl font-bold tracking-wide">Contact Us</h2>
              <div className="flex flex-wrap w-full items-center gap-8">
                <div
                  className={`transition-all duration-200 ease-in-out hover:scale-[1.1] hover:bg-gray-200 cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center relative before:text-xs before:font-lighter before:bg-gray-200 before:px-1 before:py-0 before:tracking-wide hover:before:content-["email"] before:absolute hover:before:text-[#0467f1] before:bottom-[80%] before:left-[88%] hover:before:tansition-all before:rounded-tr-xl before:rounded-tl-xl before:rounded-br-xl hover:before:ease-in hover:before:duration-200`}
                >
                  <a className="transition-all duration-300 ease-in-out">
                    <Mail className="w-8 h-8 text-[#0467f1]" />
                  </a>
                </div>
                <div
                  className={`transition-all duration-200 ease-in-out hover:scale-[1.1] hover:bg-gray-200 cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center relative before:text-xs before:font-lighter before:bg-gray-200 before:px-1 before:py-0 before:tracking-wide hover:before:content-["whatsApp"] before:absolute hover:before:text-[#0467f1] before:bottom-[80%] before:left-[88%] hover:before:tansition-all before:rounded-tr-xl before:rounded-tl-xl before:rounded-br-xl hover:before:ease-in hover:before:duration-200`}
                >
                  <a className="transition-all duration-300 ease-in-out">
                    <i className="text-3xl text-[#0467f1] ri-whatsapp-line" />
                  </a>
                </div>
                <a className="bg-[#0a5acb] hover:bg-[#084aa7] hover:text-gray-200 text-lg font-semibold text-center py-4 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer w-full rounded-2xl px-2 flex flex-wrap items-center justify-center">
                  <HandHeart className="h-10 w-10 mr-2" />
                  <span>Make a Donation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
