import { PortfolioData } from "../types";
import { MapPin, Calendar, GraduationCap } from "lucide-react";

interface SidebarProps {
  data: PortfolioData;
}

export default function Sidebar({ data }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0 select-none">
      <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 shadow-sm sticky top-6 hover:shadow-md transition-shadow duration-300 flex flex-col gap-6">
        
        {/* Profile Avatar Frame */}
        <div className="relative group flex flex-col items-center">
          <div className="w-full h-auto rounded-2xl bg-gradient-to-tr from-[#E0D8D0]/50 via-[#E0D8D0]/10 to-[#E0D8D0]/45 p-[2px] shadow-lg transition-transform duration-500 group-hover:scale-105 overflow-hidden">
            <div className="w-full h-auto bg-[#121212] rounded-[13px] flex items-center justify-center overflow-hidden">
              <img 
                src="/img/miafoto.png" 
                alt="Tommaso Copparoni Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
        </div>

        {/* Profile Identity */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#E0D8D0] tracking-tight font-display mb-1.5">
            {data.name}
          </h1>
        </div>

        <div className="h-[1px] bg-[#E0D8D0]/10" />

        {/* Dynamic Professional Status details */}
        <div className="space-y-3.5 text-xs text-[#BDB5AD]">
          {/* Date of Birth */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#E0D8D0]/5 text-[#E0D8D0]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#E0D8D0]/40 uppercase tracking-wide block leading-none mb-0.5 font-sans">Data di Nascita</span>
              <span className="font-medium text-[#E0D8D0]">27/08/2007</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#E0D8D0]/5 text-[#E0D8D0]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#E0D8D0]/40 uppercase tracking-wide block leading-none mb-0.5 font-sans">Luogo</span>
              <span className="font-medium text-[#E0D8D0]">{data.location}</span>
            </div>
          </div>

          {/* School */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-[#E0D8D0]/5 text-[#E0D8D0]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-semibold text-[#E0D8D0]/40 uppercase tracking-wide block leading-none mb-0.5 font-sans">Istituto Scolastico</span>
              <span className="font-medium text-[#E0D8D0]">IIS Marconi Pieralisi</span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
