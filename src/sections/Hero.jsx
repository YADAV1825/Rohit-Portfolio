import { RESUME_URL, socials } from "../data/portfolio";
import { useIsMobile } from "../hooks/useTheme";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-24 md:pt-28">
      <div
        className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-5"}`}
      >
        <div className="neu-raised col-span-5 flex flex-col justify-center p-8 md:col-span-3 md:p-12">
          <p className="neu-pill inline-flex w-fit items-center px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
            Systems + AI builder
          </p>
          <h1 className="mt-5 text-4xl font-black leading-none tracking-tight md:text-6xl">
            Rohit Yadav
          </h1>
          <p className="neu-muted mt-4 max-w-[52ch] text-base leading-relaxed md:text-lg">
            IT undergrad at NIT Jalandhar building LLMs, AI systems, compilers and infrastructure from scratch.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#work" className="neu-btn neu-btn-primary px-6 py-3 text-sm font-semibold">
              View work
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="neu-btn px-6 py-3 text-sm font-semibold">
              Resume
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {socials.slice(0, 5).map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="neu-pill px-3 py-1.5 text-xs font-medium">
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className={`flex flex-col gap-6 ${isMobile ? "col-span-1" : "col-span-2"}`}>
          <div className="neu-raised overflow-hidden p-3">
            <img
              src="/images/rohit2.jpeg"
              alt="Portrait of Rohit Yadav"
              className="h-64 w-full rounded-2xl object-cover md:h-72"
              loading="eager"
            />
          </div>
          <div className="neu-inset grid grid-cols-3 gap-2 p-4 text-center">
            {[
              ["25+", "LLMs built"],
              ["500B+", "tokens trained"],
              ["400+", "DSA solved"],
            ].map(([n, l]) => (
              <div key={l} className="p-2">
                <p className="text-xl font-black md:text-2xl">{n}</p>
                <p className="neu-muted text-xs">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
