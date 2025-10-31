import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Ensure all necessary Chart.js elements are registered
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Note: This component uses Remix Icons (ri-*) classes.
// Please ensure the following link is included in your main HTML file for icons to display:
// <link href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css" rel="stylesheet" />

// START: Data Constants
const CHART_DATA = {
  "Vitals & Heart": {
    Weekly: [
      { date: "Mon", systolic: 122, diastolic: 78 },
      { date: "Tue", systolic: 125, diastolic: 80 },
      { date: "Wed", systolic: 118, diastolic: 75 },
      { date: "Thu", systolic: 135, diastolic: 88 },
      { date: "Fri", systolic: 128, diastolic: 82 },
      { date: "Sat", systolic: 120, diastolic: 76 },
      { date: "Sun", systolic: 119, diastolic: 77 },
    ],
    Monthly: [
      { date: "Wk1", systolic: 123, diastolic: 79 },
      { date: "Wk2", systolic: 120, diastolic: 76 },
      { date: "Wk3", systolic: 128, diastolic: 83 },
      { date: "Wk4", systolic: 121, diastolic: 77 },
    ],
    Yearly: [
      { date: "Q1", systolic: 125, diastolic: 80 },
      { date: "Q2", systolic: 122, diastolic: 78 },
      { date: "Q3", systolic: 128, diastolic: 81 },
      { date: "Q4", systolic: 120, diastolic: 75 },
    ],
  },
  Glucose: {
    Weekly: [
      { date: "Mon", value: 92 },
      { date: "Tue", value: 98 },
      { date: "Wed", value: 89 },
      { date: "Thu", value: 105 },
      { date: "Fri", value: 95 },
      { date: "Sat", value: 90 },
      { date: "Sun", value: 93 },
    ],
    Monthly: [
      { date: "Wk1", value: 95 },
      { date: "Wk2", value: 93 },
      { date: "Wk3", value: 101 },
      { date: "Wk4", value: 96 },
    ],
    Yearly: [
      { date: "Q1", value: 98 },
      { date: "Q2", value: 95 },
      { date: "Q3", value: 100 },
      { date: "Q4", value: 94 },
    ],
  },
  "Body & Weight": {
    Weekly: [
      { date: "Mon", value: 185.5 },
      { date: "Sun", value: 184.2 },
    ],
    Monthly: [
      { date: "Wk1", value: 185.5 },
      { date: "Wk2", value: 184.2 },
      { date: "Wk3", value: 183.0 },
      { date: "Wk4", value: 182.5 },
    ],
    Yearly: [
      { date: "Jan", value: 188 },
      { date: "Apr", value: 185 },
      { date: "Jul", value: 183 },
      { date: "Oct", value: 181 },
    ],
  },
  "Activity & Sleep": {
    Weekly: [
      { date: "Mon", value: 7.25 },
      { date: "Tue", value: 6.8 },
      { date: "Wed", value: 8.0 },
      { date: "Thu", value: 5.5 },
      { date: "Fri", value: 7.0 },
      { date: "Sat", value: 7.5 },
      { date: "Sun", value: 7.8 },
    ],
    Monthly: [
      { date: "Wk1", value: 7.1 },
      { date: "Wk2", value: 6.9 },
      { date: "Wk3", value: 7.5 },
      { date: "Wk4", value: 6.5 },
    ],
    Yearly: [
      { date: "Q1", value: 7.2 },
      { date: "Q2", value: 7.0 },
      { date: "Q3", value: 6.8 },
      { date: "Q4", value: 7.1 },
    ],
  },
};

const METRICS = [
  {
    key: "Vitals & Heart",
    label: "Blood Pressure",
    icon: "ri-heart-pulse-line",
    summary: "120/80 mmHg +5% vs last period",
  },
  {
    key: "Glucose",
    label: "Blood Sugar",
    icon: "ri-drop-line",
    summary: "98 mg/dL -2% vs 7 days ago",
  },
  {
    key: "Body & Weight",
    label: "Weight",
    icon: "ri-scales-3-line",
    summary: "185 lbs -1.2lbs This Month",
  },
  {
    key: "Activity & Sleep",
    label: "Avg. Sleep",
    icon: "ri-moon-line",
    summary: "7h 15m +15m vs last week",
  },
];

const DATE_RANGES = ["Weekly", "Monthly", "Yearly"];

function Charts() {
  // START: State
  const [selectedMetric, setSelectedMetric] = useState("Vitals & Heart");
  const [selectedRange, setSelectedRange] = useState("Weekly");

  // START: Utility Functions
  const getAggregatedData = (metricKey, rangeKey) => {
    return CHART_DATA[metricKey] ? CHART_DATA[metricKey][rangeKey] || [] : [];
  };

  // START: Chart Configuration Memo
  const chartConfig = useMemo(() => {
    const dataPoints = getAggregatedData(selectedMetric, selectedRange);
    const labels = dataPoints.map((d) => d.date);

    // Vitals & Heart (Dual Line Chart)
    if (selectedMetric === "Vitals & Heart") {
      return {
        title: `${selectedMetric.split(" & ")[0]} Trends (${selectedRange})`,
        data: {
          labels,
          datasets: [
            {
              label: "Systolic",
              data: dataPoints.map((d) => d.systolic),
              borderColor: "#2D72AA",
              backgroundColor: "rgba(45, 114, 170, 0.1)",
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointBackgroundColor: "#2D72AA",
              pointBorderColor: "#fff",
              pointHoverRadius: 6,
            },
            {
              label: "Diastolic",
              data: dataPoints.map((d) => d.diastolic),
              borderColor: "#98C1D9",
              backgroundColor: "rgba(152, 193, 217, 0.1)",
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointBackgroundColor: "#98C1D9",
              pointBorderColor: "#fff",
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: 60,
              suggestedMax: 150,
              grid: { color: "rgba(0, 0, 0, 0.05)" },
            },
            x: {
              grid: { display: false },
            },
          },
          plugins: {
            title: {
              display: false,
            },
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                padding: 20,
              },
            },
          },
        },
      };
    }

    // Single Line Chart Metrics
    let color, labelField, suggestedMin;
    switch (selectedMetric) {
      case "Glucose":
        color = "#E9B824";
        labelField = "Glucose Level (mg/dL)";
        suggestedMin = 80;
        break;
      case "Body & Weight":
        color = "#3C6E71";
        labelField = "Weight (lbs)";
        suggestedMin = Math.min(...dataPoints.map((d) => d.value)) - 5;
        break;
      case "Activity & Sleep":
      default:
        color = "#6C58A5";
        labelField = "Duration (Hours)";
        suggestedMin = 5;
    }

    return {
      title: `${selectedMetric} Trends (${selectedRange})`,
      data: {
        labels,
        datasets: [
          {
            label: labelField,
            data: dataPoints.map((d) => d.value),
            borderColor: color,
            backgroundColor: `${color}33`,
            fill: "origin", // Fill the area below the line
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: color,
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: selectedMetric !== "Body & Weight",
            suggestedMin: suggestedMin,
            grid: { color: "rgba(0, 0, 0, 0.05)" },
          },
          x: {
            grid: { display: false },
          },
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
        },
      },
    };
  }, [selectedMetric, selectedRange]);

  // START: Render
  return (
    <div className="w-full m-0 bg-gray-50 flex flex-col md:flex-row items-start justify-start py-6 px-4 gap-6 min-h-[90vh] font-sans">
      {/* START: Left Div (Metric Cards) */}
      <div className="p-1 flex flex-col gap-4 w-full md:w-1/4">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">
          Health Metrics
        </h2>
        {METRICS.map((metric) => (
          <div
            key={metric.key}
            className={`
              flex w-full items-center p-4 bg-white rounded-xl border-2 transition-all duration-300 shadow-md
              hover:shadow-lg hover:translate-y-[-2px]
              ${
                selectedMetric === metric.key
                  ? "border-emerald-500 bg-emerald-50 shadow-lg"
                  : "border-gray-200 hover:border-emerald-300"
              }
            `}
            onClick={() => setSelectedMetric(metric.key)}
            role="button"
          >
            <i
              className={`${metric.icon} text-2xl ${
                selectedMetric === metric.key
                  ? "text-emerald-600"
                  : "text-gray-500"
              } mr-4 transition-colors`}
            />
            <div className="flex-1 text-left">
              <h3 className="m-0 text-base font-semibold text-gray-700">
                {metric.label}
              </h3>
              <p className="m-0 text-xs text-gray-500 mt-0.5">
                {/* Highlight color based on trend direction */}
                {metric.summary.split(/(\+|-)/).map((part, index) => {
                  if (part.startsWith("+")) {
                    return (
                      <span key={index} className="font-bold text-green-600">
                        {part}
                      </span>
                    );
                  }
                  if (part.startsWith("-")) {
                    // For weight loss, '-' is generally good, so use green
                    const isWeightLoss =
                      selectedMetric === "Body & Weight" &&
                      part.includes("lbs");
                    return (
                      <span
                        key={index}
                        className={`font-bold ${
                          isWeightLoss ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-400 ml-2" />
          </div>
        ))}
      </div>

      {/* Right Div (Chart & Tools) */}
      <div className="w-full md:w-2/4 flex flex-col gap-4 items-center justify-start">
        <div className="bg-white rounded-xl shadow-lg w-full p-4 border border-gray-100 min-h-[450px]">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {chartConfig.title}
            </h3>
            <div className="flex items-center justify-end bg-gray-100 rounded-lg p-0.5">
              {DATE_RANGES.map((range) => (
                <button
                  key={range}
                  className={`
                    px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200
                    ${
                      range === selectedRange
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-gray-600 bg-transparent hover:bg-gray-200"
                    }
                  `}
                  onClick={() => setSelectedRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-[350px]">
            {/* The Line Chart component */}
            <Line data={chartConfig.data} options={chartConfig.options} />
          </div>
        </div>

        {/* Tools/Actions */}
        <div className="flex flex-wrap justify-between w-full p-2 bg-white rounded-xl shadow-md border border-gray-100">
          <ActionItem
            icon="ri-calculator-line"
            text="Key Stats: Max, Min, Avg"
          />
          <ActionItem icon="ri-edit-line" text="Annotate & Events" />
          <ActionItem icon="ri-file-pdf-line" text="Generate Report" />
          <ActionItem icon="ri-table-line" text="Source Data" />
        </div>
      </div>

      {/* AI assistance (Right Sidebar) */}
      <div className="shadow-lg w-full md:w-1/4 min-h-[500px] rounded-xl flex flex-col items-center justify-start bg-white p-4 border border-gray-100">
        <h4 className="flex items-center w-full text-lg font-bold text-gray-800 mb-4 border-b pb-2">
          AI Assistant
          <img
            src="https://placehold.co/24x24/10b981/ffffff?text=AI"
            alt="AI Icon"
            className="w-6 h-6 ml-2 rounded-full"
          />
          <button
            type="button"
            className="ml-auto w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Close AI Assistant"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </h4>
        <div className="flex-1 w-full relative">
          {/* Chat area placeholder */}
          <div className="h-[90%] w-full overflow-y-auto p-2 text-sm text-gray-600">
            <p className="mb-2 bg-emerald-50 p-2 rounded-lg">
              **AI:** I can analyze the trends in your patient data. Select a
              metric and a time range, and ask me questions like, "What's the
              overall trend for blood pressure this month?"
            </p>
          </div>
          {/* Input field */}
          <div className="absolute bottom-0 left-0 right-0 w-full flex items-center p-2 border-t pt-2">
            <input
              type="text"
              placeholder="Ask for analysis or insight..."
              className="flex-1 h-10 px-3 border border-gray-300 rounded-l-lg outline-none text-gray-700 text-sm focus:border-emerald-500"
            />
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-r-lg hover:bg-emerald-600 transition-colors"
              aria-label="Send message"
            >
              <i className="ri-send-plane-fill text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for the action buttons
const ActionItem = ({ icon, text }) => (
  <p
    className="flex items-center text-gray-700 text-sm cursor-pointer py-1 px-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-emerald-600 active:scale-[0.98] whitespace-nowrap"
    role="button"
  >
    <i className={`${icon} text-emerald-500 mr-1.5 text-lg`} />
    {text}
  </p>
);

export default Charts;
