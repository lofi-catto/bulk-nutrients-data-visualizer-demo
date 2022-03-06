import { useState, useEffect } from "react";
import MostPopularProduct from "./views/MostPopularProduct";
import DayOfWeek from "./views/DayOfWeek";
import SamplesByState from "./views/SamplesByState";
import FlavourBreakdown from "./views/FlavourBreakdown";
import ProductBreakdown from "./views/ProductBreakdown";
import DuplicatesBreakdown from "./views/DuplicatesBreakdown";
import Overview from "./views/Overview";

import { getMostPopular } from "./api/index";

import "./scss/main.scss";

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
  return (
    <div className="App">
      <div className="title">
        <h2>Report Overview</h2>
      </div>
      <Overview />
      <h3 className="section-title">Q1: The most popular product requested?</h3>
      <MostPopularProduct defaultData={defaultData} />
      <h3 className="section-title">
        Q2: The number of samples sent by day of week?
      </h3>
      <DayOfWeek defaultData={defaultData} />
      <h3 className="section-title">
        Q3: The number of samples sent to each state?
      </h3>
      <SamplesByState defaultData={defaultData} />
      <h3 className="section-title">
        Q4: A flavour breakdown across all products?
      </h3>
      <FlavourBreakdown defaultData={defaultData} />
      <h3 className="section-title">
        Q5: A flavour breakdown across the Pre Workout 101 product ?
      </h3>
      <ProductBreakdown defaultData={defaultData} />
      <h3 className="section-title">
        Q6: An approximation of the duplicates submitted ?
      </h3>
      <DuplicatesBreakdown defaultData={defaultData} />
    </div>
  );
}

export default App;
