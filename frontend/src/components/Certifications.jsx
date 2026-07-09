import { Award } from "lucide-react";
import SectionCard from "./SectionCard";

function Certifications({ data }) {
  const certifications = data.certifications || [];
  if (certifications.length === 0) return null;

  return (
    <SectionCard icon={Award} title="Certifications">
      <div className="flex flex-wrap gap-2.5">
        {certifications.map((cert, index) => (
          <span
            key={index}
            className="flex items-center gap-2 bg-[var(--color-success-bg)] text-[var(--color-success)] px-3.5 py-2 rounded-lg text-[12.5px] font-medium"
          >
            <Award size={13} />
            {cert}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}

export default Certifications;
