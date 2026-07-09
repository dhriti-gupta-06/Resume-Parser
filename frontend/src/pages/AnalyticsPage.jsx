import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import AnalyticsPanel from "../components/AnalyticsPanel";

const API_BASE = "http://127.0.0.1:8000";

function parseUploadedAt(str) {
  if (!str) return null;
  const [d, m, y] = str.split("-").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function AnalyticsPage() {
  const [enriched, setEnriched] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: list } = await axios.get(`${API_BASE}/resumes`);
      const results = await Promise.allSettled(list.map((r) => axios.get(`${API_BASE}/resume/${r.id}`)));

      const rows = list.map((r, i) => {
        const res = results[i];
        if (res.status !== "fulfilled") return { ...r, experienceCount: 0, skillsList: [] };
        const data = res.value.data;
        return {
          ...r,
          experienceCount: data.professional_experience?.length ?? 0,
          skillsList: Object.values(data.technical_skills || {}).flat(),
        };
      });
      setEnriched(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const analytics = useMemo(() => {
    const skillFreq = {};
    enriched.forEach((r) => (r.skillsList || []).forEach((s) => (skillFreq[s] = (skillFreq[s] || 0) + 1)));
    const topSkills = Object.entries(skillFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    const trendMap = {};
    enriched.forEach((r) => {
      const d = parseUploadedAt(r.uploaded_at);
      if (!d) return;
      const key = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      trendMap[key] = (trendMap[key] || 0) + 1;
    });
    const uploadTrend = Object.entries(trendMap).map(([date, count]) => ({ date, count }));

    const buckets = { Fresher: 0, "1\u20132 yrs": 0, "3\u20135 yrs": 0, "6+ yrs": 0 };
    enriched.forEach((r) => {
      const n = r.experienceCount || 0;
      if (n === 0) buckets["Fresher"]++;
      else if (n <= 2) buckets["1\u20132 yrs"]++;
      else if (n <= 5) buckets["3\u20135 yrs"]++;
      else buckets["6+ yrs"]++;
    });
    const experienceDistribution = Object.entries(buckets).map(([label, count]) => ({ label, count }));

    return { topSkills, uploadTrend, experienceDistribution };
  }, [enriched]);

  return (
    <AppShell>
      <Topbar title="Analytics" subtitle="Aggregate insight across every parsed resume." />
      <main className="px-6 lg:px-10 py-8 max-w-[1000px] mx-auto">
        {loading ? (
          <div className="grid gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-40 rounded-2xl" />
            ))}
          </div>
        ) : (
          <AnalyticsPanel {...analytics} />
        )}
      </main>
    </AppShell>
  );
}

export default AnalyticsPage;
