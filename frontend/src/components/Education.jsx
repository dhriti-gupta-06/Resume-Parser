import { GraduationCap, Calendar, MapPin } from "lucide-react";
import SectionCard from "./SectionCard";

function Education({ data }) {
  const education = data.education || [];
  if (education.length === 0) return null;

  return (
    <SectionCard icon={GraduationCap} title="Education">
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-app-bg)]/60 transition-colors"
          >
            <h3 className="text-[15px] font-semibold text-[var(--color-ink)]">{edu.degree}</h3>
            {edu.specialization && (
              <p className="text-[13px] text-[var(--color-ink-muted)] mt-0.5">{edu.specialization}</p>
            )}
            <p className="text-[13.5px] font-medium text-[var(--color-primary)] mt-2">{edu.institution}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-[12.5px] text-[var(--color-ink-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[var(--color-ink-faint)]" />
                {edu.start_date} \u2013 {edu.end_date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[var(--color-ink-faint)]" />
                {edu.location || "N/A"}
              </span>
              {(edu.cgpa || edu.percentage) && (
                <span className="font-medium text-[var(--color-ink)]">
                  {edu.cgpa ? `CGPA ${edu.cgpa}` : `${edu.percentage}%`}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default Education;
