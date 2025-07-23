function ResultTable({ results }) {
  return (
    <table>
      <thead>
        <tr><th>Port</th><th>Status</th><th>Service</th></tr>
      </thead>
      <tbody>
        {results.map((res, i) => (
          <tr key={i}>
            <td>{res.port}</td>
            <td style={{ color: res.state === 'open' ? 'green' : 'red' }}>{res.state}</td>
            <td>{res.service}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ResultTable;
