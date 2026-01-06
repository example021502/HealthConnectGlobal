import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import DoughnutChartsData from "../../Charts/DoughnutCommonData.json";
import DoughnutCommon from "../../common/DoughnutCommon";

function AppointmentsWorkLoadDisplay() {
  const DoughnutData = DoughnutChartsData;
  return (
    <div className="flex flex-row items-center justify-between w-full border-b border-lightBorder pb-2">
      <div className="w-14 h-14 rounded-full relative flex items-center justify-center">
        <Label
          text="73%"
          class_name="absolute m-auto text-sm font-extrabold text-blue"
        />
        <DoughnutCommon
          data={DoughnutData.workLoadData.data}
          options={DoughnutData.workLoadData.options}
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <Label text="Your Workload" class_name="text-md font-semibold" />
        <div className="text-[12px] flex flex-row items-center gap-2 justify-center text-text-light">
          <Label text="230 h/ 160 h" class_name="" />
          <span className="text-green flex flex-row items-center justify-center">
            <Icon icon="ri-arrow-right-up-line" />
            <Label text="15%" class_name="" />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center text-xs font-lighter">
        <Label text="Hours Overtime" class_name="" />
        <Label text="70 h" class_name="font-bold text-md" />
      </div>
    </div>
  );
}

export default AppointmentsWorkLoadDisplay;
