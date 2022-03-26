import { useEffect, useState } from "react";

import axios from "axios";
import Chart from "chart.js/auto";

function CoinChart() {
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [chart, setChart] = useState();

  let today = new Date();
  today.setDate(today.getDate() - 1);
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  today.setDate(today.getDate() - 30);
  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);

  useEffect(() => {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
      )
      .then((response) => {
        setDates(Object.keys(response.data.bpi));
        setValues(Object.values(response.data.bpi));

        document.getElementById("startDate").value = startDate;
        document.getElementById("endDate").value = endDate;
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
          `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
        )
        .then((response) => {
          setDates(Object.keys(response.data.bpi));
          setValues(Object.values(response.data.bpi));
        })
        .catch((error) => console.error(error));
    }
  }, [startDate, endDate, currency]);

  function handleStartChange(event) {
    setStartDate(event.target.value);
  }

  function handleEndChange(event) {
    setEndDate(event.target.value);
  }

  function handleCurrency(event) {
    setCurrency(event.target.options[event.target.selectedIndex].text);
  }

  return (
    <div>
      <div>
        <input type="date" id="startDate" onChange={handleStartChange}></input>
        <input type="date" id="endDate" onChange={handleEndChange}></input>
        <select id="currency" onChange={handleCurrency} defaultValue={currency}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="BRL">BRL</option>
        </select>
      </div>
      <div style={{ height: "400px" }}>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default CoinChart;
