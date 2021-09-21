import Graph from "./Components/Graph";
import InputDate from "./Components/InputDate";
import { React, useState } from "react";

function App() {
  const [dates, setDates] = useState({
    start: "2021-09-20",
    end: "2021-08-21"
  });

  return (
    <div className="App">
      <InputDate
        dates={dates}
        setDates={setDates}
      />
      <Graph dates={dates} />
    </div>
  );
}

export default App;
