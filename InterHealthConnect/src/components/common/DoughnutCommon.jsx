import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Legend, Tooltip);

function DoughnutCommon({ data, options }) {
  return <Doughnut data={data} options={options} />;
}

export default DoughnutCommon;
