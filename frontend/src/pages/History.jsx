import { useEffect, useState, useCallback } from "react";
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

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return (
    <AppShell>
      <Topbar
        title="Resume History"
        subtitle="Browse and search every uploaded resume."
        search={search}
        onSearchChange={setSearch}
      />

      <main className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-[var(--color-ink)]">
            Resume History
          </h2>

          <p className="text-[12.5px] text-[var(--color-ink-muted)]">
            {resumesList.length} total resumes
          </p>
        </div>

        <ResumeTable
          resumes={enriched}
          loading={detailsLoading}
          search={search}
        />
      </main>
    </AppShell>
  );
}

export default History;