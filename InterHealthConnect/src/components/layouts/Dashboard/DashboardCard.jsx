import React from "react";
import Icon from "../../common/Icon";

function DashboardCard({ card }) {
  return (
    <div
      className={`${
        card.id === 1
          ? "bg-blue"
          : card.id === 2
          ? "bg-green"
          : card.id === 3
          ? "bg-appleGreen"
          : card.id === 4
          ? "bg-purple"
          : ""
      } text-white shadow-lg overflow-hidden max-w-50 w-full p-4 rounded-standard relative flex flex-row items-center justify-start gap-2`}
    >
      <span className="absolute -bottom-2 -right-1 w-14 h-14 text-bg-light-white flex items-center justify-center text-6xl">
        <Icon
          icon={card.icon}
          class_ame="h-full flex flex-row items-center justify-center w-full text-bg-light-white"
        />
      </span>
      <Icon
        icon={card.icon}
        class_name={`bg-white w-10 flex items-center justify-center h-12 w-12 p-2 text-3xl rounded-full ${
          card.id === 1
            ? "text-blue"
            : card.id === 2
            ? "text-green"
            : card.id === 3
            ? "text-appleGreen"
            : card.id === 4
            ? "text-purple"
            : ""
        }`}
      />
      <div className="w-fit flex flex-col items-start justify-center gap-1 my-1">
        <p>{card.label}</p>
        <p className="font-bold text-xl">{card.value}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
