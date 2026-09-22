import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import About from "./sections/About";
import Achievements from "./sections/Achievements";
import ResumeSection from "./sections/ResumeSection";
import Contact from "./sections/Contact";
import { useTheme } from "./hooks/useTheme";

const App = () => {
  const { theme, toggle } = useTheme();

  return (
    <div className="neu-bg min-h-screen w-full pb-4">
      <Navbar theme={theme} onToggle={toggle} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <About />
        <Achievements />
        <ResumeSection />
        <Contact />
      </main>
    </div>
  );
};

export default App;
