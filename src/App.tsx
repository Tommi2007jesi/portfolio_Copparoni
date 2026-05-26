import { useState, useEffect, FormEvent } from "react";
import { PortfolioData, Project } from "./types";
import { defaultPortfolioData } from "./data";
import Sidebar from "./components/Sidebar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import { 
  Terminal, 
  Check, 
  GraduationCap, 
  Languages, 
  ShieldCheck, 
  BookOpen, 
  Send, 
  FolderOpen, 
  ExternalLink,
  Code,
  History,
  Globe,
  Mail,
  Instagram,
  Github,
  Linkedin,
  Copy,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Clock,
  MapPin
} from "lucide-react";

const CONTACT_TEMPLATES = [
  {
    id: "progetto",
    label: "Sviluppo Progetti & Tech 💻",
    description: "Perfetto per proporre collaborazioni software, tesine integrate o esami pratici.",
    subject: "Richiesta collaborazione su sviluppo Progetto Informatico",
    body: "Gentile studente,\n\nho visto il tuo portfolio e i tuoi progetti nell'area professionale. Sarei particolarmente interessato a collaborare a un progetto integrato riguardante lo sviluppo web, le telecomunicazioni o l'uso applicato di modelli AI.\n\nResto in attesa di un tuo cordiale riscontro per valutare tempistiche e dettagli costruttivi.\n\nCordialmente,"
  },
  {
    id: "pcto",
    label: "Opportunità PCTO / Stage 🏢",
    description: "Ottimale per aziende, selezionatori o docenti interessati ad inviti aziendali.",
    subject: "Proposta colloquio conoscitivo per Alternanza Scuola-Lavoro PCTO / Stage",
    body: "Gentile studente,\n\nabbiamo visionato il tuo percorso formativo multidisciplinare e le competenze caricate sul tuo portfolio. Saremmo interessati a concordare un colloquio conoscitivo in vista di opportunità di stage aziendali, progetti PCTO o tirocini formativi coordinati con l'istituto.\n\nCordiali saluti,"
  },
  {
    id: "didattico",
    label: "Confronto Didattico / Esame 📚",
    description: "Dedicato a colleghi studenti o professori per percorsi interdisciplinari d'esame.",
    subject: "Collaborazione scolastica e coordinamento tesine d'esame",
    body: "Ciao!\n\nHo esplorato la tua sezione di Area Umanistica (storia/letteratura/inglese). Mi piacerebbe confrontare i programmi od organizzare un approfondimento condiviso per mappare al meglio i collegamenti d'esame interdisciplinari con l'informatica.\n\nUn caloroso saluto,"
  }
];

const HUMANITIES_SECTIONS = {
  italiano: {
    title: "Lettura e Interpretazione Lirica (Italiano)",
    icon: "BookOpen",
    desc: "Studio e analisi critica dei testi della letteratura moderna, concentrandosi sui temi dell'io, della maschera sociale e dell'inettitudine d'inizio secolo.",
    items: [
      {
        name: "Giacomo Leopardi",
        period: "1798 – 1837",
        work: "I Canti & Operette Morali",
        desc: "Genio romantico e filosofo del pessimismo. Analizza con lucida poesia la tensione verso l'infinito, l'illusorietà delle speranze e la necessità di una fratellanza contro la natura matrigna.",
        quote: "« E il naufragar m'è dolce in questo mare. »",
        source: "L'Infinito"
      },
      {
        name: "Luigi Pirandello",
        period: "1867 – 1936",
        work: "Il fu Mattia Pascal",
        desc: "Premio Nobel per la Letteratura. Scompone le certezze dell'individuo moderno narrando la scomposizione dell'identità personale, l'uso delle maschere sociali e la verità relativa dell'esistenza.",
        quote: "« Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante maschere e pochi volti. »",
        source: "Uno, nessuno e centomila"
      },
      {
        name: "Italo Svevo",
        period: "1861 – 1928",
        work: "La Coscienza di Zeno",
        desc: "Pioniere della coscienza psicanalitica sul suolo italico. Svela la figura dell'inetto, uomo moderno incapace di darsi una direzione fissa nel vortice delle abitudini borghesi.",
        quote: "« La salute non analizza se stessa e neppure si guarda nello specchio. »",
        source: "La Coscienza di Zeno"
      }
    ]
  },
  storia: {
    title: "Eredità Storica e Sistemi Democratici (Storia)",
    icon: "History",
    desc: "Analisi critica dei movimenti socio-politici e delle rivoluzioni del ventesimo secolo, esaminando la nascita del costituzionalismo moderno.",
    items: [
      {
        name: "Prima Guerra Mondiale",
        period: "1914 – 1918",
        work: "Il Primo Conflitto Globale",
        desc: "La prima guerra di massa e di trincea, caratterizzata dall'industrializzazione bellica, dal crollo degli imperi centrali e dalla ridefinizione geopolitica dell'Europa.",
        quote: "« La guerra è una follia da cui l'umanità deve guarire. »",
        source: "Pensiero storico comune"
      },
      {
        name: "Seconda Guerra Mondiale",
        period: "1939 – 1945",
        work: "Il Secondo Conflitto Globale",
        desc: "La lotta globale contro il totalitarismo nazifascista, segnata dalla Shoah, dal coinvolgimento totale delle popolazioni civili e dall'uso d'innovazioni scientifiche devastanti.",
        quote: "« Coloro che non ricordano il passato sono condannati a ripeterlo. »",
        source: "George Santayana"
      },
      {
        name: "Nascita della Repubblica Italiana",
        period: "1946 – 1948",
        work: "La Costituzione Italiana",
        desc: "Esame del passaggio dalla monarchia alla repubblica tramite il referendum istituzionale e la stesura dei principi fondamentali della carta costituzionale italiana.",
        quote: "« L'Italia è una Repubblica democratica, fondata sul lavoro. »",
        source: "Articolo 1 della Costituzione Italiana"
      },
      {
        name: "La Guerra Fredda & Corsa Tecnologica",
        period: "1947 – 1991",
        work: "L'era dei blocchi contrapposti",
        desc: "La polarizzazione ideologica mondiale tra USA e URSS, la nascita dei blocchi contrapposti e le innovazioni della corsa allo spazio e della prima cyber-sicurezza militare (ARPANET).",
        quote: "« Un'ombra è scesa sulla scena fino a poco fa illuminata dalla vittoria alleata. »",
        source: "Winston Churchill, Discorso sulla Cortina di Ferro"
      },
      {
        name: "Crisi del 1929 & Il New Deal",
        period: "1929 – 1939",
        work: "Riforma Keynesiana e Roosevelt",
        desc: "Il grande crollo di Wall Street, la prolungata depressione globale e la risposta strategica del governo americano con politiche di sviluppo pubblico e di protezione del welfare economico.",
        quote: "« L'unica cosa di cui dobbiamo avere paura è la paura stessa. »",
        source: "Franklin D. Roosevelt, Discorso di Insediamento"
      }
    ]
  },
  inglese: {
    title: "Language, Society and Science (Inglese)",
    icon: "Globe",
    desc: "Focus on literary dystopias, the sociological changes of industrial eras and the acquisition of technical communication for computing.",
    items: [
      {
        name: "George Orwell & Modern Dystopia",
        period: "1903 – 1950",
        work: "Nineteen Eighty-Four",
        desc: "Study of Nineteen Eighty-Four, focusing on totalitarianism, language control, newspeak, systematic surveillance, and the manipulation of individual identity.",
        quote: "« War is peace. Freedom is slavery. Ignorance is strength. »",
        source: "Nineteen Eighty-Four"
      },
      {
        name: "The Industrial Revolution & Victorian Era",
        period: "1760 – 1901",
        work: "Hard Times by Charles Dickens",
        desc: "The massive transition to manufacturing, machine systems, and the harsh rise of factories paired with Dickensian social critique of cold utilitarian principles.",
        quote: "« Now, what I want is, Facts. Teach these boys and girls nothing but Facts. »",
        source: "Charles Dickens, Hard Times"
      },
      {
        name: "Technical English & Global ICT Protocols",
        period: "21st Century",
        work: "Scientific Technical Language",
        desc: "The study of standard syntax, engineering specifications, communication models, protocol documentations and global terminology used across tech projects.",
        quote: "« The single biggest problem in communication is the illusion that it has taken place. »",
        source: "George Bernard Shaw on Communication"
      }
    ]
  }
};

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolioData);
  const [activeSection, setActiveSection] = useState<"home" | "fsl" | "civica" | "umanistica" | "professionale" | "contatti">("home");

  // Expanded project IDs for educational sections
  const [expandedEduProjs, setExpandedEduProjs] = useState<Record<string, boolean>>({});

  // Active Area Umanistica Sub-Section State
  const [activeHumSubSection, setActiveHumSubSection] = useState<"italiano" | "storia" | "inglese">("italiano");

  // Contact Panel & Templates State
  const [activeTemplate, setActiveTemplate] = useState("progetto");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Load custom portfolio data from localStorage if exists
  useEffect(() => {
    const saved = localStorage.getItem("dev_portfolio_builder_v1");
    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch (err) {
        console.error("Errore nel caricamento del portfolio memorizzato:", err);
      }
    }
  }, []);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSuccess(true);
    }, 1500);
  };

  const resetContactForm = () => {
    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");
    setContactSuccess(false);
  };

  // Generic dynamic filter for sections based on project categories and keywords
  const filterProjects = (categoryType: "fsl" | "civica" | "umanistica" | "professionale") => {
    return portfolio.projects.filter((p) => {
      const cat = p.category ? p.category.toLowerCase() : "";
      if (categoryType === "fsl") {
        return cat === "fsl" || cat.includes("lingua") || cat.includes("frances") || cat.includes("linguist");
      }
      if (categoryType === "civica") {
        return cat === "educazione civica" || cat.includes("civic") || cat.includes("costituzione") || cat.includes("agenda");
      }
      if (categoryType === "umanistica") {
        return cat === "area umanistica" || cat.includes("umanistic") || cat.includes("filosofia") || cat.includes("letteratur") || cat.includes("storia");
      }
      if (categoryType === "professionale") {
        // Fallback catchall for development projects
        return cat === "area professionale" || cat.includes("professione") || cat.includes("saas") || cat.includes("fintech") || cat.includes("e-commerce") || cat.includes("developer") || cat.includes("tech") || cat.includes("ai");
      }
      return false;
    });
  };

  const fslProjects = filterProjects("fsl");
  const civicaProjects = filterProjects("civica");
  const umanisticaProjects = filterProjects("umanistica");
  const professionaleProjects = filterProjects("professionale");

  // Custom visual project card for educational sections
  const renderEduProjectCard = (proj: Project) => {
    const isExpanded = !!expandedEduProjs[proj.id];
    return (
      <div 
        key={proj.id} 
        className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E0D8D0]/25 transition-all duration-300 relative group"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-[0.1em] text-[#050505] bg-[#E0D8D0] px-2.5 py-1 rounded-md uppercase">
              {proj.category}
            </span>
            <FolderOpen className="w-4 h-4 text-[#E0D8D0]/30 group-hover:text-[#E0D8D0] transition-colors" />
          </div>

          <h4 className="text-base font-medium text-[#E0D8D0] tracking-tight font-sans group-hover:text-white transition-colors">
            {proj.title}
          </h4>

          <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light">
            {proj.desc}
          </p>

          {proj.longDesc && (
            <div className="pt-1.5">
              <button
                onClick={() => setExpandedEduProjs(prev => ({ ...prev, [proj.id]: !isExpanded }))}
                className="text-[11px] font-medium text-[#E0D8D0]/80 hover:text-[#E0D8D0] hover:underline focus:outline-hidden"
              >
                {isExpanded ? "Mostra meno" : "Leggi approfondimento critico"}
              </button>
              {isExpanded && (
                <p className="text-xs text-[#BDB5AD] mt-2 bg-[#050505] p-3 rounded-lg border border-dashed border-[#E0D8D0]/10 leading-relaxed font-sans animate-slide-in font-light">
                  {proj.longDesc}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-2">
            {proj.tech.map((tc, keyidx) => (
              <span
                key={keyidx}
                className="text-[9px] font-light text-[#E0D8D0]/75 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 px-2 py-0.5 rounded-md font-mono"
              >
                {tc}
              </span>
            ))}
          </div>
        </div>

        {(proj.link || proj.repo) && (
          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-[#E0D8D0]/10 text-xs font-semibold">
            {proj.link && (
              <a 
                href={proj.link} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#BDB5AD] hover:text-[#E0D8D0] flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Visita Elaborato
              </a>
            )}
            {proj.repo && (
              <a 
                href={proj.repo} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#E0D8D0]/50 hover:text-[#E0D8D0] flex items-center gap-1 transition-colors"
              >
                <Code className="w-3.5 h-3.5" /> Allegato / Codice
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0D8D0] bg-grid-minimal flex flex-col antialiased relative overflow-hidden">
      
      {/* Background Accent (Subtle Warm Glow) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a1410] rounded-full blur-[120px] opacity-40 -mr-48 -mt-48 pointer-events-none"></div>

      {/* 1. TOP PREMIUM GLASS HEADER CONTAINER */}
      <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-md border-b border-[#E0D8D0]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 md:py-0 md:h-18 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 bg-[#E0D8D0] text-[#050505] rounded-xl flex items-center justify-center font-bold tracking-tighter text-sm font-display shadow-xs">
              T.C.
            </div>
            <div>
              <span className="font-bold text-xs md:text-sm tracking-wider uppercase text-[#E0D8D0]">
                Tommaso Copparoni
              </span>
            </div>
          </div>

          {/* Centered Navigation Menu Bar (Responsive Layout) */}
          <nav className="flex items-center justify-start overflow-x-auto no-scrollbar w-full md:w-auto gap-1 text-[10px] sm:text-xs uppercase tracking-wider font-semibold py-1">
            {[
              { id: "home", label: "Home" },
              { id: "fsl", label: "FSL" },
              { id: "civica", label: "Educazione Civica" },
              { id: "umanistica", label: "Area Umanistica" },
              { id: "professionale", label: "Area Professionale" },
              { id: "contatti", label: "Contatti" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs transition-all whitespace-nowrap cursor-pointer ${
                  activeSection === tab.id
                    ? "bg-[#E0D8D0] text-[#050505] font-bold shadow-sm"
                    : "text-[#E0D8D0]/60 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

        </div>
      </header>

      {/* 2. CORE WORKSPACE AREA */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10">

        {/* Multi-Column Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Left side */}
          {activeSection === "home" && <Sidebar data={portfolio} />}

          {/* Core Content Area Right side */}
          <div className="flex-1 w-full min-h-[500px]">
            
            {/* RENDER THE ACCORDING SECTION VIEW BASED ON TOP MENU */}

            {/* A. HOME VIEW */}
            {activeSection === "home" && (
              <div className="animate-fade-in space-y-6">
                <AboutSection data={portfolio} />
              </div>
            )}

            {/* B. FSL (LINGUA FRANCESE & COMPETENZE STORICO-LINGUISTICHE) */}
            {activeSection === "fsl" && (
              <div className="space-y-8 animate-fade-in">
                {/* Custom Educational Jumbotron */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Languages className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Formazione Storico-Linguistica (FSL)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Langue Française & Parcours Culturel
                  </h2>
                  <p className="text-[#BDB5AD] leading-relaxed text-xs md:text-sm font-light">
                    Questa sezione raccoglie le competenze e gli elaborati prodotti nell'ambito linguistico e letterario francofono, consolidando la padronanza della lingua come veicolo culturale e analitico.
                  </p>
                </div>

                {/* Interactive Language proficiency display */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans">
                    Livelli di Competenza Quadrieuropeo (QCER)
                  </h3>
                  <div className="space-y-4 pt-1">
                    {[
                      { lang: "Italiano (Madrelingua / Lingua scolastica)", level: "C2 - Padronanza Accademica", pct: 100 },
                      { lang: "Francese (FSL / Certificazione DELF)", level: "B2 - Livello Intermedio Superiore", pct: 85 },
                      { lang: "Inglese (Comprensione & Produzione)", level: "B2 - Livello Autonomo", pct: 75 }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-light">
                          <span className="font-medium text-[#E0D8D0]">{item.lang}</span>
                          <span className="text-[10px] font-mono tracking-wide text-[#E0D8D0]/60">{item.level}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#E0D8D0]/40 to-[#E0D8D0] rounded-full transition-all duration-1000"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filtered FSL Projects */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans px-1">
                    Elaborati e Risorse in Francese
                  </h3>
                  {fslProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {fslProjects.map(proj => renderEduProjectCard(proj))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-[#121212] border border-[#E0D8D0]/10 rounded-xl text-xs text-[#E0D8D0]/40 font-light italic">
                      Nessun progetto o elaborato registrato sotto FSL. Clicca su Modifica Dati per aggiungerlo.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* C. EDUCAZIONE CIVICA VIEW */}
            {activeSection === "civica" && (
              <div className="space-y-8 animate-fade-in">
                {/* Educational Banner */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <ShieldCheck className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Educazione Civica & Agenda 2030</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Cittadinanza Attiva e Digitale
                  </h2>
                  <p className="text-[#BDB5AD] leading-relaxed text-xs md:text-sm font-light">
                    Sviluppo morale, costituzionale dell'individuo e sensibilizzazione ambientale. La tecnologia deve affiancare una rigorosa condotta etica tesa alla sostenibilità e al rispetto comunitario.
                  </p>
                </div>

                {/* Projects associated with Civica */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans px-1">
                    Elaborati Educazione Civica
                  </h3>
                  {civicaProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {civicaProjects.map(proj => renderEduProjectCard(proj))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-[#121212] border border-[#E0D8D0]/10 rounded-xl text-xs text-[#E0D8D0]/40 font-light italic">
                      Nessun archivio scolastico registrato in questa materia.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* D. AREA UMANISTICA VIEW */}
            {activeSection === "umanistica" && (
              <div className="space-y-8 animate-fade-in">
                {/* Editorial Jumbotron */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <BookOpen className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Area Umanistica (Lettere & Filosofia)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Lettere, Filosofia ed Espressione del Lavoro
                  </h2>
                  <p className="text-[#BDB5AD] leading-relaxed text-xs md:text-sm font-light">
                    Sondare l'eredità storica ed i dilemmi filosofici dell'agire umano. L'indagine umanistica è lente indispensabile per guidare i profondi cambiamenti tecnologici della civiltà industriale ed elettronica.
                  </p>
                </div>

                {/* Micro Sub-Tabs navigation in Area Umanistica */}
                <div className="flex border-b border-[#E0D8D0]/10 pb-[10px] gap-2 overflow-x-auto no-scrollbar">
                  {(["italiano", "storia", "inglese"] as const).map((subKey) => {
                    const sec = HUMANITIES_SECTIONS[subKey];
                    const isActive = activeHumSubSection === subKey;
                    
                    const getIcon = () => {
                      switch (sec.icon) {
                        case "BookOpen": return <BookOpen className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />;
                        case "History": return <History className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />;
                        case "Globe": return <Globe className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />;
                        default: return null;
                      }
                    };

                    return (
                      <button
                        key={subKey}
                        onClick={() => setActiveHumSubSection(subKey)}
                        className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer group whitespace-nowrap ${
                          isActive 
                            ? "bg-[#E0D8D0] text-[#050505] shadow-xs" 
                            : "text-[#E0D8D0]/60 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                        }`}
                      >
                        {getIcon()}
                        {subKey}
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Section Jumbotron details */}
                <div className="p-5 border border-[#E0D8D0]/10 bg-[#121212]/45 rounded-2xl">
                  <h3 className="text-sm font-semibold text-[#E0D8D0] tracking-wider uppercase mb-1">
                    {HUMANITIES_SECTIONS[activeHumSubSection].title}
                  </h3>
                  <p className="text-xs text-[#BDB5AD] font-light leading-relaxed">
                    {HUMANITIES_SECTIONS[activeHumSubSection].desc}
                  </p>
                </div>

                {/* Study Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {HUMANITIES_SECTIONS[activeHumSubSection].items.map((author, index) => (
                    <div 
                      key={index} 
                      className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 flex flex-col justify-between gap-4 hover:border-[#E0D8D0]/25 transition-all group duration-300"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2 border-b border-[#E0D8D0]/5 pb-3">
                          <div>
                            <span className="text-[9px] font-mono tracking-widest text-[#E0D8D0]/40 block mb-0.5">
                              {author.period}
                            </span>
                            <h4 className="text-sm font-bold text-[#E0D8D0] group-hover:text-white transition-colors">
                              {author.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] tracking-[0.05em] uppercase px-2 py-0.5 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded text-[#E0D8D0]/80 font-mono" title={author.work}>
                            {author.work}
                          </span>
                        </div>
                        
                        <p className="text-xs text-[#BDB5AD] leading-relaxed font-light">
                          {author.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#E0D8D0]/5 space-y-1">
                        <p className="text-[11px] text-[#E0D8D0]/90 italic font-serif leading-relaxed">
                          {author.quote}
                        </p>
                        <span className="text-[8px] font-mono tracking-wider text-[#E0D8D0]/30 block text-right">
                          — {author.source}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filtered humanities projects */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans px-1">
                    Scolastica & Ricerche Letterarie
                  </h3>
                  {umanisticaProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {umanisticaProjects.map(proj => renderEduProjectCard(proj))}
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-[#121212] border border-[#E0D8D0]/10 rounded-xl text-xs text-[#E0D8D0]/40 font-light italic">
                      Nessun saggio o elaborato d'area umanistica caricato.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* E. AREA PROFESSIONALE VIEW */}
            {activeSection === "professionale" && (
              <div className="space-y-6">
                {/* Render the standard ProjectsSection with current projects */}
                <ProjectsSection data={portfolio} />
              </div>
            )}

            {/* F. CONTATTI VIEW */}
            {activeSection === "contatti" && (
              <div className="space-y-8 animate-fade-in text-xs font-light">
                {/* Header card info */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Send className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">HUB DI COMUNICAZIONE INTERATTIVA</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Mettiti in Contatto
                  </h2>
                  <p className="text-xs text-[#BDB5AD] max-w-xl leading-relaxed">
                    Scegli il canale che preferisci di seguito o utilizza l'autocompositore interattivo per generare e inviare istantaneamente messaggi scolastici o proposte di PCTO prefabbricate.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  {/* Left block (3 columns equivalent representation on grid) */}
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#E0D8D0]/60 uppercase font-sans px-1">
                      Canali di Contatto Diretti
                    </h3>

                    {/* Email Card */}
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-5 space-y-3 hover:border-[#E0D8D0]/20 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 flex items-center justify-center text-[#E0D8D0]">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#E0D8D0]/40 font-semibold block leading-none mb-1">E-mail Didattica</span>
                            <span className="text-xs font-semibold text-[#E0D8D0] font-mono select-all">st11349@iismarconipieralisi.it</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#BDB5AD] leading-relaxed">
                        Canale ufficiale e primario per comunicazioni con docenti, collaborazioni d'istituto, stage formativi ed esami.
                      </p>
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("st11349@iismarconipieralisi.it");
                            setCopiedEmail(true);
                            setTimeout(() => setCopiedEmail(false), 2000);
                          }}
                          className="flex-1 py-2 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 active:scale-95 border border-[#E0D8D0]/15 hover:border-[#E0D8D0]/35 text-[#E0D8D0] rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] cursor-pointer"
                        >
                          {copiedEmail ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                              Indirizzo Copiato!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copia Indirizzo
                            </>
                          )}
                        </button>
                        <a
                          href="mailto:st11349@iismarconipieralisi.it"
                          className="flex-1 py-2 bg-[#E0D8D0] hover:bg-[#c9bfae] active:scale-95 text-[#050505] rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] text-center"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          Scrivi Email
                        </a>
                      </div>
                    </div>

                    {/* GitHub Card */}
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-5 space-y-3 hover:border-[#E0D8D0]/20 transition-all duration-300">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 flex items-center justify-center text-[#E0D8D0]">
                          <Github className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#E0D8D0]/40 font-semibold block leading-none mb-1">Revisione Codice</span>
                          <span className="text-xs font-semibold text-[#E0D8D0] font-sans">GitHub Repositories</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#BDB5AD] leading-relaxed">
                        Sorgenti delle esercitazioni pratiche di Sistemi, Informatica e Telecomunicazioni svolte in laboratorio.
                      </p>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 active:scale-95 border border-[#E0D8D0]/15 text-[#E0D8D0] rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] text-center"
                      >
                        Esplora Repository GitHub
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    </div>

                    {/* LinkedIn Card */}
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-5 space-y-3 hover:border-[#E0D8D0]/20 transition-all duration-300">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 flex items-center justify-center text-[#E0D8D0]">
                          <Linkedin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#E0D8D0]/40 font-semibold block leading-none mb-1">Rete Scolastica & PCTO</span>
                          <span className="text-xs font-semibold text-[#E0D8D0] font-sans">Profilo LinkedIn</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#BDB5AD] leading-relaxed">
                        Connessioni con tutor aziendali delle imprese locali nelle Marche e monitoraggio della crescita didattica complessiva.
                      </p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 active:scale-95 border border-[#E0D8D0]/15 text-[#E0D8D0] rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] text-center"
                      >
                        Collegati su LinkedIn
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    </div>

                    {/* Instagram Card */}
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-5 space-y-3 hover:border-[#E0D8D0]/20 transition-all duration-300">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 flex items-center justify-center text-[#E0D8D0]">
                          <Instagram className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-[#E0D8D0]/40 font-semibold block leading-none mb-1">Studente & Attività</span>
                          <span className="text-xs font-semibold text-[#E0D8D0] font-sans">Instagram Social</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#BDB5AD] leading-relaxed">
                        Dietro le quinte dello studio scolastico ed informale, con aggiornamenti quotidiani sui laboratori di robotica ed elettronica dell'istituto.
                      </p>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 active:scale-95 border border-[#E0D8D0]/15 text-[#E0D8D0] rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all text-[11px] text-center"
                      >
                        Segui su Instagram
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    </div>

                    {/* Info Card Geography */}
                    <div className="p-4 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-2xl flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/10 border border-[#E0D8D0]/15 flex items-center justify-center text-[#E0D8D0]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#E0D8D0]/50 font-bold uppercase tracking-wider">Sede Geografica</span>
                        <p className="text-[#E0D8D0] text-[11px]">Jesi, Ancona, Italia — IIS Marconi Pieralisi</p>
                      </div>
                    </div>
                  </div>

                  {/* Right block (3 columns equivalent of representation on grid for interactive tool) */}
                  <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[10px] font-bold tracking-[0.15em] text-[#E0D8D0]/60 uppercase font-sans">
                        Assistente Autocomposizione Proposte
                      </h3>
                      <div className="flex items-center gap-1.5 text-[9px] text-[#E0D8D0]/50 font-mono">
                        <Sparkles className="w-3 h-3 text-[#E0D8D0]/70" />
                        1-Click Template
                      </div>
                    </div>

                    {/* Interactive Template Selector Widget */}
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs text-[#BDB5AD]">
                          Seleziona una categoria per caricare un messaggio accademico o lavorativo mirato. Potrai modificarlo o copiarlo al volo:
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {CONTACT_TEMPLATES.map((tpl) => {
                            const isSelected = activeTemplate === tpl.id;
                            return (
                              <button
                                key={tpl.id}
                                onClick={() => {
                                  setActiveTemplate(tpl.id);
                                  setCopiedTemplate(false);
                                }}
                                className={`px-4 py-2 border rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-[#E0D8D0] text-[#050505] border-[#E0D8D0] font-semibold"
                                    : "bg-[#050505]/40 text-[#E0D8D0]/70 border-[#E0D8D0]/10 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                                }`}
                              >
                                {tpl.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Loaded template detailed status card */}
                      {(() => {
                        const currentTpl = CONTACT_TEMPLATES.find(t => t.id === activeTemplate) || CONTACT_TEMPLATES[0];
                        const mailtoUrl = `mailto:st11349@iismarconipieralisi.it?subject=${encodeURIComponent(currentTpl.subject)}&body=${encodeURIComponent(currentTpl.body)}`;
                        
                        return (
                          <div className="space-y-4 animate-scale-up">
                            <div className="p-3 bg-[#050505]/30 border border-[#E0D8D0]/5 rounded-xl">
                              <span className="text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest block mb-0.5">Focus d'Impiego</span>
                              <p className="text-xs text-[#E0D8D0]">{currentTpl.description}</p>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest block">Oggetto Configurato:</span>
                                <div className="p-2.5 bg-[#050505] border border-[#E0D8D0]/10 rounded-lg text-xs font-mono text-[#E0D8D0] truncate">
                                  {currentTpl.subject}
                                </div>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[9px] font-bold text-[#E0D8D0]/40 uppercase tracking-widest block">Corpo del Messaggio Generato:</span>
                                <div className="p-4 bg-[#050505] border border-[#E0D8D0]/10 rounded-lg text-xs font-mono text-[#E0D8D0]/80 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto min-h-[140px] select-all">
                                  {currentTpl.body}
                                </div>
                              </div>
                            </div>

                            {/* Dual actionable helper buttons */}
                            <div className="pt-2 flex flex-col sm:flex-row gap-3">
                              <button
                                onClick={() => {
                                  const textToCopy = `Oggetto: ${currentTpl.subject}\n\n${currentTpl.body}`;
                                  navigator.clipboard.writeText(textToCopy);
                                  setCopiedTemplate(true);
                                  setTimeout(() => setCopiedTemplate(false), 2000);
                                }}
                                className="flex-1 py-3 bg-[#E0D8D0]/5 hover:bg-[#E0D8D0]/10 border border-[#E0D8D0]/15 hover:border-[#E0D8D0]/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 text-[#E0D8D0] transition-colors cursor-pointer"
                              >
                                {copiedTemplate ? (
                                  <>
                                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                                    Testo Copiato con Oggetto!
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-4 h-4 text-[#E0D8D0]/80" />
                                    Copia Messaggio Completo
                                  </>
                                )}
                              </button>

                              <a
                                href={mailtoUrl}
                                className="flex-1 py-3 bg-[#E0D8D0] hover:bg-[#c9bfae] text-[#050505] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors text-center"
                              >
                                <MessageSquare className="w-4 h-4 text-[#050505]" />
                                Apri Dritta in Gmail/Client
                              </a>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Custom operational metadata indicators */}
                    <div className="p-5 border border-[#E0D8D0]/10 bg-[#121212]/50 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#E0D8D0]/60 shrink-0" />
                        <div>
                          <span className="text-[#E0D8D0] block text-[11px] leading-tight">Orario Ricezione Consigliato</span>
                          <span className="text-[#BDB5AD] text-[10px]">Lun - Sab: 08:30 – 19:30 (Ora Italiana)</span>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] tracking-wider uppercase text-[#E0D8D0] bg-[#E0D8D0]/10 px-3 py-1.5 border border-[#E0D8D0]/15 rounded-lg shrink-0">
                        ⚡ Risposta media: &lt; 24 Ore
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Footer copyright */}
      <footer className="py-8 border-t border-[#E0D8D0]/10 mt-20 select-none z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#E0D8D0]/50 space-y-1.5 font-sans">
          <p>© {new Date().getFullYear()} {portfolio.name} — Portfolio Interattivo a Competenze Integrate.</p>
          <p className="flex items-center justify-center gap-1 text-[10px] text-[#E0D8D0]/30 font-mono uppercase tracking-wider">
            <span>Sviluppato con React, Node.js + Express ed il modello server-side Gemini AI.</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
