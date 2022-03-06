import { useState, useEffect } from "react";
import DoughnutChart from "../components/DoughnutChart";
// import { UserData } from "./Data";

import { getFlavourGroups } from "../api/index";

const options = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Flavour breakdown across all products",
    },
  },
};

function random_rgba() {
  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomByte = () => randomNumber(0, 255);
  const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2);
  const randomCssRgba = () =>
    `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(
      ","
    )})`;
  return randomCssRgba();
}

function generateColours(length) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(random_rgba());
  }
  return colors;
}

function FlavourBreakdown({ defaultData }) {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    getFlavourGroups().then((res) => {
      setChartData({
        labels: res.map((item) => item.groupName),
        datasets: [
          {
            data: res.map((item) => item.count),
            backgroundColor: generateColours(res.length),
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 700 }}>
      <DoughnutChart options={options} chartData={chartData} />
    </div>
  );
}

export default FlavourBreakdown;
