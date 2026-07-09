import { FolderGit2, Calendar, ExternalLink, Code2 } from "lucide-react";
import SectionCard from "./SectionCard";

function Projects({ data }) {
  const projects = data.projects || [];
  if (projects.length === 0) return null;

  return (
    <SectionCard icon={FolderGit2} title="Projects">
      <div className="space-y-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--color-border)] p-6 hover:border-[var(--color-primary)]/40 transition-colors"
          >
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <h3 className="text-[15.5px] font-semibold text-[var(--color-ink)]">{project.project_name}</h3>
                {project.duration && (
                  <div className="flex items-center gap-1.5 mt-1.5 text-[12.5px] text-[var(--color-ink-muted)]">
                    <Calendar size={13} className="text-[var(--color-ink-faint)]" />
                    {project.duration}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-[var(--color-ink)] text-white px-3 py-1.5 rounded-lg text-[12px] font-medium hover:bg-slate-800 transition-colors"
                  >
                    <Code2 size={13} />
                    Code
                  </a>
                )}
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-[var(--color-primary)] text-white px-3 py-1.5 rounded-lg text-[12px] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                  >
                    <ExternalLink size={13} />
                    Live
                  </a>
                )}
              </div>
            </div>

            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[var(--color-primary-50)] text-[var(--color-primary-hover)] px-3 py-1 rounded-md text-[12px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.description?.length > 0 && (
              <ul className="mt-4 space-y-2">
                {project.description.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export default Projects;
