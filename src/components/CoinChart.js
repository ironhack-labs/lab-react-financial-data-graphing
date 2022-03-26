import axios from "axios";

function CoinChart() {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then((response) => {
      console.log(response);
    });

  return <div></div>;
}

export default CoinChart;
