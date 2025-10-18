import { useState, useMemo } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
        title: `Blood Pressure Trends (${selectedRange})`,
        data: {
          labels,
          datasets: [
            {
              label: "Systolic",
              data: dataPoints.map((d) => d.systolic),
              borderColor: "#2D72AA",
              backgroundColor: "rgba(45, 114, 170, 0.1)",
              tension: 0.3,
            },
            {
              label: "Diastolic",
              data: dataPoints.map((d) => d.diastolic),
              borderColor: "#98C1D9",
              backgroundColor: "rgba(152, 193, 217, 0.1)",
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: false, suggestedMin: 60, suggestedMax: 150 },
          },
          plugins: {
            title: {
              display: false,
            },
          },
        },
      };
    }

    // Single Line Chart Metrics
    let color, labelField;
    switch (selectedMetric) {
      case "Glucose":
        color = "#E9B824";
        labelField = "Glucose Level";
        break;
      case "Body & Weight":
        color = "#3C6E71";
        labelField = "Weight (lbs)";
        break;
      case "Activity & Sleep":
      default:
        color = "#6C58A5";
        labelField = "Duration (Hours)";
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
            fill: true,
            tension: 0.3,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: selectedMetric !== "Body & Weight" } },
        plugins: {
          title: {
            display: false,
          },
        },
      },
    };
  }, [selectedMetric, selectedRange]);

  // START: Render
  return (
    <div className="w-full m-0 bg-gray-50 flex flex-col items-center px-2 py-6 min-h-screen border-1">
      <div className="flex w-full items-center justify-end gap-2 bg-white rounded-lg shadow-md p-2 m-0 border-1">
        {/* START: Date Range Selector */}
        {DATE_RANGES.map((range) => (
          <button
            key={range}
            className={`
              px-4 py-1 rounded-md font-semibold cursor-pointer transition-all duration-200
              text-gray-600 bg-transparent border-1 mx-4 my-2
              hover:text-[#3a4aa4] hover:bg-blue-50
              ${
                range === selectedRange
                  ? "bg-[#3a4aa4] text-black hover:bg-[#3a4aa4] hover:text-[#111c5b] border-2"
                  : ""
              }
            `}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* START: Main Content Area */}
      <div className="flex w-full items-start gap-4 border-1 my-4">
        {/* START: Left Div (Metric Cards) */}
        <div className="p-1 flex flex-col gap-4 mx-auto w-2/4 h-full">
          {METRICS.map((metric) => (
            <div
              key={metric.key}
              className={`
                flex w-full items-center p-3 bg-white rounded-md border border-gray-200 shadow-sm cursor-pointer transition-all duration-300
                hover:border-[#3a4aa4] hover:shadow-lg hover:translate-y-[-2px]
                ${
                  selectedMetric === metric.key
                    ? "border-[#3a4aa4] bg-blue-50"
                    : ""
                }
              `}
              onClick={() => setSelectedMetric(metric.key)}
            >
              <i className={`${metric.icon} text-xl text-[#3a4aa4] mr-4`} />
              <div className="flex-1 text-left">
                <h3 className="m-0 text-base font-semibold text-gray-700">
                  {metric.label}
                </h3>
                <p className="m-0 text-xs text-gray-500">
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
                      return (
                        <span key={index} className="font-bold text-red-600">
                          {part}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-500" />
            </div>
          ))}
        </div>

        {/* START: Right Div (Chart & Tools) */}
        <div className="ml-auto w-full flex flex-col gap-5">
          {/* Chart Container */}
          <div className="bg-white rounded-xl shadow-md w-[94%] h-[500px] p-6">
            <p className="text-xl font-semibold text-gray-800 mb-2">
              {chartConfig.title}
            </p>
            <div className="w-full h-[90%]">
              <Line data={chartConfig.data} options={chartConfig.options} />
            </div>
          </div>

          {/* Tools/Actions */}
          <div className="flex items-center gap-6 p-3 bg-white rounded-md shadow-sm">
            <p className="flex items-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 relative pb-0.5 hover:text-[#3a4aa4] hover:translate-y-[-2px] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#3a4aa4] hover:after:rounded-sm">
              <i className="ri-calculator-line text-xl text-[#3a4aa4] mr-1" />
              Key Stats: Max, Min, Avg
            </p>
            <p className="flex items-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 relative pb-0.5 hover:text-[#3a4aa4] hover:translate-y-[-2px] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#3a4aa4] hover:after:rounded-sm">
              <i className="ri-edit-line text-xl text-[#3a4aa4] mr-1" />
              Annotate & Events
            </p>
            <p className="flex items-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 relative pb-0.5 hover:text-[#3a4aa4] hover:translate-y-[-2px] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#3a4aa4] hover:after:rounded-sm">
              <i className="ri-file-pdf-line text-xl text-[#3a4aa4] mr-1" />
              Generate Report
            </p>
            <p className="flex items-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 relative pb-0.5 hover:text-[#3a4aa4] hover:translate-y-[-2px] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-[#3a4aa4] hover:after:rounded-sm">
              <i className="ri-table-line text-xl text-[#3a4aa4] mr-1" />
              Source Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
