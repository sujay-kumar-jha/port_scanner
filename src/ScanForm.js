import React, { useState } from 'react';
function ScanForm({ onScan, username }) {
  const [target, setTarget] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, username }),
    });
    const data = await res.json();
    onScan(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Enter IP or domain" required />
      <button type="submit">Scan</button>
    </form>
  );
}
export default ScanForm;