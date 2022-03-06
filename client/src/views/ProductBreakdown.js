import { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

import { getProductGroups } from "../api/index";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "All products",
    },
  },
};

const defautlBarChartData = {
  labels: [],
  datasets: [
    {
      label: "Product",
      data: [],
    },
  ],
};

const barChartDataOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Flavour breakdown in a product",
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

let DATA_SET = [];

function ProductBreakdown({ defaultData }) {
  const [chartData, setChartData] = useState(defaultData);
  const [barChartData, setBarChartData] = useState(defautlBarChartData);

  useEffect(() => {
    getProductGroups().then((res) => {
      DATA_SET = res;
      setChartData({
        labels: res.map((item) => item.groupName),
        datasets: [
          {
            label: "Samples requested in state",
            data: res.map((item) => item.count),
            backgroundColor: generateColours(res.length),
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);

  // group all data into flavours
  const getFlavourGroups = (data) => {
    const arr = [];
    const groups = data.reduce((groups, item) => {
      const group = groups[item.sample.flavour] || [];
      group.push(item);
      groups[item.sample.flavour] = group;
      return groups;
    }, {});

    for (const [key, value] of Object.entries(groups)) {
      arr.push({
        groupName: `${key}`,
        orders: value,
        count: value.length,
      });
    }

    return arr;
  };

  const onClickSection = (flavour, color) => {
    const flavourSet = DATA_SET.filter((d) => d.groupName === flavour);
    const orders = flavourSet[0].orders;
    const data = getFlavourGroups(orders);

    setBarChartData({
      labels: data.map((item) => item.groupName),
      datasets: [
        {
          label: `${flavourSet[0].groupName}`,
          data: data.map((item) => item.count),
          backgroundColor: color,
        },
      ],
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <PieChart
          onClickSection={onClickSection}
          options={options}
          chartData={chartData}
        />
      </div>
      <div style={{ width: "50%" }}>
        <BarChart options={barChartDataOptions} chartData={barChartData} />
      </div>
    </div>
  );
}

export default ProductBreakdown;
