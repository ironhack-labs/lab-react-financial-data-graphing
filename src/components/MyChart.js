import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import axios from "axios";


function MyChart() {
    
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [chart, setChart] = useState();
  const [indexStart, setIndexStart] = useState(0);
  const [indexEnd, setIndexEnd] = useState(0);


  useEffect(() => {
    async function fetchData() {
      try { 
        const response = await axios.get(
          "http://api.coindesk.com/v1/bpi/historical/close.json"
        );
        
        const entries = Object.entries(response.data.bpi)
        entries.sort((a, b) => {
          return new Date(a[0]) - new Date(b[0]);
        });
        
        setDates(entries.map((currentArr) => currentArr[0]));
        
        setPrices(entries.map((currentArr) => currentArr[1]));          
          } catch (err) {
            console.log(err);
          } 
    }
    fetchData();
    }, [])

   
   useEffect(() => {
    const ctx = document.getElementById("myChart");
    
    if (chart) {
      chart.destroy();
    }

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
        {
          label: "Bitcoin Price Index",
          data: prices,
          fill: false,
          borderColor: "rgb(176, 117, 235)",
          backgroundColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        ],
      },
    });

    setChart(myChart);
  }, [dates, prices]);


  function start(event) {
    const startDate = event.target.value
    setIndexStart(dates.indexOf(startDate))
  }

  function end(event) {
    const endDate = event.target.value
    setIndexEnd(dates.indexOf(endDate))
  }

  useEffect(() => {
        
    dates.sort((a, b) => {
      return new Date(a[0]) - new Date(b[0]);
    })

    const filterDate = dates.slice(indexStart, indexEnd + 1)
    console.log('filterDate:', filterDate)
 
    setDates(filterDate.map((currentElement) => currentElement))

  }, [indexEnd])


  return (
      <div className='container'>
        <div className='container'>
          <h1>Filters</h1>
          <label>From:</label>
          <input
          type="date" 
          id="from"
          onChange={start}
          />
          <label>To:</label>
          <input
          type="date"
          id="to" 
          onChange={end}
          />
        </div>
        <div className='container'>
          <canvas id="myChart" width="200" height="200"></canvas>
        </div>
    </div>
  )
}

export default MyChart;