import { useEffect, useRef, useState } from "react";

/** Small inline sparkline built from plain SVG, no charting dependency needed. */
function Sparkline({ points = [], color = "var(--color-primary)" }) {
  if (!points.length) return null;

  const w = 96;
  const h = 28;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1 || 1)) * w;
    const y = h - ((p - min) / range) * h;
    return `${x},${y}`;
  });

  const path = `M${coords.join(" L")}`;
  const areaPath = `M0,${h} L${coords.join(" L")} L${w},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible">
      <path d={areaPath} fill={color} opacity="0.08" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = 0;
    startRef.current = null;
    let raf;

    const step = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(fromRef.current + (target - fromRef.current) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function StatCard({ icon: Icon, label, value, suffix = "", decimals = 0, trend, trendLabel, accent = "primary" }) {
  const numericTarget = Number(value) || 0;
  const animated = useCountUp(numericTarget);

  const accentStyles = {
    primary: { bg: "var(--color-primary-50)", fg: "var(--color-primary)" },
    success: { bg: "var(--color-success-bg)", fg: "var(--color-success)" },
    warning: { bg: "var(--color-warning-bg)", fg: "var(--color-warning)" },
  }[accent];

  const isPositive = (trend ?? 0) >= 0;

  return (
    <div className="card-lift bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: accentStyles.bg, color: accentStyles.fg }}
        >
          <Icon size={19} strokeWidth={2} />
        </div>
        {typeof trend === "number" && (
          <span
            className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
              isPositive ? "text-[var(--color-success)] bg-[var(--color-success-bg)]" : "text-[var(--color-danger)] bg-[var(--color-danger-bg)]"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>

      <p className="mt-4 text-[13px] font-medium text-[var(--color-ink-muted)]">{label}</p>

      <div className="mt-1.5 flex items-end justify-between gap-3">
        <p className="tabular-nums text-[28px] font-bold text-[var(--color-ink)] tracking-tight">
          {decimals > 0 ? animated.toFixed(decimals) : Math.round(animated)}
          {suffix}
        </p>
        {trendLabel?.points && <Sparkline points={trendLabel.points} color={accentStyles.fg} />}
      </div>
    </div>
  );
}

export default StatCard;
