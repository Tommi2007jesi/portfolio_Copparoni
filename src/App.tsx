import React, { useState } from "react";
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
  MapPin,
  RefreshCw,
  Cpu,
  Database,
  Network,
  Briefcase,
  BrainCircuit,
  ChevronDown,
  ChevronRight
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
    desc: "Un'analisi enciclopedica dei giganti del Novecento. Esploriamo la frammentazione dell'io in Pirandello, la rivoluzione della parola pura in Ungaretti e l'estetismo superomistico di D'Annunzio.",
    items: [
      {
        name: "Gabriele D'Annunzio",
        period: "1863 – 1938",
        work: "L'Esteta e il Vate",
        desc: "Gabriele D'Annunzio rappresenta la figura più eccentrica e influente del Decadentismo italiano. La sua filosofia di vita, il 'Vivere Inimitabile', lo portò a trasformare ogni sua azione in un evento mediatico. La sua poetica si fonda sull'estetismo (l'arte sopra ogni cosa) e sul Panismo, una concezione quasi mistica in cui l'uomo si fonde con gli elementi naturali, perdendo la propria individualità per diventare parte del cosmo.\n\nCuriosità Storica: D'Annunzio fu un genio della comunicazione e del branding ante litteram. Inventò nomi diventati iconici come 'La Rinascente' e 'tramezzino'.",
        quote: "« Taci. Su le soglie del bosco non odo parole che dici umane; ma odo parole più nuove che parlano gocciole e foglie lontane. »",
        source: "La pioggia nel pineto",
        image: "/img/dannunzio.jpg"
      },
      {
        name: "Giuseppe Ungaretti",
        period: "1888 – 1970",
        work: "L'Allegria dei Naufragi",
        desc: "Giuseppe Ungaretti rivoluziona la poesia italiana del Novecento attraverso l'esperienza traumatica della Prima Guerra Mondiale. Soldato nelle trincee del Carso, Ungaretti scopre la fragilità estrema dell'uomo e la necessità di una parola 'nuda', essenziale, capace di illuminare l'oscurità del dolore.\n\nCuriosità: Molte delle sue liriche più famose furono scritte su pezzi di carta di fortuna: margini di vecchi giornali, cartoline militari, pacchetti di sigarette.",
        quote: "« Si sta come d'autunno sugli alberi le foglie. »",
        source: "Soldati",
        image: "/img/ungaretti.jpg"
      },
      {
        name: "Luigi Pirandello",
        period: "1867 – 1936",
        work: "La Crisi dell'Io",
        desc: "Premio Nobel nel 1934, Pirandello è il narratore della scomposizione dell'uomo moderno. La sua intuizione centrale è che l'individuo non sia 'uno', ma una moltitudine di frammenti in perenne mutamento. Ogni persona indossa delle 'maschere' imposte dalla società, finendo per diventare 'nessuno' o 'centomila'.\n\nCuriosità: Il pensiero pirandelliano è incredibilmente profetico rispetto all'era dei Social Network, dove la nostra identità digitale è una costruzione continua di maschere.",
        quote: "« Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante maschere e pochi volti. »",
        source: "Uno, nessuno e centomila",
        image: "/img/pirandello.jpg"
      }
    ]
  },
  storia: {
    title: "Eredità Storica e Sistemi Democratici (Storia)",
    icon: "History",
    desc: "Un'analisi profonda dei conflitti e delle trasformazioni politiche che hanno ridefinito il mondo contemporaneo.",
    items: [
      {
        name: "La Grande Guerra (1914-1918)",
        period: "L'Inizio del Secolo Breve",
        work: "La Guerra Totale",
        desc: "La Prima Guerra Mondiale fu la prima guerra totale, dove l'intera società fu mobilitata. Si passò dalla guerra di movimento alla logorante guerra di trincea. Fu anche il primo grande laboratorio tecnologico: apparvero i gas tossici, i carri armati e gli aerei.\n\nCuriosità: La Grande Guerra accelerò in modo incredibile lo sviluppo della Radio e della crittografia, ponendo le basi per la moderna guerra elettronica.",
        quote: "« La guerra è una follia da cui l'umanità deve guarire. »",
        source: "Analisi storica",
        image: "/img/primaguerra.png"
      },
      {
        name: "Totalitarismi e Shoah",
        period: "1922 – 1945",
        work: "L'Età dei Dittatori",
        desc: "Il dopoguerra vide l'ascesa di regimi che cercarono il controllo totale. Il culmine fu la Seconda Guerra Mondiale, segnata dall'orrore della Shoah e dall'uso della bomba atomica.\n\nCuriosità: La necessità di decifrare i codici nazisti portò Alan Turing a costruire 'Enigma', l'antenato del computer moderno.",
        quote: "« Coloro che non ricordano il passato sono condannati a ripeterlo. »",
        source: "George Santayana",
        image: "/img/secguerra.png"
      },
      {
        name: "La Costituzione Italiana",
        period: "1946 – 1948",
        work: "La Nascita della Democrazia",
        desc: "Il 2 giugno 1946 gli italiani scelsero la Repubblica. L'Assemblea Costituente redasse la Carta Costituzionale, fondata sul lavoro e sulla libertà individuale.\n\nCuriosità: L'Articolo 11 ripudia la guerra, ponendo l'Italia come nazione votata alla pace.",
        quote: "« L'Italia è una Repubblica democratica, fondata sul lavoro. »",
        source: "Articolo 1, Costituzione",
        image: "/img/costituzione.png"
      }
    ]
  },
  inglese: {
    title: "Language, Society and Science (Inglese)",
    icon: "Globe",
    desc: "English as a vehicle for social critique and technological progress.",
    items: [
      {
        name: "George Orwell",
        period: "1903 – 1950",
        work: "Dystopia and Truth",
        desc: "In '1984', Orwell introduced 'Big Brother', a symbol of surveillance. His work critique totalitarianism and the manipulation of language ('Newspeak').\n\nModern Relevance: We live in an age of 'Big Data' and 'Fake News', making Orwell's vision more relevant than ever.",
        quote: "« Big Brother is Watching You. »",
        source: "Nineteen Eighty-Four",
        image: "/img/george.png"
      },
      {
        name: "The Industrial Revolution",
        period: "18th – 19th Century",
        work: "Hard Times",
        desc: "The transition from rural life to factories. Dickens portrayed the grim reality of factory life and attacked Utilitarianism.\n\nTechnological Link: The spirit of innovation that created the steam engine also led to the birth of computing with Babbage and Lovelace.",
        quote: "« Now, what I want is, Facts. »",
        source: "Charles Dickens, Hard Times",
        image: "/img/revolution.png"
      },
      {
        name: "Technical English & ICT",
        period: "Modern Era",
        work: "The Global Code",
        desc: "English is the 'lingua franca' of ICT. Every major programming language and international protocol is based on English.\n\nFact: Web terminology like 'browser', 'cloud', and 'kernel' are English terms used globally without translation.",
        quote: "« The single biggest problem in communication is the illusion that it has taken place. »",
        source: "George Bernard Shaw",
        image: "/img/ict.png"
      }
    ]
  }
};

const PROFESSIONAL_SECTIONS = {
  informatica: {
    title: "Informatica",
    icon: "Code",
    desc: "Progettazione e sviluppo software ad oggetti, modellazione di basi di dati relazionali/NoSQL e creazione di interfacce web dinamiche e robuste.",
    approfondimento: "Approfondimento dei paradigmi di programmazione imperativa (C/C++) e orientata agli oggetti (Java, C#). Progettazione concettuale, logica e fisica di basi di dati (RDBMS come PostgreSQL e NoSQL come MongoDB) con normalizzazione ed ottimizzazione delle query SQL. Integrazione di architetture MVC moderni e API protette.",
    items: [
      { name: "Java", topic: "Object-Oriented Programming", image: "/img/php.png" },
      { name: "C++", topic: "Systems Programming", image: "/img/database.png" },
      { name: "PostgreSQL", topic: "Relational Database", image: "/img/database.png" },
      { name: "SQL", topic: "Database Query Language", image: "/img/database.png" },
      { name: "Spring Boot", topic: "Java Framework", image: "/img/javascript.png" },
      { name: "JSON API", topic: "API Design", image: "/img/javascript.png" }
    ]
  },
  sistemi: {
    title: "Sistemi e reti",
    icon: "Network",
    desc: "Architetture dei sistemi operativi di rete, indirizzamento IP, sicurezza informatica e gestione remota di router e switch.",
    approfondimento: "Leggi approfondimento tecnico",
    items: [
      { name: "Cisco IOS", topic: "Network Operating System", image: "/img/cisco.png" },
      { name: "Wireshark", topic: "Network Analysis", image: "/img/isoosi.png" },
      { name: "Packet Tracer", topic: "Simulation", image: "/img/cisco.png" },
      { name: "OSPF", topic: "Routing Protocol", image: "/img/cisco.png" },
      { name: "Routing", topic: "Connectivity", image: "/img/cisco.png" },
      { name: "Network Security", topic: "Security", image: "/img/crittografia.png" }
    ]
  },
  ia: {
    title: "Intelligenza Artificiale",
    icon: "BrainCircuit",
    desc: "Integrazione di modelli generativi di linguaggio naturale (LLM), elaborazione semantica e automazione intelligente dei contenuti.",
    approfondimento: "Leggi approfondimento tecnico",
    items: [
      { name: "Python", topic: "Programming Language", image: "/img/neural.png" },
      { name: "RAG", topic: "Retrieval-Augmented Generation", image: "/img/neural.png" },
      { name: "Prompt Engineering", topic: "LLM Optimization", image: "/img/AI-generativa.png" },
      { name: "Vector DB", topic: "Semantic Search", image: "/img/neural.png" },
      { name: "Node.js", topic: "Backend Runtime", image: "/img/javascript.png" },
      { name: "LLM", topic: "Large Language Models", image: "/img/AI-generativa.png" }
    ]
  },
  tpsit: {
    title: "Tipsit",
    icon: "Terminal",
    desc: "Sviluppo di applicazioni concorrenti e distribuite, programmazione client/server multithread e interazioni di rete a basso livello.",
    approfondimento: "Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni. Studio avanzato della concorrenza tramite thread e processi nei sistemi Unix e gestione dei semafori per la mutua esclusione. Sviluppo ed implementation di socket client-server sincrone ed asincrone TCP/UDP multipiattaforma.",
    items: [
      { name: "TypeScript", topic: "Typed JavaScript", image: "/img/javascript.png" },
      { name: "Multi-threading", topic: "Concurrency", image: "/img/concorrenza.png" },
      { name: "Sockets", topic: "Network Communication", image: "/img/os.png" },
      { name: "TCP/IP", topic: "Network Protocols", image: "/img/isoosi.png" },
      { name: "WebSockets", topic: "Real-time Communication", image: "/img/javascript.png" },
      { name: "C", topic: "Systems Programming", image: "/img/os.png" }
    ]
  },
  gpoi: {
    title: "GPOI",
    icon: "Briefcase",
    desc: "Gestione progetti professionali, pianificazione dei requisiti, analisi costi-benefici e applicazione delle metodologie di sviluppo Agile.",
    approfondimento: "Leggi approfondimento tecnico",
    items: [
      { name: "Agile", topic: "Development Methodology", image: "/img/azienda.jpg" },
      { name: "Scrum", topic: "Agile Framework", image: "/img/azienda.jpg" },
      { name: "Gantt", topic: "Project Scheduling", image: "/img/costiricavi.jpg" },
      { name: "Business Plan", topic: "Entrepreneurship", image: "/img/azienda.jpg" },
      { name: "Project Management", topic: "Coordination", image: "/img/azienda.jpg" }
    ]
  }
};

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolioData);
  const [activeSection, setActiveSection] = useState<"home" | "fsl" | "civica" | "umanistica" | "professionale" | "contatti">("home");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0D8D0] font-sans selection:bg-[#E0D8D0] selection:text-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
        <Sidebar data={portfolio} />
        
        <main className="flex-1 space-y-12">
          {/* Navigation */}
          <nav className="flex flex-wrap gap-4 p-1.5 bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl w-fit">
            {[
              { id: "home", label: "Home" },
              { id: "professionale", label: "Area Professionale" },
              { id: "umanistica", label: "Area Umanistica" },
              { id: "civica", label: "Educazione Civica" },
              { id: "contatti", label: "Contatti" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === tab.id 
                    ? "bg-[#E0D8D0] text-[#050505] shadow-lg shadow-[#E0D8D0]/10" 
                    : "text-[#BDB5AD] hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Sections */}
          <div className="min-h-[600px]">
            {activeSection === "home" && <AboutSection data={portfolio} />}
            
            {activeSection === "umanistica" && (
              <div className="space-y-16 animate-fade-in">
                {Object.entries(HUMANITIES_SECTIONS).map(([key, section]) => (
                  <section key={key} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-[#E0D8D0]/5 text-[#E0D8D0]">
                        {section.icon === "BookOpen" && <BookOpen className="w-6 h-6" />}
                        {section.icon === "History" && <History className="w-6 h-6" />}
                        {section.icon === "Globe" && <Globe className="w-6 h-6" />}
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold tracking-tight">{section.title}</h2>
                        <p className="text-[#BDB5AD] mt-1">{section.desc}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="group bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden hover:border-[#E0D8D0]/30 transition-all duration-500 flex flex-col h-full">
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E0D8D0]/60 bg-[#050505]/80 px-2 py-1 rounded-md backdrop-blur-sm">
                                {item.period}
                              </span>
                            </div>
                          </div>
                          <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div>
                              <h3 className="text-xl font-semibold text-[#E0D8D0] group-hover:text-white transition-colors">{item.name}</h3>
                              <p className="text-sm text-[#BDB5AD] font-medium italic mt-0.5">{item.work}</p>
                            </div>
                            <p className="text-sm text-[#BDB5AD]/80 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-500">{item.desc}</p>
                            <div className="pt-4 mt-auto border-t border-[#E0D8D0]/5">
                              <blockquote className="text-xs italic text-[#E0D8D0]/60 border-l-2 border-[#E0D8D0]/20 pl-3">
                                {item.quote}
                                <footer className="text-[10px] font-bold mt-2 text-[#E0D8D0]/40">— {item.source}</footer>
                              </blockquote>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {activeSection === "professionale" && (
              <div className="space-y-16 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-4xl font-semibold tracking-tight">Progetti Professionali Realizzati</h2>
                  <p className="text-[#BDB5AD]">Progetti Selezionati</p>
                </div>

                {Object.entries(PROFESSIONAL_SECTIONS).map(([key, section]) => (
                  <section key={key} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-[#E0D8D0]/5 text-[#E0D8D0]">
                        {section.icon === "Code" && <Code className="w-6 h-6" />}
                        {section.icon === "Terminal" && <Terminal className="w-6 h-6" />}
                        {section.icon === "Network" && <Network className="w-6 h-6" />}
                        {section.icon === "Briefcase" && <Briefcase className="w-6 h-6" />}
                        {section.icon === "BrainCircuit" && <BrainCircuit className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">Area Professionale</h3>
                        <h4 className="text-xl font-semibold text-[#E0D8D0] mt-1">{section.title}</h4>
                        <p className="text-[#BDB5AD] mt-1">{section.desc}</p>
                      </div>
                    </div>

                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4">
                      <p className="text-sm text-[#BDB5AD] leading-relaxed">{section.approfondimento}</p>
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="px-4 py-2 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-lg hover:border-[#E0D8D0]/30 transition-colors">
                            <p className="text-sm font-semibold text-[#E0D8D0]">{item.name}</p>
                            <p className="text-xs text-[#BDB5AD]">{item.topic}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            )}

            {activeSection === "civica" && <CivicaSection />}

            {activeSection === "contatti" && (
              <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pt-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-semibold tracking-tight">Mettiamoci in contatto</h2>
                  <p className="text-[#BDB5AD]">Sei interessato a collaborare o vuoi semplicemente fare due chiacchiere? Scrivimi pure!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href={`mailto:${portfolio.email}`} className="flex items-center gap-4 p-6 bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl hover:border-[#E0D8D0]/30 transition-all group">
                    <div className="p-3 rounded-xl bg-[#E0D8D0]/5 text-[#E0D8D0] group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#E0D8D0]/40 uppercase tracking-widest">Email</p>
                      <p className="font-medium">{portfolio.email}</p>
                    </div>
                  </a>
                  <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl hover:border-[#E0D8D0]/30 transition-all group">
                    <div className="p-3 rounded-xl bg-[#E0D8D0]/5 text-[#E0D8D0] group-hover:scale-110 transition-transform">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#E0D8D0]/40 uppercase tracking-widest">GitHub</p>
                      <p className="font-medium">Tommi2007jesi</p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="pt-12 border-t border-[#E0D8D0]/10 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#E0D8D0] font-display font-semibold tracking-tighter">
              <span className="text-xl">T.</span>
              <div className="h-4 w-[1px] bg-[#E0D8D0]/20 mx-2" />
              <span className="text-sm uppercase tracking-[0.2em] opacity-80">Tommaso Copparoni</span>
            </div>
            <p className="text-[10px] text-[#BDB5AD]/40 uppercase tracking-[0.3em] font-medium">
              © 2026 • JESI, ITALIA • STUDENT PORTFOLIO
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
