import "./MaxMin.css";

const MaxMin = ({ data, currency }) => {
  return (
    <div className="max-min-container">
      <h3>Values</h3>
      <p>
        Max: {Math.max(...data.values)} {currency}
      </p>
      <p>
        Min: {Math.min(...data.values)} {currency}
      </p>
    </div>
  );
};

export default MaxMin;
