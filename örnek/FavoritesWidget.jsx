import React, { useState, useRef } from "react";

function FavoritesWidget({ onRemove, initialWidth = 220, initialHeight = 140 }) {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const resizing = useRef(false);

  const handleMouseDown = (e) => {
    resizing.current = { startX: e.clientX, startY: e.clientY, ...size };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizing.current) return;
    const dx = e.clientX - resizing.current.startX;
    const dy = e.clientY - resizing.current.startY;
    setSize({
      width: Math.max(120, resizing.current.width + dx),
      height: Math.max(80, resizing.current.height + dy)
    });
  };

  const handleMouseUp = () => {
    resizing.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{
      width: size.width,
      height: size.height,
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px #bfc3d1",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* İçerik */}
      <button onClick={onRemove} style={{ position: "absolute", top: 6, right: 6 }}>✖</button>
      {/* Resize handle */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          right: 0, bottom: 0,
          width: 18, height: 18,
          cursor: "nwse-resize",
          background: "rgba(180,180,180,0.3)"
        }}
      />
    </div>
  );
}

export default FavoritesWidget;