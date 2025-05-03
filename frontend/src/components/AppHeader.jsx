import React from "react";
import "./AppHeader.css";

const AppHeader = ({
  icon,
  title,
  company,
  logo,
  buttons = [],
  extraContent
}) => {
  return (
    <div className="app-header">
      <div className="app-header-left">
        {icon && <span className="app-header-icon">{icon}</span>}
        <div>
          <div className="app-header-title">{title}</div>
          <div className="app-header-company">{company}</div>
        </div>
      </div>
      <div className="app-header-right">
        {buttons.map(btn => (
          <button
            key={btn.key}
            className="app-header-btn"
            onClick={btn.onClick}
            disabled={btn.loading}
            title={btn.label}
          >
            {btn.loading
              ? <span className="app-header-btn-icon">⏳</span>
              : btn.icon && <span className="app-header-btn-icon">{btn.icon}</span>
            }
            {btn.label}
          </button>
        ))}
        {extraContent}
        {logo && (
          <img src={logo} alt="logo" className="app-header-logo" />
        )}
      </div>
    </div>
  );
};

export default AppHeader;