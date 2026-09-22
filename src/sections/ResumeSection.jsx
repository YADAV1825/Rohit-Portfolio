import { RESUME_URL } from "../data/portfolio";
import { useIsMobile } from "../hooks/useTheme";

export default function ResumeSection() {
  const isMobile = useIsMobile();

  return (
    <section id="resume" className="mx-auto max-w-7xl px-4 pt-14">
      <div className="neu-raised grid grid-cols-1 gap-6 p-6 md:grid-cols-5 md:p-10">
        <div className="flex flex-col justify-center md:col-span-2">
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">Resume</h2>
          <p className="neu-muted mt-3 leading-relaxed">
            Systems plus AI builder. 25+ LLMs from scratch on TPU clusters, plus OS and compiler work.
          </p>
          <div className="neu-inset mt-5 p-4 text-sm">
            Google TPU Research Cloud grant and AMD MI300X compute access.
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={RESUME_URL} download className="neu-btn neu-btn-primary px-6 py-3 text-sm font-semibold">
              Download
            </a>
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="neu-btn px-6 py-3 text-sm font-semibold">
              Open in tab
            </a>
          </div>
        </div>
        <div className="md:col-span-3">
          {isMobile ? (
            <div className="neu-inset flex flex-col items-center p-8 text-center">
              <p className="neu-muted text-sm">Preview is best on desktop. Use the buttons to open the PDF.</p>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="neu-btn mt-4 px-6 py-3 text-sm font-semibold">
                View resume
              </a>
            </div>
          ) : (
            <div className="neu-inset overflow-hidden p-3">
              <iframe
                src={`${RESUME_URL}#toolbar=0&navpanes=0&view=FitH`}
                title="Rohit Yadav Resume"
                className="h-[720px] w-full rounded-2xl bg-white"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
