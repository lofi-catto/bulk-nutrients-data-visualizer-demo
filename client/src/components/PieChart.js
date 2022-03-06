import React, { MouseEvent, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

// import { InteractionItem } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";

function PieChart({ options, chartData, onClickSection }) {
  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    if (onClickSection) {
      onClickSection(
        chartData.labels[index],
        chartData.datasets[datasetIndex].backgroundColor[index]
      );
    }
  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printElementAtEvent(getElementAtEvent(chart, event));
  };

  return (
    <Pie ref={chartRef} options={options} onClick={onClick} data={chartData} />
  );
}

export default PieChart;
