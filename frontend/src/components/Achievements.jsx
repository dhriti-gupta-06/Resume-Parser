import { Trophy } from "lucide-react";
import SectionCard from "./SectionCard";

function Achievements({ data }) {
  const achievements = data.achievements || [];
  if (achievements.length === 0) return null;

  return (
    <SectionCard icon={Trophy} title="Achievements">
      <ul className="space-y-3">
        {achievements.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-[var(--color-ink-muted)]">
            <span className="w-7 h-7 rounded-lg bg-[var(--color-warning-bg)] text-[var(--color-warning)] flex items-center justify-center shrink-0">
              <Trophy size={13} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default Achievements;
