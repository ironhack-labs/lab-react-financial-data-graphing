import axios from "axios";
import React, { Component } from "react";
import Chart from "chart.js/auto";

class Graph extends Component {
  state = {
    data: null,
    dates: [],
    values: [],
    filter: {
      startDate: "",
      endDate: "",
    },
  };

  handleChange = (event) => {
    const filtered = { ...this.state };
    filtered.filter = {
      ...filtered.filter,
      [event.target.name]: event.target.value,
    };
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://api.coindesk.com/v1/bpi/historical/close.json"
      );
      this.setState({
        data: {
          ...response.data.bpi,
        },
        dates: Object.keys(response.data.bpi),
        values: Object.values(response.data.bpi),
      });
      this.renderChart();
    } catch (err) {
      console.error(err);
    }
  };

  renderChart = () => {
    let ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.state.dates,
        datasets: [
          {
            label: "Bitcoin Prices",
            data: this.state.values,
            backgroundColor: "#2ecc71",
            borderColor: "#27ae60",
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  render() {
    return (
      <div>
        <div className="form-group">
          <label>Starting date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Ending date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            onChange={this.handleChange}
          />
        </div>
        <canvas id="myChart" width="200"></canvas>
      </div>
    );
  }
}

export default Graph;
