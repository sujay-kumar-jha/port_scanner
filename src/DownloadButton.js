import React from 'react';

function DownloadButton({ results }) {
  const handleDownload = () => {
    if (!results || results.length === 0) return;

    const timestamp = new Date().toLocaleString();
    const openPorts = results.filter(r => r.state === 'open').length;
    const closedPorts = results.filter(r => r.state !== 'open').length;

    const htmlContent = `<!DOCTYPE html>
<html>
<head><title>Port Scan Report</title></head>
<body>
  <h1>Detailed Port Scan Report</h1>
  <p><strong>Scan Date:</strong> ${timestamp}</p>
  <p><strong>Total Ports Scanned:</strong> ${results.length}</p>
  <p><strong>Open Ports:</strong> ${openPorts}</p>
  <p><strong>Closed/Filtered Ports:</strong> ${closedPorts}</p>
  <hr />
  <table border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr><th>Port</th><th>Status</th><th>Service</th></tr>
    </thead>
    <tbody>
      ${results.map(res => `<tr><td>${res.port}</td><td>${res.state}</td><td>${res.service}</td></tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'detailed_scan_report.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} disabled={!results.length}>Download Detailed HTML Report</button>
  );
}

export default DownloadButton;