import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { skillsData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Skills = () => {
  const text = `Let’s craft something inspiring 
  be it a web app, an AI model, a compiler,
  a virtual OS, or high-performance code.

.`;
  const skillRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    skillRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section id="skills" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"MY PATH"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {skillsData.map((skill, index) => (
        <div
          ref={(el) => (skillRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(skillsData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-5xl">{skill.title}</h2>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60 text-pretty">
                {skill.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                {skill.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                       <span className="mr-12 text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="ml-[3.75rem] text-sm lg:text-base text-white/40 font-light tracking-wide mt-1">
                        {item.description}
                      </p>
                    )}
                    {itemIndex < skill.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
