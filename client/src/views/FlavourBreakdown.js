import { useState, useEffect } from "react";

import DoughnutChart from "../components/DoughnutChart";
import BarChart from "../components/BarChart";

import { getFlavourGroups } from "../api/index";

const doughnutChartDataOptions = {
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

const defautlBarChartData = {
  labels: [],
  datasets: [
    {
      label: "Flavour",
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
      text: "Product breakdown in a flavour",
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

function FlavourBreakdown({ defaultData }) {
  const [doughnutChartData, setDoughnutChartData] = useState(defaultData);
  const [barChartData, setBarChartData] = useState(defautlBarChartData);

  useEffect(() => {
    getFlavourGroups().then((res) => {
      DATA_SET = res;
      setDoughnutChartData({
        labels: res.map((item) => item.groupName),
        datasets: [
          {
            label: "Flavour Dataset",
            data: res.map((item) => item.count),
            backgroundColor: generateColours(res.length),
          },
        ],
      });
    });
  }, []);

  // group all data into products
  const getProductGroups = (data) => {
    const arr = [];
    const groups = data.reduce((groups, item) => {
      const group = groups[item.sample.sku] || [];
      group.push(item);
      groups[item.sample.sku] = group;
      return groups;
    }, {});

    for (const [key, value] of Object.entries(groups)) {
      arr.push({
        sku: `${key}`,
        groupName: `${value[0].sample.product}`,
        orders: value,
        count: value.length,
      });
    }

    return arr;
  };

  const onClickSection = (flavour, color) => {
    const flavourSet = DATA_SET.filter((d) => d.groupName === flavour);
    const orders = flavourSet[0].orders;
    const data = getProductGroups(orders);

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
    <div className="chart-wrapper">
      <div className="chart">
        <DoughnutChart
          onClickSection={onClickSection}
          options={doughnutChartDataOptions}
          chartData={doughnutChartData}
        />
      </div>
      <div className="chart">
        <BarChart options={barChartDataOptions} chartData={barChartData} />
      </div>
    </div>
  );
}

export default FlavourBreakdown;
