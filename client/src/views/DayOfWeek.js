import { useState, useEffect } from "react";
import LineChart from "../components/LineChart";

import { getDayGroups } from "../api/index";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The number of samples sent by day of week",
    },
  },
};

function DayOfWeek({ defaultData }) {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    getDayGroups().then((res) => {
      setChartData({
        labels: res.map((item) => item.groupName),
        datasets: [
          {
            label: "Samples requested in day of week",
            data: res.map((item) => item.count),
            backgroundColor: "#50AF95",
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 700 }}>
      <LineChart options={options} chartData={chartData} />
    </div>
  );
}

export default DayOfWeek;
