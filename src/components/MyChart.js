import { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import axios from "axios";


function MyChart() {
    
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [chart, setChart] = useState();
  const [indexStart, setIndexStart] = useState(null);
  const [indexEnd, setIndexEnd] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [maxValue, setMaxValue] = useState('');
  const [minValue, setMinValue] = useState('');

  useEffect(() => {
    async function fetchData() {
      try { 
        const response = await axios.get(
          `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`
        );
        const entries = Object.entries(response.data.bpi)
       
        setDates(entries.map((currentArr) => currentArr[0]));
        setPrices(entries.map((currentArr) => currentArr[1])); 

        const maximum = (entries.map((currentArr) => parseFloat(currentArr[1])))
        setMaxValue(maximum.reduce(function(prev, current) {
          return (prev > current) ? prev : current
        }))

        const minimum = (entries.map((currentArr) => parseFloat(currentArr[1])))
        setMinValue(minimum.reduce(function(prev, current) {
          return (prev < current) ? prev : current
        }))

          } catch (err) {
            console.log(err);
          } 
    }
    fetchData();
    }, [currency])

    function handleCurrency(event) {
      const newCurrency = event.target.value
      setCurrency(newCurrency)
    }
  

    function start(event) {
      setIndexStart(event.target.value)
    }
  
    function end(event) {
      setIndexEnd(event.target.value)
    }
  
    useEffect(() => {
  
      async function fetchDate() {

        if (indexStart && indexEnd !== null) {

        try { 
          const responseTwo = await axios.get(
            `https://api.coindesk.com/v1/bpi/historical/close.json?start=${indexStart}&end=${indexEnd}`
          );
          console.log(responseTwo)
          const entriesTwo = Object.entries(responseTwo.data.bpi)
          setDates(entriesTwo.map((currentArr) => currentArr[0]));
          setPrices(entriesTwo.map((currentArr) => currentArr[1]));
  
            const maximumAgain = (entriesTwo.map((currentArr) => parseFloat(currentArr[1])))
          setMaxValue(maximumAgain.reduce(function(prev, current) {
            return (prev > current) ? prev : current
          }))
          const minimumAgain = (entriesTwo.map((currentArr) => parseFloat(currentArr[1])))
          setMinValue(minimumAgain.reduce(function(prev, current) {
            return (prev < current) ? prev : current
          }))
          }
         catch (err) {
        console.log(err);        
      }}
      fetchDate()
    
    }}, [indexStart, indexEnd, currency])
  

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


  return (
    <div className='m-5'>
      <div className="d-flex justify-content-around">
        <div className='container'>
          <div className='mb-2'>
            <h3>
            <strong>Filters</strong>
            </h3>
            <label className="pe-2">From: </label>
            <input
              type="date" 
              name="from"
              onChange={start}
            />
              <label className="m-1">To: </label>
              <input
                type="date"
                name="to" 
                onChange={end}
              />
          </div>
          <div className='pe-2'>
            <label className="pe-2">Currency:</label>
            <select name="select"
              onChange={handleCurrency}>
              <option value="USD" selected>US Dolar</option>
              <option value="BRL">BRL Real</option>
              <option value="EUR">EUR Euro</option>
            </select>
          </div>
        </div>
        <div className="justify-content-end">
          <h3>
            <strong>Values</strong>
          </h3>
          <label className="mb-2">
            Max: {maxValue} {currency}
          </label>
          <label className="mb-2">
            Min: {minValue} {currency}
          </label>
        </div>
      </div>
        <div className='container mt-5'>
          <canvas id="myChart" width="120" height="50"></canvas>
        </div>
    </div>
  )
}

export default MyChart;
