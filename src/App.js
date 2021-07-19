import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';

function App() {

  const [ graphData, setGraphData ] = useState(null)
  const [ startDate, setStartDate ] = useState("2021-07-01");
  const [ endDate, setEndDate ] = useState("2021-07-18");
 
  useEffect(() => {
    getBPIdata();
  }, [])

  useEffect(() => {
    getBPIdata();
  }, [startDate, endDate])

  const getBPIdata = async () => {
    try {
      // let bitcoinData = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json');
      let bitcoinData = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
      const { bpi } = bitcoinData.data;
      const labels = [];
      const data = [];
      
      for (let key in bpi) {
        labels.push(key)
        data.push(bpi[key])
      }

      const newGraphData = {
        labels: labels,
        datasets: [
          {
            label: 'BPI',
            backgroundColor: 'rgba(0,125,192,1)',
            borderColor: 'rgba(0,0,0,2)',
            borderWidth: 2,
            data: data
          }
        ]
      }
      setGraphData(newGraphData)
    }
    catch(error) {
      throw new Error('ERROR BITCOIN DATA', error);
    }
  }

  const handleDateChange = event => {
    if (event.target.name === "startDate") {
      setStartDate(event.target.value);
    }
    else if(event.target.name === "endDate") {
      setEndDate(event.target.value);
    }
    console.log(startDate, endDate)
  }

  if (!graphData) {
    return <h1>Loading . . .</h1>
  }

  return (
    <div style={{ width: "800px"}}>
      <input name="startDate" type="date" onChange={handleDateChange} />
      <input name="endDate" type="date" onChange={handleDateChange} />
      <select>
        <option value="usd">USD</option>
        <option value="euro">EURO</option>
      </select>
      <Line
        data={graphData}
        options={{
          title:{
            display:true,
            text:'BPI',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  );
}

export default App;
