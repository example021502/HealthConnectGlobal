import React, { useState, useEffect, useContext } from "react";
import {
  Mail,
  Send,
  Globe,
  Brain,
  Smartphone,
  ShieldCheck,
  Briefcase,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Context/Context";

const Testimonials = [
  {
    id: 1,
    name: "Dr. A. Chen, MD",
    description: "Cardiologist",
    comment:
      "InterHealthConnect streamlined my international patient pipeline by 40%.",
    image: "https://i.ibb.co/KxPQ4f9L/Secure-Appointment.jpg",
  },
  {
    id: 2,
    name: "S. Khan",
    description: "Patient, UAE",
    comment:
      "I received specialist advice from New York without leaving home. Truly global care.",
    image:
      "https://i.ibb.co/jPNQ3D8g/Quality-Care-Transparent-Process-Global-Reach.jpg",
  },
  {
    id: 3,
    name: "J. Miller, RN",
    description: "Nurse Practitioner",
    comment:
      "The Predictive Wellness Engine is a game-changer for preventative care planning.",
    image: "https://i.ibb.co/Ng13YLXc/brain-Stimulation.jpg",
  },
];

const Services = [
  {
    id: 1,
    title: "Global Healthcare Passport",
    icon: "ShieldCheck",
    description1: "Accelerated Booking for Global Patients",
    description2: "Unified & Compliant Patient Health Records (PHR)",
  },
  {
    id: 2,
    title: "Boost Practice Growth & Efficiency",
    icon: "Briefcase",
    description1: "Centralized Patient Management Dashboard",
    description2: "Expand Network via Global Peer Collaboration",
  },
  {
    id: 3,
    title: "Seamless Cross-Border Referrals",
    icon: "Users",
    description1: "Instant, Context-Rich Data Transfer",
    description2: "Strategically Grow Your Global Clinical Footprint",
  },
];

const InterHealthConnectData = [
  {
    title: "Global, Unified Care",
    description:
      "Access your health records, specialists, and data seamlessly across borders. InterHealthConnect breaks down geographic barriers, ensuring your complete wellness profile is instantly available to authorized care providers, wherever you are.",
    icon: "Globe",
  },
  {
    title: "Predictive Wellness Engine",
    description:
      "We don't just react to illness; we predict it. Our AI analyzes your historical data, lifestyle inputs, and genetic markers to deliver personalized risk assessments and proactive intervention recommendations *before* symptoms even appear.",
    icon: "Brain",
  },
  {
    title: "Continuous Digital Access",
    description:
      "Enjoy 24/7 virtual consultations, rapid prescription refills, and instant messaging with your dedicated care team. Health management is streamlined, intuitive, and always at your fingertips, reducing wait times and friction.",
    icon: "Smartphone",
  },
];

const IconMap = {
  Globe: Globe,
  Brain: Brain,
  Smartphone: Smartphone,
  ShieldCheck: ShieldCheck,
  Briefcase: Briefcase,
  Users: Users,
};

const DynamicIcon = ({ name, className }) => {
  const IconComponent = IconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

const Home = () => {
  const [rotatingText] = useState(["Ease", "Finesse", "Flair", "Expertise"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lastScroll, setLastScroll] = useState(0);
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [rollUp, setRollup] = useState(false);

  const { view, setView } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Provider Interest Submitted:", data);
    alert("Thank you for your interest! We will contact you shortly.");
  };

  useEffect(() => {
    const totalCycleTime = 5000;
    const animationDuration = 300;

    const interval = setInterval(() => {
      setRollup(true);

      const resetTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingText.length);
        setRollup(false);
      }, animationDuration);

      return () => clearTimeout(resetTimer);
    }, totalCycleTime);

    return () => clearInterval(interval);
  }, [rotatingText.length]);

  useEffect(() => {
    const handleScrolling = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        setIsScrollUp(true);
      } else if (currentScroll > lastScroll && currentScroll > 50) {
        setIsScrollUp(false);
      }

      if (currentScroll > 50 || currentScroll === 0) {
        setLastScroll(currentScroll);
      } else if (currentScroll <= 50) {
        setIsScrollUp(true);
      }
    };
    window.addEventListener("scroll", handleScrolling);
    return () => window.removeEventListener("scroll", handleScrolling);
  }, [lastScroll]);

  const primaryColor = "text-[#104d5e]";
  const accentColor = "text-[#549056]";
  const bgColor = "bg-gray-50";

  const FeatureCard = ({
    iconName,
    title,
    description,
    borderClass = "border-t-[#549056]",
  }) => (
    <div
      className={`bg-white p-6 rounded-2xl shadow-lg transition duration-300 hover:shadow-2xl border-t-4 ${borderClass} flex flex-col items-start h-full`}
    >
      <DynamicIcon
        name={iconName}
        className={`w-10 h-10 ${accentColor} mb-4`}
      />
      <h2 className={`text-xl font-bold mb-2 ${primaryColor}`}>{title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

  const handleSignin = () => {
    setView("signin");
  };

  const handleSignup = () => {
    setView("signup");
  };

  return (
    <div className={`w-full flex flex-col relative ${bgColor} font-inter`}>
      <section className="relative overflow-hidden w-full h-fit pb-12 md:pb-20">
        <img
          src="https://i.ibb.co/jZH2C7Vk/grouped-Doctors.jpg"
          alt="Doctors collaborating"
          className="fixed object-cover left-0 top-0 w-full h-full opacity-10 z-1"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/f3f4f6/000000?text=Healthcare+Image+Placeholder";
          }}
        />
        <div className="absolute inset-0 z-2 bg-white/70 backdrop-blur-sm" />
        <div
          className={`absolute inset-0 z-3 w-full [background:radial-gradient(125%_125%_at_50%_10%,rgba(84,144,86,0.2)_30%,rgba(46,132,100,0)_100%)]`}
        ></div>

        <div className="z-10 w-full relative">
          <div className="flex w-full flex-row md:pl-8 p-4 pt-4 gap-2 items-center justify-start">
            <img
              src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
              alt="InterHealthConnect Logo"
              className={`w-14 h-14 object-contain`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/56x56/549056/ffffff?text=IHC";
              }}
            />
            <div className="text-gray-500 flex flex-col items-start justify-center ml-1 pl-3 relative after:h-full after:absolute after:w-[1px] after:left-0 after:bg-gray-400">
              <p className="text-xs text-left font-medium">
                InterHealthConnect
              </p>
              <p className="text-xs text-left font-light">Personal & Caring</p>
            </div>
          </div>

          <section className="w-full gap-4 px-4 md:p-8 grid grid-cols-1 lg:flex flex-row relative items-start justify-center">
            <div className="gap-6 w-full lg:col-span-1 rounded-xl flex flex-col items-start md:mt-0">
              <h1
                className={`poppins-semibold ${primaryColor} text-4xl leading-tight font-extrabold`}
              >
                Inter<span className={accentColor}>Health</span>Connect
              </h1>
              <h2 className={`text-2xl font-semibold ${primaryColor} mt-2`}>
                SMARTER Health, FASTER Results
              </h2>
              <p className="text-lg w-full text-gray-700 leading-relaxed">
                Stop using generic plans. Start seeing results with insights
                built around your unique biometrics and lifestyle, delivered
                with global{" "}
                <span
                  className={`inline-block ${
                    rollUp
                      ? "text-green-500 transition-all duration-300"
                      : "transition-all duration-300"
                  }`}
                >
                  {rotatingText[currentIndex]}
                </span>
                .
              </p>
              <div className="flex gap-4 mt-0 md:mt-4">
                <button
                  onClick={handleSignup}
                  className="px-6 py-3 text-white font-semibold bg-[#549056] rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Start My Health Journey
                </button>
                <button
                  onClick={handleSignin}
                  className="px-6 py-3 font-semibold text-[#549056] border border-[#549056] rounded-lg hover:bg-green-50 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>

            <div className="relative w-full h-full flex items-center justify-center lg:col-span-1 min-h-[300px] my-2 md:my-0">
              <div className="absolute inset-0 w-full h-full" />
              <img
                src="https://i.ibb.co/BVLk1x7X/toBe.png"
                alt="Welcome to InterHealthConnect Visualization"
                className="w-full h-auto z-10 object-contain rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/f0f4f8/000000?text=Data+Visualization+Placeholder";
                }}
              />
            </div>

            <div className="w-full lg:col-span-1 h-fit transition-all duration-100 ease-in-out">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 p-6 rounded-2xl w-full h-full bg-white shadow-2xl border border-gray-100"
              >
                <h2 className="flex flex-col border-b pb-3 border-gray-100">
                  <span className={`font-bold ${primaryColor} text-xl`}>
                    Join Our Global Provider Network
                  </span>
                  <span className="font-light text-sm text-gray-500 mt-1">
                    Expand your practice: connect with patients and peers
                    worldwide.
                  </span>
                </h2>

                <div className="w-full relative">
                  <Mail className="absolute w-4 h-4 right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Professional Email Address"
                    required
                    className={`px-4 w-full py-2 text-sm focus:outline-none rounded-lg border focus:ring-2 ${
                      errors.email
                        ? "border-red-500 ring-red-500/50"
                        : "border-gray-300 focus:border-[#549056] focus:ring-[#549056]/50"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("email");
                    }}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <textarea
                    placeholder="Briefly introduce yourself and your specialty: Name, Phone, Specialty, and Licensing Country."
                    required
                    className="px-4 w-full min-h-24 py-2 text-sm focus:outline-none rounded-lg border border-gray-300 focus:ring-2 focus:border-[#549056] focus:ring-[#549056]/50 resize-y"
                    {...register("message", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex gap-2 flex-row items-center justify-center py-2.5 text-md font-semibold text-white bg-[#549056] rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Request to Join</span>
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>

      <section
        className={`mx-auto z-4 bg-white p-4 md:p-12 w-full text-gray-700 flex flex-col items-center`}
      >
        <h1
          className={`md:text-3xl text-2xl w-full text-center font-bold tracking-tight mb-4 ${primaryColor}`}
        >
          Why Choose InterHealthConnect?
        </h1>
        <p className="text-center text-lg text-gray-500 mb-10 max-w-3xl">
          We combine cutting-edge AI with a globally connected network to
          deliver healthcare that is predictive, personalized, and
          boundary-free.
        </p>

        <div className="w-full grid md:grid-cols-3 gap-8 max-w-6xl">
          {InterHealthConnectData.map((feature_data, index) => (
            <FeatureCard
              key={index}
              iconName={feature_data.icon}
              title={feature_data.title}
              description={feature_data.description}
            />
          ))}
        </div>
      </section>

      <section
        className={`z-10 grid md:grid-cols-2 gap-8 grid-cols-1 h-fit w-full p-4 md:p-12 ${bgColor} border-t border-gray-100`}
      >
        <div className="h-full">
          <img
            src="https://i.ibb.co/nM5tkWVp/a-call-away.jpg"
            alt="Virtual consultation"
            className="object-cover shadow-2xl w-full md:h-full h-80 rounded-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x600/e0e0e0/333333?text=Telehealth+Consultation";
            }}
          />
        </div>
        <div className="gap-5 shadow-xl flex flex-col p-8 bg-white rounded-2xl border border-gray-100">
          <h1
            className={`font-extrabold ${primaryColor} uppercase text-2xl tracking-tight`}
          >
            Our Commitment to Global Wellness
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Moving healthcare beyond reactive treatment: we leverage predictive
            AI and unified global expertise for personalized wellness. We are
            committed to dissolving geographical constraints in medical access.
          </p>

          <div className="tracking-wide text-md flex flex-col gap-4 text-gray-500 mt-2">
            <span
              className={`font-bold ${primaryColor} text-lg border-b pb-2 border-gray-100`}
            >
              Core Differentiators:
            </span>
            {InterHealthConnectData.map((d, i) => (
              <span key={i} className="flex flex-row gap-3 items-start">
                <DynamicIcon
                  name={d.icon}
                  className={`w-5 h-5 ${accentColor} flex-shrink-0 mt-1`}
                />
                <span className="flex-1 text-gray-600">
                  <strong className="text-gray-900">{d.title}: </strong>
                  {d.description.split(". ")[0] + "."}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      <section
        className={`p-4 md:p-12 w-full z-10 flex flex-col justify-center bg-white border-t border-gray-100`}
      >
        <h3
          className={`w-full mb-8 md:text-3xl text-2xl font-bold text-center ${primaryColor} tracking-tight`}
        >
          Key Features for Providers
        </h3>
        <div className="flex w-full justify-center flex-wrap md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Services.map((service) => {
            const IconComp = IconMap[service.icon];
            return (
              <div
                key={service.id}
                className={`p-6 bg-white shadow-xl rounded-2xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-gray-50`}
              >
                {IconComp && (
                  <div
                    className={`p-4 rounded-full ${primaryColor} bg-green-50/70 shadow-inner mb-4`}
                  >
                    <IconComp className={`w-8 h-8 ${accentColor}`} />
                  </div>
                )}
                <h4 className={`text-xl font-bold mb-3 ${primaryColor}`}>
                  {service.title}
                </h4>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <p className="border-b border-gray-100 pb-2">
                    {service.description2}
                  </p>
                  <p className="pt-2">{service.description1}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* testimonials */}
      <section
        className={`w-full ${bgColor} z-10 gap-4 px-4 md:px-12 py-12 flex flex-col border-t border-gray-100`}
      >
        <h3
          className={`w-full text-2xl md:text-3xl font-bold ${primaryColor} text-center mb-6 tracking-tight`}
        >
          What Our Users Are Saying
        </h3>
        <div className="flex gap-6 w-full items-stretch justify-center flex-wrap max-w-6xl mx-auto">
          {Testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`p-6 flex-1 min-w-[280px] max-w-sm bg-white shadow-lg flex flex-col transition-all duration-100 ease-in-out rounded-xl border border-gray-100 hover:shadow-xl`}
            >
              <p className="text-sm italic text-gray-700 mb-4">
                "{testimonial.comment}"
              </p>
              <div className="flex flex-row items-center justify-start border-t pt-4 border-gray-100 mt-auto">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={`w-12 h-12 rounded-full object-cover mr-4 shadow-md`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/48x48/d1d5db/4b5563?text=User";
                  }}
                />
                <div
                  className={`flex flex-col items-start justify-center text-gray-800`}
                >
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <section className="w-full md:flex bg-gray-900 z-10 text-sm tracking-wide flex-row flex-wrap text-gray-100 items-center justify-between p-6 md:px-12">
        <p className="text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} InterHealthConnect. All rights reserved.
        </p>
        <div className="flex flex-row items-center gap-2 md:gap-6">
          {["About", "Support", "Privacy", "Terms"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-100"
            >
              {link}
            </a>
          ))}

          <div className="flex flex-row items-center justify-center gap-2">
            <i className="ri-facebook-fill text-lg text-gray-400 hover:text-white cursor-pointer" />
            <i className="ri-twitter-fill text-lg text-gray-400 hover:text-white cursor-pointer" />
            <i className="ri-linkedin-fill text-lg text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
