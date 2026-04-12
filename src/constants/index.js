// index.js
export const skillsData = [
  {
    title: "Systems Engineering",
    description:
      "I build low-level systems from first principles — compilers, virtual machines, and CPU architectures — focusing on performance, control, and deep understanding of how software interacts with hardware.",
    items: [
      {
        title: "Compiler & Language Design",
        description: "(Lexers, Parsers, AST, Bytecode Generation, Custom Languages)",
      },
      {
        title: "Virtual Machines & CPU Design",
        description: "(Custom ISA, 16-bit CPU, Memory Management, Execution Pipelines)",
      },
      {
        title: "Systems Programming",
        description: "(C/C++, Manual Memory Management, Low-Level Debugging, Runtime Design)",
      },
    ],
  },

  {
    title: "Full-Stack Engineering",
    description:
      "I build scalable web systems with clean architecture, efficient data flow, and production-ready performance across frontend and backend layers.",
    items: [
      {
        title: "Backend Systems",
        description: "(REST APIs, Microservices, Auth Systems, FastAPI, Node.js)",
      },
      {
        title: "Frontend Development",
        description: "(React, Next.js, TypeScript, Interactive UI/UX)",
      },
      {
        title: "Database & Infrastructure",
        description: "(PostgreSQL, MongoDB, Query Optimization, Scalable Design)",
      },
    ],
  },

  {
    title: "Competitive Programming & DSA",
    description:
      "I consistently solve complex algorithmic problems under constraints, strengthening problem-solving intuition and deep understanding of data structures and algorithms.",
    items: [
      {
        title: "Data Structures",
        description: "(Trees, Graphs, Heaps, Tries, Segment Trees)",
      },
      {
        title: "Algorithms",
        description: "(DP, Greedy, Graph Algorithms, Backtracking, Number Theory)",
      },
      {
        title: "Competitive Profiles",
        description: "(Knight @ LeetCode, 4★ @ CodeChef, Specialist @ Codeforces)",
      },
    ],
  },

  {
    title: "AI, ML & LLM Engineering",
    description:
      "I design and train Large Language Models from scratch — building end-to-end pipelines from tokenizer to distributed training — with a focus on scaling, efficiency, and real-world deployment.",
    items: [
      {
        title: "LLMs from Scratch",
        description: "(25+ models, 120M–1.4B params, trained on 500B+ tokens)",
      },
      {
        title: "Distributed Training & Infrastructure",
        description: "(TPUs with JAX/pmap, pipeline optimization, dataset streaming)",
      },
      {
        title: "Advanced Model Work",
        description: "(Fine-tuning & continual pretraining on H100/A100 GPUs, scaling laws, optimization techniques)",
      },
    ],
  },
];
export const projects = [
  {
    id: 1,
    name: "AutonomousX (Instinct LLM Family)",
    description:
      "Built and open-sourced 25+ LLMs (120M–1.4B params) using TPU-native distributed training (JAX pmap), trained on 500B+ tokens (PILE, DOLMA) to study scaling laws, convergence, and degeneration dynamics with fully reproducible pipelines.",
    href: "https://huggingface.co/autonomousX",
    image: "/assets/projects/autonomousx.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "JAX" },
      { id: 2, name: "Flax" },
      { id: 3, name: "TPU Pods" },
      { id: 4, name: "Python" },
    ],
  },
  {
    id: 2,
    name: "PathoPreter (DNA Foundation Model)",
    description:
      "Developed a 500M parameter genomic foundation model combining nucleotide transformers with clinical features for SNV pathogenicity prediction, achieving 0.9186 ROC-AUC and outperforming SOTA methods with efficient clinical triage.",
    href: "https://huggingface.co/autonomousX/PathoPreter-DNA-Pathogen-Clinvar_gnomAD-ranker",
    image: "/assets/projects/pathopreter.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Transformers" },
      { id: 3, name: "Genomics ML" },
    ],
  },
  {
    id: 3,
    name: "PathoScan (Explainable Clinical AI)",
    description:
      "Built an explainable clinical ML pipeline combining XGBoost with LLM-based reasoning over SHAP insights, achieving 0.97+ ROC-AUC and enabling real-time clinical interpretation with automated AI-generated reports.",
    href: "https://github.com/YADAV1825/PathoScan",
    image: "/assets/projects/pathopreter.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "XGBoost" },
      { id: 2, name: "SHAP" },
      { id: 3, name: "LLMs" },
      { id: 4, name: "Python" },
    ],
  },
  {
    id: 4,
    name: "Large-Scale Genomic Dataset Pipeline",
    description:
      "Engineered a 32-core parallel pipeline to process 250GB+ genomic data, transforming 7.7M records into a clean 1.25M SNV dataset with 50+ features for ML training, reducing processing time from 150h to under 20h.",
    href: "https://github.com/YADAV1825/PathoPreter",
    image: "/assets/projects/autonomousx.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Parallel Processing" },
      { id: 3, name: "Genomics Data" },
    ],
  },

  // ---- OLD PROJECTS (SHIFTED) ----

  {
    id: 5,
    name: "RohitOS",
    description:
      "A handcrafted 32-bit operating system built entirely from scratch with a custom bootloader (NASM), kernel in C, and GDT-based memory model, featuring a command-line interface, system calls, and direct hardware access.",
    href: "https://github.com/YADAV1825/OS-RohitOS",
    image: "/assets/projects/OS SHORT.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "C" },
      { id: 2, name: "Assembly" },
      { id: 3, name: "QEMU" },
    ],
  },
  {
    id: 6,
    name: "Compiler BroLang + VM",
    description:
      "Built a full compiler toolchain where a custom language (BroLang) compiles into bytecode executed on a self-designed virtual CPU and VM, all implemented from scratch in C++.",
    href: "https://github.com/YADAV1825/BroLang-Stack",
    image: "/assets/projects/placeholder.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "C++" },
      { id: 2, name: ".bro (custom lang)" },
      { id: 3, name: "C" },
    ],
  },
  {
    id: 7,
    name: "Virtual CPU + VM",
    description:
      "Designed a 16-bit virtual CPU with 65KB RAM simulation in C++, functioning as a complete instruction-based virtual machine capable of executing custom programs.",
    href: "https://github.com/YADAV1825/Virtual-CPU-and-VM-RohitVM",
    image: "/assets/projects/placeholder.gif",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "C++" },
      { id: 2, name: "C" },
    ],
  },
  {
    id: 8,
    name: "HTTP Web Server",
    description:
      "A single-threaded HTTP server built from scratch using low-level Linux sockets in C++, handling raw HTTP parsing and responses without external frameworks.",
    href: "https://github.com/YADAV1825/CPP-Http-web-server-Single-thread-for-Linux",
    image: "/assets/projects/server.jpg",
    bgImage: "/assets/backgrounds/bg.gif",
    frameworks: [
      { id: 1, name: "C++" },
      { id: 2, name: "HTML" },
      { id: 3, name: "CSS" },
    ],
  },
  // {
  //   id: 6,
  //   name: "Digital Game Store",
  //   description:
  //     "A gaming platform featuring discounted titles, top sellers, and genre-based browsing.",
  //   href: "",
  //   image: "/assets/projects/game-store.jpg",
  //   bgImage: "/assets/backgrounds/curtains.jpg",
  //   frameworks: [
  //     { id: 1, name: "Svelte" },
  //     { id: 2, name: "Node.js" },
  //     { id: 3, name: "MongoDB" },
  //     { id: 4, name: "Chakra UI" },
  //   ],
  // },
];
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/rohit.yadav1825/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/rohit-yadav-25535b256/" },
  { name: "GitHub", href: "https://github.com/YADAV1825" },

  { name: "LeetCode", href: "https://www.leetcode.com/tomodachi_" },

  { name: "CodeForces", href: "https://codeforces.com/profile/tomodachi_" },

  { name: "CodeChef", href: "https://www.codechef.com/users/tomodachi" },
];
