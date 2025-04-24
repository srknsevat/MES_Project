import React from "react";

const sidebarSections = [
  { type: "icon", icon: "home", label: "Ana Sayfa", key: "home" },
  { type: "divider", key: "d1" },
  { type: "icon", icon: "menu", label: "Menü", key: "menu" },
  { type: "divider", key: "d2" },
  { type: "icon", icon: "clock", label: "Saat", key: "clock" },
  { type: "icon", icon: "heart", label: "Favoriler", key: "heart" },
  { type: "divider", key: "d3" },
  { type: "icon", icon: "info", label: "Bilgi", key: "info" },
  { type: "divider", key: "d4" },
  { type: "icon", icon: "calendar", label: "Takvim", key: "calendar" },
  { type: "icon", icon: "megaphone", label: "Duyuru", key: "megaphone" },
  { type: "divider", key: "d5" },
  { type: "icon", icon: "settings", label: "Ayarlar", key: "settings" }
];

const icons = {
  home: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 5L5 14H9V27H23V14H27L16 5Z" stroke="#495486" strokeWidth="2.2" strokeLinejoin="round"/></svg>,
  menu: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="7" y="11" width="18" height="2.3" rx="1" fill="#495486"/><rect x="7" y="18" width="18" height="2.3" rx="1" fill="#495486"/></svg>,
  clock: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="#495486" strokeWidth="2.2"/><path d="M16 9V16L22 19" stroke="#495486" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  heart: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 28C16 28 5 20 5 13.5C5 9.36 8.6 6 13 6C15.47 6 16 9 16 9C16 9 16.53 6 19 6C23.4 6 27 9.36 27 13.5C27 20 16 28 16 28Z" stroke="#495486" strokeWidth="2.2"/></svg>,
  info: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="#495486" strokeWidth="2.2"/><rect x="15" y="13" width="2" height="7" rx="1" fill="#495486"/><rect x="15" y="10" width="2" height="2" rx="1" fill="#495486"/></svg>,
  calendar: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="10" width="20" height="16" rx="3" stroke="#495486" strokeWidth="2.2"/><path d="M6 15H26" stroke="#495486" strokeWidth="2.2"/><rect x="11" y="5" width="2" height="5" rx="1" fill="#495486"/><rect x="19" y="5" width="2" height="5" rx="1" fill="#495486"/></svg>,
  megaphone: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M7 19V13L25 7V25L7 19Z" stroke="#495486" strokeWidth="2.2" strokeLinejoin="round"/><path d="M7 16.5V19C7 21 13 21 13 17" stroke="#495486" strokeWidth="2.2" strokeLinejoin="round"/></svg>,
  settings: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" stroke="#495486" strokeWidth="2.2"/><path d="M16 12V20M20 16H12" stroke="#495486" strokeWidth="2.2" strokeLinecap="round"/></svg>
};

const Sidebar = ({ onItemClick }) => (
  <div style={{
    width: 58,
    background: "#fafbfd",
    borderRight: "1px solid #e3e6ef",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "14px 0 0 0"
  }}>
    {sidebarSections.map((item, i) =>
      item.type === "divider" ? (
        <hr key={item.key} style={{
          width: 30,
          border: "none",
          borderTop: "1px solid #d2d5e5",
          margin: "21px 0"
        }} />
      ) : (
        <button
          key={item.key}
          onClick={() => {
            console.log("Sidebar tıklandı:", item.key);
            if (onItemClick) onItemClick(item);
          }}
          style={{
            background: "none",
            border: "none",
            borderRadius: 10,
            marginBottom: 10,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
          title={item.label}
        >
          {icons[item.icon]}
        </button>
      )
    )}
  </div>
);

export default Sidebar;