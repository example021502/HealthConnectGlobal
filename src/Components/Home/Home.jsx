import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/Context";
import Testimonials from "./Testimonials.json";
import Services from "./Services.json";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";

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
    icon: "brain",
  },
  {
    title: "Continuous Digital Access",
    description:
      "Enjoy 24/7 virtual consultations, rapid prescription refills, and instant messaging with your dedicated care team. Health management is streamlined, intuitive, and always at your fingertips, reducing wait times and friction.",
    icon: "Smartphone",
  },
];

function Home() {
  const [rotatingText] = useState(["Ease", "Finesse", "Flair", "Expertise"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lastScroll, setLastScroll] = useState(0);
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [services, setServices] = useState(Services);
  const [testimonials, setTestimonials] = useState(Testimonials);
  const [rollUp, setRollup] = useState(false);

  // handle emailing events
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  // handle on Submitting
  const onSubmit = (data) => alert(JSON.stringify(data));

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

  const handleLogin = () => {
    setView("signin");
  };
  const handleSignup = () => {
    setView("signup");
  };

  const { setView } = useContext(AuthContext);

  return (
    <div className="w-full flex flex-col relative">
      <section className="flex flex-col items-center relative justify-center">
        <img
          src="https://i.ibb.co/jZH2C7Vk/grouped-Doctors.jpg"
          alt=""
          className="fixed object-cover left-0 top-0 w-full h-full opacity-10 z-1 "
        />
        <div className="flex relative overflow-x-hidden flex-col w-full h-fit pb-20 md:pb-0">
          <div className="absolute inset-0 top-0 left-0 bg-gray-200 z-3" />
          <div className="absolute inset-0 z-4 w-full items-center px-5 py-4 [background:radial-gradient(125%_125%_at_50%_10%,rgba(84,144,86,0.3)_30%,rgba(46,132,100,0.5)_100%)]"></div>
          {/* top section */}
          <div className="z-10 w-full">
            <div className="flex w-full flex-row md:pl-8 p-4 pt-4 gap-1 items-center justify-start">
              <img
                src="https://i.ibb.co/jZsMsxgS/Untitled-1.png"
                alt=""
                className={`w-18 h-18 md:w-20 md:h-20 object-contain`}
              />
              <div className="text-gray-500 flex flex-col items-start justify-center after:h-[140%] ml-1 pl-2 after:absolute relative after:w-[2px] after:left-0 after:my-auto after:bg-gray-400">
                <p className="-my-0.5 text-xs text-left">InterHealthConnect</p>
                <p className="-m-0.5 text-xs text-left">Personal & Caring</p>
              </div>
            </div>
            <section className="w-full h-full gap-4 md:gap-0 px-4 md:pb-8 md:pl-8 md:-mt-8 md:pr-8 md:pt-0 pt-4 grid grid-cols-1 relative md:flex items-center justify-center">
              {/* logo */}
              <div className="gap-4 w-fit h-full rounded-xl flex flex-col items-center justify-center ">
                <div className="flex flex-col gap-4">
                  <h2
                    style={{
                      fontFamily: "poppins",
                      fontWeight: "600",
                      fontStyle: "normal",
                    }}
                    className="text-gray-800 text-3xl leading-7"
                  >
                    LIFE <span className="text-[#549056]">OPTIMIZED !</span>
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700">
                    SMARTER Health, FASTER Results
                  </h3>
                  <p className="text-md w-full font-Arial text-gray-600">
                    Stop using generic plans. Start seeing results with insights
                    built around your unique biometrics and lifestyle.
                  </p>
                </div>
              </div>
              {/* image */}
              <div className="md:pt-0 after:absolute after:bottom-0 after:top-0 after:w-[90%] md:after:w-[80%] after:h-[100%] after:rounded-full after:z-1 z-10 after:border after:border-[#549056] relative w-full h-full rounded-xl flex flex-col items-center justify-center ">
                <div className="absolute inset-0 z-1 w-full items-center px-5 py-4 [background:radial-gradient(25%_25%_at_50%_50%,rgba(255,255,255,0.8)_30%,rgba(0,137,255,0)_200%)]"></div>
                <img
                  src="https://i.ibb.co/BVLk1x7X/toBe.png"
                  alt="Welcome to InterHealthConnect"
                  className="h-[90%] w-[90%] md:h-[80%] md:w-[80%] z-10 object-contain"
                />
              </div>
              {/* form */}
              <div className="md:mt-0 mt-4 md:w-250 w-full transition-all duration-100 ease-in-out h-fit rounded-xl">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 p-6 rounded-xl w-full h-full bg-gray-50 text-gray-600"
                >
                  <h2 className="flex flex-col">
                    <span className="font-semibold text-gray-700">
                      Are you a Doctor Or Health Specialist?
                    </span>
                    <span className="font-lighter text-xs text-gray-600">
                      Join the largest network of specialists patients
                    </span>
                  </h2>
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                  <div className="w-full border-1 border-gray-400 rounded-lg flex flex-row items-center relative text-lg font-lighter text-gray-600">
                    <Mail className="absolute w-4 h-4 right-2" />
                    <input
                      type="email"
                      placeholder="email address"
                      required
                      className={`px-2 w-full py-1.5 text-sm focus:outline-none rounded-lg focus:ring-[#549056] focus:ring-2 ${
                        errors.email &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
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
                  </div>
                  <div className="w-full border-1 border-gray-400 rounded-lg flex flex-row items-center relative text-lg font-lighter text-gray-600">
                    <textarea
                      type="text"
                      placeholder="Greetings, I want to join InterHealthConnect. My name and phone number are: ..."
                      required
                      className="px-2 w-full min-h-40 max-h-45 py-1 text-[0.7em] focus:outline-none rounded-lg focus:ring-[#549056] focus:ring-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex gap-2 flex-row items-center justify-center py-2 text-md font-semibold text-gray-100 bg-[#549056] rounded-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>

        {/* middle section */}
        <section className="pb-18 z-4 w-full h-fit">
          <section className="mx-auto z-3 bg-white p-4 md:p-8 md:pt-20 w-full text-gray-700 gap-1 flex flex-col items-center">
            <h1 className="md:text-3xl text-xl w-full text-center font-bold tracking-wide mb-10 text-gray-800">
              Why Choose InterHeathConnect?
            </h1>
            <div className="w-full flex flex-col md:grid md:grid-cols-3 gap-8">
              {InterHealthConnectData.map((feature_data, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-xl hover:shadow-lg transition duration-300 ease-in-out border-t-4 border-[#549056]"
                  >
                    <i
                      className={`ri-${feature_data.icon.toLowerCase()}-line text-4xl text-[#549056] mb-3`}
                    />
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {feature_data.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {feature_data.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          {/* about us section */}
          <section className="grid md:grid-cols-2 gap-6 grid-cols-1 h-fit w-full p-4 md:p-8">
            <div className="h-full">
              <img
                src="https://i.ibb.co/nM5tkWVp/a-call-away.jpg"
                alt=""
                className="object-cover w-full md:h-full h-60 rounded-lg"
              />
            </div>
            <div className="gap-4 flex flex-col p-6 bg-gray-50 rounded-lg">
              <h1 className="text-[#549056] uppercase">InterHealthConnect</h1>
              <h3 className="text-lg text-gray-700">
                What is InterHealthConnect?
              </h3>
              <p>
                To move healthcare beyond reactive treatment by leveraging
                technology to predict illness and unify global medical expertise
                for every patient.
              </p>
              <p className="flex flex-col gap-4">
                <span className="font-semibold">Key Differentiators:</span>
                <span className="">
                  🌐 Global Health Connectivity: Access your health records and
                  consult with accredited specialists and hospitals worldwide.
                  Our system ensures your complete medical history is instantly
                  and securely available to providers, eliminating geographical
                  barriers to quality care.
                </span>
                <span className="">
                  🧠 Predictive Wellness Engine (PWE): Our proprietary AI
                  analyzes your data (biometrics, history, lifestyle) to predict
                  potential health risks before symptoms appear. We provide
                  personalized, proactive intervention recommendations to keep
                  you healthy.
                </span>
                <span className="">
                  📱 Seamless Digital Access: Enjoy 24/7 virtual consultations,
                  instant messaging with your care team, and rapid
                  e-prescriptions. We offer streamlined, intuitive health
                  management always available on your device.
                </span>
              </p>
            </div>
          </section>

          <section className="w-full z-10 md:p-10 px-4 py-8 flex flex-col items-center justify-center mt-10">
            <h3 className="md:w-[60%] w-full md:mb-2 mb-4 text-lg font-medium text-[#274364]">
              Key Features
            </h3>
            <div className="flex w-full items-center justify-center flex-wrap">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 md:w-fit w-full flex md:flex-col md:items-center items-start md:justify-center justify-start transition-all ease-in-out duration-100 hover:bg-[rgba(255,255,255,0.2)] ${
                    service.id % 2 === 0
                      ? "md:border-r-1 md:border-gray-300 md:border-l-1"
                      : ""
                  }${
                    service.id === 1 ? "md:rounded-bl-lg md:rounded-tl-lg" : ""
                  } ${
                    service.id === 3 ? "md:rounded-br-lg md:rounded-tr-lg" : ""
                  }`}
                >
                  <i className={`${service.icon} text-4xl text-[#549056]`} />
                  <div
                    className={`text-sm flex md:flex-col flex-col px-4 items-center justify-center text-gray-600`}
                  >
                    <p>{service.title}</p>
                    <p>{service.description1}</p>
                    <p>{service.description2}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* testimonials */}
          <section className="w-full z-10 md:p-10 pb-20 md:b-0 px-4 py-8 flex flex-col items-center justify-center">
            <h3 className="md:w-[60%] w-full text-lg font-medium text-[#274364]">
              Testimonials
            </h3>
            <div className="flex w-full items-center justify-center flex-wrap">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`p-4 md:w-fit w-full flex flex-row text-xs items-center justify-start transition-all ease-in-out duration-100 rounded-lg hover:bg-[rgba(39,67,100,0.1)] `}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={`border-1 text-[#549056] w-10 h-10 rounded-full object-cover`}
                  />
                  <div
                    className={`flex flex-col px-4 items-start justify-center text-gray-600`}
                  >
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="md:flex hidden">
                      {testimonial.description.slice(0, 20) + "..."}
                    </p>
                    <p className="flex md:hidden">{testimonial.description}</p>
                    <p className="md:flex hidden">
                      {testimonial.comment.slice(0, 20) + "..."}
                    </p>
                    <p className="flex md:hidden">
                      {testimonial.comment.slice(0, 80) + "..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
        {/* footer */}
        <section className="md:flex hidden md:text-sm text-xs tracking-wide flex-row text-gray-100 items-center justify-center p-4 gap-0 md:gap-6">
          <div className="flex flex-row gap-2 md:gap-4">
            <a
              href="#"
              className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
            >
              About
            </a>
            <a
              href="#"
              className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
            >
              Support
            </a>
            <a
              href="#"
              className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="after:w-0 relative after:h-[1px] pb-[1px] px-[1px] after:absolute after:bottom-0 after:left-0 hover:after:w-full transition-all duration-100 ease-in after:bg-gray-200"
            >
              Terms
            </a>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <i className="ri-facebook-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
            <i className="ri-twitter-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
            <i className="ri-linkedin-fill text-xl flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in" />
            <div className="flex flex-row gap-1 rounded-full items-center justify-center bg-gray-50 py-1 px-2 cursor-pointer hover:bg-gray-50 hover:text-[#274364] transition-all duration-100 ease-in">
              <i className="ri-global-line text-[#274364] cursor-pointer hover:scale-[1.1] transition-all ease-in duration-100" />
              <p className="text-[#274364] text-xs">language</p>
              <i className="ri-translate-2 text-[#274364] cursor-pointer hover:scale-[1.1] transition-all duration-100 ease-in" />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
