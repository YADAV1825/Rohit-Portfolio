import { achievements } from "../data/portfolio";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="neu-raised p-6 md:p-10">
        <h2 className="text-3xl font-black tracking-tight md:text-4xl">Achievements</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.title} className="neu-raised-sm flex flex-col justify-between p-5">
              <div>
                <span className="neu-pill inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
                  {a.category}
                </span>
                <p className="mt-3 text-sm font-semibold leading-snug">{a.title}</p>
              </div>
              {a.link && (
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="neu-btn mt-4 px-4 py-2 text-center text-xs font-semibold">
                  View proof
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
