import { useState } from "react";
import { PortfolioData, SkillCategory, Project, Experience } from "../types";
import { X, Save, Plus, Trash2, Sliders, Info } from "lucide-react";

interface CustomizerModalProps {
  data: PortfolioData;
  onUpdate: (updated: PortfolioData) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizerModal({ data, onUpdate, isOpen, onClose }: CustomizerModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "skills" | "projects" | "experiences">("general");

  // Form states copy
  const [name, setName] = useState(data.name);
  const [role, setRole] = useState(data.role);
  const [tagline, setTagline] = useState(data.tagline);
  const [bio, setBio] = useState(data.bio);
  const [location, setLocation] = useState(data.location);
  const [email, setEmail] = useState(data.email);
  const [github, setGithub] = useState(data.github);
  const [linkedin, setLinkedin] = useState(data.linkedin);
  const [rates, setRates] = useState(data.rates || "");
  const [availability, setAvailability] = useState(data.availability || "");

  const [skills, setSkills] = useState<SkillCategory[]>([...data.skills]);
  const [projects, setProjects] = useState<Project[]>([...data.projects]);
  const [experiences, setExperiences] = useState<Experience[]>([...data.experiences]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated: PortfolioData = {
      name,
      role,
      tagline,
      bio,
      location,
      email,
      github,
      linkedin,
      rates,
      availability,
      skills,
      projects,
      experiences,
    };
    onUpdate(updated);
    onClose();
  };

  // Skill editing handlers
  const handleAddSkillCategory = () => {
    setSkills([...skills, { category: "Nuova Categoria", items: ["Esempio Skill"] }]);
  };

  const handleRemoveSkillCategory = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleSkillCategoryChange = (idx: number, newVal: string) => {
    const next = [...skills];
    next[idx].category = newVal;
    setSkills(next);
  };

  const handleSkillItemsChange = (idx: number, newVal: string) => {
    const next = [...skills];
    next[idx].items = newVal.split(",").map((s) => s.trim()).filter(Boolean);
    setSkills(next);
  };

  // Project editing handlers
  const handleAddProject = () => {
    const newProj: Project = {
      id: "proj-" + Date.now(),
      title: "Nuovo Progetto",
      desc: "Breve descrizione del progetto per attirare i clienti.",
      tech: ["React", "TypeScript"],
      category: "Sviluppo"
    };
    setProjects([...projects, newProj]);
  };

  const handleUpdateProject = (index: number, field: keyof Project, val: any) => {
    const next = [...projects];
    if (field === "tech") {
      next[index] = { ...next[index], tech: val.split(",").map((s: string) => s.trim()).filter(Boolean) };
    } else {
      next[index] = { ...next[index], [field]: val };
    }
    setProjects(next);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Experience editing handlers
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: "exp-" + Date.now(),
      role: "Ingegnere Software",
      company: "Azienda Italiana S.p.A.",
      period: "2025 - Presente",
      desc: "Descrizione saliente del lavoro completato e delle tecnologie adottate."
    };
    setExperiences([...experiences, newExp]);
  };

  const handleUpdateExperience = (index: number, field: keyof Experience, val: string) => {
    const next = [...experiences];
    next[index] = { ...next[index], [field]: val };
    setExperiences(next);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#050505]/80 backdrop-blur-sm transition-opacity duration-300">
      {/* Outer Click Close */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Drawer Container */}
      <div className="w-full max-w-2xl bg-[#121212] border-l border-[#E0D8D0]/10 h-full flex flex-col shadow-2xl animate-slide-in relative text-[#E0D8D0]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E0D8D0]/10 flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#E0D8D0]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] font-sans">Personalizza Portfolio</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#E0D8D0]/10 text-[#E0D8D0]/60 hover:text-[#E0D8D0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Tip */}
        <div className="bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 p-4 mx-5 mt-4 rounded-xl text-xs text-[#BDB5AD] flex gap-2.5 items-start">
          <Info className="w-4 h-4 text-[#E0D8D0] shrink-0 mt-0.5" />
          <span className="font-light leading-relaxed">
            <strong>Nota di simulazione:</strong> Tutte le modifiche fatte in questo pannello verranno immediatamente digerite anche dall'<strong>AI-Twin</strong>, che risponderà ai recruiter assumendo la tua nuova identità professionale.
          </span>
        </div>

        {/* Editing Tabs */}
        <div className="flex px-5 mt-4 border-b border-[#E0D8D0]/10 gap-1 text-xs uppercase tracking-wider overflow-x-auto text-nowrap">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === "general" ? "border-[#E0D8D0] text-[#E0D8D0]" : "border-transparent text-[#E0D8D0]/40 hover:text-[#E0D8D0]"
            }`}
          >
            Anagrafica & Bio
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === "skills" ? "border-[#E0D8D0] text-[#E0D8D0]" : "border-transparent text-[#E0D8D0]/40 hover:text-[#E0D8D0]"
            }`}
          >
            Competenze
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === "projects" ? "border-[#E0D8D0] text-[#E0D8D0]" : "border-transparent text-[#E0D8D0]/40 hover:text-[#E0D8D0]"
            }`}
          >
            Progetti
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === "experiences" ? "border-[#E0D8D0] text-[#E0D8D0]" : "border-transparent text-[#E0D8D0]/40 hover:text-[#E0D8D0]"
            }`}
          >
            Esperienze
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* 1. GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-4 animate-fade-in text-xs font-light">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Nome Completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="Esempio: Marco Rossi"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Ruolo Professionale</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="Esempio: Frontend Engineer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Tagline ad Impatto</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40 font-serif italic text-sm"
                  placeholder="Una frase sintetica ad alto impatto per l'header principale"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Biografia Estesa</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40 text-xs font-light leading-relaxed"
                  placeholder="Scrivi qualcosa sulla tua storia e sulle passioni..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Sede / Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="Milano, Italia (Remoto)"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Email di Contatto</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="collabora@esempio.it"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">GitHub URL</label>
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="https://github.com/tuo-profilo"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="https://linkedin.com/in/tuo-profilo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E0D8D0]/10">
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Disponibilità Lavoro</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="Immediata / 30 giorni"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-semibold text-[#E0D8D0]/60 uppercase tracking-widest mb-1.5">Tariffa Giornaliera o Oraria</label>
                  <input
                    type="text"
                    value={rates}
                    onChange={(e) => setRates(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050505] text-[#E0D8D0] border border-[#E0D8D0]/15 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 placeholder-[#E0D8D0]/40"
                    placeholder="€50 / ora"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#E0D8D0]/50 uppercase tracking-widest">Gruppi Competenze</span>
                <button
                  onClick={handleAddSkillCategory}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] bg-[#E0D8D0]/10 border border-[#E0D8D0]/20 text-[#E0D8D0] font-sans uppercase tracking-wider rounded-lg hover:bg-[#E0D8D0]/20 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Aggiungi Gruppo
                </button>
              </div>

              {skills.map((sk, idx) => (
                <div key={idx} className="p-4 border border-[#E0D8D0]/10 rounded-xl bg-[#050505]/40 space-y-4 hover:border-[#E0D8D0]/20 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Nome Categoria</label>
                      <input
                        type="text"
                        value={sk.category}
                        onChange={(e) => handleSkillCategoryChange(idx, e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#050506] font-semibold text-xs border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveSkillCategory(idx)}
                      className="p-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors mt-5 cursor-pointer"
                      title="Elimina categoria"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">
                      Competenze (separate da virgola)
                    </label>
                    <input
                      type="text"
                      value={sk.items.join(", ")}
                      onChange={(e) => handleSkillItemsChange(idx, e.target.value)}
                      className="w-full px-3 py-2 bg-[#050506] text-xs font-light border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30"
                      placeholder="React, Vue, Svelte"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#E0D8D0]/50 uppercase tracking-widest">Lavori & Progetti Realizzati</span>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] bg-[#E0D8D0]/10 border border-[#E0D8D0]/20 text-[#E0D8D0] font-sans uppercase tracking-wider rounded-lg hover:bg-[#E0D8D0]/20 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Aggiungi Progetto
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 border border-[#E0D8D0]/10 rounded-xl bg-[#050505]/40 space-y-4 hover:border-[#E0D8D0]/20 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Titolo Progetto</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#050506] text-xs font-semibold border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveProject(idx)}
                      className="p-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors mt-4 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Categoria</label>
                      <input
                        type="text"
                        value={proj.category}
                        onChange={(e) => handleUpdateProject(idx, "category", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Tecnologie (separate da virgola)</label>
                      <input
                        type="text"
                        value={proj.tech.join(", ")}
                        onChange={(e) => handleUpdateProject(idx, "tech", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Descrizione Corta</label>
                    <textarea
                      value={proj.desc}
                      onChange={(e) => handleUpdateProject(idx, "desc", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md text-xs font-light"
                      placeholder="Esposizione sintetica..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Demo Link (Opzionale)</label>
                      <input
                        type="text"
                        value={proj.link || ""}
                        onChange={(e) => handleUpdateProject(idx, "link", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md text-xs focus:ring-1"
                        placeholder="https://test.abc.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Repo URL (Opzionale)</label>
                      <input
                        type="text"
                        value={proj.repo || ""}
                        onChange={(e) => handleUpdateProject(idx, "repo", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md text-xs focus:ring-1"
                        placeholder="https://github.com/abc"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. EXPERIENCES TAB */}
          {activeTab === "experiences" && (
            <div className="space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#E0D8D0]/50 uppercase tracking-widest">La Mia Storia Professionale</span>
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] bg-[#E0D8D0]/10 border border-[#E0D8D0]/20 text-[#E0D8D0] font-sans uppercase tracking-wider rounded-lg hover:bg-[#E0D8D0]/20 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Aggiungi Esperienza
                </button>
              </div>

              {experiences.map((exp, idx) => (
                <div key={exp.id} className="p-4 border border-[#E0D8D0]/10 rounded-xl bg-[#050505]/40 space-y-4 hover:border-[#E0D8D0]/20 transition-all">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Ruolo ricoperto</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(idx, "role", e.target.value)}
                        className="w-full px-3 py-1.5 bg-[#050506] text-xs font-semibold border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveExperience(idx)}
                      className="p-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition-colors mt-4 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Azienda / Luogo</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(idx, "company", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Periodo / Giorni</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleUpdateExperience(idx, "period", e.target.value)}
                        className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest mb-1.5">Attività e Compiti</label>
                    <textarea
                      value={exp.desc}
                      onChange={(e) => handleUpdateExperience(idx, "desc", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-[#050506] border border-[#E0D8D0]/15 rounded-md text-xs font-light"
                      placeholder="Descrivi cosa hai fatto..."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#E0D8D0]/10 bg-[#050505] flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-[#E0D8D0]/85 bg-transparent border border-[#E0D8D0]/15 rounded-xl hover:bg-[#E0D8D0]/5 transition-all cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-[#050505] bg-[#E0D8D0] hover:bg-[#c9bfae] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Applica Modifiche
          </button>
        </div>

      </div>
    </div>
  );
}
