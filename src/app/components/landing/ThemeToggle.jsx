"use client";

export default function ThemeToggle({ theme, onToggleTheme }) {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={onToggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)] transition hover:-translate-y-0.5 hover:bg-[color:var(--surface-strong)] focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {theme === "dark" ? (
        <span className="text-base">🌙</span>
      ) : (
        <span className="text-base">☀️</span>
      )}
    </button>
  );
}
