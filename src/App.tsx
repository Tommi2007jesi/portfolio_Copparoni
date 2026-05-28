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
  RefreshCw
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
    desc: "Un'analisi enciclopedica dei giganti del Novecento. Esploriamo la frammentazione dell'io in Pirandello, la rivoluzione della parola pura in Ungaretti e l'estetismo superomistico di D'Annunzio, analizzando come queste correnti abbiano influenzato la modernità.",
    items: [
      {
        name: "Gabriele D'Annunzio",
        period: "1863 – 1938",
        work: "L'Esteta e il Vate",
        desc: "Gabriele D'Annunzio rappresenta la figura più eccentrica e influente del Decadentismo italiano. La sua filosofia di vita, il 'Vivere Inimitabile', lo portò a trasformare ogni sua azione in un evento mediatico. La sua poetica si fonda sull'estetismo (l'arte sopra ogni cosa) e sul Panismo, una concezione quasi mistica in cui l'uomo si fonde con gli elementi naturali, perdendo la propria individualità per diventare parte del cosmo. Nel romanzo 'Il Piacere', attraverso il protagonista Andrea Sperelli, D'Annunzio esplora la decadenza morale e la ricerca ossessiva del bello in una Roma barocca e sensuale.\n\nCuriosità Storica: D'Annunzio fu un genio della comunicazione e del branding ante litteram. Oltre alle sue imprese militari, come il Volo su Vienna, collaborò attivamente con il mondo dell'industria. Inventò nomi diventati iconici come 'La Rinascente' per i grandi magazzini di Milano, il nome del liquore 'Aurum' e persino il termine 'tramezzino', sostituendo l'inglese 'sandwich' in un'ottica di purismo linguistico.",
        quote: "« Taci. Su le soglie del bosco non odo parole che dici umane; ma odo parole più nuove che parlano gocciole e foglie lontane. »",
        source: "La pioggia nel pineto",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Gabriele_D%27Annunzio_1922.jpg/800px-Gabriele_D%27Annunzio_1922.jpg"
      },
      {
        name: "Giuseppe Ungaretti",
        period: "1888 – 1970",
        work: "L'Allegria dei Naufragi",
        desc: "Giuseppe Ungaretti rivoluziona la poesia italiana del Novecento attraverso l'esperienza traumatica della Prima Guerra Mondiale. Soldato nelle trincee del Carso, Ungaretti scopre la fragilità estrema dell'uomo e la necessità di una parola 'nuda', essenziale, capace di illuminare l'oscurità del dolore. La sua raccolta 'L'Allegria' rompe con la metrica tradizionale: i versi si frantumano, sparisce la punteggiatura, e la parola singola, isolata nel bianco della pagina, acquista un valore quasi sacro, un'illuminazione improvvisa (folgorazione). La sua è una 'poesia pura' che cerca di recuperare l'innocenza perduta dell'uomo di fronte all'abisso della morte.\n\nCuriosità e Genesi: Molte delle sue liriche più famose furono scritte su pezzi di carta di fortuna: margini di vecchi giornali, cartoline militari, pacchetti di sigarette. Questi 'reperti' venivano poi conservati nello zaino e rielaborati anni dopo, a testimonianza di come l'arte possa fiorire anche nel fango e nella disperazione più assoluta della guerra.",
        quote: "« Si sta come d'autunno sugli alberi le foglie. »",
        source: "Soldati (Bosco di Courton, luglio 1918)",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Giuseppe_Ungaretti_1952.jpg"
      },
      {
        name: "Luigi Pirandello",
        period: "1867 – 1936",
        work: "La Crisi dell'Io",
        desc: "Premio Nobel nel 1934, Pirandello è il narratore della scomposizione dell'uomo moderno. La sua intuizione centrale è che l'individuo non sia 'uno', ma una moltitudine di frammenti in perenne mutamento. Ogni persona indossa delle 'maschere' imposte dalla società, dalla famiglia e da se stessa, finendo per diventare 'nessuno' o 'centomila' a seconda dello sguardo altrui. Questa visione porta alla 'trappola' delle convenzioni sociali, da cui si può uscire solo attraverso la follia o l'umorismo. L'umorismo, per Pirandello, non è semplice comicità, ma il 'sentimento del contrario': la capacità di vedere oltre l'apparenza ridicola per scorgere la sofferenza sottostante.\n\nCuriosità e Attualità: Il pensiero pirandelliano è incredibilmente profetico rispetto all'era dei Social Network. Oggi, la nostra identità digitale è una costruzione continua di maschere e profili, dove la ricerca di approvazione esterna (i like) frammenta ulteriormente la nostra percezione di noi stessi, rendendo il tema dell'incomunicabilità più attuale che mai.",
        quote: "« Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante maschere e pochi volti. »",
        source: "Uno, nessuno e centomila",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Luigi_Pirandello.jpg/800px-Luigi_Pirandello.jpg"
      }
    ]
  },
  storia: {
    title: "Eredità Storica e Sistemi Democratici (Storia)",
    icon: "History",
    desc: "Un'analisi profonda dei conflitti e delle trasformazioni politiche che hanno ridefinito il mondo contemporaneo. Dalle trincee della Grande Guerra alla nascita della Repubblica Italiana, esaminiamo le radici della nostra libertà.",
    items: [
      {
        name: "La Grande Guerra (1914-1918)",
        period: "L'Inizio del Secolo Breve",
        work: "La Guerra Totale",
        desc: "La Prima Guerra Mondiale non fu solo un conflitto militare, ma una 'catastrofe originaria' che distrusse l'ordine europeo ottocentesco. Fu la prima guerra totale, dove l'intera società (donne nelle fabbriche, economia di guerra) fu mobilitata. Si passò dalla guerra di movimento alla logorante guerra di trincea, dove milioni di uomini vissero nel fango per anni. Fu anche il primo grande laboratorio tecnologico: apparvero i gas tossici, i carri armati, gli aerei da combattimento e i sottomarini. La fine della guerra portò al crollo di quattro grandi imperi (Tedesco, Austro-Ungarico, Ottomano e Russo) e seminò i germi dei futuri totalitarismi.\n\nCuriosità Tecnologica: La Grande Guerra accelerò in modo incredibile lo sviluppo della Radio e della crittografia. I primi sistemi di intercettazione e i codici segreti (come il celebre Telegramma Zimmermann) cambiarono per sempre il modo di intendere l'intelligence e la comunicazione a distanza, ponendo le basi per la moderna guerra elettronica.",
        quote: "« La guerra è una follia da cui l'umanità deve guarire, o ne rimarrà annientata. »",
        source: "Analisi storica contemporanea",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Cheshire_Regiment_trench_Somme_1916.jpg/1024px-Cheshire_Regiment_trench_Somme_1916.jpg"
      },
      {
        name: "Totalitarismi e Seconda Guerra Mondiale",
        period: "1922 – 1945",
        work: "L'Età dei Dittatori",
        desc: "Il dopoguerra vide l'ascesa di regimi che cercarono il controllo totale sulla vita dei cittadini. Il Fascismo in Italia, il Nazismo in Germania e lo Stalinismo in URSS usarono la propaganda, il terrore e la tecnologia per sopprimere ogni libertà. Il culmine di questa deriva fu la Seconda Guerra Mondiale, il conflitto più sanguinoso della storia umana, segnato dall'orrore della Shoah (lo sterminio sistematico di 6 milioni di ebrei) e dall'uso della bomba atomica su Hiroshima e Nagasaki. Questa guerra non fu solo per il territorio, ma per la sopravvivenza stessa della civiltà democratica contro la barbarie totalitaria.\n\nCuriosità e Scienza: Durante il conflitto, la necessità di decifrare i codici segreti nazisti portò Alan Turing a costruire 'Enigma', considerato il primo antenato del computer moderno. Paradossalmente, il periodo più buio dell'umanità ha dato i natali alla tecnologia che oggi usiamo per comunicare e lavorare.",
        quote: "« Coloro che non ricordano il passato sono condannati a ripeterlo. »",
        source: "George Santayana, La vita della ragione",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Auschwitz_I_entrance.jpg/1024px-Auschwitz_I_entrance.jpg"
      },
      {
        name: "La Nascita della Repubblica Italiana",
        period: "1946 – 1948",
        work: "La Costituzione",
        desc: "Dopo la caduta del fascismo e la fine della guerra, l'Italia dovette ricostruirsi dalle fondamenta. Il 2 giugno 1946, attraverso un referendum a suffragio universale (per la prima volta votarono anche le donne), gli italiani scelsero la Repubblica. L'Assemblea Costituente lavorò per due anni per redigere la Carta Costituzionale, che entrò in vigore il 1° gennaio 1948. La nostra Costituzione è definita 'rigida' e si fonda sul lavoro, sulla libertà individuale e sulla giustizia sociale. È il frutto di un 'compromesso nobile' tra le diverse anime politiche (cattolica, socialista, liberale) unite dal valore supremo dell'antifascismo.\n\nCuriosità Istituzionale: L'Articolo 11 della Costituzione ('L'Italia ripudia la guerra come strumento di offesa alla libertà degli altri popoli') è uno dei più avanzati al mondo e riflette il trauma collettivo vissuto dal paese, ponendo l'Italia come nazione votata alla pace e alla cooperazione internazionale.",
        quote: "« L'Italia è una Repubblica democratica, fondata sul lavoro. La sovranità appartiene al popolo. »",
        source: "Articolo 1, Costituzione della Repubblica Italiana",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Costituzione_della_Repubblica_Italiana.jpg/800px-Costituzione_della_Repubblica_Italiana.jpg"
      }
    ]
  },
  inglese: {
    title: "Language, Society and Science (Inglese)",
    icon: "Globe",
    desc: "A comprehensive exploration of English as a vehicle for social critique and technological progress. From Orwell's dystopian warnings to the industrial revolution and the global language of ICT.",
    items: [
      {
        name: "George Orwell",
        period: "1903 – 1950",
        work: "Dystopia and Truth",
        desc: "George Orwell is perhaps the most significant political writer of the 20th century. In his masterpiece '1984', he introduced the world to 'Big Brother', a symbol of omnipresent government surveillance. His work is a profound critique of totalitarianism and the manipulation of language ('Newspeak') to control thought. Orwell understood that if the government can control what you say and how you say it, they can control what you think. His vision of a world where 'War is Peace' and 'Freedom is Slavery' serves as a timeless warning about the fragility of objective truth and the dangers of absolute power.\n\nModern Relevance: Today, Orwell's concepts are more relevant than ever. We live in an age of 'Big Data', where our every move is tracked by algorithms, and 'Fake News' challenges our perception of reality. The term 'Orwellian' is frequently used to describe modern surveillance states and the erosion of privacy in the digital age.",
        quote: "« Big Brother is Watching You. »",
        source: "Nineteen Eighty-Four",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/800px-George_Orwell_press_photo.jpg"
      },
      {
        name: "The Industrial Revolution",
        period: "18th – 19th Century",
        work: "Hard Times by Charles Dickens",
        desc: "The Industrial Revolution transformed Britain from an agricultural society into the world's first industrial superpower. While it brought unprecedented economic growth and technological innovation, it also caused immense social suffering. Charles Dickens, in his novel 'Hard Times', vividly portrayed the grim reality of factory life in fictional Coketown. He attacked the philosophy of Utilitarianism, which valued people only for their productivity and treated children like machines. The revolution led to the rise of the working class, urbanization, and the environmental challenges we still face today.\n\nTechnological Link: The same spirit of innovation that created the steam engine also led to the birth of computing. Ada Lovelace and Charles Babbage developed the first concepts for a programmable computer during this era, proving that the roots of our digital world are deeply embedded in the industrial age.",
        quote: "« Now, what I want is, Facts. Teach these boys and girls nothing but Facts. Facts alone are wanted in life. »",
        source: "Charles Dickens, Hard Times",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Powerloom_weaving_in_a_cotton_mill.jpg/1024px-Powerloom_weaving_in_a_cotton_mill.jpg"
      },
      {
        name: "Technical English & ICT",
        period: "The Digital Era",
        work: "The Global Code",
        desc: "In the 21st century, English has become the 'lingua franca' of the globalized world, especially in the fields of Information and Communication Technology (ICT). Every major programming language, from Python to JavaScript, is based on English syntax. Technical documentation, research papers, and international protocols (like TCP/IP) are written in English to ensure global interoperability. For a developer or a network engineer, proficiency in English is not just a soft skill; it is a fundamental technical requirement to access the latest innovations and collaborate with teams across the globe.\n\nCultural Fact: The Internet was born in English-speaking laboratories (ARPANET), which is why the majority of web terminology—words like 'browser', 'database', 'cloud', and 'kernel'—are English terms used without translation in almost every language on Earth.",
        quote: "« The single biggest problem in communication is the illusion that it has taken place. »",
        source: "George Bernard Shaw on Global Communication",
        image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=800"
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
                <div className="grid grid-cols-1 gap-8">
                  {HUMANITIES_SECTIONS[activeHumSubSection].items.map((author: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-[#E0D8D0]/25 transition-all group duration-300"
                    >
                      {/* Image side - Larger and more prominent */}
                      <div className="w-full md:w-1/3 lg:w-1/4 h-64 md:h-auto shrink-0 overflow-hidden bg-[#050505]">
                        <img 
                          src={author.image} 
                          alt={author.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1457369804590-52c65a7f027f?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>

                      {/* Content side */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E0D8D0]/5 pb-4">
                            <div>
                              <span className="text-[10px] font-mono tracking-[0.2em] text-[#E0D8D0]/40 block mb-1 uppercase">
                                {author.period}
                              </span>
                              <h4 className="text-xl md:text-2xl font-bold text-[#E0D8D0] group-hover:text-white transition-colors">
                                {author.name}
                              </h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] tracking-[0.1em] uppercase px-3 py-1 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-full text-[#E0D8D0]/80 font-mono">
                                {author.work}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light whitespace-pre-wrap">
                            {author.desc}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#E0D8D0]/5 space-y-2">
                          <p className="text-xs md:text-sm text-[#E0D8D0]/90 italic font-serif leading-relaxed relative pl-4">
                            <span className="absolute left-0 top-0 text-2xl text-[#E0D8D0]/20 font-serif leading-none">“</span>
                            {author.quote}
                          </p>
                          <span className="text-[9px] font-mono tracking-wider text-[#E0D8D0]/30 block text-right">
                            — {author.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filtered humanities projects */}
                <div className="space-y-4 pt-8">
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
