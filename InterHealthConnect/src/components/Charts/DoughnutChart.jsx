import React, { useRef } from "react";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Icon from "../common/Icon";

ChartJS.register(Tooltip, Legend, ArcElement, ChartDataLabels);

function DashChart() {
  const chartRef = useRef(null);

  const doughnutData = {
    grossTotal: 157000,
    targetGoal: 200000,
    layers: {
      allocation: [
        { label: "Net Income", value: 120000, color: "#365195" },
        { label: "Commission", value: 37000, color: "#f59e0b" },
      ],
    },
  };

  const data = {
    labels: doughnutData.layers.allocation.map((item) => item.label),
    datasets: [
      {
        label: "Revenue Breakdown",
        data: doughnutData.layers.allocation.map((item) => item.value),
        backgroundColor: doughnutData.layers.allocation.map(
          (item) => item.color
        ),
        borderWidth: 0,
        borderRadius: 8,
        spacing: 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className="relative w-2/7 h-fit flex flex-col items-center justify-center backdrop-blur-md rounded-3xl">
      <div className="w-full h-full z-10">
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>
      <span className="absolute m-auto w-full h-full text-text-light opacity-30 flex items-center justify-center text-[10em]">
        <Icon
          icon="ri-bank-line"
          class_name="h-full flex items-center justify-center w-full"
        />
      </span>
      <div className="absolute my-auto z-10 text-center pointer-events-none">
        <p className="text-sm uppercase  block tracking-widest">Net Income</p>
        <p className="text-3xl font-black text-text">
          ₹{doughnutData.grossTotal / 1000}k
        </p>
      </div>
    </div>
  );
}

export default DashChart;
