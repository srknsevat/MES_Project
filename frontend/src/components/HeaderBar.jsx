import React from "react";

const HeaderBar = ({ searchValue, onSearchChange, userName, onSearchFocus, onSearchBlur }) => {
  return (
    <div style={{
      width: "100%",
      height: 62,
      background: "linear-gradient(90deg, #f4f6f8 60%, #e9ebf0 100%)",
      boxShadow: "0 2px 8px #e0e2e8",
      display: "flex",
      alignItems: "center",
      padding: "0 32px",
      borderBottom: "1px solid #e0e2e8",
      position: "relative",
      zIndex: 10
    }}>
      <div style={{ fontWeight: 700, fontSize: 22, color: "#3d4252", letterSpacing: 1 }}>
        MES Dashboard
      </div>
      <div style={{ flex: 1 }} />
      <input
        type="text"
        placeholder="Ara veya transaction kodu yazın..."
        value={searchValue}
        onChange={e => onSearchChange(e.target.value)}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        style={{
          padding: "8px 16px",
          borderRadius: 8,
          border: "1px solid #d2d4e0",
          fontSize: 15,
          background: "#fff",
          marginRight: 24,
          minWidth: 220,
          boxShadow: "0 1px 4px #f0f1f5"
        }}
      />
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#f7f8fa",
        borderRadius: 20,
        padding: "6px 18px",
        fontWeight: 500,
        fontSize: 15,
        color: "#3d4252",
        boxShadow: "0 1px 4px #e0e2e8"
      }}>
        <span style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#d2d4e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 17,
          color: "#5a5e6b"
        }}>
          {userName?.[0] || "K"}
        </span>
        {userName}
      </div>
    </div>
  );
};

export default HeaderBar;