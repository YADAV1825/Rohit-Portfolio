import { socials } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14">
      <div className="neu-raised p-6 text-center md:p-12">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">Contact</h2>
        <p className="neu-muted mx-auto mt-2 max-w-[52ch] text-sm md:text-base">
          Have a systems or AI problem worth building? Send a note.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="mailto:yrohit1825@gmail.com" className="neu-btn neu-btn-primary px-7 py-3 text-sm font-semibold">
            yrohit1825@gmail.com
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="neu-pill px-4 py-2 text-xs font-medium">
              {s.name}
            </a>
          ))}
        </div>
        <p className="neu-muted mt-8 text-xs">Rohit Yadav, NIT Jalandhar. Built with neumorphism.</p>
      </div>
    </section>
  );
}
