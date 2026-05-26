import { useState } from "react";
import { PortfolioData } from "../types";
import { 
  FolderGit2, 
  ExternalLink, 
  Code
} from "lucide-react";

interface ProjectsSectionProps {
  data: PortfolioData;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="space-y-8 animate-fade-in">
      
      {/* 1. PROJECT GRID CARDS */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-display flex items-center gap-2 px-1">
          <span>Progetti Selezionati</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((proj) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E0D8D0]/25 transition-all duration-300 relative group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold tracking-[0.1em] text-[#050505] bg-[#E0D8D0] px-2.5 py-1 rounded-md uppercase">
                      {proj.category}
                    </span>
                    <FolderGit2 className="w-4 h-4 text-[#E0D8D0]/30 group-hover:text-[#E0D8D0] transition-colors" />
                  </div>

                  <h4 className="text-lg font-medium text-[#E0D8D0] tracking-tight font-sans group-hover:text-white transition-colors">
                    {proj.title}
                  </h4>

                  <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light">
                    {proj.desc}
                  </p>

                  {/* Expand option */}
                  {proj.longDesc && (
                    <div className="pt-1">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                        className="text-xs font-medium text-[#E0D8D0] hover:underline focus:outline-hidden"
                      >
                        {isExpanded ? "Mostra meno" : "Leggi approfondimento tecnico"}
                      </button>

                      {isExpanded && (
                        <p className="text-xs text-[#BDB5AD] mt-2 bg-[#050505] p-3 rounded-lg border border-dashed border-[#E0D8D0]/15 leading-relaxed font-sans animate-slide-in font-light">
                          {proj.longDesc}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Project Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tech.map((tc, keyidx) => (
                      <span
                        key={keyidx}
                        className="text-[10px] font-light text-[#E0D8D0]/80 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 px-2.5 py-0.5 rounded-md"
                      >
                        {tc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Links */}
                {(proj.link || proj.repo) && (
                  <div className="flex items-center gap-4 pt-5 mt-4 border-t border-[#E0D8D0]/10 text-xs font-semibold">
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#BDB5AD] hover:text-[#E0D8D0] flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Visita demo
                      </a>
                    )}
                    {proj.repo && (
                      <a
                        href={proj.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#E0D8D0]/50 hover:text-[#E0D8D0] flex items-center gap-1 transition-colors"
                      >
                        <Code className="w-3.5 h-3.5" /> Codice sorgente
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
