import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function Graph(props) {
  const { dates, state, setState } = props;
  const [chartInstance, setChartInstance] = useState(null);
  const [indices, setIndices] = useState({
    start: 0,
    end: 30,
  });
  
  useEffect(() => {
    axios
      .get("http://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        transformData(response.data.bpi);
      })
      .catch((err) => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderChart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indices, dates]);

  useEffect(() => {
    updateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      dates: [...dates],
      values: [...values],
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
            fill: false,
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
    let indexInitial = state.dates.indexOf(dates.start);
    let indexEnd = state.dates.indexOf(dates.end);

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
