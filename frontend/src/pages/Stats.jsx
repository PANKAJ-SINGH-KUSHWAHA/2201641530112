import { useEffect, useState } from "react";
import { loadLinks } from "../utils/storage";

export default function Stats() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(loadLinks());
  }, []);

  return (
    <div className="card">
      <h2>URL Statistics</h2>
      {links.length === 0 ? (
        <p className="empty">No links shortened yet.</p>
      ) : (
        <div className="table-container">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Long URL</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.id}>
                  <td>
                    <a href={`/${l.id}`} target="_blank" rel="noreferrer">
                      /{l.id}
                    </a>
                  </td>
                  <td className="truncate">{l.longURL}</td>
                  <td>{new Date(l.createdAt).toLocaleString()}</td>
                  <td>{new Date(l.expiresAt).toLocaleString()}</td>
                  <td>{l.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
