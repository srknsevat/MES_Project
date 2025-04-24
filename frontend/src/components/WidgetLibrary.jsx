import React from 'react';
// Widget ikon ve isimlerini dizide toplayın
const widgetLibrary = [
  { key: "calendar", name: "Takvim", icon: <CalendarSVG /> },
  { key: "clock", name: "Saat", icon: <ClockSVG /> },
  // ... diğer widgetler
];

const WidgetLibrary = ({ onSelectWidget, onClose }) => (
  <div style={{
    position: "absolute", left: 60, bottom: 80, zIndex: 50, background: "#fff",
    border: "3px solid #adadb4", borderRadius: 10, padding: 20, minWidth: 900
  }}>
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      {widgetLibrary.map(w => (
        <div draggable 
          key={w.key}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', width: 90, margin: 14, cursor: "grab"
          }}
          onDragStart={e => e.dataTransfer.setData("widgetKey", w.key)}
          onClick={() => onSelectWidget(w.key)}
        >
          {w.icon}
          <span style={{marginTop: 7, color: "#48506a", fontSize: 15}}>{w.name}</span>
        </div>
      ))}
    </div>
    <button onClick={onClose} style={{position: "absolute", top: 10, right: 10, fontSize: 18}}>×</button>
  </div>
);

export default WidgetLibrary;