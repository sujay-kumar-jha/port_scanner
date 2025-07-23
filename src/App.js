import React, { useState, useEffect } from 'react';
import Login from './login.js';
import Register from './register.js';
import ScanForm from './ScanForm';
import ResultTable from './ResultTable';
import DownloadButton from './DownloadButton';
import HistoryTable from './HistoryTable';

function App() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [geo, setGeo] = useState(null);

  const handleScanResult = (data) => {
    setResults(data.results);
    setGeo(data.geo);
  };

  return (
    <div className="App">
      <h1>Port Scanner</h1>
      {!user ? (
        <>
          <Login setUser={setUser} />
          <Register />
        </>
      ) : (
        <>
          <p>Welcome, {user}!</p>
          <ScanForm onScan={handleScanResult} username={user} />
          {geo && <p>Location: {geo.city}, {geo.country} ({geo.query})</p>}
          <ResultTable results={results} />
          <DownloadButton results={results} />
          <HistoryTable username={user} />
        </>
      )}
    </div>
  );
}

export default App;