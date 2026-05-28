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
  MapPin,
  RefreshCw,
  Cpu,
  Database,
  Network,
  Briefcase,
  BrainCircuit
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
    items: [
      {
        name: "Sviluppo Web con PHP",
        topic: "Server-Side Programming",
        desc: "PHP è il motore di oltre il 75% dei siti web mondiali. Lo studio si concentra sulla gestione delle sessioni, l'interazione con i database e la creazione di pagine dinamiche. È un linguaggio fondamentale per capire come funziona il web 'sotto il cofano', permettendo di gestire la logica di business e la sicurezza delle applicazioni.\n\nCuriosità: Nonostante l'ascesa di nuovi linguaggi, PHP continua a dominare grazie a piattaforme come WordPress e framework moderni come Laravel.",
        image: "/img/php.png"
      },
      {
        name: "Progettazione e Sviluppo DB",
        topic: "Data Architecture",
        desc: "I database sono il cuore di ogni sistema informativo. Lo studio copre la modellazione E-R (Entità-Relazione), la normalizzazione dei dati per evitare ridondanze e l'uso del linguaggio SQL per interrogazioni complesse. Progettare un DB efficiente significa garantire l'integrità e la velocità di accesso alle informazioni.\n\nCuriosità: Sapevi che un database non ottimizzato può rallentare un'applicazione di oltre il 90%? La corretta indicizzazione è un'arte.",
        image: "/img/database.png"
      },
      {
        name: "Frontend: HTML5 & JavaScript",
        topic: "User Interface & Logic",
        desc: "HTML5 fornisce la struttura, mentre JavaScript porta l'interattività. Lo studio di JS moderno (ES6+) permette di manipolare il DOM, gestire chiamate asincrone (API) e creare interfacce utente reattive e coinvolgenti. È il linguaggio che ha trasformato il web da documenti statici ad applicazioni software complete.\n\nCuriosità: JavaScript è stato creato in soli 10 giorni nel 1995, ma oggi è il linguaggio più usato al mondo.",
        image: "/img/javascript.png"
      }
    ]
  },
  gpoi: {
    title: "GPOI",
    icon: "Briefcase",
    desc: "Gestione progetti professionali, pianificazione dei requisiti, analisi costi-benefici e applicazione delle metodologie di sviluppo Agile.",
    items: [
      {
        name: "La Busta Paga",
        topic: "HR & Finance",
        desc: "Comprendere la busta paga significa saper leggere le voci che compongono la retribuzione: dal lordo al netto, passando per contributi previdenziali (INPS) e ritenute fiscali (IRPEF). È un documento fondamentale che regola il rapporto tra lavoratore e azienda, garantendo trasparenza e diritti.\n\nCuriosità: Il sistema contributivo italiano si basa sulla solidarietà generazionale: i lavoratori di oggi pagano le pensioni di chi è già a riposo.",
        image: "/img/bustapaga.png"
      },
      {
        name: "Costi e Ricavi",
        topic: "Business Economics",
        desc: "L'analisi economica di un'impresa si basa sull'equilibrio tra costi (fissi e variabili) e ricavi. Lo studio del Break-Even Point permette di capire quando un progetto inizia a generare profitto. Per un informatico, saper stimare i costi di sviluppo e infrastruttura è cruciale per il successo di un prodotto.\n\nCuriosità: Nel software, il costo marginale (produrre una copia in più) è quasi zero, rendendo le aziende tech estremamente scalabili.",
        image: "/img/costiricavi.jpg"
      },
      {
        name: "Tipologie di Aziende",
        topic: "Corporate Structures",
        desc: "Dalle ditte individuali alle S.p.A., ogni forma giuridica ha responsabilità e vantaggi diversi. Lo studio delle organizzazioni aziendali analizza come le gerarchie e i flussi di lavoro si adattano al mercato, con un focus particolare sulle startup innovative e sulle aziende agili del settore tecnologico.\n\nCuriosità: Molte delle aziende tech più grandi del mondo (Apple, Google, Amazon) sono nate come piccolissime realtà in un garage.",
        image: "/img/azienda.jpg"
      }
    ]
  },
  tpsit: {
    title: "Tipsit",
    icon: "Terminal",
    desc: "Sviluppo di applicazioni concorrenti e distribuite, programmazione client/server multithread e interazioni di rete a basso livello.",
    items: [
      {
        name: "Concorrenza e Processi",
        topic: "Operating Systems",
        desc: "La gestione della concorrenza permette a un computer di eseguire più compiti 'simultaneamente'. Lo studio dei processi, dei thread e delle sezioni critiche è fondamentale per evitare conflitti (deadlock) e ottimizzare le prestazioni delle CPU multi-core moderne.\n\nCuriosità: Senza la gestione della concorrenza, il tuo computer si bloccherebbe ogni volta che provi ad aprire una seconda scheda nel browser.",
        image: "/img/concorrenza.png"
      },
      {
        name: "Sistemi Operativi",
        topic: "System Architecture",
        desc: "Il Sistema Operativo è l'intermediario tra hardware e utente. Lo studio approfondisce la gestione della memoria, lo scheduling della CPU e il file system. Capire come Linux o Windows gestiscono le risorse è essenziale per scrivere software efficiente e sicuro.\n\nCuriosità: Il kernel Linux, che fa girare quasi tutto il web e Android, è nato come un progetto hobbistico di uno studente universitario.",
        image: "/img/os.png"
      },
      {
        name: "Sviluppo con Android Studio",
        topic: "Mobile Development",
        desc: "Android Studio è l'IDE standard per creare app per il sistema operativo mobile più diffuso al mondo. Lo studio copre il ciclo di vita delle Activity, la gestione dei layout XML e l'integrazione con i sensori dello smartphone, permettendo di trasformare un'idea in un'applicazione portatile.\n\nCuriosità: Esistono oltre 3 miliardi di dispositivi Android attivi nel mondo, rendendo lo sviluppo mobile una delle carriere più richieste.",
        image: "/img/android.png"
      }
    ]
  },
  sistemi: {
    title: "Sistemi e reti",
    icon: "Network",
    desc: "Architetture dei sistemi operativi di rete, indirizzamento IP, sicurezza informatica e gestione remota di router e switch.",
    items: [
      {
        name: "Crittografia e Sicurezza",
        topic: "Data Protection",
        desc: "La crittografia protegge l'informazione rendendola incomprensibile a chi non possiede la chiave. Dalla crittografia simmetrica (AES) a quella asimmetrica (RSA/ECC), questi algoritmi sono la base di ogni transazione sicura su internet, dalle banche ai messaggi WhatsApp.\n\nCuriosità: La crittografia asimmetrica permette a due persone che non si sono mai viste di scambiarsi messaggi segreti in modo totalmente sicuro.",
        image: "/img/crittografia.png"
      },
      {
        name: "Modello ISO/OSI",
        topic: "Network Protocols",
        desc: "Il modello ISO/OSI è lo standard che descrive come i dati viaggiano in rete attraverso 7 livelli. Dal livello Fisico (cavi e segnali) fino al livello Applicazione (HTTP, FTP), questa astrazione permette a dispositivi di produttori diversi di comunicare tra loro senza problemi.\n\nCuriosità: Anche se oggi usiamo il modello TCP/IP, il modello ISO/OSI rimane il riferimento teorico fondamentale per ogni esperto di reti.",
        image: "/img/isoosi.png"
      },
      {
        name: "Cisco Packet Tracer",
        topic: "Network Simulation",
        desc: "Packet Tracer è uno strumento di simulazione potente che permette di progettare e testare reti complesse senza bisogno di hardware fisico. Si possono configurare router, switch e server, simulando attacchi o ottimizzando il traffico di un'intera città o azienda.\n\nCuriosità: Molte certificazioni professionali Cisco vengono preparate interamente su simulatori come questo prima di toccare un vero router.",
        image: "/img/cisco.png"
      }
    ]
  },
  ia: {
    title: "Intelligenza Artificiale",
    icon: "BrainCircuit",
    desc: "Integrazione di modelli generativi di linguaggio naturale (LLM), elaborazione semantica e automazione intelligente dei contenuti.",
    items: [
      {
        name: "Reti Neurali e CNN",
        topic: "Deep Learning",
        desc: "Le Reti Neurali si ispirano al funzionamento del cervello umano. Le CNN (Convolutional Neural Networks) sono specializzate nell'elaborazione di immagini e video, permettendo ai computer di 'vedere' e riconoscere oggetti, volti e segnali stradali con una precisione superiore a quella umana.\n\nCuriosità: Le CNN sono la tecnologia che permette alle auto a guida autonoma di distinguere un pedone da un palo della luce.",
        image: "/img/neural.png"
      },
      {
        name: "Algoritmo di Backpropagation",
        topic: "Machine Learning Math",
        desc: "La Backpropagation è il 'motore' dell'apprendimento delle reti neurali. È un processo matematico che permette alla rete di correggere i propri errori, ricalcolando i pesi delle connessioni tra i neuroni per migliorare le prestazioni a ogni ciclo di addestramento.\n\nCuriosità: Senza questo algoritmo, scoperto negli anni '80 ma diventato potente solo oggi grazie alle moderne GPU, l'AI moderna non esisterebbe.",
        image: "/img/Lalgoritmo-di-backpropagation-in-una-rete-neurale.png"
      },
      {
        name: "AI Generativa e Futuro",
        topic: "Technological Evolution",
        desc: "L'AI generativa rappresenta l'ultima frontiera, capace di creare testi, immagini e codice partendo da semplici indicazioni. Lo studio si concentra sull'etica dell'AI, sulla gestione dei dataset e sulle potenzialità di queste tecnologie per potenziare la creatività umana.\n\nCuriosità: I modelli linguistici moderni sono stati addestrati su quasi tutta la conoscenza umana scritta disponibile su internet.",
        image: "/img/AI-generativa.png"
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
  
  // Active Area Professionale Sub-Section State
  const [activeProfSubSection, setActiveProfSubSection] = useState<"informatica" | "gpoi" | "tpsit" | "sistemi" | "ia">("informatica");

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
        return cat === "area professionale" || cat.includes("professione") || cat.includes("saas") || cat.includes("fintech") || cat.includes("e-commerce") || cat.includes("developer") || cat.includes("tech") || cat.includes("ai");
      }
      return false;
    });
  };

  const fslProjects = filterProjects("fsl");
  const civicaProjects = filterProjects("civica");
  const umanisticaProjects = filterProjects("umanistica");

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

          {/* Centered Navigation Menu Bar */}
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

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {activeSection === "home" && <Sidebar data={portfolio} />}

          <div className="flex-1 w-full min-h-[500px]">
            
            {activeSection === "home" && (
              <div className="animate-fade-in space-y-6">
                <AboutSection data={portfolio} />
              </div>
            )}

            {activeSection === "fsl" && (
              <div className="space-y-8 animate-fade-in">
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
                    Competenze e elaborati prodotti nell'ambito linguistico e letterario francofono.
                  </p>
                </div>

                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans">
                    Livelli di Competenza (QCER)
                  </h3>
                  <div className="space-y-4 pt-1">
                    {[
                      { lang: "Italiano (Madrelingua)", level: "C2", pct: 100 },
                      { lang: "Francese (FSL / DELF)", level: "B2", pct: 85 },
                      { lang: "Inglese (Comprensione)", level: "B2", pct: 75 }
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
                      Nessun progetto registrato.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === "civica" && (
              <CivicaSection />
            )}

            {activeSection === "umanistica" && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <BookOpen className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Area Umanistica (Lettere & Filosofia)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Lettere, Filosofia ed Espressione del Lavoro
                  </h2>
                </div>

                <div className="flex border-b border-[#E0D8D0]/10 pb-[10px] gap-2 overflow-x-auto no-scrollbar">
                  {(["italiano", "storia", "inglese"] as const).map((subKey) => {
                    const isActive = activeHumSubSection === subKey;
                    return (
                      <button
                        key={subKey}
                        onClick={() => setActiveHumSubSection(subKey)}
                        className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          isActive 
                            ? "bg-[#E0D8D0] text-[#050505]" 
                            : "text-[#E0D8D0]/60 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                        }`}
                      >
                        {subKey}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {HUMANITIES_SECTIONS[activeHumSubSection].items.map((author: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-[#E0D8D0]/25 transition-all group duration-300"
                    >
                      <div className="w-full md:w-1/3 lg:w-1/4 h-64 md:h-auto shrink-0 overflow-hidden bg-[#050505]">
                        <img 
                          src={author.image} 
                          alt={author.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1457369804590-52c65a7f027f?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E0D8D0]/5 pb-4">
                            <div>
                              <span className="text-[10px] font-mono tracking-[0.2em] text-[#E0D8D0]/40 block mb-1 uppercase">{author.period}</span>
                              <h4 className="text-xl font-bold text-[#E0D8D0]">{author.name}</h4>
                            </div>
                            <span className="text-[10px] px-3 py-1 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-full text-[#E0D8D0]/80 font-mono">{author.work}</span>
                          </div>
                          <div className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light whitespace-pre-wrap">{author.desc}</div>
                        </div>
                        <div className="pt-4 border-t border-[#E0D8D0]/5 space-y-2">
                          <p className="text-xs italic font-serif leading-relaxed text-[#E0D8D0]/90">"{author.quote}"</p>
                          <span className="text-[9px] font-mono text-[#E0D8D0]/30 block text-right">— {author.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AREA PROFESSIONALE RE-DESIGNED */}
            {activeSection === "professionale" && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Terminal className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Area Professionale & Indirizzo</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Competenze Tecniche e Scientifiche
                  </h2>
                </div>

                <div className="flex border-b border-[#E0D8D0]/10 pb-[10px] gap-2 overflow-x-auto no-scrollbar">
                  {(Object.keys(PROFESSIONAL_SECTIONS) as Array<keyof typeof PROFESSIONAL_SECTIONS>).map((subKey) => {
                    const isActive = activeProfSubSection === subKey;
                    return (
                      <button
                        key={subKey}
                        onClick={() => setActiveProfSubSection(subKey)}
                        className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          isActive 
                            ? "bg-[#E0D8D0] text-[#050505]" 
                            : "text-[#E0D8D0]/60 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
                        }`}
                      >
                        {subKey}
                      </button>
                    );
                  })}
                </div>



                <div className="pt-8 border-t border-[#E0D8D0]/10">
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans mb-6">Progetti Professionali Realizzati</h3>
                  <ProjectsSection data={portfolio} />
                </div>
              </div>
            )}

            {activeSection === "contatti" && (
              <div className="space-y-8 animate-fade-in text-xs font-light">
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Send className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">HUB DI COMUNICAZIONE</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Mettiti in Contatto
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0D8D0]/40">Canali Diretti</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-[#E0D8D0]/40" />
                              <span className="text-[11px] text-[#E0D8D0] font-medium">{portfolio.email}</span>
                            </div>
                            <button onClick={() => { navigator.clipboard.writeText(portfolio.email); setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2000); }}>
                              {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-[#E0D8D0]/40" />}
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <a href={portfolio.github} target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5"><Github className="w-4 h-4 text-[#E0D8D0]/40" /><span className="text-[9px] mt-2">Github</span></a>
                            <a href={portfolio.linkedin} target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5"><Linkedin className="w-4 h-4 text-[#E0D8D0]/40" /><span className="text-[9px] mt-2">Linkedin</span></a>
                            <a href="#" target="_blank" rel="noreferrer" className="flex flex-col items-center p-4 rounded-xl bg-[#050505]/50 border border-[#E0D8D0]/5"><Instagram className="w-4 h-4 text-[#E0D8D0]/40" /><span className="text-[9px] mt-2">Instagram</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden p-6">
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Nome" className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs text-[#E0D8D0]" />
                          <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email" className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs text-[#E0D8D0]" />
                        </div>
                        <input type="text" value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} placeholder="Oggetto" className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs text-[#E0D8D0]" />
                        <textarea required value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Messaggio..." className="w-full bg-[#050505]/50 border border-[#E0D8D0]/10 rounded-xl px-4 py-3 text-xs text-[#E0D8D0] h-32 resize-none" />
                        <button type="submit" className="w-full py-3 rounded-xl bg-[#E0D8D0] text-[#050505] font-bold text-[10px] uppercase tracking-[0.2em]">{contactLoading ? "Invio..." : "Invia Messaggio"}</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full border-t border-[#E0D8D0]/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#E0D8D0]/10 text-[#E0D8D0] rounded-lg flex items-center justify-center font-bold text-[10px]">T.</div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#E0D8D0]/80">Tommaso Copparoni</span>
            </div>
            <p className="text-[10px] text-[#E0D8D0]/30 font-mono">© 2026 • JESI, ITALIA • STUDENT PORTFOLIO</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
