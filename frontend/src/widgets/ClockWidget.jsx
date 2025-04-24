import React, { useEffect, useState } from "react";

const ClockWidget = ({ onRemove }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      border: "1px solid #bcbdc4",
      borderRadius: 6,
      background: "#fff",
      fontFamily: "Segoe UI, Arial",
      width: 220,
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <div style={{
        borderBottom: "1px solid #bbbbbb",
        padding: "5px 11px 3px 10px",
        fontWeight: 500,
        fontSize: 14,
        color: "#3d4252",
        background: "#ededf2",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        minHeight: 29,
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{ marginRight: 7 }}>⏰</span> Saat
        <span style={{ flex: 1 }} />
        <button
          title="Kapat"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#828692",
            fontWeight: "bold",
            fontSize: 16
          }}
          onClick={onRemove}
        >×</button>
      </div>
      <div style={{ fontSize: "2rem", padding: "18px 0", textAlign: "center" }}>{time.toLocaleTimeString()}</div>
    </div>
  );
};

export default ClockWidget;