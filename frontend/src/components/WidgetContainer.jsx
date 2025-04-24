import { useEffect, useState, useRef, useCallback } from 'react';
import FavoritesWidget from "../widgets/FavoritesWidget";
import CalendarWidget from "../widgets/CalendarWidget";
import ClockWidget from "../widgets/ClockWidget";
import MailWidget from "../widgets/MailWidget";

const widgetMap = {
  FavoritesWidget,
  CalendarWidget,
  ClockWidget,
  MailWidget
};

const widgetLibrary = [
  { key: "calendar", label: "Takvim", icon: "📅", component: "CalendarWidget", defaultSize: { width: 220, height: 140 } },
  { key: "clock", label: "Saat", icon: "🕒", component: "ClockWidget", defaultSize: { width: 220, height: 140 } },
  { key: "favorites", label: "Sık Kullanılanlar", icon: "❤️", component: "FavoritesWidget", defaultSize: { width: 220, height: 140 } },
  { key: "mail", label: "E-Posta", icon: "✉️", component: "MailWidget", defaultSize: { width: 220, height: 140 } }
];

function getCurrentUserId() {
  return "defaultUser";
}

// Dinamik çakışma kontrolü
function isOverlapping(x, y, width, height, widgets, skipIdx = null) {
  return widgets.some((w, i) => {
    if (i === skipIdx) return false;
    const wx = w.position.x;
    const wy = w.position.y;
    const wWidth = w.size?.width || 220;
    const wHeight = w.size?.height || 140;
    return (
      x < wx + wWidth &&
      x + width > wx &&
      y < wy + wHeight &&
      y + height > wy
    );
  });
}

// Dinamik boş pozisyon bulucu
function findFreePosition(widgets, startX, startY, width, height) {
  let x = startX;
  let y = startY;
  const step = 30;
  let tries = 0;
  while (isOverlapping(x, y, width, height, widgets) && tries < 100) {
    x += step;
    if (x + width > 900) {
      x = 60;
      y += step;
    }
    tries++;
  }
  return { x, y };
}

// Widget'ın köşesinden mouse ile boyutlandırma için handle
function ResizeHandle({ onResize }) {
  const resizing = useRef(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = { startX: e.clientX, startY: e.clientY };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!resizing.current) return;
    const dx = e.clientX - resizing.current.startX;
    const dy = e.clientY - resizing.current.startY;
    onResize(dx, dy);
  };

  const handleMouseUp = () => {
    resizing.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
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
  );
}

function WidgetContainer({ widgets = [], onWidgetsChange }) {
  // Widget'ların pozisyon ve boyut state'i
  const [visibleWidgets, setVisibleWidgets] = useState(
    widgets.map((w, i) => ({
      ...w,
      position: w.position || { x: 60 + i * 240, y: 160 },
      size: w.size || { width: 220, height: 140 }
    }))
  );
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryHover, setLibraryHover] = useState(false);
  const plusBtnRef = useRef();
  const containerRef = useRef();

  // LocalStorage'dan yükle
  useEffect(() => {
    const userKey = "user-widgets-" + getCurrentUserId();
    const last = localStorage.getItem(userKey);
    if (last) {
      const arr = JSON.parse(last);
      setVisibleWidgets(arr.map(w => ({
        ...w,
        size: w.size || { width: 220, height: 140 }
      })));
    }
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    const userKey = "user-widgets-" + getCurrentUserId();
    localStorage.setItem(userKey, JSON.stringify(visibleWidgets));
    if (onWidgetsChange) onWidgetsChange(visibleWidgets);
  }, [visibleWidgets, onWidgetsChange]);

  // Widget ekleme (kütüphaneden sürükle-bırak ile)
  const handleDrop = e => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("widgetType");
    if (!widgetType) return;
    const widgetDef = widgetLibrary.find(w => w.key === widgetType);
    if (!widgetDef || visibleWidgets.find(w => w.key === widgetDef.key)) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const width = widgetDef.defaultSize.width;
    const height = widgetDef.defaultSize.height;
    const pos = findFreePosition(visibleWidgets, x, y, width, height);
    setVisibleWidgets([
      ...visibleWidgets,
      { key: widgetDef.key, component: widgetDef.component, position: pos, size: { width, height } }
    ]);
    setShowLibrary(false);
    setLibraryHover(false);
  };

  // Widget'ı dashboard üzerinde taşımak için
  const handleWidgetDragStart = (e, idx) => {
    e.dataTransfer.setData("draggedWidgetIdx", idx);
  };

  const handleContainerDrop = e => {
    e.preventDefault();
    const idx = e.dataTransfer.getData("draggedWidgetIdx");
    if (idx === "" || idx === null) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const widgetsWithoutCurrent = visibleWidgets.filter((_, i) => i !== Number(idx));
    const width = visibleWidgets[idx].size?.width || 220;
    const height = visibleWidgets[idx].size?.height || 140;
    const pos = findFreePosition(widgetsWithoutCurrent, x, y, width, height);
    setVisibleWidgets(widgets =>
      widgets.map((w, i) =>
        i === Number(idx) ? { ...w, position: pos } : w
      )
    );
  };

  // Widget kaldırma
  const handleRemove = (key) => {
    setVisibleWidgets(visibleWidgets.filter(w => w.key !== key));
  };

  // Widget boyutlandırma
  const handleResize = useCallback((idx, dx, dy) => {
    setVisibleWidgets(widgets =>
      widgets.map((w, i) => {
        if (i !== idx) return w;
        const newWidth = Math.max(120, w.size.width + dx);
        const newHeight = Math.max(80, w.size.height + dy);
        // Çakışma kontrolü
        const widgetsWithoutCurrent = widgets.filter((_, j) => j !== i);
        const overlap = isOverlapping(w.position.x, w.position.y, newWidth, newHeight, widgetsWithoutCurrent);
        if (overlap) return w; // Çakışıyorsa boyutlandırma yapma
        return { ...w, size: { width: newWidth, height: newHeight } };
      })
    );
  }, []);

  // Widget kütüphanesi popup'ı
  const renderWidgetLibraryPopup = () => {
    let left = 40;
    if (plusBtnRef.current && containerRef.current) {
      const plusRect = plusBtnRef.current.getBoundingClientRect();
      const contRect = containerRef.current.getBoundingClientRect();
      left = plusRect.left - contRect.left - 30;
    }
    return (showLibrary || libraryHover) ? (
      <div
        style={{
          position: "absolute",
          left,
          bottom: 70,
          zIndex: 10,
          background: "#fff",
          border: "3px solid #bcbec4",
          borderRadius: 8,
          boxShadow: "0 4px 32px #bfc3d1",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          gap: 36,
          minWidth: 400
        }}
        onMouseEnter={() => setLibraryHover(true)}
        onMouseLeave={() => {
          setLibraryHover(false);
          setShowLibrary(false);
        }}
      >
        {widgetLibrary.map(widget => (
          <div
            key={widget.key}
            draggable
            onDragStart={e => e.dataTransfer.setData("widgetType", widget.key)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "grab",
              opacity: visibleWidgets.find(w => w.key === widget.key) ? 0.5 : 1,
              pointerEvents: visibleWidgets.find(w => w.key === widget.key) ? "none" : "auto",
              minWidth: 70
            }}
          >
            <span style={{ fontSize: 36 }}>{widget.icon}</span>
            <span style={{ marginTop: 6, fontSize: 15, color: "#3d4252" }}>{widget.label}</span>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 120px)",
          minHeight: 400,
          background: "#f4f6f8",
          overflow: "auto"
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          if (e.dataTransfer.getData("widgetType")) handleDrop(e);
          else handleContainerDrop(e);
        }}
      >
        {visibleWidgets.map((widget, idx) => {
          const WidgetComp = widgetMap[widget.component];
          if (!WidgetComp) return null;
          return (
            <div
              key={widget.key}
              draggable
              onDragStart={e => handleWidgetDragStart(e, idx)}
              style={{
                position: "absolute",
                left: widget.position.x,
                top: widget.position.y,
                zIndex: 2,
                width: widget.size.width,
                height: widget.size.height,
                minWidth: 120,
                minHeight: 80
              }}
            >
              <WidgetComp
                onRemove={() => handleRemove(widget.key)}
                width={widget.size.width}
                height={widget.size.height}
              />
              <ResizeHandle
                onResize={(dx, dy) => handleResize(idx, dx, dy)}
              />
            </div>
          );
        })}
        {/* Artı butonu ve popup */}
        <button
          ref={plusBtnRef}
          style={{
            position: "absolute",
            left: 18,
            bottom: 18,
            background: "#a7a8b1",
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "none",
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
            boxShadow: "0 2px 8px #d3d4da",
            zIndex: 20
          }}
          onClick={() => setShowLibrary(v => !v)}
          onMouseEnter={() => setLibraryHover(true)}
          onMouseLeave={() => setLibraryHover(false)}
        >+</button>
        {renderWidgetLibraryPopup()}
      </div>
    </div>
  );
}

export default WidgetContainer;