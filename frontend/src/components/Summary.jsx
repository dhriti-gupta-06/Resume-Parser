import { NotebookText } from "lucide-react";
import SectionCard from "./SectionCard";

function Summary({ data }) {
  if (!data.professional_summary) return null;

  return (
    <SectionCard icon={NotebookText} title="Professional Summary">
      <p className="text-[14.5px] leading-[1.9] text-[var(--color-ink-muted)]">{data.professional_summary}</p>
    </SectionCard>
  );
}

export default Summary;
