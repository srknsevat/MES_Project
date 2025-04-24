import React, { useState } from "react";

const aylar = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const gunler = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function getMonthDays(yil, ay) {
  // 0-indexed month
  const firstDay = new Date(yil, ay, 1).getDay();
  const days = [];
  let weekday = (firstDay + 6) % 7; // Pazartesi'yle başlat
  for (let i = 0; i < weekday; i++) days.push({ prev: true });
  const totalDays = new Date(yil, ay + 1, 0).getDate();
  for (let i = 1; i <= totalDays; i++) days.push({ day: i });
  const after =
    7 - (days.length % 7) === 7 ? 0 : 7 - (days.length % 7);
  for (let i = 1; i <= after; i++) days.push({ next: true });
  return days;
}

function getWeekDayTR(date) {
  return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"][date.getDay()];
}

const CalendarWidget = ({ onRemove }) => {
  const today = new Date();
  const [yil, setYil] = useState(today.getFullYear());
  const [ay, setAy] = useState(today.getMonth());
  const [secili, setSecili] = useState(today);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState("month"); // month/year

  const days = getMonthDays(yil, ay);
  const highlightDay = (d) =>
    secili.getFullYear() === yil && secili.getMonth() === ay && secili.getDate() === d;

  return (
    <div style={{
      border: "1px solid #bcbdc4",
      borderRadius: 6,
      background: "#fff",
      fontFamily: "Segoe UI, Arial",
      width: 350,
      minHeight: 410,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Başlık */}
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
        Takvim
        <span style={{ flex: 1 }} />
        {/* Ayarlar butonu */}
        <button title="Ayarlar"
          style={{
            marginRight: 6,
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
          onClick={() => setShowSettings(v => !v)}
        >
          <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="7" stroke="#a3a6ab" strokeWidth="1.3"/><path d="M8 4V8L10.8 9.3" stroke="#aaa" strokeWidth="1.2"/></svg>
        </button>
        {/* Kapatma butonu */}
        <button title="Kapat"
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
      {/* Ayarlar Paneli*/}
      {showSettings && (
        <div style={{
          background: "#f6f7fb",
          padding: 14,
          borderBottom: "1px solid #eee",
          fontSize: 13
        }}>
          <div>
            <label>
              <input
                type="radio"
                checked={mode === "month"}
                onChange={() => setMode("month")}
              /> Ay
            </label>
            {" "}
            <label>
              <input
                type="radio"
                checked={mode === "year"}
                onChange={() => setMode("year")}
              /> Yıl
            </label>
          </div>
          <div style={{ marginTop: 8 }}>
            <span>Dilediğiniz tarih ayarlarını buradan yapabilirsiniz.</span>
          </div>
        </div>
      )}
      {/* Bugün info ve seçili tarih gösterimi */}
      <div style={{
        background: "#f4f4f7",
        borderBottom: "1px solid #ecedf5",
        padding: "15px 18px 11px 18px"
      }}>
        <div style={{ color: "#9699a2", fontSize: 14 }}>Bugün etkinlik yok</div>
        <div style={{ fontWeight: 500, fontSize: 32, color: "#454554", display: "flex", alignItems: "flex-end" }}>
          {secili.getDate()}
          <span style={{ fontSize: 20, fontWeight: 400, marginLeft: 6 }}>
            {aylar[secili.getMonth()]} {secili.getFullYear()}
          </span>
        </div>
        <div style={{ color: "#b0b0ba", marginTop: -4, fontSize: 15 }}>{getWeekDayTR(secili)}</div>
      </div>
      {/* Ay/yıl seçici ve görünüm tuşları */}
      <div style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderBottom: "1px solid #e4e4ec",
        padding: "8px 16px",
        justifyContent: "center",
        gap: 10
      }}>
        <select
          value={yil}
          onChange={e => setYil(Number(e.target.value))}
          style={{ fontSize: 13, padding: "2px 6px", marginRight: 7 }}
        >
          {[...Array(5)].map((_, i) => {
            const v = today.getFullYear() - 1 + i;
            return <option key={v} value={v}>{v}</option>
          })}
        </select>
        <select
          value={ay}
          onChange={e => setAy(Number(e.target.value))}
          style={{ fontSize: 13, padding: "2px 8px", marginRight: 7 }}
        >
          {aylar.map((ad, i) => <option key={i} value={i}>{ad}</option>)}
        </select>
        <button style={{
          background: mode === "month" ? "#edeff4" : "#fff",
          border: "1px solid #bfd0eb",
          color: mode === "month" ? "#2e57a5" : "#555",
          fontWeight: 600,
          padding: "2px 15px",
          borderRadius: 5,
          marginRight: 3,
          cursor: "pointer"
        }} onClick={() => setMode("month")}>
          Month
        </button>
        <button style={{
          background: mode === "year" ? "#edeff4" : "#fff",
          border: "1px solid #bfd0eb",
          color: mode === "year" ? "#2e57a5" : "#555",
          fontWeight: 600,
          padding: "2px 10px",
          borderRadius: 5,
          cursor: "pointer"
        }} onClick={() => setMode("year")}>
          Year
        </button>
      </div>
      {/* Takvim Kısmı */}
      <div style={{
        padding: "12px 18px 0 18px",
        flex: 1,
        background: "#fff"
      }}>
        <table style={{ fontSize: 15, width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ color: "#afb4be" }}>
              {gunler.map((g, i) => <th key={i} style={{ paddingBottom: 8 }}>{g}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array(Math.ceil(days.length / 7)).fill().map((_, row) =>
              <tr key={row}>
                {days.slice(row * 7, row * 7 + 7).map((d, i) => (
                  <td key={i} style={{
                    textAlign: "center",
                    padding: 0,
                    paddingBottom: 9
                  }}>
                    {d.prev || d.next ?
                      <span style={{ color: "#e0e0e2" }}>{d.day || ""}</span>
                      : <span
                        style={{
                          display: "inline-block",
                          minWidth: 22,
                          minHeight: 21,
                          borderRadius: 6,
                          fontWeight: highlightDay(d.day) ? 700 : 500,
                          background: highlightDay(d.day) ? "#1080fa" : "transparent",
                          color: highlightDay(d.day) ? "#fff" : "#333",
                          cursor: "pointer",
                          lineHeight: "22px"
                        }}
                        onClick={() => setSecili(new Date(yil, ay, d.day))}
                      >{d.day}</span>
                    }
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarWidget;