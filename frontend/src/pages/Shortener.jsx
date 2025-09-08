import { useState } from "react";
import { saveLinks } from "../utils/storage";
import { Log } from "../../../logging-middleware/index.js"; // adjust path

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
      Log("frontend", "warn", "component", "Tried to add more than 5 URLs");
      return;
    }
    setUrls([...urls, { longURL: "", validity: "", code: "" }]);
    Log("frontend", "info", "component", "Added new URL input row");
  }

  function deleteRow(index) {
    if (urls.length === 1) {
      setError("At least one row required.");
      Log("frontend", "warn", "component", "Tried to delete last URL row");
      return;
    }
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
    Log("frontend", "info", "component", `Deleted row ${index + 1}`);
  }

  function shorten() {
    const newLinks = urls
      .map((u) => {
        if (!u.longURL.startsWith("http")) {
          setError("Invalid URL");
          Log("frontend", "error", "component", "Invalid URL entered");
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
      Log("frontend", "info", "component", "URLs shortened successfully");
      setError("");
      setUrls([{ longURL: "", validity: "", code: "" }]);
    }
  }

  return (
    <div className="card">
      <h2 className="title">URL Shortener</h2>
      <p className="subtitle">
        Enter up to <strong>5 URLs</strong> and create short links instantly.
      </p>

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
          <button className="delete-btn" onClick={() => deleteRow(i)}>
            Delete
          </button>
        </div>
      ))}

      <div className="btn-group">
        <button className="btn add" onClick={addRow}>
           Add More
        </button>
        <button className="btn shorten" onClick={shorten}>
           Shorten
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
