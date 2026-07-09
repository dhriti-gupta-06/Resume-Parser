import { UploadCloud, FileSearch, BrainCircuit, Database, LayoutGrid, Check } from "lucide-react";

export const PIPELINE_STAGES = [
  { key: "uploading", label: "Uploading Resume", icon: UploadCloud },
  { key: "extracting", label: "Extracting Text", icon: FileSearch },
  { key: "parsing", label: "IBM watsonx AI is Parsing Resume", icon: BrainCircuit },
  { key: "saving", label: "Saving Resume", icon: Database },
  { key: "opening", label: "Opening Dashboard", icon: LayoutGrid },
];

/**
 * activeIndex: index of the stage currently in-progress.
 * Stages before it are complete, stages after are pending.
 */
function PipelineStepper({ activeIndex = 0 }) {
  return (
    <div className="w-full">
      <div className="relative flex items-start justify-between">
        {/* connecting track */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-[var(--color-border)]" aria-hidden="true">
          <div
            className="h-full bg-[var(--color-primary)] transition-all duration-700 ease-out"
            style={{
              width: `${(Math.min(activeIndex, PIPELINE_STAGES.length - 1) / (PIPELINE_STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>

        {PIPELINE_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isDone = i < activeIndex;
          const isActive = i === activeIndex;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center gap-2.5 flex-1 px-1">
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isDone
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white"
                    : isActive
                    ? "bg-white border-[var(--color-primary)] text-[var(--color-primary)] shadow-[0_0_0_4px_var(--color-primary-50)]"
                    : "bg-white border-[var(--color-border)] text-[var(--color-ink-faint)]",
                ].join(" ")}
              >
                {isDone ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : (
                  <Icon size={16} strokeWidth={2} className={isActive ? "animate-pulse" : ""} />
                )}
              </div>
              <p
                className={[
                  "text-[11px] font-medium text-center leading-tight max-w-[92px]",
                  isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-faint)]",
                ].join(" ")}
              >
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PipelineStepper;
