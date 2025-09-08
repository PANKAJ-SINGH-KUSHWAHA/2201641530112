import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadLinks, saveLinks } from "../utils/storage";

export default function Redirect() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const links = loadLinks();
    const found = links.find((l) => l.id === code);

    if (!found) {
      navigate("/");
      return;
    }

    const now = new Date();
    if (now > new Date(found.expiresAt)) {
      navigate("/");
      return;
    }

    found.clicks++;
    found.visits.push({ ts: now, ref: document.referrer });
    saveLinks(links);

    window.location.href = found.longURL;
  }, [code, navigate]);

  return <p>Redirecting...</p>;
}
