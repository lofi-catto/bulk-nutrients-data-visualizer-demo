import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ options, chartData }) {
  return <Doughnut options={options} data={chartData} />;
}

export default DoughnutChart;
