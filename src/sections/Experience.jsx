import React, { useState } from "react";

const Experience = () => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section
      id="experiences"
      className="py-24 px-6 sm:px-12 lg:px-24 
      bg-primary relative overflow-hidden 
      border border-black/10 
      rounded-3xl 
      shadow-[0_20px_60px_rgba(0,0,0,0.08),0_40px_120px_rgba(0,0,0,0.12)] 
      max-w-[97%] mx-auto mt-16 mb-16"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-DarkLava/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <h2 className="text-4xl sm:text-6xl font-amiamie-round font-black mb-10 text-DarkLava uppercase tracking-tighter leading-none">
              Experi<span className="text-gold">ences</span>
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-DarkLava">
                  Full-Stack Web Developer Intern
                </h3>
                <h4 className="text-xl sm:text-2xl font-semibold text-gold mt-1">
                  Skylark Express Delhi Pvt Ltd
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-DarkLava/70 mt-2 font-medium">
                  <span>Jun 2025 – Jul 2025</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span>On-site, Gurugram</span>
                </div>
              </div>

              <div className="w-20 h-1 bg-gold/30"></div>

              <ul className="space-y-4 text-base sm:text-lg text-DarkLava/80 leading-relaxed font-light list-none">
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">✦</span>
                  <span>
                    Contributed to the development of an internal logistics tracking dashboard.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">✦</span>
                  <span>
                    Built frontend using <strong>React, Next.js, TypeScript</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">✦</span>
                  <span>
                    Integrated REST APIs for seamless backend communication.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">✦</span>
                  <span>
                    Improved UI responsiveness and system efficiency.
                  </span>
                </li>
              </ul>
            </div>

            {/* Mobile Button */}
            <div className="mt-8 block lg:hidden">
              <a
                href="/SKYLARK_Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl bg-gold text-black font-semibold shadow-md active:scale-95 transition-all duration-300"
              >
                View Certificate
              </a>
            </div>
          </div>

          {/* RIGHT SIDE (IFRAME) */}
          <div
            className="hidden lg:block w-full lg:w-[55%] h-[90vh] lg:h-[850px] relative rounded-3xl overflow-hidden 
            bg-white border border-black/20 
            shadow-[0_10px_30px_rgba(0,0,0,0.08),0_30px_80px_rgba(0,0,0,0.12)]"
            
            onClick={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
          >
            <iframe
              src="/SKYLARK_Intern.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
              title="Skylark Internship Certificate"
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

export default Experience;