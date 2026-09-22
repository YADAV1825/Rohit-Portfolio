import { useIsMobile } from "../hooks/useTheme";

const ROLES = [
  {
    role: "Full Stack Intern",
    org: "StudentVerse",
    orgSuffix: "Dubai",
    meta: "Aug 2026 - Present · Remote",
    points: [
      "Building responsive web and mobile screens and integrating APIs for student discovery.",
      "Deploying services with Docker and hosting on Azure for stable uptime and fast loads.",
    ],
  },
  {
    role: "Freelance Developer",
    org: "Self-employed",
    meta: "2024 - Present · Remote",
    badge: "Freelance",
    points: [
      "Shipping landing pages, dashboards and full-stack apps for clients.",
      "AI integrations, API work and fast neumorphic front ends.",
    ],
  },
  {
    role: "AI Research Intern",
    org: "Molsys Pvt. Ltd.",
    meta: "Jun 2026 - Jul 2026 · Remote",
    badge: "Paid contract",
    points: [
      "Built and fine-tuned custom LLM pipelines: SFT, distillation, fast inference.",
      "Deployed Qwen-scale models on 2x H200 GPUs with llama.cpp, Unsloth and vLLM.",
      "Set up agentic workflows and production deploys on Amazon Bedrock.",
    ],
  },
  {
    role: "Research Lead",
    org: "AutonomousX",
    meta: "Apr 2026 - Present · Open source LLM org",
    points: [
      "Secured Google TPU Research Cloud grant for large-scale pretraining.",
      "Trained 25 LLMs from 120M to 1.4B params over 500B+ tokens on v4 and v6e pods.",
    ],
    links: [
      { label: "AutonomousX org", href: "https://huggingface.co/autonomousX" },
    ],
  },
  {
    role: "ML Summer School",
    org: "Amazon",
    glowOrg: true,
    meta: "Jun 2026 - Jul 2026 · Selected among 3,000 of 134,000 applicants",
    points: [
      "Intensive training on ML algorithms, GenAI, LLMs and distributed optimization.",
    ],
  },
  {
    role: "Open Source Contributor",
    orgParts: ["Meta", "LLaMA ·", "Google", "DeepMind Gemma"],
    meta: "Mar 2026 - Present",
    note: "Both PRs open, not yet merged.",
    points: [
      "Fixed tokenizer normalization and JAX typing in Gemma.",
      "Fixed broken CLI import causing download failures in LLaMA.",
    ],
    links: [
      { label: "Gemma PR 624 (open)", href: "https://github.com/google-deepmind/gemma/pull/624", primary: true },
      { label: "LLaMA PR 476 (open)", href: "https://github.com/meta-llama/llama-models/pull/476", primary: true },
    ],
  },
];

function GlowRed({ children }) {
  return (
    <span
      style={{
        color: "#f43f5e",
        fontWeight: 800,
        textShadow:
          "0 0 10px rgba(244,63,94,0.8), 0 0 28px rgba(244,63,94,0.45)",
      }}
    >
      {children}
    </span>
  );
}

function GlowBlue({ children }) {
  return (
    <span
      style={{
        color: "#3b82f6",
        fontWeight: 800,
        textShadow:
          "0 0 10px rgba(59,130,246,0.8), 0 0 28px rgba(59,130,246,0.45)",
      }}
    >
      {children}
    </span>
  );
}
function Badge({ children }) {
  const paid = children.toLowerCase().includes("paid");
  return (
    <span
      className="neu-pill ml-2 inline-block px-2.5 py-1 align-middle text-[10px] font-bold uppercase tracking-widest"
      style={
        paid
          ? {
              color: "#16a34a",
              textShadow: "0 0 10px rgba(34,197,94,0.7)",
              boxShadow:
                "inset 3px 3px 7px var(--neu-inset-dark), inset -3px -3px 7px var(--neu-inset-light), 0 0 14px rgba(34,197,94,0.45)",
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export default function Experience() {
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="neu-raised p-6 md:p-10">
        <h2 className="text-3xl font-black tracking-tight md:text-5xl">Experience</h2>
        <p className="neu-muted mt-2 max-w-[60ch] text-sm md:text-base">
          Product and research work across full-stack apps, LLM training and open source.
        </p>

        <div className={`mt-8 grid gap-5 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {ROLES.map((r, i) => (
            <article
              key={r.role + (r.org ?? r.orgParts?.join(" ") ?? i)}
              className={i % 2 === 0 ? "neu-inset p-6" : "neu-raised-sm p-6"}
              style={{ borderRadius: 20 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest opacity-60">{r.meta}</p>
              <h3 className="mt-1 text-xl font-bold">
                {r.role}
                {r.badge && <Badge>{r.badge}</Badge>}
              </h3>
              <p className="neu-muted text-sm font-medium">
                {r.orgParts ? (
                  <>
                    <GlowBlue>{r.orgParts[0]}</GlowBlue> {r.orgParts[1]}{" "}
                    <GlowRed>{r.orgParts[2]}</GlowRed> {r.orgParts[3]}
                  </>
                ) : r.glowOrg ? (
                  <GlowRed>{r.org}</GlowRed>
                ) : (
                  r.org
                )}
                {r.orgSuffix && (
                  <>
                    {" · "}
                    <GlowRed>{r.orgSuffix}</GlowRed>
                  </>
                )}
              </p>
              {r.note && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "#e0a100" }}>
                  {r.note}
                </p>
              )}
              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {r.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden="true" style={{ color: "var(--neu-accent)" }}>▸</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {r.links && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={l.primary ? "neu-btn neu-btn-primary px-4 py-2 text-xs font-semibold" : "neu-pill px-3 py-1.5 text-xs font-semibold"}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
