import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Graph() {
  const [state, setState] = useState({
    dates: [],
    values: [],
  });
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://api.coindesk.com/v1/bpi/historical/close.json"
      )
      .then((response) => {
       transformData(response.data.bpi); 
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    renderChart();
  }, [state]);

   function transformData(data) {
    const dataObj = data;

    const dates = Object.keys(dataObj);
    //console.log(dates)
    const values = [];

    for (let key in dataObj) {
      values.push(dataObj[key]);
    } 
    console.log(values)

   setState({
      ...state,
      dates: [...dates.reverse()],
      values: [...values.reverse()],
    });
  } 

  function renderChart() {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: state.dates,
        datasets: [
          {
            label: "BITCOIN PRICE INDEX",
            data: state.values,
            fill: true,
            borderColor: "black",
            backgroundColor: "blue",
            tension: 0.1,
          },
        ],
      },
    });

    setChartInstance(chart);
  }

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Graph;