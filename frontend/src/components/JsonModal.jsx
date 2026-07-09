import { useEffect, useState } from "react";
import { X, Copy, Download, Check } from "lucide-react";

/** Lightweight JSON syntax highlighter \u2014 no external dependency required. */
function highlightJson(json) {
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "text-[#B5CEA8]"; // number
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? "text-[#9CDCFE]" : "text-[#CE9178]"; // key vs string
      } else if (/true|false/.test(match)) {
        cls = "text-[#569CD6]";
      } else if (/null/.test(match)) {
        cls = "text-[#C586C0]";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function JsonModal({ data, onClose, filename = "resume" }) {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Parsed resume JSON"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl h-[82vh] bg-[#1E1E1E] rounded-2xl shadow-[var(--shadow-pop)] flex flex-col overflow-hidden border border-black/20"
      >
        {/* title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#252526] border-b border-black/40">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-[12.5px] font-mono text-slate-300">{filename}.json</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              <Download size={13} />
              Download
            </button>
            <button
              onClick={onClose}
              aria-label="Close JSON viewer"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors ml-1"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* code body */}
        <div className="flex-1 overflow-auto">
          <pre className="text-[12.5px] leading-[1.7] font-mono p-6 whitespace-pre">
            <code dangerouslySetInnerHTML={{ __html: highlightJson(jsonString) }} />
          </pre>
        </div>
      </div>
    </div>
  );
}

export default JsonModal;
