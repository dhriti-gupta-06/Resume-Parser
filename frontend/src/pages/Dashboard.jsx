import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FileStack, CheckCircle2, Sparkles, Clock3 } from "lucide-react";

import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import UploadSection from "../components/UploadSection";
import ResumeTable from "../components/ResumeTable";
import AnalyticsPanel from "../components/AnalyticsPanel";

const API_BASE = "http://127.0.0.1:8000";

function parseUploadedAt(str) {
  if (!str) return null;
  const [d, m, y] = str.split("-").map(Number);
  if (!d || !m || !y) return null;
  return new Date(y, m - 1, d);
}

function Dashboard() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumesList, setResumesList] = useState([]);
  const [enriched, setEnriched] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Step 1: fetch the lightweight resume list (unchanged endpoint contract).
  const fetchResumes = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/resumes`);
      setResumesList(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  // Step 2: enrich each row with details (skills/experience/phone) using the
  // existing GET /resume/{id} endpoint so the table, stats, and analytics can
  // show more than the list endpoint alone provides. No backend changes.
  const enrichResumes = useCallback(async (list) => {
    if (list.length === 0) {
      setEnriched([]);
      setDetailsLoading(false);
      return;
    }
    setDetailsLoading(true);
    const results = await Promise.allSettled(
      list.map((r) => axios.get(`${API_BASE}/resume/${r.id}`))
    );

    const rows = list.map((r, i) => {
      const res = results[i];
      if (res.status !== "fulfilled") return { ...r, experienceCount: 0, skillsCount: 0, skillsList: [] };

      const data = res.value.data;
      const skillsList = Object.values(data.technical_skills || {}).flat();

      return {
        ...r,
        phone: data.personal_information?.phone,
        experienceCount: data.professional_experience?.length ?? 0,
        skillsCount: skillsList.length,
        skillsList,
      };
    });

    setEnriched(rows);
    setDetailsLoading(false);
  }, []);

  const refreshAll = useCallback(async () => {
    const list = await fetchResumes();
    await enrichResumes(list);
  }, [fetchResumes, enrichResumes]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null);
      await refreshAll();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Unable to connect to the FastAPI backend.");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Derived stats
  const stats = useMemo(() => {
    const total = resumesList.length;
    const parsed = enriched.filter((r) => r.name && r.email).length;
    const skillsExtracted = enriched.reduce((sum, r) => sum + (r.skillsCount || 0), 0);
    const avgExperience =
      enriched.length > 0
        ? enriched.reduce((sum, r) => sum + (r.experienceCount || 0), 0) / enriched.length
        : 0;

    return { total, parsed, skillsExtracted, avgExperience };
  }, [resumesList, enriched]);

  // Derived analytics
  const analytics = useMemo(() => {
    const skillFreq = {};
    enriched.forEach((r) => (r.skillsList || []).forEach((s) => {
      skillFreq[s] = (skillFreq[s] || 0) + 1;
    }));
    const topSkills = Object.entries(skillFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    console.log(enriched);

    enriched.forEach((r) => {
      console.log(r.uploaded_at);
    });

    const trendMap = {};
    enriched.forEach((r) => {
      const d = parseUploadedAt(r.uploaded_at);
      if (!d) return;
      const key = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
      trendMap[key] = (trendMap[key] || 0) + 1;
    });
    const uploadTrend = Object.entries(trendMap)
      .map(([date, count]) => ({ date, count }))
      .slice(-10);

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


  const latestFive = useMemo(() => {
    return [...enriched]
      .sort((a, b) => {
        const da = parseUploadedAt(a.uploaded_at)?.getTime() ?? 0;
        const db = parseUploadedAt(b.uploaded_at)?.getTime() ?? 0;
        return db - da;
      })
      .slice(0, 5);
  }, [enriched]);

  return (
    <AppShell>
      <Topbar
        title="Welcome back, HR Administrator"
        subtitle="Here's what's happening with your candidate pipeline today."
        search={search}
        onSearchChange={setSearch}
      />

      <main className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={FileStack} label="Total Resumes" value={stats.total} trend={stats.total > 0 ? 8 : 0} />
          <StatCard
            icon={CheckCircle2}
            label="Successfully Parsed"
            value={stats.parsed}
            accent="success"
            trend={stats.parsed > 0 ? 5 : 0}
          />
          <StatCard icon={Sparkles} label="Skills Extracted" value={stats.skillsExtracted} accent="primary" trend={12} />
          <StatCard
            icon={Clock3}
            label="Average Experience"
            value={stats.avgExperience}
            decimals={1}
            suffix=" roles"
            accent="warning"
          />
        </div>

        {/* Upload + table / analytics */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6 mt-6 items-start">
          <div className="space-y-6 min-w-0">
            <UploadSection file={file} setFile={setFile} uploadResume={uploadResume} loading={uploading} />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">
                  Recent Uploads
                </h2>

                <div className="flex items-center gap-4">
                  <p className="text-[12.5px] text-[var(--color-ink-muted)]">
                    Showing latest 5 of {resumesList.length}
                  </p>

                  <Link
                    to="/history"
                    className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  >
                    View All →
                  </Link>
                </div>
              </div>
              <ResumeTable resumes={latestFive} loading={detailsLoading} search={search} />
            </div>
          </div>

          <AnalyticsPanel {...analytics} />
        </div>
      </main>
    </AppShell>
  );
}

export default Dashboard;
