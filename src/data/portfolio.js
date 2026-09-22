export const GINIVIBE_VIDEO_ID = "JZLE3S9hWN8";
export const GINIVIBE_VIDEO_URL = "https://youtu.be/JZLE3S9hWN8";
export const GINIVIBE_EMBED_URL = `https://www.youtube.com/embed/${GINIVIBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${GINIVIBE_VIDEO_ID}&rel=0&modestbranding=1`;
export const GINIVIBE_THUMB = `https://img.youtube.com/vi/${GINIVIBE_VIDEO_ID}/maxresdefault.jpg`;

export const RESUME_URL = "/Resume_rohit_yadav.pdf";

export const socials = [
  { name: "GitHub", href: "https://github.com/YADAV1825" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/rohit-yadav-25535b256/" },
  { name: "LeetCode", href: "https://www.leetcode.com/tomodachi_" },
  { name: "CodeForces", href: "https://codeforces.com/profile/tomodachi_" },
  { name: "CodeChef", href: "https://www.codechef.com/users/tomodachi" },
  { name: "Instagram", href: "https://www.instagram.com/rohit.yadav1825/" },
];

export const projects = [
  {
    id: "ginivibe",
    name: "GiniVibe",
    tagline: "Social discovery platform",
    description:
      "Production social platform with multimedia feed, realtime chat, events with RSVP, rooms, AI characters and matching. Next.js web plus Expo mobile served from one monorepo on PostgreSQL and Prisma.",
    href: "https://youtu.be/JZLE3S9hWN8",
    type: "video",
    videoId: GINIVIBE_VIDEO_ID,
    image: GINIVIBE_THUMB,
    frameworks: ["Next.js", "Expo", "PostgreSQL", "Socket.io"],
  },
  {
    id: "rage",
    name: "RAGE Born",
    tagline: "Agentic harness",
    description:
      "Agentic harness for running and evaluating autonomous coding agents with tool sandboxing, replayable runs and tight feedback loops.",
    href: "#work",
    type: "image",
    image: "/images/RAGE.png",
    frameworks: ["Agents", "Tooling", "Evaluation"],
  },
  {
    id: "autonomousx",
    name: "AutonomousX",
    tagline: "25+ LLMs from scratch",
    description:
      "Open-sourced 25+ LLMs from 120M to 1.4B params with TPU-native JAX training on 500B+ tokens to study scaling and convergence with reproducible pipelines.",
    href: "https://huggingface.co/autonomousX",
    type: "image",
    image: "/assets/projects/autonomousx.gif",
    frameworks: ["JAX", "TPU", "Python"],
  },
  {
    id: "pathopreter",
    name: "PathoPreter",
    tagline: "DNA foundation model",
    description:
      "500M parameter genomic foundation model for SNV pathogenicity prediction at 0.9186 ROC-AUC, pairing nucleotide transformers with clinical features.",
    href: "https://huggingface.co/autonomousX/PathoPreter-DNA-Pathogen-Clinvar_gnomAD-ranker",
    type: "image",
    image: "/assets/projects/pathopreter.gif",
    frameworks: ["Transformers", "Genomics", "Python"],
  },
  {
    id: "rohitos",
    name: "RohitOS",
    tagline: "32-bit OS from scratch",
    description:
      "Handcrafted 32-bit OS with custom NASM bootloader, C kernel, GDT memory model, syscalls and direct hardware access.",
    href: "https://github.com/YADAV1825/OS-RohitOS",
    type: "image",
    image: "/assets/projects/OS SHORT.gif",
    frameworks: ["C", "Assembly", "QEMU"],
  },
  {
    id: "brolang",
    name: "BroLang + VM",
    tagline: "Compiler toolchain",
    description:
      "Custom language compiling to bytecode for a self-designed 16-bit virtual CPU and VM, built from scratch in C++.",
    href: "https://github.com/YADAV1825/BroLang-Stack",
    type: "image",
    image: "/assets/projects/compiler.gif",
    frameworks: ["C++", "Compilers", "VM"],
  },
];

export const skillsData = [
  {
    title: "Systems Engineering",
    description: "Compilers, virtual machines and CPU work built from first principles.",
    items: ["C / C++", "Custom ISA + 16-bit CPU", "Lexers, parsers, bytecode"],
  },
  {
    title: "Full-Stack Engineering",
    description: "Scalable web systems with clean architecture and fast data flow.",
    items: ["React + Next.js + TypeScript", "Node.js + REST + microservices", "PostgreSQL + MongoDB"],
  },
  {
    title: "AI and LLM Engineering",
    description: "LLMs trained from scratch through to deployment.",
    items: ["25+ models, 120M-1.4B", "JAX + TPU distributed training", "Fine-tuning on H100 / A100"],
  },
  {
    title: "Competitive Programming",
    description: "Algorithmic problem solving under constraints.",
    items: ["LeetCode Knight", "CodeChef 4 star", "Codeforces Specialist"],
  },
];

export const achievements = [
  { title: "Google TRC grant, 320 TPU access", category: "Grant", link: null },
  { title: "AMD MI300X access, 300 non-preemptive hours", category: "Grant", link: null },
  { title: "IOQM qualified, Indian Olympiad Qualifier in Mathematics", category: "Olympiad", link: "https://drive.google.com/file/d/1nG8TuR_yEdqlIbPjkqr3zZQIqzImxh9h/view" },
  { title: "KVPY SA, AIR 2590", category: "National Exam", link: "https://drive.google.com/file/d/1K3Wm7S8cNBQTk5Y9ydm80xcvCMz26IUX/view?usp=drive_link" },
  { title: "LeetCode Knight, 400+ problems solved", category: "CP", link: "https://leetcode.com/u/tomodachi_/" },
  { title: "CodeChef 4 star, peak 1818", category: "CP", link: "https://www.codechef.com/users/tomodachi" },
  { title: "Codeforces Specialist, peak 1417", category: "CP", link: "https://codeforces.com/profile/tomodachi_" },
  { title: "CodeChef START166B, Global Rank 9", category: "Contest", link: "https://www.codechef.com/rankings/START166B" },
];
