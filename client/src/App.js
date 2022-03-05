import { useState, useEffect } from "react";
import MostPopularProduct from "./views/MostPopularProduct";
import DayOfWeek from "./views/DayOfWeek";
// import { UserData } from "./Data";

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
    </div>
  );
}

export default App;
