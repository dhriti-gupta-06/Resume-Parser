import { Search, Bell } from "lucide-react";

function Topbar({
  title = "Welcome back, HR Administrator",
  subtitle,
  search,
  onSearchChange,
  searchPlaceholder = "Search resumes by name, email or skill\u2026",
}) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-surface)]/80 backdrop-blur border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between gap-6 px-6 lg:px-10 h-20">
        <div className="min-w-0">
          <h1 className="text-[19px] font-semibold text-[var(--color-ink)] tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-[var(--color-ink-muted)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          {typeof search === "string" && (
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search resumes"
                className="w-72 pl-9 pr-3 py-2.5 text-[13px] rounded-lg border border-[var(--color-border)] bg-[var(--color-app-bg)] placeholder:text-[var(--color-ink-faint)] focus:bg-white focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          )}

          <button
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink-muted)] hover:bg-slate-50 hover:text-[var(--color-ink)] transition-colors"
          >
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
          </button>

          <div className="flex items-center gap-2.5 pl-1">
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] flex items-center justify-center text-white text-[13px] font-semibold"
              aria-hidden="true"
            >
              HR
            </div>
            <div className="hidden xl:block leading-tight">
              <p className="text-[13px] font-medium text-[var(--color-ink)]">
                HR Administrator
              </p>
              <p className="text-[11px] text-[var(--color-ink-muted)]">
                Talent Acquisition
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
