import React, { useState } from "react";

const AddMaterialModal = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    malzemeKodu: "",
    malzemeAdi: "",
    malzemeTipi: "",
    olcuBirimi: "",
    stokDurumu: "",
    ureticiFirma: "",
    tedarikSuresi: "",
    depolamaKoslullari: "",
    aktif: true
  });

  if (!open) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 340 }}>
        <h3>Yeni Malzeme Kartı</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input name="malzemeKodu" value={form.malzemeKodu} onChange={handleChange} placeholder="Malzeme Kodu" required />
          <input name="malzemeAdi" value={form.malzemeAdi} onChange={handleChange} placeholder="Malzeme Adı" required />
          <select name="malzemeTipi" value={form.malzemeTipi} onChange={handleChange} required>
            <option value="">Malzeme Tipi Seçiniz</option>
            <option value="hammadde">Hammadde</option>
            <option value="yarimamul">Yarı Mamul</option>
            <option value="mamul">Mamul</option>
          </select>
          <input name="olcuBirimi" value={form.olcuBirimi} onChange={handleChange} placeholder="Ölçü Birimi" />
          <input name="stokDurumu" value={form.stokDurumu} onChange={handleChange} placeholder="Stok Durumu" />
          <input name="ureticiFirma" value={form.ureticiFirma} onChange={handleChange} placeholder="Üretici Firma" />
          <input name="tedarikSuresi" value={form.tedarikSuresi} onChange={handleChange} placeholder="Tedarik Süresi (gün)" />
          <input name="depolamaKoslullari" value={form.depolamaKoslullari} onChange={handleChange} placeholder="Depolama Koşulları" />
          <label>
            <input type="checkbox" name="aktif" checked={form.aktif} onChange={handleChange} />
            Aktif
          </label>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button type="submit">Kaydet</button>
          <button type="button" onClick={onClose}>İptal</button>
        </div>
      </form>
    </div>
  );
};

export default AddMaterialModal;