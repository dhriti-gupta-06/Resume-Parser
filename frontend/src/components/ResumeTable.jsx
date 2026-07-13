import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Briefcase, Sparkles, ArrowUpDown, CheckCircle2 } from "lucide-react";
import { SkeletonTable } from "./Skeleton";

const FILTERS = ["All", "Freshers", "Experienced", "Recently Uploaded"];
const SORTS = ["Newest", "Oldest", "Name"];

function parseUploadedAt(str) {
  // backend stores dates as DD-MM-YYYY
  if (!str) return null;
  const [d, m, y] = str.split("-").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "?";
}

function ResumeTable({ resumes, loading, search = "" }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const filtered = useMemo(() => {
    let rows = [...resumes];

    if (filter === "Freshers") {
      rows = rows.filter((r) => (r.experienceCount ?? 0) === 0);
    } else if (filter === "Experienced") {
      rows = rows.filter((r) => (r.experienceCount ?? 0) > 0);
    } else if (filter === "Recently Uploaded") {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      rows = rows.filter((r) => {
        const d = parseUploadedAt(r.uploaded_at);
        return d && d.getTime() >= weekAgo;
      });
    }

    const sorted = [...rows].sort((a, b) => {
      if (sort === "Name") return (a.name || "").localeCompare(b.name || "");
      const da = parseUploadedAt(a.uploaded_at)?.getTime() ?? a.id;
      const db = parseUploadedAt(b.uploaded_at)?.getTime() ?? b.id;
      return sort === "Oldest" ? da - db : db - da;
    });

    return sorted;
  }, [resumes, search, filter, sort]);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden">
      {/* Toolbar: filters + sort */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors",
                filter === f
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-ink-muted)] hover:bg-slate-50",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-muted)]">
          <ArrowUpDown size={14} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort resumes"
            className="bg-transparent font-medium text-[var(--color-ink)] focus:outline-none cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                Sort: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11.5px] uppercase tracking-wider text-[var(--color-ink-faint)] bg-[var(--color-app-bg)]">
              <th className="px-5 py-3 font-semibold">Candidate</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Phone</th>
              <th className="px-5 py-3 font-semibold">Experience</th>
              <th className="px-5 py-3 font-semibold">Skills</th>
              <th className="px-5 py-3 font-semibold">Uploaded</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonTable rows={6} columns={7} />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <p className="text-[14px] font-medium text-[var(--color-ink)]">No resumes match</p>
                  <p className="text-[12.5px] text-[var(--color-ink-muted)] mt-1">
                    Try a different search term or filter.
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => navigate(`/resume/${r.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`/resume/${r.id}`);
                  }}
                  className="border-b border-[var(--color-border)] last:border-0 cursor-pointer hover:bg-[var(--color-primary-50)]/40 transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-[var(--color-ink-muted)] text-[11px] font-semibold flex items-center justify-center shrink-0">
                        {initials(r.name)}
                      </div>
                      <span className="text-[13.5px] font-medium text-[var(--color-ink)] group-hover:text-[var(--color-primary-hover)]">
                        {r.name || "Untitled Candidate"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-muted)]">
                      <Mail size={13} className="text-[var(--color-ink-faint)]" />
                      {r.email || "\u2014"}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-muted)]">
                      <Phone size={13} className="text-[var(--color-ink-faint)]" />
                      {r.phone || "\u2014"}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-muted)]">
                      <Briefcase size={13} className="text-[var(--color-ink-faint)]" />
                      {r.experienceCount ?? 0} role{(r.experienceCount ?? 0) === 1 ? "" : "s"}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-muted)]">
                      <Sparkles size={13} className="text-[var(--color-ink-faint)]" />
                      {r.skillsCount ?? 0}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-[var(--color-ink-muted)]">{r.uploaded_at}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold bg-[var(--color-success-bg)] text-[var(--color-success)]">
                      <CheckCircle2 size={12} />
                      Parsed
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResumeTable;
