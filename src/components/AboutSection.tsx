import { PortfolioData } from "../types";
import { Sparkles, Calendar } from "lucide-react";

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

      {/* 2. CHIP SKILLS SECTION */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-display flex items-center gap-2 px-1">
          <span>Le Mie Competenze hard & soft</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skills.map((cat, idx) => (
            <div key={idx} className="bg-[#121212] border border-[#E0D8D0]/10 rounded-xl p-5 hover:border-[#E0D8D0]/20 transition-all duration-300">
              <h4 className="text-[10px] font-semibold text-[#E0D8D0]/50 uppercase tracking-[0.15em] mb-3 leading-none border-b border-[#E0D8D0]/10 pb-2">
                {cat.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item, idy) => (
                  <span
                    key={idy}
                    className="text-xs font-light text-[#E0D8D0]/80 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 hover:text-[#E0D8D0] px-2.5 py-1 rounded-md transition-colors border border-[#E0D8D0]/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
