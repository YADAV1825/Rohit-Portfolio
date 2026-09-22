export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="neu-raised p-6 md:p-10">
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">About</h2>
          <p className="mt-4 leading-relaxed">
            Pre-final year IT undergrad at NIT Jalandhar. I like the layer below the framework:
            tokenizers, kernels, schedulers, memory.
          </p>
          <p className="neu-muted mt-3 leading-relaxed">
            Built 25+ LLMs on TPU clusters, a 32-bit OS, a compiler toolchain and clinical AI
            models. Currently focused on LLM internals, distributed systems and AI infrastructure.
          </p>
        </div>
        <div className="neu-inset flex flex-col justify-center p-6 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest opacity-60">Now focused on</p>
          <ul className="mt-3 space-y-2 text-base font-medium">
            {["LLM internals and scaling", "Distributed training", "AI infrastructure", "Low-level systems"].map((x) => (
              <li key={x} className="neu-raised-sm px-4 py-3">{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
