import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `I don't just code features , I build the systems that run them. 
  From virtual CPUs to compilers, 
  I’m obsessed with the "how" behind every abstraction.`;


  const aboutText = `I'm a pre-final year IT undergrad at NIT Jalandhar who loves building systems from scratch , from compilers and virtual machines to large-scale AI models.

I’ve built 25+ LLMs (120M–1.4B params), training them on 500B+ tokens using TPU clusters. I work across the full stack architectures, tokenization, and distributed training , with a focus on efficiency and scalability.

Beyond AI, I enjoy low-level systems and performance-driven engineering, along with building full-stack applications when needed.

Currently focused on:
      - LLM Internals & Scaling
      - Distributed Systems
      - AI Infrastructure
      - Low-Level Systems

      
Always building, always learning.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-22 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
          ref={imgRef}
          src="images/rohit2.jpeg"
          alt="man"
          className="w-150 max-w-[280px] max-h-[300px] object-cover md:max-w-[500px] md:max-h-none lg:max-w-[650px] rounded-4xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
