import React from "react";
import DoughnutChartsData from "../../Charts/DoughnutCommonData.json";
import Label from "../../common/Label";

function AppointmentsLegend() {
  const DoughnutData = DoughnutChartsData;
  return (
    <div className="flex flex-row w-full items-start justify-center flex-wrap gap-0.5">
      {DoughnutData.patientsByCondition.data.labels.map((label, index) => {
        const color =
          DoughnutData.patientsByCondition.data.datasets[0].backgroundColor[
            index
          ];
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-center gap-1 mx-1 text-sm font-light"
          >
            <span
              style={{
                backgroundColor: color,
              }}
              className={`w-3 h-3 rounded-full`}
            />
            <Label text={label} class_name="" />
          </div>
        );
      })}
    </div>
  );
}

export default AppointmentsLegend;
