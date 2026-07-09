import { Sparkles, BrainCircuit, ShieldCheck, Workflow } from "lucide-react";
import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import SectionCard from "../components/SectionCard";

const FACTS = [
  { icon: BrainCircuit, title: "AI parsing", body: "Resumes are parsed with a large language model served on IBM watsonx.ai, returning fully structured JSON." },
  { icon: Workflow, title: "End-to-end pipeline", body: "Upload, text extraction, AI parsing, and storage happen in a single request, then the dashboard refreshes automatically." },
  { icon: ShieldCheck, title: "Structured & consistent", body: "Every resume is normalized into the same schema \u2014 personal info, skills, experience, education, and more." },
];

function AboutProject() {
  return (
    <AppShell>
      <Topbar title="About Project" subtitle="How AI Resume Parser turns PDFs into structured candidate data." />
      <main className="px-6 lg:px-10 py-8 max-w-[900px] mx-auto space-y-6">
        <SectionCard icon={Sparkles} title="AI Resume Parser">
          <p className="text-[14px] leading-[1.9] text-[var(--color-ink-muted)]">
            AI Resume Parser is an HR resume management system that ingests candidate PDFs, extracts
            every field of a resume with an AI model on IBM watsonx, and stores the structured result for
            instant search, filtering, and analytics across your candidate pipeline.
          </p>
        </SectionCard>

        <div className="grid sm:grid-cols-3 gap-5">
          {FACTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-[var(--shadow-card)]">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center mb-3">
                <Icon size={16} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="text-[13.5px] font-semibold text-[var(--color-ink)]">{title}</h3>
              <p className="text-[12.5px] text-[var(--color-ink-muted)] mt-1.5 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}

export default AboutProject;
