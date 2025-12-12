import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, plugins, registerables, Tooltip } from "chart.js";
Chart.register(...registerables);

function SummeryGraph() {
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        data: [2, 6, 1, 4, 3, 5, 7],
        backgroundColor: [
          "#4bc0c0",
          "#97ea96",
          "#7577c0",
          "#008a8b",
          "#c07577",
          "#c0ad4b",
          "#4bc075",
        ],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };
  return (
    <div className=" w-full">
      <Bar key={"SummeryChart"} data={data} />
    </div>
  );
}

export default SummeryGraph;
