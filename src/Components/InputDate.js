import  React from "react";

function InputDate(props) {
  const {dates, setDates, state} = props;
console.log(dates)
  return (
    <div className="searchBar">
      <h3>From</h3>
      <input
        className="bar"
        value={dates.start}
        key="random1"
        min={state.dates[0]}
        type="date"
        placeholder={"Search Product"}
        onChange={(e) => setDates({
      ...dates,
      start: e.target.value,
    })}
      />
            <h3>To</h3>
      <input
        className="bar"
        value={dates.end}
        key="random2"
        min={state.dates[0]}
        max={state.dates[state.dates.length -1]}
        type="date"
        placeholder={"Search Product"}
        onChange={(e) => setDates({
      ...dates,
      end: e.target.value,
    })}
      />
      <div>
        <label>
          <p>Search specific dates </p>
        </label>
      </div>
    </div>
  );
}

export default InputDate;
