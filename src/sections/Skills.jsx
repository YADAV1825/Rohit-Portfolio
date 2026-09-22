import { skillsData } from "../data/portfolio";
import { useIsMobile } from "../hooks/useTheme";

export default function Skills() {
  const isMobile = useIsMobile();
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="neu-raised p-6 md:p-10">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">Skills</h2>
        <p className="neu-muted mt-2 text-sm md:text-base">Four tracks, all built from scratch.</p>
        <div className={`mt-8 grid gap-5 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {skillsData.map((s, i) => (
            <div key={s.title} className={i % 2 === 0 ? "neu-inset p-6" : "neu-raised-sm p-6"}>
              <p className="text-lg font-bold">{s.title}</p>
              <p className="neu-muted mt-1 text-sm">{s.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span key={item} className="neu-pill px-3 py-1.5 text-xs font-medium">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
