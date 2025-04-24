

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/HeaderBar";
import TabBar from "../components/TabBar";
import WidgetContainer from "../components/WidgetContainer";
import Syst99App from "../apps/Syst99App";

const applicationList = [
  { key: "material", label: "Malzeme", component: "MaterialApp", transaction: "MAT01", description: "Malzeme Yönetimi" },
  { key: "production", label: "Üretim", component: "ProductionApp", transaction: "PRD01", description: "Üretim Takibi" },
  { key: "syst99", label: "Destek Tabloları", component: "Syst99App", transaction: "SYST99", description: "Destek Tabloları" }
];

// Widget tanımları
const widgetItems = [
  { key: "favorites", component: "FavoritesWidget", label: "Sık Kullanılanlar" },
  { key: "calendar", component: "CalendarWidget", label: "Takvim" },
  { key: "clock", component: "ClockWidget", label: "Saat" },
  { key: "mail", component: "MailWidget", label: "E-Posta" }
];

const sidebarItems = [
  { type: "home", key: "home", label: "Ana Sayfa", icon: "🏠" },
  { type: "divider", key: "d1" },
  ...applicationList.map(app => ({
    type: "app",
    key: app.key,
    label: app.label,
    icon: "🧩"
  })),
  { type: "divider", key: "d2" },
  { type: "settings", key: "settings", label: "Ayarlar", icon: "⚙️" }
];

const tabComponentMap = {
  material: () => <div>Malzeme Uygulaması</div>,
  production: () => <div>Üretim Uygulaması</div>,
  syst99: () => <Syst99App />
};

const Dashboard = () => {
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [userWidgets, setUserWidgets] = useState(() => {
    // Kullanıcıya özel widget dizilimini localStorage'dan yükle
    const userKey = "user-widgets-defaultUser";
    const last = localStorage.getItem(userKey);
    return last ? JSON.parse(last) : [];
  });

  const handleSidebarClick = (item) => {
    if (item.type === "app") {
      if (!openTabs.find(tab => tab.key === item.key)) {
        setOpenTabs([...openTabs, { key: item.key, label: item.label, component: item.component }]);
      }
      setActiveTab(item.key);
    } else if (item.key === "home") {
      
      setActiveTab(null); // Sadece aktif tabı kaldır, tabları kapatma!
      // setOpenTabs([]); // Bunu kaldırın!
    }
  };

  const handleTabClick = (key, close = false) => {
    if (close) {
      const newTabs = openTabs.filter(t => t.key !== key);
      setOpenTabs(newTabs);
      if (activeTab === key) setActiveTab(newTabs.length ? newTabs[newTabs.length - 1].key : null);
    } else setActiveTab(key);
  };

  // WidgetContainer'dan gelen değişiklikleri kaydet
  const handleWidgetsChange = (widgets) => {
    setUserWidgets(widgets);
    localStorage.setItem("user-widgets-defaultUser", JSON.stringify(widgets));
  };

  // Widget kütüphanesinden yeni widget ekle
  const handleAddWidget = (widget) => {
    if (!userWidgets.find(w => w.key === widget.key)) {
      const newWidgets = [...userWidgets, widget];
      setUserWidgets(newWidgets);
      localStorage.setItem("user-widgets-defaultUser", JSON.stringify(newWidgets));
    }
    setShowWidgetLibrary(false);
  };

  const [searchDropdown, setSearchDropdown] = useState(false);

  // Arama kutusuna tıklanınca transaction listesi açılır
  const handleSearchFocus = () => setSearchDropdown(true);
  const handleSearchBlur = () => setTimeout(() => setSearchDropdown(false), 200);

  // Transaction seçilince tab açılır
  const handleTransactionSelect = (app) => {
    if (!openTabs.find(tab => tab.key === app.key)) {
      setOpenTabs([...openTabs, { key: app.key, label: app.label }]);
    }
    setActiveTab(app.key);
    setSearchDropdown(false);
    setSearchValue("");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar items={sidebarItems} onItemClick={handleSidebarClick} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Header */}
        <div style={{ position: "relative" }}>
          <HeaderBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            userName={"Kullanıcı"}
            onSearchFocus={handleSearchFocus}
            onSearchBlur={handleSearchBlur}
          />
          {searchDropdown && (
            <div style={{
              position: "absolute",
              right: 60,
              top: 54,
              background: "#fff",
              border: "1px solid #d2d4e0",
              borderRadius: 8,
              boxShadow: "0 4px 16px #e0e2e8",
              minWidth: 340,
              zIndex: 100
            }}>
              {applicationList
                .filter(app =>
                  app.transaction.toLowerCase().includes(searchValue.toLowerCase()) ||
                  app.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                  app.description.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map(app => (
                  <div
                    key={app.key}
                    style={{
                      padding: "10px 18px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f1f5",
                      fontSize: 15
                    }}
                    onMouseDown={() => handleTransactionSelect(app)}
                  >
                    <span style={{ fontWeight: 600 }}>{app.transaction}</span>
                    {" - "}
                    <span>{app.description}</span>
                  </div>
                ))}
              {applicationList.filter(app =>
                app.transaction.toLowerCase().includes(searchValue.toLowerCase()) ||
                app.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                app.description.toLowerCase().includes(searchValue.toLowerCase())
              ).length === 0 && (
                <div style={{ padding: "10px 18px", color: "#888" }}>Sonuç bulunamadı.</div>
              )}
            </div>
          )}
        </div>
        {/* Tab bar ve içerik */}
        {openTabs.length > 0 && (
          <TabBar
            tabs={openTabs.map(tab => ({ ...tab, closable: true }))}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />
        )}
        <div style={{ flex: 1, overflow: "auto", padding: 24, background: "#f4f6f8", position: "relative" }}>
          {(openTabs.length === 0 || activeTab === null) ? (
            <WidgetContainer widgets={userWidgets} onWidgetsChange={handleWidgetsChange} />
          ) : (
            <div style={{ padding: 0 }}>
              {tabComponentMap[activeTab] ? tabComponentMap[activeTab]() : <div>Uygulama bulunamadı.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;