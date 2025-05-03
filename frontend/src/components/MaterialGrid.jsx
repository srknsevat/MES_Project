import React from "react";
import "./MaterialGrid.css";

const MaterialGrid = ({ columns = [], data = [] }) => {
  return (
    <div className="material-grid-container">
      <table className="material-grid-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="material-grid-th">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="material-grid-empty">
                Kayıt bulunamadı.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col.key} className="material-grid-td">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialGrid;