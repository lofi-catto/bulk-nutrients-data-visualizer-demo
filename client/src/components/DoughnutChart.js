import React, { MouseEvent, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

import { InteractionItem } from "chart.js";
import {
  Doughnut,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

function DoughnutChart({ options, chartData, onClickSection }) {
  // const printDatasetAtEvent = (dataset) => {
  //   if (!dataset.length) return;

  //   const datasetIndex = dataset[0].datasetIndex;

  //   console.log(chartData.datasets[datasetIndex].label);
  // };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    // console.log(
    //   chartData.labels[index],
    //   chartData.datasets[datasetIndex].data[index],
    //   chartData.datasets[datasetIndex].backgroundColor[index]
    // );

    onClickSection(
      chartData.labels[index],
      chartData.datasets[datasetIndex].backgroundColor[index]
    );
  };

  // const printElementsAtEvent = (elements) => {
  //   if (!elements.length) return;

  //   console.log(elements.length);
  // };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    // printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    // printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  return (
    <Doughnut
      ref={chartRef}
      options={options}
      onClick={onClick}
      data={chartData}
    />
  );
}

export default DoughnutChart;
