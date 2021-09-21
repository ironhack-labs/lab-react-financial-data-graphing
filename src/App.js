import Graph from "./Components/Graph";
import InputDate from "./Components/InputDate";
import { React, useState } from "react";

function App() {
  const [dates, setDates] = useState({
    start: "2021-08-21",
    end: "2021-09-20"
  });

  const [state, setState] = useState({
    dates: [],
    values: [],
  });

  return (
    <div className="App">
      <InputDate
        dates={dates}
        setDates={setDates}
        state={state}
      />
      <Graph dates={dates} state={state} setState={setState} />
    </div>
  );
}

export default App;
