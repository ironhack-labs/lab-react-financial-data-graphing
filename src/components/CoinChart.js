import { useEffect, useState } from "react";

import axios from "axios";
import Chart from "chart.js/auto";

function CoinChart() {
  const [dates, setDates] = useState([]);
  const [values, setValues] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [chart, setChart] = useState();

  const [minMaxValue, setMinMaxValue] = useState([0, 0]);

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
        const vals = Object.values(response.data.bpi);
        setValues(vals);

        setMinMaxValue([Math.min(...vals), Math.max(...vals)]);

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
            label: "Valor do Bitcoin",
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
          const vals = Object.values(response.data.bpi);
          setValues(vals);

          setMinMaxValue([Math.min(...vals), Math.max(...vals)]);
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
    setCurrency(event.target.options[event.target.selectedIndex].value);
  }

  return (
    <div>
      <div>
        <input type="date" id="startDate" onChange={handleStartChange}></input>
        <input type="date" id="endDate" onChange={handleEndChange}></input>
        <select id="currency" onChange={handleCurrency} defaultValue={currency}>
          <option value="USD">US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="BRL">Brazilian real (R$)</option>
        </select>
        <div>
          <p>Max: {`${minMaxValue[1]} ${currency}`}</p>
          <p>Min: {`${minMaxValue[0]} ${currency}`}</p>
        </div>
      </div>
      <div style={{ height: "400px" }}>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default CoinChart;
