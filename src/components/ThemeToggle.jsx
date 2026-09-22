export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light" : "Switch to dark"}
      className="neu-inset-sm relative flex h-9 w-[68px] items-center px-1"
      style={{ borderRadius: 999 }}
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2.5 text-[13px] opacity-70">
        <span>☀</span>
        <span>☾</span>
      </span>
      <span
        className="neu-btn relative z-10 flex h-7 w-7 items-center justify-center text-sm"
        style={{
          borderRadius: 999,
          transform: isDark ? "translateX(32px)" : "translateX(0)",
          transition: "transform 0.25s cubic-bezier(0.34,1.3,0.64,1)",
        }}
      >
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
