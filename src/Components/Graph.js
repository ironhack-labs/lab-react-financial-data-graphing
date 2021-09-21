import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Graph(props) {
  const { dates, setDates } = props;
  const [state, setState] = useState({
    dates: [],
    values: [],
  });
  const [chartInstance, setChartInstance] = useState(null);
  const [indices, setIndices] = useState({
    start: 0,
    end: 30,
  });
  console.log(indices);

  useEffect(() => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        transformData(response.data.bpi);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    renderChart();
  }, [indices]);

  useEffect(() => {
    updateData();
  }, [dates]);

  function transformData(data) {
    const dataObj = data;
    const dates = Object.keys(dataObj);

    const values = [];

    for (let key in dataObj) {
      values.push(dataObj[key]);
    }

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
        labels: state.dates.slice(indices.start, indices.end),
        datasets: [
          {
            label: "BITCOIN PRICE INDEX",
            data: state.values.slice(indices.start, indices.end),
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

  function updateData() {
    console.log("update is running");
    let indexInitial = state.dates.indexOf(dates.end);
    let indexEnd = state.dates.indexOf(dates.start);
     setIndices({
      ...indices,
      start: indexInitial,
      end: indexEnd,
    }); 
  }

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default Graph;
