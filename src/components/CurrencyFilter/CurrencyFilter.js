import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import "./CurrencyFilter.css";

const CurrencyFilter = ({ filterUrl, setFilterUrl }) => {
  const [currency, setCurrency] = useState(filterUrl.currency);

  useEffect(() => {
    setFilterUrl({ ...filterUrl, currency });
  }, [currency]);

  return (
    <div className="currency-filter-container">
      <p>Currency:</p>
      <select
        onChange={(e) => setCurrency(e.target.value)}
        value={currency}
        className="currency-filter-select"
      >
        <option value="USD">US Dollar ($)</option>
        <option value="BRL">BR Real (R$)</option>
      </select>
    </div>
  );
};

export default CurrencyFilter;
