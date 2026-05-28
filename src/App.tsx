import { useState, useEffect, FormEvent } from "react";
import { PortfolioData, Project } from "./types";
import { defaultPortfolioData } from "./data";
import Sidebar from "./components/Sidebar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import CivicaSection from "./components/CivicaSection";
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
    title: "Letteratura e Interpretazione Critica (Italiano)",
    icon: "BookOpen",
    desc: "Analisi approfondita dei maestri del Novecento italiano. Dalla rivoluzione poetica dell'ermetismo alla scomposizione dell'identità pirandelliana, fino all'estetismo decadente.",
    items: [
      {
        name: "Gabriele D'Annunzio",
        period: "1863 – 1938",
        work: "Il Piacere & Alcyone",
        desc: "L'esteta per eccellenza, colui che voleva fare della propria vita un'opera d'arte. La sua poetica è intrisa di panismo, ovvero la fusione totale dell'uomo con la natura, espressa attraverso un linguaggio prezioso e sensoriale.\n\nCuriosità: Fu un pioniere del marketing moderno, inventando nomi per brand famosi come 'La Rinascente' e 'Saiwa'.",
        quote: "« Taci. Su le soglie del bosco non odo parole che dici umane; ma odo parole più nuove che parlano gocciole e foglie lontane. »",
        source: "La pioggia nel pineto",
        image: "https://biografieonline.it/img/bio/g/Gabriele_D_Annunzio.jpg"
      },
      {
        name: "Giuseppe Ungaretti",
        period: "1888 – 1970",
        work: "L'Allegria & Sentimento del Tempo",
        desc: "Il padre dell'Ermetismo. La sua poesia nasce dal dolore della trincea durante la Grande Guerra. Distrugge la metrica tradizionale per isolare la parola 'pura', capace di illuminare l'abisso dell'esistenza umana.\n\nCuriosità: Le sue poesie più famose furono scritte su pezzi di carta di fortuna, cartoline e margini di giornali mentre si trovava al fronte.",
        quote: "« Si sta come d'autunno sugli alberi le foglie. »",
        source: "Soldati",
        image: "https://biografieonline.it/img/bio/g/Giuseppe_Ungaretti.jpg"
      },
      {
        name: "Luigi Pirandello",
        period: "1867 – 1936",
        work: "Il fu Mattia Pascal & Uno, nessuno e centomila",
        desc: "Il genio che ha svelato la crisi dell'io moderno. Attraverso il concetto di 'maschera', Pirandello analizza come l'individuo sia frammentato e prigioniero delle convenzioni sociali, incapace di trovare una verità univoca.\n\nCuriosità: Il suo concetto di 'umorismo' (il sentimento del contrario) è oggi più attuale che mai per analizzare le identità digitali sui social network.",
        quote: "« Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante maschere e pochi volti. »",
        source: "Uno, nessuno e centomila",
        image: "https://biografieonline.it/img/bio/l/Luigi_Pirandello.jpg"
      }
    ]
  },
  storia: {
    title: "Eredità Storica e Sistemi Democratici (Storia)",
    icon: "History",
    desc: "Un viaggio critico attraverso le fratture del XX secolo, analizzando come le guerre e le rivoluzioni abbiano plasmato la nostra attuale società tecnologica e democratica.",
    items: [
      {
        name: "La Grande Guerra",
        period: "1914 – 1918",
        work: "Il Tramonto del Vecchio Mondo",
        desc: "Non solo un conflitto, ma il primo scontro industriale di massa. Segna la fine degli imperi millenari e l'introduzione di tecnologie belliche devastanti: gas, carri armati e aerei.\n\nCuriosità: La guerra accelerò enormemente lo sviluppo delle telecomunicazioni radio, ponendo le basi per la futura rete globale.",
        quote: "« La guerra è una lezione della storia che i popoli dimenticano troppo in fretta. »",
        source: "Riflessione storica",
        image: "https://www.storicang.it/medio/2020/06/18/soldati-italiani-in-trincea-durante-la-prima-guerra-mondiale_74075f78_1280x853.jpg"
      },
      {
        name: "Totalitarismi e Shoah",
        period: "1922 – 1945",
        work: "L'eclissi della ragione",
        desc: "L'ascesa dei regimi fascista e nazista ha mostrato come la propaganda e la tecnologia possano essere usate per il controllo totale e lo sterminio sistematico. La Shoah rimane la ferita più profonda del secolo.\n\nCuriosità: I regimi usarono i primi computer rudimentali per catalogare le popolazioni, dimostrando il lato oscuro della gestione dei dati.",
        quote: "« Coloro che non ricordano il passato sono condannati a ripeterlo. »",
        source: "George Santayana",
        image: "https://www.focus.it/site_stored/imgs/0001/045/auschwitz.jpg"
      },
      {
        name: "La Costituzione Italiana",
        period: "1946 – 1948",
        work: "La Nascita della Democrazia",
        desc: "Dalle macerie della guerra nasce la Repubblica. La nostra Costituzione è il risultato di un compromesso altissimo tra forze diverse, unite dal rifiuto del fascismo e dalla tutela della dignità umana.\n\nCuriosità: Fu scritta da 75 'Padri e Madri Costituenti' in un clima di straordinaria collaborazione intellettuale.",
        quote: "« L'Italia è una Repubblica democratica, fondata sul lavoro. »",
        source: "Articolo 1 della Costituzione",
        image: "https://www.senato.it/application/xmanager/projects/leg18/file/Costituzione_copertina.jpg"
      }
    ]
  },
  inglese: {
    title: "Language, Society and Science (Inglese)",
    icon: "Globe",
    desc: "Exploring the intersection of English literature, technological evolution, and the global language of the digital era.",
    items: [
      {
        name: "George Orwell",
        period: "1903 – 1950",
        work: "Nineteen Eighty-Four",
        desc: "The ultimate warning against totalitarianism and mass surveillance. Orwell predicted concepts like 'Big Brother' and 'Newspeak' that resonate today in the era of data privacy and social media algorithms.\n\nFact: The term 'Orwellian' is now used globally to describe policies that threaten personal freedom and privacy.",
        quote: "« Big Brother is Watching You. »",
        source: "Nineteen Eighty-Four",
        image: "https://www.biography.com/.image/t_share/MTQ3NjM5MTEzMTc5NjkwNjY1/george_orwell_getty_images_3298830.jpg"
      },
      {
        name: "The Industrial Revolution",
        period: "18th – 19th Century",
        work: "Hard Times by Charles Dickens",
        desc: "The transition from rural life to the factory system. Dickens criticized the dehumanizing effects of utilitarianism, where people were treated as mere 'hands' or statistics.\n\nFact: The first programmable computer concept by Charles Babbage was born during this era of mechanical innovation.",
        quote: "« Facts alone are wanted in life. Plant nothing else, and root out everything else. »",
        source: "Hard Times",
        image: "https://www.storicang.it/medio/2020/07/07/una-fabbrica-tessile-durante-la-rivoluzione-industriale_2731518b_1280x853.jpg"
      },
      {
        name: "Technical English & ICT",
        period: "Modern Era",
        work: "The Global Tech Language",
        desc: "English is the undisputed language of computing. From coding syntax to network protocols (TCP/IP), mastering technical English is essential for any IT professional in the global market.\n\nFact: Over 90% of the world's most popular programming languages use English-based keywords and documentation.",
        quote: "« The single biggest problem in communication is the illusion that it has taken place. »",
        source: "George Bernard Shaw",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
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
    <div className="min-h-screen bg-[#050505] text-[#E0D8D0] font-sans selection:bg-[#E0D8D0] selection:text-[#050505] flex flex-col relative overflow-x-hidden bg-grid-minimal">
      
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
              <CivicaSection />
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {HUMANITIES_SECTIONS[activeHumSubSection].items.map((author: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-[#E0D8D0]/25 transition-all group duration-300"
                    >
                      {/* Image side */}
                      <div className="w-full md:w-48 h-48 shrink-0 rounded-xl overflow-hidden border border-[#E0D8D0]/10">
                        <img 
                          src={author.image} 
                          alt={author.name} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Content side */}
                      <div className="flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2 border-b border-[#E0D8D0]/5 pb-3">
                            <div>
                              <span className="text-[9px] font-mono tracking-widest text-[#E0D8D0]/40 block mb-0.5">
                                {author.period}
                              </span>
                              <h4 className="text-lg font-bold text-[#E0D8D0] group-hover:text-white transition-colors">
                                {author.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] tracking-[0.05em] uppercase px-2 py-0.5 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded text-[#E0D8D0]/80 font-mono">
                                {author.work}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light whitespace-pre-wrap">
                            {author.desc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E0D8D0]/5 space-y-1">
                          <p className="text-[11px] md:text-xs text-[#E0D8D0]/90 italic font-serif leading-relaxed">
                            {author.quote}
                          </p>
                          <span className="text-[8px] font-mono tracking-wider text-[#E0D8D0]/30 block text-right">
                            — {author.source}
                          </span>
                        </div>
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

                {/* Main Contact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Side: Contact Info & Links */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0D8D0]/40">Canali Diretti</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5 group hover:border-[#E0D8D0]/20 transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-[#E0D8D0]/5 flex items-center justify-center text-[#E0D8D0]">
                                <Mail className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-tighter text-[#E0D8D0]/30 font-bold">Email Istituzionale</span>
                                <span className="text-[11px] text-[#E0D8D0] font-medium">{portfolio.email}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(portfolio.email);
                                setCopiedEmail(true);
                                setTimeout(() => setCopiedEmail(false), 2000);
                              }}
                              className="p-2 hover:bg-[#E0D8D0]/10 rounded-lg text-[#E0D8D0]/40 hover:text-[#E0D8D0] transition-all"
                            >
                              {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { icon: <Github className="w-4 h-4" />, label: "Github", link: portfolio.github },
                              { icon: <Linkedin className="w-4 h-4" />, label: "Linkedin", link: portfolio.linkedin },
                              { icon: <Instagram className="w-4 h-4" />, label: "Instagram", link: "#" }
                            ].map((social, sidx) => (
                              <a 
                                key={sidx}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5 hover:border-[#E0D8D0]/20 hover:bg-[#E0D8D0]/5 transition-all group"
                              >
                                <div className="text-[#E0D8D0]/40 group-hover:text-[#E0D8D0] transition-colors">
                                  {social.icon}
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#E0D8D0]/30 group-hover:text-[#E0D8D0]/60">{social.label}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E0D8D0]/5 space-y-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#E0D8D0]/40" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#E0D8D0]/40">Disponibilità Attuale</span>
                        </div>
                        <div className="p-4 rounded-xl bg-[#E0D8D0]/5 border border-[#E0D8D0]/10">
                          <p className="text-[#E0D8D0] font-medium mb-1 italic">"{portfolio.availability}"</p>
                          <p className="text-[10px] text-[#BDB5AD]">Risposta media entro 24-48 ore lavorative.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Interactive Form / Template Generator */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden flex flex-col h-full">
                      {/* Tabs for Template selection */}
                      <div className="flex border-b border-[#E0D8D0]/5 bg-[#050505]/30">
                        {CONTACT_TEMPLATES.map((tmp) => (
                          <button
                            key={tmp.id}
                            onClick={() => {
                              setActiveTemplate(tmp.id);
                              setContactSubject(tmp.subject);
                              setContactMessage(tmp.body);
                            }}
                            className={`flex-1 px-4 py-4 text-[10px] font-bold uppercase tracking-wider transition-all border-b-2 ${
                              activeTemplate === tmp.id 
                                ? "bg-[#E0D8D0]/5 border-[#E0D8D0] text-[#E0D8D0]" 
                                : "border-transparent text-[#E0D8D0]/30 hover:text-[#E0D8D0]/60"
                            }`}
                          >
                            {tmp.id}
                          </button>
                        ))}
                      </div>

                      <div className="p-6 flex-1 flex flex-col space-y-6">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-[#E0D8D0]">{CONTACT_TEMPLATES.find(t => t.id === activeTemplate)?.label}</h4>
                          <p className="text-[11px] text-[#BDB5AD]">{CONTACT_TEMPLATES.find(t => t.id === activeTemplate)?.description}</p>
                        </div>

                        {contactSuccess ? (
                          <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-fade-in py-12">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                              <Check className="w-8 h-8" />
                            </div>
                            <div className="text-center space-y-1">
                              <h4 className="text-sm font-bold text-[#E0D8D0]">Messaggio Inviato!</h4>
                              <p className="text-[11px] text-[#BDB5AD]">Grazie per avermi contattato. Ti risponderò al più presto.</p>
                            </div>
                            <button 
                              onClick={resetContactForm}
                              className="mt-4 px-6 py-2 rounded-xl bg-[#E0D8D0] text-[#050505] font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all"
                            >
                              Invia un altro messaggio
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-4 flex-1">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#E0D8D0]/40 ml-1">Nome</label>
                                <input 
                                  type="text" 
                                  required
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  placeholder="Il tuo nome"
                                  className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E0D8D0]/30 transition-all text-[#E0D8D0]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#E0D8D0]/40 ml-1">Email</label>
                                <input 
                                  type="email" 
                                  required
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  placeholder="la-tua@email.com"
                                  className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E0D8D0]/30 transition-all text-[#E0D8D0]"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-[#E0D8D0]/40 ml-1">Oggetto</label>
                              <input 
                                type="text" 
                                value={contactSubject}
                                onChange={(e) => setContactSubject(e.target.value)}
                                placeholder="Oggetto del messaggio"
                                className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E0D8D0]/30 transition-all text-[#E0D8D0]"
                              />
                            </div>

                            <div className="space-y-1.5 flex-1 flex flex-col">
                              <label className="text-[9px] font-bold uppercase tracking-widest text-[#E0D8D0]/40 ml-1">Messaggio</label>
                              <textarea 
                                required
                                value={contactMessage}
                                onChange={(e) => setContactMessage(e.target.value)}
                                placeholder="Scrivi qui il tuo messaggio..."
                                className="w-full flex-1 bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#E0D8D0]/30 transition-all text-[#E0D8D0] resize-none min-h-[150px]"
                              />
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                              <button 
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(contactMessage);
                                  setCopiedTemplate(true);
                                  setTimeout(() => setCopiedTemplate(false), 2000);
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#E0D8D0]/40 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5 transition-all"
                              >
                                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                <span className="text-[9px] font-bold uppercase tracking-widest">Copia Bozza</span>
                              </button>

                              <button 
                                type="submit"
                                disabled={contactLoading}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#E0D8D0] text-[#050505] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50"
                              >
                                {contactLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                Invia Messaggio
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. PREMIUM FOOTER SECTION */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full border-t border-[#E0D8D0]/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E0D8D0]/10 text-[#E0D8D0] rounded-lg flex items-center justify-center font-bold text-[10px]">T.</div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#E0D8D0]/80">Tommaso Copparoni</span>
            </div>
            <p className="text-[10px] text-[#E0D8D0]/30 font-mono">© 2026 • JESI, ITALIA • STUDENT PORTFOLIO</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E0D8D0]/40">System Online</span>
            </div>
            <div className="h-4 w-[1px] bg-[#E0D8D0]/10"></div>
            <p className="text-[10px] text-[#E0D8D0]/40 font-light">Built with <span className="text-[#E0D8D0]/60">React & Tailwind</span></p>
          </div>
        </div>
      </footer>

    </div>
  );
}
