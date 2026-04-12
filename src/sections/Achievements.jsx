import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const achievements = [
  {
    title: "Google TRC Grant — 320 TPU Access (SPOT + STANDARD VMs)",
    link: null,
    linkLabel: null,
    category: "Grant",
    image: "/assets/achievements/achievement-1.png",
  },
  {
    title: "AMD MI300X GPU Access — 300 Non-Preemptive Hours",
    link: null,
    linkLabel: null,
    category: "Grant",
    image: "/assets/achievements/achievement-2.png",
  },
  {
    title: "IOQM (PRMO) — Qualified for Indian Olympiad Qualifier in Mathematics",
    link: "https://drive.google.com/file/d/1nG8TuR_yEdqlIbPjkqr3zZQIqzImxh9h/view",
    linkLabel: "Certificate",
    category: "Olympiad",
    image: "/assets/achievements/achievement-3.png",
  },
  {
    title: "KVPY SA — AIR 2590",
    link: "https://drive.google.com/file/d/1K3Wm7S8cNBQTk5Y9ydm80xcvCMz26IUX/view?usp=drive_link",
    linkLabel: "Certificate",
    category: "National Exam",
    image: "/assets/achievements/achievement-4.png",
  },
  {
    title: "LeetCode — Knight (2013), 400+ Problems Solved",
    link: "https://leetcode.com/u/tomodachi_/",
    linkLabel: "Profile",
    category: "Competitive Programming",
    image: "/assets/achievements/achievement-5.png",
  },
  {
    title: "CodeChef — 4-Star (1818)",
    link: "https://www.codechef.com/users/tomodachi",
    linkLabel: "Profile",
    category: "Competitive Programming",
    image: "/assets/achievements/achievement-6.png",
  },
  {
    title: "Codeforces — Specialist (1417)",
    link: "https://codeforces.com/profile/tomodachi_",
    linkLabel: "Profile",
    category: "Competitive Programming",
    image: "/assets/achievements/achievement-7.png",
  },
  {
    title: "CodeChef START166B — Global Rank 9",
    link: "https://www.codechef.com/rankings/START166B?itemsPerPage=100&order=asc&page=1&sortBy=rank",
    linkLabel: "Contest",
    category: "Contest",
    image: "/assets/achievements/achievement-8.png",
  },
];

const categoryColors = {
  Grant: "bg-amber-100 text-amber-800",
  Olympiad: "bg-purple-100 text-purple-800",
  "National Exam": "bg-green-100 text-green-800",
  "Competitive Programming": "bg-blue-100 text-blue-800",
  Contest: "bg-rose-100 text-rose-800",
};

const Achievements = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const previewRef = useRef(null);
  const moveX = useRef(null);
  const moveY = useRef(null);
  const sectionRef = useRef(null);

  /* ── Set up GSAP magnetic follow ── */
  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.0,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    // Offset so the card appears just to the bottom-right of the cursor
    moveX.current(e.clientX + 20);
    moveY.current(e.clientY + 20);
  };

  const handleCardEnter = (index) => {
    if (window.innerWidth < 768) return;
    setHoveredIndex(index);
    gsap.killTweensOf(previewRef.current);
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.35,
      ease: "back.out(1.5)",
    });
  };

  const handleCardLeave = () => {
    if (window.innerWidth < 768) return;
    setHoveredIndex(null);
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.88,
      rotate: -3,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-24 px-6 sm:px-12 lg:px-24
        bg-primary relative overflow-hidden
        border border-black/10
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.12)]
        max-w-[97%] mx-auto mt-16"
      onMouseMove={handleMouseMove}
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -ml-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-DarkLava/5 rounded-full blur-3xl -mr-48 -mb-48 pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14">
          <div>
            <h2 className="text-4xl sm:text-6xl font-amiamie-round font-black text-DarkLava uppercase tracking-tighter leading-none mb-4">
              Achiev<span className="text-gold">ements</span>
            </h2>
            <p className="text-lg sm:text-xl text-DarkLava/70 font-light max-w-xl leading-relaxed">
              Grants, olympiads, and competitive programming milestones.
            </p>
          </div>
          <div className="w-20 h-1 bg-gold/30 lg:mb-2 flex-shrink-0" />
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-black/8
                transition-all duration-300 hover:-translate-y-1 cursor-default
                shadow-[0_4px_16px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.08)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_20px_60px_rgba(0,0,0,0.14)]"
              onMouseEnter={() => handleCardEnter(index)}
              onMouseLeave={handleCardLeave}
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-full" />

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-xl
                  shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/6">
                  {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 tracking-wide
                    ${categoryColors[achievement.category] || "bg-gray-100 text-gray-700"}`}>
                    {achievement.category}
                  </span>

                  {/* Title */}
                  <p className="text-DarkLava font-semibold text-base leading-snug mb-3">
                    {achievement.title}
                  </p>

                  {/* Link */}
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600
                        hover:text-blue-700 hover:underline transition-colors duration-200"
                    >
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                      {achievement.linkLabel}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Magnetic floating image preview (desktop only) ── */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block opacity-0"
        style={{
          width: "20vw",          // ~1/5 of screen width
          borderRadius: 14,
          overflow: "hidden",
          boxShadow:
            "0 2px 0 2px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.45), 0 4px 20px rgba(0,0,0,0.3)",
          transform: "scale(0.88) rotate(-3deg)",
          willChange: "transform",
        }}
      >
        {hoveredIndex !== null && (
          <>
            <img
              src={achievements[hoveredIndex].image}
              alt={achievements[hoveredIndex].title}
              className="w-full object-cover"
              style={{
                height: "26vh",          // fixed height — image fills the box by height
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* Bottom label */}
            <div
              className="px-3 py-2.5"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
              }}
            >
              <p className="text-white text-[11px] font-semibold uppercase tracking-widest truncate leading-tight">
                {achievements[hoveredIndex].category}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Achievements;
