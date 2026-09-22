import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className="neu-raised-sm mt-4 flex h-16 items-center justify-between px-4 sm:px-6"
          style={{ borderRadius: 20 }}
        >
          <a href="#top" className="flex items-center gap-3">
            <span
              className="neu-inset-sm flex h-10 w-10 items-center justify-center text-lg font-black"
              style={{ borderRadius: 14 }}
            >
              R
            </span>
            <span className="hidden text-sm font-bold tracking-wide sm:block">
              Rohit Yadav
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:opacity-70"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggle} />
            <button
              className="neu-btn px-4 py-2 text-sm font-semibold lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? "Close" : "Menu"}
            </button>
            <a
              href="#contact"
              className="neu-btn neu-btn-primary hidden px-5 py-2.5 text-sm font-semibold lg:inline-block"
            >
              Hire me
            </a>
          </div>
        </nav>

        {open && (
          <div className="neu-raised mt-2 flex flex-col gap-1 p-3 lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
