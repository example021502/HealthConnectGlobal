import React from "react";
import DashboardCard from "./DashboardCard";
import DashChart from "../../Charts/DashChart";
import DoughnutChart from "../../Charts/DoughnutChart";
import PatientsTable from "./PatientsTable";
import Image from "../../common/Image";
import Icon from "../../common/Icon";

function DashboardContent() {
  const cards_info = [
    {
      id: 1,
      label: "Appointments",
      value: 478,
      icon: "ri-calendar-fill",
    },
    {
      id: 2,
      label: "Patients",
      value: 234,
      icon: "ri-team-fill",
    },
    {
      id: 3,
      label: "Operations",
      value: 628,
      icon: "ri-heart-pulse-fill",
    },
    {
      id: 4,
      label: "Earnings",
      value: "₹ 6228",
      icon: "ri-bank-fill",
    },
  ];
  return (
    <div className="w-full pt-4 h-full p-4 gap-10 overflow-y-auto flex flex-col items-start justify-start">
      <div className="w-full h-40 relative flex flex-row items-center justify-start rounded-standard shadow-lg gap-10">
        <span className="absolute inset-0 bg-white-gradient rounded-standard" />
        <Image
          imgLink="https://i.ibb.co/JjTGn67G/on-The-Phone.jpg"
          class_name=" h-full rounded-standard"
        />
        <div className="flex-1 h-full text-text rounded-standard flex flex-col items-start justify-start p-4 gap-2 rounded-tl-none rounded-bl-none z-2">
          <span className="flex flex-col items-start justify-center">
            <h2 className="text-2xl font-bold">Doctor Johnson Thembo</h2>
            <p className="font-lighte text-sm">
              Dentist at Junior Health Center, NewYork
            </p>
          </span>
          <div className="flex flex-row gap-2">
            {[
              {
                label: "whatsApp",
                icon: "ri-whatsapp-line",
              },
              {
                label: "facebook",
                icon: "ri-facebook-line",
              },
              {
                label: "instagram",
                icon: "ri-instagram-line",
              },
              {
                label: "twitter",
                icon: "ri-twitter-line",
              },
              {
                label: "LinkedIn",
                icon: "ri-linkedin-line",
              },
            ].map((ic, index) => (
              <Icon
                icon={ic.icon}
                class_name="w-8 h-8 rounded-full flex items-center justify-center text-2xl font-lighter hover:font-bold transition-all duration-120 ease-in-out"
              />
            ))}
          </div>
          <span className="mt-auto flex flex-coll items-center justify-start gap-1 text-green text-sm tracking-wide font-poppins">
            <span>Everything looks good</span>
            <Icon icon="ri-checkbox-circle-line" class_name="text-xl" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 w-full">
        {cards_info.map((card) => {
          return <DashboardCard card={card} key={card.id} />;
        })}
      </div>
      <div className="flex w-full h-80 gap-8 flex-row items-center justify-start">
        <DashChart />
        <DoughnutChart />
      </div>
      <div className="flex w-full h-fit gap-2 text-blue-light flex-col items-start justify-center">
        <p className="font-bold text-xl">Up-Coming Appointments</p>
        <PatientsTable />
      </div>
    </div>
  );
}

export default DashboardContent;
