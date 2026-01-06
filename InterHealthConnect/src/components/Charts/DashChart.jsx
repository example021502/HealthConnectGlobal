import React, { useState, useRef, useEffect } from "react";
import Icon from "../common/Icon";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DashChart() {
  const chartRef = useRef(null);
  const [expandPeriod, setExpandPeriod] = useState(false);
  const [period, setPeriod] = useState("Weekly");
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const rawData = [
    { day: "Mon", males: 45, females: 52, appts: 85, consults: 30 },
    { day: "Tue", males: 38, females: 48, appts: 70, consults: 25 },
    { day: "Wed", males: 65, females: 70, appts: 95, consults: 45 },
    { day: "Thu", males: 42, females: 55, appts: 60, consults: 20 },
    { day: "Fri", males: 58, females: 63, appts: 110, consults: 50 },
    { day: "Sat", males: 30, females: 40, appts: 40, consults: 15 },
    { day: "Sun", males: 25, females: 35, appts: 30, consults: 10 },
  ];

  const handle_period_change = (val) => {
    setPeriod(val);
    setExpandPeriod(false);
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const createGradient = (color) => {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      return gradient;
    };

    setChartData({
      labels: rawData.map((d) => d.day),
      datasets: [
        {
          label: "Males",
          data: rawData.map((d) => d.males),
          borderColor: "#365195",
          backgroundColor: createGradient("rgba(54, 81, 149, 0.2)"),
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Females",
          data: rawData.map((d) => d.females),
          borderColor: "#53a62a",
          backgroundColor: createGradient("rgba(83, 166, 42, 0.2)"),
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Appointments",
          data: rawData.map((d) => d.appts),
          borderColor: "#663f9d",
          backgroundColor: createGradient("rgba(102, 63, 157, 0.2)"),
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          label: "Consultations",
          data: rawData.map((d) => d.consults),
          borderColor: "#f59e0b",
          backgroundColor: createGradient("rgba(245, 158, 11, 0.2)"),
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: { display: false },
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 5,
          boxHeight: 5,

          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="w-5/7 relative h-80 p-4 bg-white rounded-xl shadow-lg border border-slate-100">
      <div className="w-fit text-blue border-b-2 border-blue absolute top-4 right-6 flex items-center gap-1 z-50">
        <p className="text-sm font-medium">{period}</p>
        <span onClick={() => setExpandPeriod(!expandPeriod)}>
          <Icon
            icon={expandPeriod ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}
            class_name="text-xl cursor-pointer"
          />
        </span>
        {expandPeriod && (
          <div className="absolute top-full right-0 w-32 bg-white mt-1 rounded-lg shadow-xl border border-slate-100 overflow-hidden">
            <ul className="flex flex-col text-sm">
              {["Weekly", "Monthly", "Yearly"].map((item) => (
                <li
                  key={item}
                  onClick={() => handle_period_change(item)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}

export default DashChart;
