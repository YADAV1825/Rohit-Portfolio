import React, { useState } from "react";

const Resume = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section
      id="resume"
      className="py-24 px-6 sm:px-12 lg:px-24 
      bg-primary relative overflow-hidden 
      border border-black/10 
      rounded-3xl 
      shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.12)] 
      max-w-[97%] mx-auto mt-16"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-DarkLava/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl font-amiamie-round font-black mb-10 text-DarkLava uppercase tracking-tighter leading-none">
              Resu<span className="text-gold">me</span>
            </h2>

            <div className="space-y-8">
              <p className="text-xl sm:text-2xl text-DarkLava/90 leading-relaxed font-light">
                Third-year undergraduate and{" "}
                <span className="text-gold font-semibold italic">
                  Systems + AI builder
                </span>{" "}
                who enjoys building complex systems from scratch.
              </p>

              <div className="w-20 h-1 bg-gold/30 mb-8"></div>

              <p className="text-lg sm:text-xl text-DarkLava/80 leading-relaxed font-light">
                Built{" "}
                <span className="font-medium text-DarkLava">
                  25+ LLMs from scratch
                </span>{" "}
                (120M–1.4B parameters) on Google’s TPU clusters.
              </p>

              <p className="text-lg sm:text-xl text-DarkLava/80 leading-relaxed font-light">
                Designed high-throughput pipelines and performance-critical systems.
              </p>

              <p className="text-lg sm:text-xl text-DarkLava/80 leading-relaxed font-light bg-gold/5 p-4 rounded-lg border-l-4 border-gold">
                Awarded{" "}
                <span className="text-gold font-bold">
                  Google TPU Research Cloud (TRC) grant
                </span>{" "}
                and AMD MI300X compute access.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="/Resume_rohit_yadav.pdf"
                download
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold 
                shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                Download Resume
              </a>

              <a
                href="/Resume_rohit_yadav.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold 
                shadow-md hover:bg-blue-600 transition-all duration-300"
              >
                Open in New Tab
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (IFRAME) */}
          <div
            className="hidden lg:block w-full lg:w-[53%] h-[90vh] lg:h-[900px] relative rounded-3xl overflow-hidden 
            bg-white border border-black/20 
            shadow-[0_10px_30px_rgba(0,0,0,0.08),0_30px_80px_rgba(0,0,0,0.12)]"

            onClick={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
          >
            <iframe
              src="/Resume_rohit_yadav.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
              title="Rohit Yadav Resume"
              className={`w-full h-full border-none transition-all duration-200 
              ${isInteracting ? "pointer-events-auto" : "pointer-events-none"}`}
            />

            {/* Border Overlay */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;