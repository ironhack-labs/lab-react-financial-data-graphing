import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./DatesFilter.css";

const DatesFilter = ({ filterUrl, setFilterUrl }) => {
  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });

  useEffect(() => {
    if (dateFilter.from && dateFilter.to) {
      setFilterUrl({
        ...filterUrl,
        date: `start=${dateFilter.from}&end=${dateFilter.to}`,
      });
    }
  }, [dateFilter]);

  return (
    <div className="dates-filer-container">
      <h3>Filters</h3>
      <div className="dates-filter-fields">
        <p>From:</p>
        <input
          onChange={(e) =>
            setDateFilter({ ...dateFilter, from: e.target.value })
          }
          value={dateFilter.from}
          max={dateFilter.to}
          className="from-date-filter"
          type="date"
          name="from"
        />
        <p>To:</p>
        <input
          onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
          value={dateFilter.to}
          min={dateFilter.from}
          className="to-date-filter"
          type="date"
          name="to"
        />
      </div>
    </div>
  );
};

export default DatesFilter;
