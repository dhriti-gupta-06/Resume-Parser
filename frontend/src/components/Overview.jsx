import { User, Briefcase, GraduationCap, FolderGit2, Award, Wrench } from "lucide-react";

function Overview({ data }) {
  const totalSkills = Object.values(data.technical_skills || {}).flat().length;

  const items = [
    { icon: User, label: "Candidate", value: data.personal_information?.full_name || "\u2014" },
    { icon: Briefcase, label: "Experience", value: data.professional_experience?.length ?? 0 },
    { icon: FolderGit2, label: "Projects", value: data.projects?.length ?? 0 },
    { icon: GraduationCap, label: "Education", value: data.education?.length ?? 0 },
    { icon: Award, label: "Certificates", value: data.certifications?.length ?? 0 },
    { icon: Wrench, label: "Skills", value: totalSkills },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {items.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="card-lift bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center shadow-[var(--shadow-card)]"
        >
          <div className="w-9 h-9 mx-auto rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center">
            <Icon size={16} className="text-[var(--color-primary)]" strokeWidth={2} />
          </div>
          <p className="mt-3 text-[11.5px] font-medium text-[var(--color-ink-muted)]">{label}</p>
          <p className="mt-1 text-[17px] font-bold text-[var(--color-ink)] truncate">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default Overview;
