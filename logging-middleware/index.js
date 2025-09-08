const LOG_API = "http://20.244.56.144/evaluation-service/logs";

const validStacks = ["frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const validPackages = [
  
  // Frontend-only
  "component", "hook", "page", "state", "style",

  // Both
  "auth", "config", "middleware", "utils"
];

/**
 * Logs an event to the Test Server
 * @param {string} stack - "frontend"
 * @param {string} level - "debug" | "info" | "warn" | "error" | "fatal"
 * @param {string} pkg   - "auth" | "config" | "middleware" | "utils" | "component" | "hook" | "page" | "state" | "style"
 * @param {string} message - Log message
 */
export async function Log(stack, level, pkg, message) {
  if (!validStacks.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!validLevels.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!validPackages.includes(pkg)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const body = { stack, level, package: pkg, message };

  try {
    const response = await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 🔑 Add token if authentication is required
        // "Authorization": "Bearer <token>"
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Failed to send log:", response.statusText);
      return;
    }

    const data = await response.json();
    console.log("✅ Log created:", data);
  } catch (err) {
    console.error("Logging error:", err.message);
  }
}
