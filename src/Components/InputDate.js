import  React from "react";

function InputDate(props) {
  const {initialDate, setInitialDate, endDate, setEndDate} = props;
  /*    
    const handleInputchange = (event) => {
      if (isChecked) {
        setStock(oldList);
      }
      if (!isChecked) {
        setStock(newList);
      }
      setIsChecked(!isChecked);
    };
 */
console.log(initialDate)
console.log(endDate)

  return (
    <div className="searchBar">
      <h3>From</h3>
      <input
        className="bar"
        value={initialDate}
        key="random1"
        min="2021-08-20"
        type="date"
        placeholder={"Search Product"}
        onChange={(e) => setInitialDate(e.target.value)}
      />
            <h3>To</h3>
      <input
        className="bar"
        value={endDate}
        key="random2"
        min={initialDate}
        max="2021-09-19"
        type="date"
        placeholder={"Search Product"}
        onChange={(e) => setEndDate(e.target.value)}
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
