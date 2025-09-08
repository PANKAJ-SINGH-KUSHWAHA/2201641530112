// logging-middleware/index.js
const LOG_API = "http://20.244.56.144/evaluation-service/logs";

/**
 * Reusable logging function per the spec.
 * Enums restricted to lowercase values only.
 * Fails silently (no console.*).
 */
export default async function Log(stack, level, pkg, message) {
  const enums = {
    stack: ["backend", "frontend"],
    level: ["debug", "info", "warn", "error", "fatal"],
    fe: ["component", "hook", "page", "state", "style"],
    both: ["auth", "config", "middleware", "utils"]
  };

  try {
    const s = String(stack || "").toLowerCase();
    const l = String(level || "").toLowerCase();
    const p = String(pkg || "").toLowerCase();

    if (!enums.stack.includes(s)) throw new Error("invalid stack");
    if (!enums.level.includes(l)) throw new Error("invalid level");
    if (![...enums.fe, ...enums.both].includes(p)) throw new Error("invalid package");

    const body = JSON.stringify({ stack: s, level: l, package: p, message });

    await fetch(LOG_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  } catch {
    // swallow per requirements (no console logging allowed)
  }
}
