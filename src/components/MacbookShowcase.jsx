import { GINIVIBE_EMBED_URL, GINIVIBE_VIDEO_URL } from "../data/portfolio";
import { useIsMobile } from "../hooks/useTheme";

/*
 * Device frame copied 1:1 from crush-chat.ai ProductWalkthrough.
 * Proportions: outer 95vw / max-w-5xl, screen 90%, base 100%.
 * That 90 vs 100 split is what makes the base overhang like a real MacBook.
 */
export default function MacbookShowcase({ project }) {
  const isMobile = useIsMobile();
  const isVideo = project?.type === "video";

  const screenContent = isVideo ? (
    <div className="relative h-full w-full">
      <iframe
        key={project.videoId}
        src={GINIVIBE_EMBED_URL}
        title={`${project.name} demo video`}
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <a
        href={GINIVIBE_VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="neu-btn absolute bottom-3 right-3 px-3 py-1.5 text-xs font-semibold"
        style={{ background: "var(--neu-card)" }}
      >
        Watch with sound
      </a>
    </div>
  ) : (
    <img
      src={project.image}
      alt={project.name}
      className="h-full w-full object-contain"
      style={{ background: "#0b0b0c" }}
      loading="lazy"
    />
  );

  if (isMobile) {
    return (
      <div className="mx-auto w-[290px] relative flex flex-col items-center">
        <div
          className="w-[100%] aspect-[9/19] rounded-[3rem] bg-[#111] p-1.5 shadow-2xl border-4 border-[#444] relative z-10 overflow-hidden flex flex-col"
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-50" />
          <div className="flex-1 bg-black overflow-hidden relative rounded-[2.6rem] mt-1">
            <div className="absolute top-0 inset-x-0 h-14 flex items-center px-6 justify-between text-[13px] font-medium text-white z-[60] pointer-events-none">
              <span className="mt-1">9:41</span>
              <span className="mt-1 text-[10px] font-bold tracking-tighter">5G</span>
            </div>
            <div className="absolute inset-0 pt-14">{screenContent}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95vw] max-w-5xl mx-auto relative z-20 flex flex-col items-center">
      {/* Screen: 90% width */}
      <div className="w-[90%] rounded-t-2xl rounded-b-md bg-[#111] p-2.5 shadow-2xl border-2 border-[#444] relative z-10 overflow-visible flex flex-col">
        {/* Webcam notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#111] rounded-b-xl z-50" />

        {/* macOS titlebar */}
        <div
          className="h-10 rounded-t-xl border-b flex items-center px-4 justify-between backdrop-blur-xl"
          style={{ background: "var(--neu-card)", borderColor: "var(--neu-shadow-dark)" }}
        >
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="neu-muted text-[11px] font-medium tracking-wide">{project.name}</div>
          <div className="w-12" />
        </div>

        {/* App content area: fixed 16:9 like the original */}
        <div className="aspect-video bg-black overflow-hidden relative rounded-none">
          {screenContent}
        </div>
      </div>

      {/* Base: full 100% width, wider than the 90% screen above */}
      <div className="flex w-full h-[26px] bg-gradient-to-r from-[#a3b5c4] via-[#e8eff5] to-[#a3b5c4] rounded-b-[20px] rounded-t-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.6)] items-start justify-center relative border border-[#94a6b5] z-20 -mt-[1px]">
        {/* Inner top highlight for metallic edge */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white/30 via-white/90 to-white/30" />

        {/* Bottom shadow curve to give 3D depth */}
        <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-[#708496]/50 to-transparent rounded-b-[20px]" />

        {/* Thumb indent */}
        <div className="w-32 h-2.5 bg-gradient-to-b from-[#a3b5c4] to-[#cdd9e4] rounded-b-[6px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.2)] border border-[#94a6b5] border-t-0 z-10 relative">
          <div className="absolute inset-x-1 bottom-[1px] h-[1px] bg-white/50" />
        </div>

        {/* Rubber feet */}
        <div className="absolute bottom-[1px] left-16 w-10 h-[3px] bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-t-[1px] rounded-b-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
        <div className="absolute bottom-[1px] right-16 w-10 h-[3px] bg-gradient-to-b from-[#2a2a2a] to-[#111] rounded-t-[1px] rounded-b-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4f7cff]/15 blur-[120px] rounded-full z-0 pointer-events-none" />
    </div>
  );
}
