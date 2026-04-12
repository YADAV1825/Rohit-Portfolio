import React, { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import SkillSummary from "./sections/SkillSummary";
import Skills from "./sections/Skills";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Resume from "./sections/Resume";
import Achievements from "./sections/Achievements";
import Works from "./sections/Works";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Game from "./sections/Game";
import { useProgress } from "@react-three/drei";
import Fireflies from "./components/Fireflies";

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <>

      {/* Smooth Scrolling Root */}
      <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
        {/* Loading Screen */}
        {!isReady && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
            <p className="mb-4 text-xl tracking-widest animate-pulse">
              Loading {Math.floor(progress)}%
            </p>
            <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Optional: Fireflies if ready */}
        {isReady && <Fireflies />}

        {/* Main Content */}
        <div
          className={`${isReady ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
        >
          <Navbar />
          <Hero />
          <Game />
          <About />
          <Resume />
          <Achievements />
          <Works />
          <SkillSummary />
          <Skills />
          <Experience />
          <Contact />
        </div>
      </ReactLenis>
    </>
  );
};

export default App;
