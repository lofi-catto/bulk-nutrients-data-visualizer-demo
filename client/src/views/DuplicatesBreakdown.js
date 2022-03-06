import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";

import { getDuplicates } from "../api/index";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The number of duplicates submitted",
    },
  },
};

function DuplicatesBreakdown({ defaultData }) {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    getDuplicates().then((res) => {
      setChartData({
        labels: res.map((item) => item.username),
        datasets: [
          {
            label: "Samples requested by user",
            data: res.map((item) => item.count),
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="chart-wrapper">
      <div className="chart">
        <BarChart options={options} chartData={chartData} />
      </div>
    </div>
  );
}

export default DuplicatesBreakdown;
