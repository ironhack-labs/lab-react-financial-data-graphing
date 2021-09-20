import Graph from "./Components/Graph";
import InputDate from "./Components/InputDate";
import { React, useState } from "react";

function App() {
  const [initialDate, setInitialDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="App">
      <InputDate
        initialDate={initialDate}
        setInitialDate={setInitialDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Graph initialDate={initialDate} endDate={endDate} />
    </div>
  );
}

export default App;
