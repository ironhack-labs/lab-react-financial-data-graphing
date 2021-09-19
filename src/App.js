import "./App.css";

import axios from "axios";
import { useEffect, useState } from "react";

import ChartComponent from "./components/ChartComponent/ChartComponent";
import DatesFilter from "./components/DatesFilter/DatesFilter";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MaxMin from "./components/MaxMin/MaxMin";

const transformData = (data) => {
  if (!data || data.length === 0) return null;
  const dates = [];
  const values = [];
  Object.keys(data.bpi).forEach((key) => {
    dates.push(key);
    values.push(data.bpi[key]);
  });
  return { dates, values };
};

const fetchData = (setData, url) => {
  axios
    .get(url)
    .then((response) => setData(transformData(response.data)))
    .catch((err) => console.err(err));
};

function App() {
  const [data, setData] = useState({
    dates: "",
    values: "",
  });

  const [url, setUrl] = useState(
    "http://api.coindesk.com/v1/bpi/historical/close.json?"
  );

  const [filterUrl, setFilterUrl] = useState({
    date: "",
    currency: "USD",
  });

  useEffect(() => {
    const fetchURL = url + filterUrl.date + `&currency=${filterUrl.currency}`;
    fetchData(setData, fetchURL);
  }, [filterUrl]);

  return !data.values ? (
    <div className="loading-screen"> Loading</div>
  ) : (
    <div className="App">
      <div className="header-container">
        <DatesFilter filterUrl={filterUrl} setFilterUrl={setFilterUrl} />
        <MaxMin data={data} currency={filterUrl.currency} />
      </div>
      <CurrencyFilter filterUrl={filterUrl} setFilterUrl={setFilterUrl} />
      <ChartComponent data={data} />
    </div>
  );
}

export default App;
