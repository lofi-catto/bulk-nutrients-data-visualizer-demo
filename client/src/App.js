import { useState, useEffect } from "react";
import BarChart from "./components/BarChart";
// import { UserData } from "./Data";

import { getMostPopular } from "./api/index";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const defaultData = {
  labels: [],
  datasets: [
    {
      label: "Chart title",
      data: [],
    },
  ],
};

function App() {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    getMostPopular().then((res) => {
      setChartData({
        labels: res.map((item) => item.friendlyName),
        datasets: [
          {
            label: "Most popular samples",
            data: res.map((item) => item.count),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <BarChart options={options} chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
