import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function MyChart() {
    const [dates, setDates] = useState([]);
    const [pricesVariation, setPricesVariation] = useState([]);
    const [chart, setChart] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "http://api.coindesk.com/v1/bpi/historical/close.json"
                );
                const entries = Object.entries(response.data["bpi"]);

                setDates(entries.map((currentArr) => currentArr[0]));
                setPricesVariation(entries.map((currentArr) => currentArr[1]));
                console.log(entries);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

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
        <div style={{ position: "relative", height: "600px" }}>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    );
}
export default MyChart;
