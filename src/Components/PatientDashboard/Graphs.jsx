import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import ChartData from "./ChartData/ChartData.json";

ChartJS.register(...registerables);

const getDistinctColor = (type) => {
  switch (type) {
    case "Meds Score Rate":
      return "rgb(31,56,84)";
    case "Exercises Score":
      return "rgb(19,194,194)";
    case "Diet Score":
      return "rgb(185,54,54)";
    case "Dose Miss Rate":
      return "rgb(0,125,83)";
    default:
      return "rgb(100, 100, 100)";
  }
};

const getColor = (type) => {
  switch (type) {
    case "Meds Score Rate":
      return "rgba(31,56,84,0.2)";
    case "Exercises Score":
      return "rgba(19,194,194,0.2)";
    case "Diet Score":
      return "rgba(185,54,54,0.2)";
    case "Dose Miss Rate":
      return "rgba(0,125,83,0.2)";
    default:
      return "rgba(0, 0, 0, 0.6)";
  }
};

function Graphs({ graphType }) {
  const getGraphData = (graphType) => {
    if (!ChartData[graphType] && graphType !== "Summery") {
      return { labels: [], datasets: [] };
    }

    if (graphType === "Summery") {
      const medsAndDoseLabels = ["Meds Score Rate", "Dose Miss Rate"];
      const medsAndDoseData = {
        labels: medsAndDoseLabels,
        datasets: [
          {
            data: [
              ChartData["Meds Score Rate"].data.slice(-1)[0],
              ChartData["Dose Miss Rate"].data.slice(-1)[0],
            ],
            backgroundColor: medsAndDoseLabels.map(getDistinctColor),
            borderColor: "white",
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      };

      const exercisesAndDietLabels = ["Exercises Score", "Diet Score"];
      const exercisesAndDietData = {
        labels: exercisesAndDietLabels,
        datasets: [
          {
            data: [
              ChartData["Exercises Score"].data.slice(-1)[0],
              ChartData["Diet Score"].data.slice(-1)[0],
            ],
            backgroundColor: exercisesAndDietLabels.map(getDistinctColor),
            borderColor: "white",
            borderWidth: 2,
            hoverOffset: 4,
          },
        ],
      };

      return { medsAndDoseData, exercisesAndDietData };
    }

    const dataObject = ChartData[graphType];
    const color = getColor(graphType);

    return {
      labels: dataObject.labels,
      datasets: [
        {
          label: graphType,
          data: dataObject.data.slice(0, dataObject.labels.length),
          borderColor: color.replace("0.2", "0.6"),
          backgroundColor: color.replace("0.2)", "0.1)"),
          tension: 0.2,
          fill: true,
          borderWidth: 2,
        },
      ],
    };
  };

  const chartData = getGraphData(graphType);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 40,
          boxHeight: 20,
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: graphType === "Summery" ? "" : graphType,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += `${context.parsed}%`;
            }
            return label;
          },
        },
      },
    },
    animation: {
      duration: 1500,
      animateRotate: true,
      animateScale: true,
    },
  };

  if (graphType === "Summery") {
    const { medsAndDoseData, exercisesAndDietData } = chartData;

    return (
      <div className="w-full h-[400px] flex justify-around items-center p-4">
        <div className="w-1/2 h-full flex flex-col items-center">
          <h3 className="text-lg font-semibold">Medication Summary</h3>
          <Doughnut data={medsAndDoseData} options={options} />
        </div>

        <div className="w-1/2 h-full flex flex-col items-center">
          <h3 className="text-lg font-semibold">Lifestyle Summary</h3>
          <Doughnut data={exercisesAndDietData} options={options} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full">
        <Line data={chartData} options={options} />
      </div>
    );
  }
}

export default Graphs;
