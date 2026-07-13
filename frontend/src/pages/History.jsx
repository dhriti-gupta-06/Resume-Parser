import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import axios from "axios";

import AppShell from "../components/AppShell";
import Topbar from "../components/Topbar";
import ResumeTable from "../components/ResumeTable";

const API_BASE = "http://127.0.0.1:8000";

function History() {
  const [resumesList, setResumesList] = useState([]);
  const [enriched, setEnriched] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

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

      if (res.status !== "fulfilled") {
        return {
          ...r,
          experienceCount: 0,
          skillsCount: 0,
          skillsList: [],
        };
      }

      const data = res.value.data;

      const skillsList = Object.values(
        data.technical_skills || {}
      ).flat();

      return {
        ...r,
        phone: data.personal_information?.phone,
        experienceCount:
          data.professional_experience?.length ?? 0,
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
  const searchCandidates = useCallback(async (query) => {
    if (!query.trim()) {
      refreshAll();
      return;
    }

    try {
      setLoadingSearch(true);

      const response = await axios.post(`${API_BASE}/search`, {
        query: query,
      });

      const rows = response.data.results.map((r) => ({
        ...r,
        experienceCount: r.experience,
        skillsList: r.skills
          ? r.skills.split(",").map((s) => s.trim())
          : [],
        skillsCount: r.skills
          ? r.skills.split(",").length
          : 0,
      }));

      setEnriched(rows);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSearch(false);
    }
  }, [refreshAll]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <AppShell>
      <Topbar
        title="Resume History"
        subtitle="Browse and search every uploaded resume."
       
      />

      <main className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        <div className="mb-6">
          <div className="relative max-w-2xl mb-5">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchCandidates(e.target.value);
              }}
              placeholder="Search candidates using natural language (e.g. Python developer with AWS, 3 years experience)"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-[14px] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">
              Resume History
            </h2>

            <p className="text-[12.5px] text-[var(--color-ink-muted)]">
              {resumesList.length} total resumes
            </p>
          </div>
        </div>

        <ResumeTable
          resumes={enriched}
          loading={detailsLoading || loadingSearch}
          
        />
      </main>
    </AppShell>
  );
}

export default History;