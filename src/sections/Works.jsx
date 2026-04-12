import { Icon } from "@iconify/react/dist/iconify.js";
import { projects } from "../constants";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const panelRef = useRef(null);
  const imgRefs = useRef([]);
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const descContainerRef = useRef(null);
  const transitioning = useRef(false);
  const isHovered = useRef(false);

  /* ── Stagger-in on scroll ── */
  useGSAP(() => {
    gsap.from(".works-row", {
      x: -60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".works-panel", {
      opacity: 0,
      scale: 0.97,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, []);

  /* ── Cross-fade transition between project images ── */
  const switchProject = useCallback(
    (index) => {
      if (index === activeIndex || transitioning.current) return;
      transitioning.current = true;
      setPrevIndex(activeIndex);

      const incoming = imgRefs.current[index];
      const outgoing = imgRefs.current[activeIndex];
      const descBox = descContainerRef.current;

      // Snap incoming image into place, hidden
      gsap.set(incoming, { opacity: 0, scale: 1.06, zIndex: 2 });
      gsap.set(outgoing, { zIndex: 1 });

      // Fade out description card
      if (descBox) {
        gsap.to(descBox, { opacity: 0, y: 12, duration: 0.2 });
      }

      // Cross-fade images
      gsap.to(incoming, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(outgoing, { opacity: 0, zIndex: 0 });
          gsap.set(incoming, { zIndex: 1 });
          setActiveIndex(index);
          transitioning.current = false;

          // Fade in description card
          if (descBox) {
            gsap.fromTo(
              descBox,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
          }
        },
      });
    },
    [activeIndex]
  );

  /* ── Auto-slideshow: 5s per project, loops ── */
  useEffect(() => {
    const timer = setInterval(() => {
      if (!transitioning.current && !isHovered.current) {
        const nextIndex = (activeIndex + 1) % projects.length;
        switchProject(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, switchProject]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-[#0d0d0d] overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      {/* ── HEADER ── */}
      <div className="px-10 pt-20 pb-10 border-b border-white/8">
        <p className="text-white/30 text-xs uppercase tracking-[0.3em] mb-3 font-mono">
          Logic meets Aesthetics, Seamlessly
        </p>
        <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-amiamie font-black text-white uppercase leading-none tracking-tighter">
          Works
        </h2>
      </div>

      {/* ── SPLIT LAYOUT ── */}
      <div className="flex flex-col lg:flex-row relative" style={{ minHeight: "80vh" }}>

        {/* ════ LEFT — Project List ════ */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center px-8 lg:px-14 py-12 lg:py-20 gap-2 border-r border-white/6">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project.id}
                className="works-row group relative"
                onMouseEnter={() => switchProject(index)}
              >
                {/* Active indicator bar */}
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 rounded-full bg-white
                    transition-all duration-500 ease-out
                    ${isActive ? "h-full opacity-100" : "opacity-0"}`}
                />

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    switchProject(index);
                  }}
                  className="w-full text-left pl-5 pr-4 py-5 flex items-center justify-between gap-4 rounded-xl
                    transition-all duration-300 hover:bg-white/4 cursor-pointer"
                >
                  {/* Index */}
                  <span
                    className={`text-xs font-mono transition-colors duration-300 flex-shrink-0 w-8
                      ${isActive ? "text-white/60" : "text-white/20"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Name + tags */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-amiamie font-black uppercase leading-tight transition-all duration-300
                        ${isActive
                          ? "text-white text-[clamp(1.2rem,2.8vw,2rem)]"
                          : "text-white/40 text-[clamp(1rem,2.2vw,1.6rem)] group-hover:text-white/70"
                        }`}
                    >
                      {project.name}
                    </p>
                    <div
                      className={`flex flex-wrap gap-x-3 mt-1 transition-all duration-300
                        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
                    >
                      {project.frameworks.map((fw) => (
                        <span
                          key={fw.id}
                          className="text-[10px] font-mono uppercase text-white/40 tracking-widest"
                        >
                          {fw.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`flex-shrink-0 transition-all duration-400
                      ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"
                      }`}
                  >
                    <Icon
                      icon="lucide:arrow-up-right"
                      className="size-5 text-white"
                    />
                  </div>
                </button>

                {/* Thin separator */}
                {index < projects.length - 1 && (
                  <div className="ml-5 mr-4 h-px bg-white/6" />
                )}
              </div>
            );
          })}

          {/* Footer count */}
          <p className="mt-8 ml-5 text-white/20 text-xs font-mono tracking-widest uppercase">
            {String(projects.length).padStart(2, "0")} Projects
          </p>
        </div>

        {/* ════ RIGHT — Cinematic Preview Panel ════ */}
        <div
          className="works-panel hidden lg:flex w-full lg:w-[52%] relative overflow-hidden items-center justify-center"
          style={{ minHeight: "80vh", backgroundColor: "#080808" }}
          ref={panelRef}
        >
          {/* Stacked images for cross-fade — fit by width */}
          {projects.map((project, index) => (
            <img
              key={project.id}
              ref={(el) => (imgRefs.current[index] = el)}
              src={project.image}
              alt={project.name}
              className="absolute w-full h-auto object-contain"
              style={{
                opacity: index === 0 ? 1 : 0,
                zIndex: index === 0 ? 1 : 0,
                scale: 1,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxHeight: "100%",
              }}
            />
          ))}

          {/* Dark gradient overlays */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(13,13,13,0.55) 0%, transparent 40%), " +
                "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 35%)",
            }}
          />

          {/* Corner project counter */}
          <div className="absolute top-6 right-8 z-20 text-right">
            <span className="text-white/20 font-mono text-xs">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ══ FLOATING DESCRIPTION CARD — centered on the divider between left & right ══ */}
        <div
          ref={descContainerRef}
          className="hidden lg:flex flex-col absolute z-30 pointer-events-auto"
          style={{
            left: "48%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "22rem",
          }}
        >
          <div className="bg-[#0c0c0c]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            {/* Category badge */}
            <div className="mb-3 flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/50 text-[10px] font-mono uppercase tracking-[0.25em]">
                Featured Project
              </span>
            </div>

            {/* Project name */}
            <h3 className="text-lg font-amiamie font-black text-white uppercase leading-tight mb-3 tracking-tight">
              {projects[activeIndex].name}
            </h3>

            {/* Description */}
            <p className="text-white/65 text-[13px] leading-relaxed font-light mb-4">
              {projects[activeIndex].description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {projects[activeIndex].frameworks.map((fw) => (
                <span
                  key={fw.id}
                  className="text-[9px] font-mono uppercase text-white/45 px-2 py-0.5 rounded bg-white/5 border border-white/5"
                >
                  {fw.name}
                </span>
              ))}
            </div>

            {/* Open link button */}
            <a
              href={projects[activeIndex].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-white text-black
                text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95 group/btn shadow-lg"
            >
              Explore Project
              <Icon
                icon="lucide:arrow-up-right"
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

      </div>

      {/* ── MOBILE: simple cards ── */}
      <div className="lg:hidden grid gap-4 px-6 py-10">
        {projects
          .filter((p) => ![3, 4, 7].includes(p.id))
          .map((project) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-2xl overflow-hidden h-56 block group"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-0 left-0 p-5">
              <p className="text-white font-amiamie font-black uppercase text-xl leading-tight">
                {project.name}
              </p>
              <div className="flex gap-3 mt-1">
                {project.frameworks.slice(0, 3).map((fw) => (
                  <span key={fw.id} className="text-white/50 text-[10px] font-mono uppercase">
                    {fw.name}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;
