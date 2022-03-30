import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function MyChart() {
  const [dates, setDates] = useState([]);
  const [pricesVariation, setPricesVariation] = useState([]);
  const [chart, setChart] = useState();

  const [chartObj, setChartObj] = useState({
    start: null,
    end: null,
    currency: 'USD'
  })


  function handleChartObj(event) {
    const clone = { ...chartObj, [event.target.name]: event.target.value };
    setChartObj(clone);
  }

  useEffect(() => {
    if (chartObj.start && chartObj.end) {
      fetchData();

    }
  }, [chartObj]);

async function fetchData() {
  try {
    const response = await axios.get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${chartObj.start}&end=${chartObj.end}&currency=${chartObj.currency}`
    );

    const entries = Object.entries(response.data["bpi"]);
    setDates(entries.map((currentArr) => currentArr[0]));
    setPricesVariation(entries.map((currentArr) => currentArr[1]));
  } catch (err) {
    console.error(err);
  }
}

  useEffect(() => {

    const ctx = document.getElementById("myChart");

    if (chart) {
      chart.destroy();
    }
    const myChart = new Chart(ctx, {
      type: "line",
      options: { responsive: true, maintainAspectRatio: false },
      data: {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin price index",
            data: pricesVariation,
            fill: true,
            borderColor: "rgb(219, 219, 219)",
            tension: 0.1,
          },
        ],
      },
    });
    setChart(myChart);
  }, [dates, pricesVariation]);

  return (
    <div>
      <div>
        <h2 className="mb-3">Filters</h2>
        <div>
          <label>
            <strong>From: </strong>
          </label>
          <input
            type="date"
            style={{ marginRight: "1rem" }}
            id="from"
            name="start"
            onChange={handleChartObj}
          />
          <label>
            <strong>To:</strong>
          </label>
          <input name="end" type="date" id="to" onChange={handleChartObj} />
        </div>
        <div>
          <label>
            <strong>Currency:</strong>
          </label>
          <select
            value={chartObj.currency}
            className="mt-3"
            name="currency"
            onChange={handleChartObj}
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div>
          <h2>Values</h2>
          <p>
            max: {Math.max(...pricesVariation)} {chartObj.currency}
          </p>
          <p>
            min: {Math.min(...pricesVariation)} {chartObj.currency}
          </p>
        </div>
      </div>
      <div style={{ position: "relative", height: "600px" }}>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}
export default MyChart;

