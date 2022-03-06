import { useState, useEffect } from "react";
import MostPopularProduct from "./views/MostPopularProduct";
import DayOfWeek from "./views/DayOfWeek";
import SamplesByState from "./views/SamplesByState";
import FlavourBreakdown from "./views/FlavourBreakdown";
import ProductBreakdown from "./views/ProductBreakdown";
import DuplicatesBreakdown from "./views/DuplicatesBreakdown";

import { getMostPopular } from "./api/index";

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
      <MostPopularProduct defaultData={defaultData} />
      <DayOfWeek defaultData={defaultData} />
      <SamplesByState defaultData={defaultData} />
      <FlavourBreakdown defaultData={defaultData} />
      <ProductBreakdown defaultData={defaultData} />
      <DuplicatesBreakdown defaultData={defaultData} />
    </div>
  );
}

export default App;
