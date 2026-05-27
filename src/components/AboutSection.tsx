import { PortfolioData } from "../types";
import { Sparkles } from "lucide-react";

interface AboutSectionProps {
  data: PortfolioData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="space-y-8 animate-fade-in">
      
      {/* 1. HERO BIO HEADER */}
      <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 hover:border-[#E0D8D0]/20 transition-all duration-350 relative overflow-hidden">
        {/* Subtle glow highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-2 text-[#E0D8D0]">
          <Sparkles className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Presentazione</span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
          {data.tagline}
        </h2>

        <p className="text-[#BDB5AD] leading-relaxed text-sm md:text-base font-light">
          {data.bio || "Sviluppatore software con focus sulla qualità del codice e integrazione intelligente di tecnologie generative."}
        </p>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: SKILLS TABLE (LEFT) + ACTIVITIES (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT: SKILLS TABLE */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-display px-1">
            Le Mie Competenze
          </h3>
          
          <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-xl overflow-hidden hover:border-[#E0D8D0]/20 transition-all duration-300">
            <table className="w-full text-xs">
              <tbody>
                {data.skills && data.skills[0] && data.skills[0].items.map((item, idx) => (
                  <tr 
                    key={idx}
                    className={`border-b border-[#E0D8D0]/5 last:border-b-0 ${
                      idx % 2 === 0 ? "bg-[#050505]/40" : "bg-transparent"
                    }`}
                  >
                    <td className="px-4 py-3 text-[#E0D8D0] font-medium">
                      {idx + 1}.
                    </td>
                    <td className="px-4 py-3 text-[#BDB5AD] font-light">
                      {item}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: ACTIVITIES */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-display px-1">
            Attività Extra-Curriculari
          </h3>

          <div className="space-y-3">
            {data.activities && data.activities.map((activity) => (
              <div 
                key={activity.id}
                className="bg-[#121212] border border-[#E0D8D0]/10 rounded-xl p-4 hover:border-[#E0D8D0]/20 transition-all duration-300 flex items-start gap-3"
              >
                <div className="text-2xl shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#E0D8D0] truncate">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-[#BDB5AD] font-light truncate">
                    {activity.organization}
                  </p>
                  <p className="text-[9px] text-[#E0D8D0]/50 font-mono uppercase tracking-wide">
                    {activity.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
