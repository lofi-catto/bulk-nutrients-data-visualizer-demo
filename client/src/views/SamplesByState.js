import { useState, useEffect } from "react";
import BarChart from "../components/BarChart";
// import { UserData } from "./Data";

import { getStateGroups } from "../api/index";

const options = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The number of samples sent to each state",
    },
  },
};

function SamplesByState({ defaultData }) {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    getStateGroups().then((res) => {
      setChartData({
        labels: res.map((item) => item.groupName),
        datasets: [
          {
            label: "Samples requested in state",
            data: res.map((item) => item.count),
            backgroundColor: "#f3ba2f",
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  return (
    <div style={{ width: 700 }}>
      <BarChart options={options} chartData={chartData} />
    </div>
  );
}

export default SamplesByState;
