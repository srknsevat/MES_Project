import React, { useState } from "react";
import AppHeader from "../components/AppHeader";
import MaterialGrid from "../components/MaterialGrid";
import AddMaterialModal from "../components/AddMaterialModal";

const filters = [
  { key: "malzemeKodu", label: "Malzeme Kodu", type: "text", placeholder: "Malzeme kodu girin" },
  { key: "malzemeTipi", label: "Malzeme Tipi", type: "select", options: [
      { value: "hammadde", label: "Hammadde" },
      { value: "yarimamul", label: "Yarı Mamul" },
      { value: "mamul", label: "Mamul" }
    ]
  },
  // İhtiyaca göre daha fazla filtre ekleyebilirsiniz
];

// Add this before function MaterialApp()
function ExampleComponent() {
  return (
    <div style={{ padding: 16, background: "#e8f0fe", borderRadius: 8, marginTop: 12 }}>
      <strong>Extra Info:</strong> This is a sample component.
    </div>
  );
}

function MaterialApp() {
  const [dropdownValue, setDropdownValue] = useState("copy");
  const [filterValues, setFilterValues] = useState({});
  const [gridData, setGridData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const columns = [
    { key: "malzemeKodu", label: "Malzeme Kodu" },
    { key: "malzemeTipi", label: "Malzeme Tipi" },
    { key: "malzemeAdi", label: "Malzeme Adı" }
  ];

  // Filtre alanları için ayrı bir component
  const FilterPanel = ({ filters, values, onChange }) => (
    <div style={{
      width: 260,
      minWidth: 220,
      background: "#f7f8fa",
      borderRight: "1px solid #e0e0e0",
      padding: "24px 18px 18px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 18
    }}>
      {filters.map(filter => (
        <div key={filter.key} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: 13, color: "#555", marginBottom: 3 }}>{filter.label}</label>
          {filter.type === "select" ? (
            <select
              value={values[filter.key] || ""}
              onChange={e => onChange({ ...values, [filter.key]: e.target.value })}
              style={{ padding: "7px 10px", borderRadius: 3, border: "1px solid #b0b0b0", fontSize: 15 }}
            >
              <option value="">Seçiniz</option>
              {filter.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={filter.type || "text"}
              value={values[filter.key] || ""}
              onChange={e => onChange({ ...values, [filter.key]: e.target.value })}
              placeholder={filter.placeholder}
              style={{ padding: "7px 10px", borderRadius: 3, border: "1px solid #b0b0b0", fontSize: 15 }}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Arama butonuna basınca filtreye göre veri çek
  const handleSearch = () => {
    setSearchLoading(true);
    // Burada API'den veri çekebilirsiniz, örnek veri:
    setTimeout(() => {
      setGridData([
        { malzemeKodu: "MAT001", malzemeTipi: "hammadde", malzemeAdi: "Çelik" },
        { malzemeKodu: "MAT002", malzemeTipi: "mamul", malzemeAdi: "Vida" }
      ]);
      setSearchLoading(false);
    }, 800);
  };

  // Eksik fonksiyonları ekleyin:
  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleAddSubmit = async (form) => {
    try {
      const response = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Malzeme eklenemedi");
      const newMaterial = await response.json();
      setGridData(prev => [...prev, newMaterial]);
      setAddModalOpen(false);
    } catch (err) {
      alert("Malzeme eklenirken hata oluştu!");
    }
  };
  const handleEdit = () => {
    alert("Seçili malzeme düzenlenecek!");
  };
  const handleDelete = () => {
    alert("Seçili malzeme silinecek (soft delete)!");
  };
  const handleHistory = () => {
    alert("Seçili malzemenin geçmişi görüntülenecek!");
  };
  const handleExport = () => {
    alert("Dışa aktarma işlemi başlatıldı!");
  };

  return (
    <div style={{ display: "flex", height: "100%", background: "#f4f6f8" }}>
      {/* Sol filtre paneli */}
      <FilterPanel
        filters={filters}
        values={filterValues}
        onChange={setFilterValues}
      />
      {/* Sağ ana içerik */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppHeader
          icon={<span role="img" aria-label="malzeme">🧱</span>}
          title="Malzeme Ana Kayıtları"
          company="Industrial Application Software GmbH"
          logo="/ias-logo.png"
          buttons={[
            { key: "add", label: "Yeni", icon: <span role="img" aria-label="add">➕</span>, onClick: handleAdd },
            { key: "search", label: "Ara", icon: <span role="img" aria-label="search">🔍</span>, onClick: handleSearch, loading: searchLoading },
            { key: "edit", label: "Düzenle", icon: <span role="img" aria-label="edit">✏️</span>, onClick: handleEdit },
            { key: "delete", label: "Sil", icon: <span role="img" aria-label="delete">🗑️</span>, onClick: handleDelete },
            { key: "history", label: "Geçmiş", icon: <span role="img" aria-label="history">📜</span>, onClick: handleHistory },
            { key: "export", label: "Dışa Aktar", icon: <span role="img" aria-label="export">⬇️</span>, onClick: handleExport }
          ]}
        />
        <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
          <MaterialGrid columns={columns} data={gridData} />
          {/* Malzeme ekleme modalı ayrı component olarak çağrılıyor */}
          <AddMaterialModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleAddSubmit} />
          {/* Yeni eklenen örnek component */}
          <div style={{ marginTop: 24 }}>
            <ExampleComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialApp;