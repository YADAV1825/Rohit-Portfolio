import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const text = `IT student @ NIT Jalandhar |
Built 25+ LLMs from scratch (500B+ tokens), along with compilers and virtual machines from the ground up.`;
  return (
    <section id="home" className="flex flex-col justify-end min-h-screen relative">
      {/* ── AutonomousX Floating Banner ── */}
      {/* Mobile: compact pill */}
      <a
        href="https://huggingface.co/autonomousX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 left-4 z-40 flex md:hidden items-center gap-2 px-3 py-2 rounded-full no-underline shadow-lg active:scale-95 transition-transform duration-200"
        style={{
          textDecoration: "none",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span className="text-base">🤗</span>
        <span className="text-white font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">
          AutonomousX
        </span>
        <span className="text-white/50 text-[9px]">→</span>
      </a>

      {/* Desktop: full marquee banner */}
      <a
        href="https://huggingface.co/autonomousX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 left-6 z-40 group hidden md:flex items-center gap-0 no-underline"
        style={{ textDecoration: "none" }}
      >
        {/* Static label pill */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-l-full border border-r-0 border-black/15 shadow-lg
            transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
        >
          <span className="text-lg">🤗</span>
          <span className="text-white font-bold text-xs uppercase tracking-wider whitespace-nowrap">
            AutonomousX
          </span>
        </div>

        {/* Scrolling marquee strip */}
        <div
          className="relative overflow-hidden rounded-r-full border border-l-0 border-black/15 shadow-lg
            transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          style={{
            width: "280px",
            background: "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)",
          }}
        >
          <div
            className="flex whitespace-nowrap py-2.5"
            style={{
              animation: "marqueeScroll 12s linear infinite",
            }}
          >
            <span className="text-white/80 text-xs font-medium tracking-wide px-4">
              ✦ See all the 25+ LLMs I built from scratch on AutonomousX ✦ 500B+ tokens trained ✦ Open-source models ✦
            </span>
            <span className="text-white/80 text-xs font-medium tracking-wide px-4">
              ✦ See all the 25+ LLMs I built from scratch on AutonomousX ✦ 500B+ tokens trained ✦ Open-source models ✦
            </span>
          </div>
        </div>
      </a>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <AnimatedHeaderSection
        title={"Rohit Yadav"}
        text={text}
        textColor={"text-black"}
      />

      {!isMobile && (
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Canvas
            shadows
            camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          >
            <ambientLight intensity={0.5} />
            <Float speed={0.5}>
              <Planet scale={1} />
            </Float>
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Canvas>
        </figure>
      )}
    </section>
  );
};

export default Hero;
