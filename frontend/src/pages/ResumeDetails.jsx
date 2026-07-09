import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Code2, Download } from "lucide-react";

import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import JsonModal from "../components/JsonModal";

import Overview from "../components/Overview";
import Summary from "../components/Summary";
import PersonalInfo from "../components/PersonalInfo";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Achievements from "../components/Achievements";

const API_BASE = "http://127.0.0.1:8000";

function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE}/resume/${id}`)
      .then((res) => setResult(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(result, null, 4)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.personal_information?.full_name || "Resume"}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!result) {
    return (
      <AppShell>
        <Topbar title="Resume Details" subtitle="Loading parsed resume\u2026" />
        <main className="px-6 lg:px-10 py-8 max-w-[1200px] mx-auto space-y-6">
          <div className="skeleton h-24 rounded-2xl" />
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-2xl" />
            ))}
          </div>
          <div className="skeleton h-48 rounded-2xl" />
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Topbar
        title={result.personal_information?.full_name || "Candidate Resume"}
        subtitle={result.personal_information?.email}
      />

      <main className="px-6 lg:px-10 py-8 max-w-[1200px] mx-auto space-y-6">
        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex gap-2.5">
            <button
              onClick={() => setShowJson(true)}
              className="flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-slate-50 transition-colors"
            >
              <Code2 size={15} />
              View JSON
            </button>
            <button
              onClick={downloadJson}
              className="flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              <Download size={15} />
              Download JSON
            </button>
          </div>
        </div>

        <Overview data={result} />
        <Summary data={result} />
        <PersonalInfo data={result} />
        <Skills data={result} />

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <Education data={result} />
          <Certifications data={result} />
        </div>

        <Experience data={result} />
        <Projects data={result} />
        <Achievements data={result} />
      </main>

      {showJson && (
        <JsonModal
          data={result}
          onClose={() => setShowJson(false)}
          filename={result.personal_information?.full_name || "resume"}
        />
      )}
    </AppShell>
  );
}

export default ResumeDetails;
