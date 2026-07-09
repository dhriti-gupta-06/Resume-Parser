import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionCard from "./SectionCard";

function Experience({ data }) {
  const experiences = data.professional_experience || [];
  if (experiences.length === 0) return null;

  return (
    <SectionCard icon={Briefcase} title="Professional Experience">
      <div className="relative border-l-2 border-[var(--color-border)] ml-3">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 pb-10 last:pb-0">
            <div className="absolute w-3 h-3 rounded-full bg-[var(--color-primary)] -left-[7px] top-1.5 ring-4 ring-white" />

            <div className="rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)]/40 transition-colors">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-[15.5px] font-semibold text-[var(--color-ink)]">{exp.designation}</h3>
                  <p className="text-[13.5px] font-medium text-[var(--color-primary)] mt-0.5">{exp.company}</p>
                </div>
                {exp.currently_working && (
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-[12.5px] text-[var(--color-ink-muted)]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[var(--color-ink-faint)]" />
                  {exp.start_date} \u2013 {exp.end_date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[var(--color-ink-faint)]" />
                  {exp.location || "Not mentioned"}
                </span>
              </div>

              {exp.responsibilities?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default Experience;
