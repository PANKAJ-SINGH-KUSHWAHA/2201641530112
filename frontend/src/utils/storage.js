const KEY = "short_links_v1";

export function loadLinks() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveLinks(newLinks) {
  const existing = loadLinks();
  const merged = [...existing, ...newLinks];
  localStorage.setItem(KEY, JSON.stringify(merged));
}
