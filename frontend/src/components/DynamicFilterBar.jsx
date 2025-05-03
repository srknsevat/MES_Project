import React, { useState } from "react";
import "./DynamicFilterBar.css";

const DynamicFilterBar = ({ filters = [], onFilterChange }) => {
  const [values, setValues] = useState(
    filters.reduce((acc, f) => ({ ...acc, [f.key]: f.defaultValue || "" }), {})
  );

  const handleChange = (key, value) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    if (onFilterChange) onFilterChange(newValues);
  };

  return (
    <div className="dynamic-filter-bar">
      {filters.map(filter => (
        <div key={filter.key} className="dynamic-filter-item">
          <label className="dynamic-filter-label">{filter.label}</label>
          {filter.type === "select" ? (
            <select
              value={values[filter.key]}
              onChange={e => handleChange(filter.key, e.target.value)}
              className="dynamic-filter-select"
            >
              <option value="">Seçiniz</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type || "text"}
              value={values[filter.key]}
              onChange={e => handleChange(filter.key, e.target.value)}
              placeholder={filter.placeholder}
              className="dynamic-filter-input"
            />
          )}
        </div>
      ))}
      <button
        className="dynamic-filter-btn"
        onClick={() => onFilterChange && onFilterChange(values)}
      >
        Listele
      </button>
    </div>
  );
};

export default DynamicFilterBar;