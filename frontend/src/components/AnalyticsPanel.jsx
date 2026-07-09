import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import { PieChart as PieIcon, TrendingUp, Layers } from "lucide-react";

const PALETTE = ["#2563EB", "#1D4ED8", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"];

function PanelCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-[var(--shadow-card)] p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-[var(--color-primary)]" />
        <h3 className="text-[13.5px] font-semibold text-[var(--color-ink)]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-ink)] text-white text-[11.5px] px-3 py-2 rounded-lg shadow-lg">
      {label && <p className="font-medium mb-0.5">{label}</p>}
      {payload.map((p, i) => (
        <p key={i}>{p.name ?? p.dataKey}: {p.value}</p>
      ))}
    </div>
  );
}

function AnalyticsPanel({ topSkills = [], uploadTrend = [], experienceDistribution = [] }) {
  return (
    <div className="space-y-5">
      <PanelCard icon={PieIcon} title="Top Skills">
        {topSkills.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-[110px] h-[110px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topSkills} dataKey="count" nameKey="name" innerRadius={32} outerRadius={52} paddingAngle={2}>
                    {topSkills.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1.5 flex-1 min-w-0">
              {topSkills.slice(0, 6).map((s, i) => (
                <li key={s.name} className="flex items-center gap-2 text-[12px] min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                  <span className="truncate text-[var(--color-ink-muted)]">{s.name}</span>
                  <span className="ml-auto font-semibold text-[var(--color-ink)]">{s.count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PanelCard>

      <PanelCard icon={TrendingUp} title="Resume Upload Trend">
        {uploadTrend.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="h-[130px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uploadTrend} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={22} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2.25} dot={{ r: 3, fill: "#2563EB" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </PanelCard>

      <PanelCard icon={Layers} title="Experience Distribution">
        {experienceDistribution.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="h-[130px] -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceDistribution} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={22} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </PanelCard>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-[100px] flex items-center justify-center text-[12px] text-[var(--color-ink-faint)]">
      Not enough data yet
    </div>
  );
}

export default AnalyticsPanel;
