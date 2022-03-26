import { useEffect, useState } from "react";

import axios from "axios";
import Chart from "chart.js/auto";

function CoinChart() {
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);
  const [chart, setChart] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        setDates(Object.keys(response.data.bpi));
        setValues(Object.values(response.data.bpi));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("myChart");

    if (chart) {
      chart.destroy();
    }

    const myChart = new Chart(ctx, {
      type: "line",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: dates,
        datasets: [
          {
            label: "Variação de preço de BitCoin",
            data: values,
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
            tension: 0,
          },
        ],
      },
    });

    setChart(myChart);
  }, [dates, values]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
        )
        .then((response) => {
          setDates(Object.keys(response.data.bpi));
          setValues(Object.values(response.data.bpi));
        })
        .catch((error) => console.error(error));
    }
  }, [startDate, endDate]);

  function handleStartChange(event) {
    setStartDate(event.target.value);
  }

  function handleEndChange(event) {
    setEndDate(event.target.value);
  }

  return (
    <div>
      <div>
        <input type="date" id="startDate" onChange={handleStartChange}></input>
        <input type="date" id="endDate" onChange={handleEndChange}></input>
      </div>
      <div style={{ height: "400px" }}>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default CoinChart;
