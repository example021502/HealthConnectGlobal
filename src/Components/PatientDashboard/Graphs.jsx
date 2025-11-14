import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import ChartData from "./ChartData/ChartData.json";

ChartJS.register(...registerables);

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
    const dataObject = ChartData[graphType];

    if (!dataObject && graphType !== "Summery") {
      return { labels: [], datasets: [] };
    }

    if (graphType === "Summery") {
      const allKeys = Object.keys(ChartData);

      const overallDatasets = allKeys.map((type) => {
        const dataset = ChartData[type];
        const color = getColor(type);

        return {
          label: type,
          data: dataset.data.slice(0, dataset.labels.length),
          borderColor: color.replace("0.2", "0.6"),
          backgroundColor: color.replace("0.2)", "0.1)"),
          tension: 0.2,
          borderWidth: 2,
          fill: true,
        };
      });

      return {
        labels: ChartData["Diet Score"].labels,
        datasets: overallDatasets,
      };
    }

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
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = getGraphData(graphType);
  return <Line data={chartData} />;
}

export default Graphs;
