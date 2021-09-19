import "./ChartComponent.css";

import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

export default function ChartComponent({ data }) {
  const [chartObject, setChartObject] = useState(null);

  useEffect(() => {
    if (chartObject) {
      chartObject.destroy();
    }

    const chartData = {
      labels: [...data.dates],
      datasets: [
        {
          label: "Bit Coin Price Index",
          data: [...data.values],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: "line",
      data: chartData,
      options: {},
    };

    const myChart = new Chart(document.querySelector("#myChart"), config);

    setChartObject(myChart);
  }, [data]);

  return <canvas id="myChart"></canvas>;
}
