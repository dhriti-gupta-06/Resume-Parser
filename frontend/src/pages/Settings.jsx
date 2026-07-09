import { useState } from "react";
import { Settings as SettingsIcon, Bell, KeyRound } from "lucide-react";
import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import SectionCard from "../components/SectionCard";

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-[13.5px] font-medium text-[var(--color-ink)]">{label}</p>
        {description && <p className="text-[12px] text-[var(--color-ink-muted)] mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${
          checked ? "bg-[var(--color-primary)]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <AppShell>
      <Topbar title="Settings" subtitle="Preview build \u2014 preferences here are not yet wired to the backend." />
      <main className="px-6 lg:px-10 py-8 max-w-[720px] mx-auto space-y-6">
        <SectionCard icon={SettingsIcon} title="Workspace">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-medium text-[var(--color-ink-muted)]">Workspace name</label>
              <input
                defaultValue="Talent Acquisition"
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] text-[13.5px] focus:border-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[var(--color-ink-muted)]">Administrator</label>
              <input
                defaultValue="HR Administrator"
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] text-[13.5px] focus:border-[var(--color-primary)]"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard icon={Bell} title="Notifications">
          <div className="divide-y divide-[var(--color-border)]">
            <Toggle
              checked={emailAlerts}
              onChange={setEmailAlerts}
              label="Email me when a resume finishes parsing"
              description="Get notified as soon as watsonx completes extraction."
            />
            <Toggle
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
              label="Weekly pipeline digest"
              description="A summary of resumes uploaded and parsed each week."
            />
          </div>
        </SectionCard>

        <SectionCard icon={KeyRound} title="watsonx connection">
          <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed">
            Credentials for the watsonx project and model are configured on the backend and are not
            editable from this screen.
          </p>
        </SectionCard>
      </main>
    </AppShell>
  );
}

export default Settings;
