import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import PipelineStepper, { PIPELINE_STAGES } from "./PipelineStepper";

function UploadSection({ file, setFile, uploadResume, loading }) {
  const [isDragging, setIsDragging] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (fileList) => {
      const picked = fileList?.[0];
      if (picked && picked.type === "application/pdf") {
        setFile(picked);
      } else if (picked) {
        alert("Only PDF files are supported.");
      }
    },
    [setFile]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const runUpload = async () => {
    // Drives the signature pipeline visualization while the real request is in flight.
    // Stage advancement is cosmetic only \u2014 no request/response contract changes.
    setStageIndex(0);
    const timers = [600, 900, 1400].map((delay, i) =>
      setTimeout(() => setStageIndex(i + 1), delay)
    );

    try {
      await uploadResume();
      setStageIndex(PIPELINE_STAGES.length - 1);
    } finally {
      timers.forEach(clearTimeout);
      setTimeout(() => setStageIndex(0), 900);
    }
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card)] p-6 lg:p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">Upload a resume</h2>
          <p className="text-[13px] text-[var(--color-ink-muted)] mt-0.5">
            PDF only \u00b7 Parsed automatically with IBM watsonx
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-6 px-2">
          <PipelineStepper activeIndex={stageIndex} />
        </div>
      ) : (
        <>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            aria-label="Drop a PDF resume here or browse files"
            className={[
              "relative rounded-xl border-2 border-dashed transition-colors duration-150 cursor-pointer",
              "flex flex-col items-center justify-center text-center py-10 px-6",
              isDragging
                ? "border-[var(--color-primary)] bg-[var(--color-primary-50)]"
                : "border-[var(--color-border)] bg-[var(--color-app-bg)] hover:border-[var(--color-primary)]/60",
            ].join(" ")}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-50)] flex items-center justify-center mb-4">
              <UploadCloud size={26} className="text-[var(--color-primary)]" strokeWidth={1.75} />
            </div>

            <p className="text-[14px] font-medium text-[var(--color-ink)]">
              Drag and drop a resume, or{" "}
              <span className="text-[var(--color-primary)] underline underline-offset-2">browse</span>
            </p>
            <p className="text-[12px] text-[var(--color-ink-faint)] mt-1.5">PDF up to 10MB</p>
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-app-bg)] px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-[var(--color-primary)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[var(--color-ink)] truncate">{file.name}</p>
                  <p className="text-[11px] text-[var(--color-ink-muted)]">
                    {(file.size / 1024).toFixed(0)} KB \u00b7 Ready to parse
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                aria-label="Remove selected file"
                className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--color-ink-faint)] hover:bg-white hover:text-[var(--color-danger)] transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            </div>
          )}

          <button
            onClick={runUpload}
            disabled={loading || !file}
            className="w-full mt-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:bg-slate-200 disabled:text-[var(--color-ink-faint)] text-white text-[14px] font-semibold py-3 rounded-xl transition-colors duration-150"
          >
            {loading ? "Parsing\u2026" : "Upload & Parse Resume"}
          </button>
        </>
      )}
    </div>
  );
}

export default UploadSection;
