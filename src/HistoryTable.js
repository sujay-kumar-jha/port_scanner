import React, { useEffect, useState } from 'react';
function HistoryTable({ username }) {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/history/${username}`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [username]);

  return (
    <div>
      <h2>Scan History</h2>
      <table border="1">
        <thead>
          <tr><th>Timestamp</th><th>Target</th><th>Country</th><th>City</th></tr>
        </thead>
        <tbody>
          {history.map((entry, i) => (
            <tr key={i}>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
              <td>{entry.target}</td>
              <td>{entry.geo.country || 'N/A'}</td>
              <td>{entry.geo.city || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default HistoryTable;