import { useEffect, useState } from "react";
import MacbookShowcase from "../components/MacbookShowcase";
import { projects } from "../data/portfolio";
import { useIsMobile } from "../hooks/useTheme";

const AUTOPLAY_MS = 5000;

function ArrowButton({ dir, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="neu-btn flex h-12 w-12 items-center justify-center"
      style={{ borderRadius: 999 }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === "left" ? "none" : "rotate(180deg)" }}
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMobile = useIsMobile();

  const active = projects[activeIndex] ?? projects[0];

  // 5s autoplay clock. Resets on every project change or pause toggle,
  // so clicking an arrow cleanly restarts the loop.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [paused, activeIndex]);

  const goTo = (index) => {
    const n = (index + projects.length) % projects.length;
    setActiveIndex(n);
    setPaused(false);
  };

  const selectFromCard = (index) => {
    setActiveIndex(index);
    if (isMobile) setPaused(true);
  };

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="neu-raised p-6 md:p-10">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">Selected work</h2>
        <p className="neu-muted mt-2 max-w-[60ch] text-sm md:text-base">
          Six builds, one screen. GiniVibe plays live inside the device. Pick a project below.
        </p>

        <div
          className="relative mt-8"
          onMouseEnter={isMobile ? undefined : () => setPaused(true)}
          onMouseLeave={isMobile ? undefined : () => setPaused(false)}
        >
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <div className="hidden shrink-0 md:block">
              <ArrowButton dir="left" label="Previous project" onClick={() => goTo(activeIndex - 1)} />
            </div>

            <div className="min-w-0 flex-1">
              <MacbookShowcase key={active.id} project={active} />
            </div>

            <div className="hidden shrink-0 md:block">
              <ArrowButton dir="right" label="Next project" onClick={() => goTo(activeIndex + 1)} />
            </div>
          </div>

          {/* Mobile + desktop control row: arrows flank the dots */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="md:hidden">
              <ArrowButton dir="left" label="Previous project" onClick={() => goTo(activeIndex - 1)} />
            </div>
            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${p.name}`}
                  className="h-2 rounded-full"
                  style={{
                    width: i === activeIndex ? 28 : 8,
                    background: i === activeIndex ? "var(--neu-accent)" : "var(--neu-muted)",
                    opacity: i === activeIndex ? 1 : 0.45,
                    transition: "width 0.3s ease, opacity 0.3s ease",
                  }}
                />
              ))}
            </div>
            <div className="md:hidden">
              <ArrowButton dir="right" label="Next project" onClick={() => goTo(activeIndex + 1)} />
            </div>
          </div>
        </div>

        <div className={`mt-8 grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"}`}>
          {projects.map((p, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={p.id}
                onClick={() => selectFromCard(i)}
                onMouseEnter={isMobile ? undefined : () => { setPaused(true); setActiveIndex(i); }}
                onMouseLeave={isMobile ? undefined : () => setPaused(false)}
                onFocus={() => { setPaused(true); setActiveIndex(i); }}
                onBlur={() => setPaused(false)}
                className={selected ? "neu-inset p-5 text-left" : "neu-raised-sm p-5 text-left"}
                style={{ borderRadius: 18, order: selected ? -1 : 0 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-60">{p.tagline}</p>
                <p className="mt-1 text-lg font-bold">{p.name}</p>
                <p className="neu-muted mt-2 line-clamp-3 text-sm leading-relaxed">{p.description}</p>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {p.frameworks.map((f) => (
                    <span key={f} className="neu-pill px-2.5 py-1 text-[11px] font-medium">{f}</span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <div className="neu-inset mt-6 flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold">{active.name}</p>
            <p className="neu-muted text-sm">{active.tagline}</p>
          </div>
          <a href={active.href} target="_blank" rel="noopener noreferrer" className="neu-btn neu-btn-primary px-6 py-3 text-center text-sm font-semibold">
            Open project
          </a>
        </div>
      </div>
    </section>
  );
}
