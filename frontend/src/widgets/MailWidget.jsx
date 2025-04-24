import React, { useRef } from "react";

const MailWidget = ({ onRemove, width = 320, height = 120, onResize }) => {
  const resizing = useRef(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = { startX: e.clientX, startY: e.clientY, startWidth: width, startHeight: height };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizing.current) return;
    const dx = e.clientX - resizing.current.startX;
    const dy = e.clientY - resizing.current.startY;
    if (onResize) {
      onResize(dx, dy);
    }
  };

  const handleMouseUp = () => {
    resizing.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{
      border: "1px solid #bcbdc4",
      borderRadius: 6,
      background: "#fff",
      fontFamily: "Segoe UI, Arial",
      width: width,
      height: height,
      minWidth: 120,
      minHeight: 80,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative"
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
        <span style={{ marginRight: 7 }}>📧</span> Mail
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
      <ul style={{ margin: 0, padding: "12px 18px" }}>
        <li>mail1@example.com - 2 Okunmamış</li>
        <li>mail2@example.com - 1 Okunmamış</li>
      </ul>
      {/* Resize handle */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          right: 0, bottom: 0,
          width: 18, height: 18,
          cursor: "nwse-resize",
          background: "rgba(180,180,180,0.3)",
          zIndex: 10
        }}
      />
    </div>
  );
};

export default MailWidget;