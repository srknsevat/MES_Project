import React, { useState } from 'react';
import axios from 'axios';

function SqlEditor() {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleExecute = async () => {
    setError('');
    setResult(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/sql/execute`, { sql });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Bilinmeyen hata');
    }
  };

  return (
    <div>
      <textarea value={sql} onChange={e => setSql(e.target.value)} rows={6} style={{width: '100%'}} />
      <button onClick={handleExecute}>Çalıştır</button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      {result && (
        <table>
          <thead>
            <tr>
              {result.fields.map(f => <th key={f.name}>{f.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>
                {result.fields.map(f => <td key={f.name}>{row[f.name]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SqlEditor;