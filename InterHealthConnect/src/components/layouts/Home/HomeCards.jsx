import React from "react";
import HomeCard from "../../common/HomeCard";
function HomeCards() {
  const cardsinfo = [
    {
      icon: "ri-calendar-check-line",
      mainHeading: "Online Appointment",
      description:
        "Book your preferred service at a time that fits your schedule perfectly.",
    },
    {
      icon: "ri-shield-user-line",
      mainHeading: "Verified Experts",
      description:
        "Access a network of vetted professionals dedicated to high-quality care.",
    },
    {
      icon: "ri-video-chat-line",
      mainHeading: "Instant Consultation",
      description:
        "Connect instantly via secure video or chat from any device, anywhere.",
    },
    {
      icon: "ri-bar-chart-grouped-line",
      mainHeading: "Track Progress",
      description:
        "Monitor your health journey with personalized dashboards and smart reminders.",
    },
  ];

  return (
    <div className="w-full h-full gap-8 flex flex-row justify-between items-center">
      {cardsinfo.map((card, index) => {
        return (
          <div
            key={index}
            className="w-56 h-60 p-2 shadow-light rounded-lg bg-white"
          >
            <HomeCard id={index} card={card} />
          </div>
        );
      })}
    </div>
  );
}

export default HomeCards;
