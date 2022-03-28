import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

function MyChart() {
    const [dates, setDates] = useState([]);
    const [pricesVariation, setPricesVariation] = useState([]);
    const [chart, setChart] = useState();

    const[start, setStart] = useState();
    const[end, setEnd] = useState();
    const[currency, setCurrency] = useState('USD');

    const[values, setValues] = useState();

    function handleFilterStart(event) {
      setStart(event.target.value)
    };
    
    function handleFilterEnd(event) {
      setEnd(event.target.value)
    };

    function handleCurrency(event) {
      setCurrency(event.target.value);
    }

    function handleValues(event) {
      setValues(event.target.value);
    }

    useEffect(() => {
      if (start && end) {
        async function fetchData() {
          try {
            const response = await axios.get(
              `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`
            );

            const entries = Object.entries(response.data["bpi"]);
            setDates(entries.map((currentArr) => currentArr[0]));
            setPricesVariation(entries.map((currentArr) => currentArr[1]));
            
          } catch (err) {
            console.error(err);
          }
        }
        fetchData();
      } 

    }, [start, end, currency]);

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
              onChange={handleFilterStart}
            />
            <label>
              <strong>To:</strong>
            </label>
            <input type="date" id="to" onChange={handleFilterEnd} />
          </div>
          <div>
            <label>
              <strong>Currency:</strong>
            </label>
            <select value={currency} className="mt-3" onChange={handleCurrency}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div>
            <h2>Values</h2>
            <p>max: {Math.max(...pricesVariation)} {currency}</p>
            <p>min: {Math.min(...pricesVariation)} {currency}</p>
          </div>
        </div>
        <div style={{ position: "relative", height: "600px" }}>
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    );
}
export default MyChart; 

