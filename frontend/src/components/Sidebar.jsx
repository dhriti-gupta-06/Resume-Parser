import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  BarChart3,
  Info,
  Settings,
  Sparkles,
  History,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/history", label: "History", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/about", label: "About Project", icon: Info },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col w-[264px] shrink-0 h-screen sticky top-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-label="Primary navigation"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-[var(--color-border)]">
        <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-[0_4px_10px_-2px_rgba(37,99,235,0.5)]">
          <Sparkles size={18} className="text-white" strokeWidth={2.25} />
        </div>
        <div className="leading-tight">
          <p className="font-semibold text-[15px] text-[var(--color-ink)] tracking-tight">
            AI Resume Parser
          </p>
          <p className="text-[11px] text-[var(--color-ink-muted)] font-medium">
            Powered by IBM watsonx
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
          Workspace
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-150",
                isActive
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary-hover)]"
                  : "text-[var(--color-ink-muted)] hover:bg-slate-50 hover:text-[var(--color-ink)]",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  strokeWidth={2}
                  className={isActive ? "text-[var(--color-primary)]" : "text-[var(--color-ink-faint)] group-hover:text-[var(--color-ink-muted)]"}
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-[var(--color-border)]">
        <div className="rounded-xl bg-[var(--color-app-bg)] border border-[var(--color-border)] p-4">
          <p className="text-[12px] font-semibold text-[var(--color-ink)]">
            watsonx connection
          </p>
          <p className="text-[11px] text-[var(--color-ink-muted)] mt-1 leading-relaxed">
            Resume parsing runs on meta-llama 3.3 70B via watsonx.ai
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
