import React from "react";

const TabBar = ({ tabs, activeTab, onTabClick }) => (
  <div style={{
    width: "100%",
    background: "#f5f7fb",
    borderBottom: "1.5px solid #e3e6ef",
    display: "flex",
    alignItems: "center",
    minHeight: 40,
    padding: "0 20px",
    gap: 6
  }}>
    {tabs.map(tab => (
      <div
        key={tab.key}
        onClick={() => onTabClick(tab.key)}
        style={{
          background: activeTab === tab.key ? "#fff" : "#e9ebf4",
          border: activeTab === tab.key ? "1.5px solid #b7c4db" : "1px solid #e4e9f3",
          borderBottom: activeTab === tab.key ? "2px solid #3a5ca6" : "none",
          borderRadius: "7px 7px 0 0",
          padding: "6px 20px 4px 12px",
          fontWeight: 500,
          color: "#495486",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          minWidth: 92,
          marginRight: 3,
          position: "relative"
        }}
      >
        {tab.label}
        {tab.closable && (
          <button
            onClick={e => {
              e.stopPropagation();
              onTabClick(tab.key, true);
            }}
            style={{
              marginLeft: 8,
              background: "transparent",
              border: "none",
              color: "#a0a3af",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: 17,
              lineHeight: "14px"
            }}
            title="Sekmeyi Kapat"
          >
            ×
          </button>
        )}
      </div>
    ))}
  </div>
);

export default TabBar;