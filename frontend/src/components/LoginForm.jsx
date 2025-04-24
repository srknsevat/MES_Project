import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const defaultLanguages = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
];

function LoginForm({
  backgroundImage = "/images/default-bg.png",
  logo = "/images/default-logo.png",
  languages = defaultLanguages,
  version = "0.0.0",
  onLogin = () => {},
}) {
  const [selectedLang, setSelectedLang] = useState(languages[0].code);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Storage işlemlerinde JSON.stringify/parse doğru kullanılmalı
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // API URL ortam değişkeniyle esnek
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Giriş başarısız!");
      }
      const result = await response.json();
      localStorage.setItem("authData", JSON.stringify(result));
      onLogin(result);
      console.log("Giriş başarılı, dashboard'a yönlendiriliyor");
      navigate("/dashboard");
      // Başarılı girişten sonra yönlendirme yapılabilir
    } catch (err) {
      setError(err.message || "Bir hata oluştu.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,rgba(255,255,255,0.65),rgba(240,242,248,0.65))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* Arka plan resmi ekstra geniş ve üstten/yanlardan formdan taşacak şekilde */}
      <div style={{
        position: "absolute",
        left: "calc(50% - 350px)",
        top: "calc(50% - 200px)",
        width: 590,
        height: 400,
        background: `linear-gradient(35deg,rgba(0,0,0,0.34) 5%,rgba(68,68,68,0.22) 54%,rgba(255,255,255,0.11) 98%), url(${backgroundImage}) center/cover no-repeat`,
        borderRadius: "12px",
        boxShadow: "0 8px 58px 13px rgba(32,36,50,0.13)",
        zIndex: 1
      }} />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 390
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(251,251,251,0.90)",
            boxShadow: "0 3.5px 32px 0 rgba(46,54,74,0.12), 0 0 0 1.2px #e6eaf2",
            borderRadius: "5px",
            padding: "40px 38px 27px 34px",
            minWidth: 340,
            minHeight: 315,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Dil seçici - formun sağ üstünde */}
          <div style={{
            position: "absolute",
            right: 18,
            top: 13,
            background: "rgba(255,255,255,0.90)",
            boxShadow: "0 1.5px 4px 0 rgba(110,120,140,0.07)",
            borderRadius: 8,
            padding: "2.5px 11px",
            zIndex: 10
          }}>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              style={{
                border: "none",
                background: "transparent",
                fontWeight: "bold",
                fontSize: 15,
                color: "#3a4157",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {languages.map((lang) => (
                <option value={lang.code} key={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Logo (ortada) */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 27,
              marginTop: 10
            }}
          >
            <img src={logo} alt="logo" style={{ height: 38, filter: "drop-shadow(0 1.1px 1.5px #dde)" }} />
          </div>

          <label style={{ alignSelf: "flex-start", fontWeight: "bold", color: "#353d54", marginBottom: 2 }}>
            Kullanıcı Adı
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 14,
              padding: "7px 11px",
              fontSize: 16,
              border: "1px solid #c5ccdb",
              borderRadius: 2,
              background: "#f5f7fa",
              outline: "none"
            }}
          />

          <label style={{ alignSelf: "flex-start", fontWeight: "bold", color: "#353d54", marginBottom: 2 }}>
            Parola
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              marginBottom: 18,
              padding: "7px 11px",
              fontSize: 16,
              border: "1px solid #c5ccdb",
              borderRadius: 2,
              background: "#f5f7fa",
              outline: "none"
            }}
          />

          {error && (
            <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#15305d",
              color: "#fff",
              border: "none",
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: 16,
              letterSpacing: 0.3,
              boxShadow: "0 1.5px 5.5px 0 rgba(32,40,63,0.10)"
            }}
          >
            OTURUMU BAŞLAT
          </button>

          {/* Sürüm */}
          <span
            style={{
              position: "absolute",
              right: 18,
              bottom: 12,
              fontSize: 12,
              color: "#888",
              letterSpacing: 0.1
            }}
          >
            {version}
          </span>
        </form>
      </div>
    </div>
  );
}
LoginForm.propTypes = {
  backgroundImage: PropTypes.string,
  logo: PropTypes.string,
  languages: PropTypes.array,
  version: PropTypes.string,
  onLogin: PropTypes.func,
};
export default LoginForm;