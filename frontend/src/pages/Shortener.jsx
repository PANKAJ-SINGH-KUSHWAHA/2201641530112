import { useState } from "react";
import { saveLinks } from "../utils/storage";

export default function Shortener() {
  const [urls, setUrls] = useState([{ longURL: "", validity: "", code: "" }]);
  const [error, setError] = useState("");

  function handleChange(i, field, value) {
    const updated = urls.map((u, idx) =>
      idx === i ? { ...u, [field]: value } : u
    );
    setUrls(updated);
  }

  function addRow() {
    if (urls.length >= 5) {
      setError("Max 5 URLs at once.");
      return;
    }
    setUrls([...urls, { longURL: "", validity: "", code: "" }]);
  }

  function shorten() {
    const newLinks = urls
      .map((u) => {
        if (!u.longURL.startsWith("http")) {
          setError("Invalid URL");
          return null;
        }
        const code = u.code || Math.random().toString(36).substring(2, 7);
        const validity = parseInt(u.validity) || 30;
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + validity * 60000);
        return {
          id: code,
          longURL: u.longURL,
          createdAt,
          expiresAt,
          clicks: 0,
          visits: [],
        };
      })
      .filter(Boolean);

    if (newLinks.length > 0) {
      saveLinks(newLinks);
      setError("");
      setUrls([{ longURL: "", validity: "", code: "" }]);
    }
  }

  return (
    <div className="card">
      <h2>Shorten URLs</h2>
      {urls.map((u, i) => (
        <div key={i} className="url-form">
          <input
            placeholder="Enter long URL"
            value={u.longURL}
            onChange={(e) => handleChange(i, "longURL", e.target.value)}
          />
          <input
            placeholder="Validity (minutes)"
            value={u.validity}
            onChange={(e) => handleChange(i, "validity", e.target.value)}
          />
          <input
            placeholder="Custom code (optional)"
            value={u.code}
            onChange={(e) => handleChange(i, "code", e.target.value)}
          />
        </div>
      ))}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={addRow}> Add More</button>
        <button onClick={shorten}>Shorten</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
