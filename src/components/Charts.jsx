import React from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";

function Charts() {
  const [bipHistorical, setBipHistorical] = useState({});
  const [chart, setChart] = useState();
  const [dateQuery, setDateQuery] = useState({
    start: "",
    end: "",
    currency: "USD",
  });
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });

  async function importBPI(url) {
    try {
      const response = await axios.get(url);
      setBipHistorical(response.data.bpi);
      console.log(bipHistorical);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    importBPI(`https://api.coindesk.com/v1/bpi/historical/close.json`);
  }, []);

  useEffect(() => {
    let queryCurrency =
      dateQuery.currency !== "" ? `&currency=${dateQuery.currency}` : "";
    if (dateQuery.start !== "" && dateQuery.end !== "") {
      let selectedDate = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${dateQuery.start}&end=${dateQuery.end}${queryCurrency}`;

      importBPI(selectedDate);
    } else {
      importBPI(
        `https://api.coindesk.com/v1/bpi/historical/close.json?${queryCurrency}`
      );
    }

    const values = Object.values(bipHistorical);

    setMinMax({
      ...minMax,
      min: Math.min(...values),
      max: Math.max(...values),
    });
  }, [dateQuery]);

  useEffect(() => {
    const dates = Object.keys(bipHistorical);
    const values = Object.values(bipHistorical);

    setMinMax({
      ...minMax,
      min: Math.min(...values),
      max: Math.max(...values),
    });
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
            label: "Variação de preço BITCOIN",
            data: values,
            fill: true,
            borderColor: "rgb(75, 192, 192)",
            tension: 0,
          },
        ],
      },
    });

    setChart(myChart);
  }, [bipHistorical]);

  function handleChange(event) {
    setDateQuery({
      ...dateQuery,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div style={{ width: "1000px", height: "1000px" }}>
      <input
        type="date"
        value={dateQuery.start}
        name="start"
        id=""
        onChange={handleChange}
      />
      <input
        type="date"
        value={dateQuery.end}
        name="end"
        id=""
        onChange={handleChange}
      />
      <select
        name="currency"
        value={dateQuery.currency}
        onChange={handleChange}
      >
        <option value="USD">Dollar</option>
        <option value="BRL">Real</option>
      </select>

      <p>MIN: {minMax.min}</p>
      <p>MAX: {minMax.max}</p>

      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Charts;
