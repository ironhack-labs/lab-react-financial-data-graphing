import  React from "react";

function InputDate(props) {
  const {dates, setDates} = props;

  return (
    <div className="searchBar">
      <h3>From</h3>
      <input
        className="bar"
        value={dates.start}
        key="random1"
        min="2021-08-20"
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
        min="2021-08-20"
        max="2021-09-20"
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
