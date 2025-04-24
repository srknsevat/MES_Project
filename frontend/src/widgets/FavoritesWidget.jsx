import React, { useState } from "react";

const mockFavorites = [
  {
    code: "MAMT01",
    name: "Mail Uygulama Yönetimi",
    icon: "📧"
  },
  {
    code: "CLBT11",
    name: "CANIAS Ajanda",
    icon: "👤"
  },
  {
    code: "SSMT49",
    name: "Günlük Katılım Çalışan Self Servis",
    icon: "📍"
  },
  {
    code: "EXMT02",
    name: "Masraf Takibi"
  },
  {
    code: "CLBT12",
    name: "CANIAS Şirket Çizelgesi",
    icon: "👥"
  },
  {
    code: "PRJT12",
    name: "",
    icon: "📄"
  }
];

const tabList = [
  { key: "history", label: "Geçmiş" },
  { key: "favorites", label: "Sık Kullanılanlar" }
];

const FavoritesWidget = ({ onRemove }) => {
  const [activeTab, setActiveTab] = useState("favorites");

  return (
    <div style={{
      border: "1px solid #bcbdc4",
      borderRadius: 6,
      background: "#fff",
      fontFamily: "Segoe UI, Arial",
      fontSize: 13,
      color: "#404050",
      width: "100%",
      height: 330,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Başlık */}
      <div style={{
        borderBottom: "1px solid #d6d7df",
        padding: "5px 12px 3px 10px",
        fontWeight: 500,
        fontSize: 14,
        color: "#3d4252",
        background: "#f9f9fb",
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        minHeight: 30,
        display: "flex",
        alignItems: "center"
      }}>
        Sık Kullanılanlar
        <span style={{ flex: 1 }} />
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#9096a2",
            fontWeight: "bold",
            fontSize: 17
          }}
          title="Kapat"
          tabIndex={-1}
          onClick={onRemove}
        >×</button>
      </div>
      {/* Tab başlıkları */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #eeeeee",
        fontSize: 13,
        background: "#fcfcfe"
      }}>
        {tabList.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "6px 14px 5px 15px",
              cursor: "pointer",
              fontWeight: activeTab === tab.key ? 600 : 500,
              color: activeTab === tab.key ? "#3d4252" : "#7a7b87",
              background: activeTab === tab.key ? "#fff" : "none",
              borderBottom: activeTab === tab.key ? "2px solid #668" : "2px solid transparent",
              outline: "none"
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {/* İçerik */}
      <div style={{
        padding: 0,
        overflowY: "auto",
        flex: 1,
        background: "#fff"
      }}>
        {activeTab === "favorites" ? (
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {mockFavorites.map((fav, idx) => (
              <li key={fav.code + idx} style={{
                display: "flex",
                alignItems: "flex-start",
                borderBottom: idx === mockFavorites.length - 1 ? "none" : "1px solid #eee",
                padding: "9px 10px 5px 10px",
                cursor: "pointer",
                transition: "background 0.15s",
                background: "none"
              }} onMouseOver={e => e.currentTarget.style.background="#fafbff"} onMouseOut={e => e.currentTarget.style.background="none"}>
                <span style={{
                  marginRight: 9,
                  fontSize: 15,
                  marginTop: 2,
                  color: "#7680a1"
                }}>
                  {fav.icon || "📄"}
                </span>
                <div>
                  <span style={{ display: "block", color: "#2a3960", fontWeight: 600 }}>{fav.code}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#757c95" }}>{fav.name}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: "#a3a3b2", fontSize: 13, padding: 15 }}>Hiç geçmiş yok.</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesWidget;