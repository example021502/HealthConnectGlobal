import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";

function AppointmentsTotalPatients() {
  return (
    <div className="flex flex-row text-md items-center rounded-standard justify-between border border-lightBorder gap-2 h-14">
      <Label
        text="Total patients all time"
        class_name="text-xs font-lighter text-text pl-2"
      />
      <div className="flex flex-row gap-1 p-2 text-blue bg-hover-light-blue h-full items-center justify-center font-semibold">
        <Icon icon="ri-group-line" class_name="" />
        <Label text="450" class_name="" />
      </div>
      <Label
        text="Total patients this month"
        class_name="text-xs font-lighter text-text"
      />
      <div className="flex items-center justify-center flex-row gap-1 p-2 pr-4 h-full text-green rounded-standard rounded-tl-none rounded-bl-none bg-green-light font-semibold">
        <Icon icon="ri-calendar-line" class_name="" />
        <Label text="62" class_name="" />
      </div>
    </div>
  );
}

export default AppointmentsTotalPatients;
