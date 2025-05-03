import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function DEVT40Transaction() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleExecute = async () => {
    setError("");
    setResult(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/sql/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sorgu hatası");
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "0 auto", bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>DEVT40 Transaction Sorgu Çalıştırıcı</Typography>
      <TextField
        label="SQL Sorgusu"
        multiline
        minRows={3}
        fullWidth
        value={sql}
        onChange={e => setSql(e.target.value)}
        placeholder="SELECT * FROM ...;"
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleExecute}>Sorguyu Çalıştır</Button>
      {error && <Typography color="error" mt={2}>{error}</Typography>}
      {result && (
        <Box mt={2}>
          <Typography variant="subtitle2">Sonuç:</Typography>
          <pre style={{ maxHeight: 200, overflow: "auto", background: "#f5f5f5", padding: 8 }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
}