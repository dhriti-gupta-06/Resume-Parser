import { Wrench } from "lucide-react";
import SectionCard from "./SectionCard";

function Skills({ data }) {
  const skills = data.technical_skills || {};
  const hasAny = Object.values(skills).some((v) => v?.length > 0);

  if (!hasAny) return null;

  return (
    <SectionCard icon={Wrench} title="Technical Skills">
      <div className="space-y-6">
        {Object.entries(skills).map(
          ([category, values]) =>
            values?.length > 0 && (
              <div key={category}>
                <h3 className="text-[11.5px] font-semibold uppercase tracking-wide text-[var(--color-ink-faint)] mb-3">
                  {category.replace(/_/g, " ")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {values.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[var(--color-primary-50)] text-[var(--color-primary-hover)] px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </SectionCard>
  );
}

export default Skills;
