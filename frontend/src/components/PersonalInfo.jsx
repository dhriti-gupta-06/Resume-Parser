import { UserRound, Mail, Phone, MapPin, Link as LinkIcon, Code2, Globe } from "lucide-react";
import SectionCard from "./SectionCard";

function Field({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[var(--color-app-bg)] border border-[var(--color-border)] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-[var(--color-ink-muted)]" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-[var(--color-ink-faint)] uppercase tracking-wide">{label}</p>
        <p className="text-[13.5px] font-medium text-[var(--color-ink)] truncate">{value || "N/A"}</p>
      </div>
    </div>
  );
}

function PersonalInfo({ data }) {
  const info = data.personal_information || {};

  return (
    <SectionCard icon={UserRound} title="Personal Information">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        <Field icon={UserRound} label="Full Name" value={info.full_name} />
        <Field icon={Mail} label="Email" value={info.email} />
        <Field icon={Phone} label="Phone" value={info.phone} />
        <Field icon={MapPin} label="Location" value={info.location} />
        <Field icon={LinkIcon} label="LinkedIn" value={info.linkedin} />
        <Field icon={Code2} label="GitHub" value={info.github} />
        {(info.portfolio || info.website) && (
          <Field icon={Globe} label="Website" value={info.portfolio || info.website} />
        )}
      </div>
    </SectionCard>
  );
}

export default PersonalInfo;
