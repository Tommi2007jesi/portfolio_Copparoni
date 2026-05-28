import React, { useState } from "react";
import { Menu, X, ExternalLink, Code, Terminal, Send, Mail, Copy, Check, Github, Linkedin, Instagram, Languages, Briefcase, BrainCircuit } from "lucide-react";
import Sidebar from "./components/Sidebar";
import AboutSection from "./components/AboutSection";
import CivicaSection from "./components/CivicaSection";
import ProjectsSection from "./components/ProjectsSection";
import { defaultPortfolioData } from "./data";

const portfolio = defaultPortfolioData;

export default function App() {
  const [activeSection, setActiveSection] = useState<"home" | "fsl" | "civica" | "umanistica" | "professionale">("home");
  const [activeHumSubSection, setActiveHumSubSection] = useState<string>("italiano");
  const [activeProfSubSection, setActiveProfSubSection] = useState<string>("informatica");
  const [expandedEduProjs, setExpandedEduProjs] = useState<Record<string, boolean>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const fslProjects = portfolio.projects.filter(p => p.category === "fsl");

  const PROFESSIONAL_SECTIONS = {
    informatica: {
      title: "Informatica",
      icon: "Code",
      desc: "Progettazione e sviluppo software ad oggetti, modellazione di basi di dati relazionali/NoSQL e creazione di interfacce web dinamiche e robuste.",
      items: [
        {
          name: "Programmazione ad Oggetti",
          topic: "Software Engineering",
          desc: "La programmazione orientata agli oggetti (OOP) è il paradigma dominante nello sviluppo moderno. Attraverso concetti come classi, ereditarietà, polimorfismo e incapsulamento, si creano sistemi scalabili e manutenibili. Java e C# sono i linguaggi più diffusi in ambito enterprise.",
          image: "/img/php.png"
        },
        {
          name: "Basi di Dati",
          topic: "Data Management",
          desc: "La progettazione di database è un'arte che combina teoria relazionale e pratica. RDBMS come PostgreSQL garantiscono ACID compliance, mentre NoSQL come MongoDB offrono flessibilità per dati non strutturati. La normalizzazione e l'ottimizzazione delle query sono cruciali.",
          image: "/img/database.png"
        },
        {
          name: "Interfacce Web Dinamiche",
          topic: "Frontend Development",
          desc: "HTML5, CSS3 e JavaScript moderno permettono di creare esperienze utente ricche e responsive. Framework come React e Vue.js semplificano la gestione dello stato e il rendering efficiente. L'accessibilità e la performance sono priorità fondamentali.",
          image: "/img/htmljs.png"
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
          desc: "La crittografia protegge l'informazione rendendola incomprensibile a chi non possiede la chiave. Dalla crittografia simmetrica (AES) a quella asimmetrica (RSA/ECC), questi algoritmi sono la base di ogni transazione sicura su internet, dalle banche ai messaggi WhatsApp.",
          image: "/img/crittografia.png"
        },
        {
          name: "Modello ISO/OSI",
          topic: "Network Protocols",
          desc: "Il modello ISO/OSI è lo standard che descrive come i dati viaggiano in rete attraverso 7 livelli. Dal livello Fisico (cavi e segnali) fino al livello Applicazione (HTTP, FTP), questa astrazione permette a dispositivi di produttori diversi di comunicare tra loro senza problemi.",
          image: "/img/isoosi.png"
        },
        {
          name: "Cisco Packet Tracer",
          topic: "Network Simulation",
          desc: "Packet Tracer è uno strumento di simulazione potente che permette di progettare e testare reti complesse senza bisogno di hardware fisico. Si possono configurare router, switch e server, simulando attacchi o ottimizzando il traffico di un'intera città o azienda.",
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
          desc: "Le Reti Neurali si ispirano al funzionamento del cervello umano. Le CNN (Convolutional Neural Networks) sono specializzate nell'elaborazione di immagini e video, permettendo ai computer di 'vedere' e riconoscere oggetti, volti e segnali stradali con una precisione superiore a quella umana.",
          image: "/img/neurali.png"
        },
        {
          name: "Algoritmo di Backpropagation",
          topic: "Machine Learning Math",
          desc: "La Backpropagation è il 'motore' dell'apprendimento delle reti neurali. È un processo matematico che permette alla rete di correggere i propri errori, ricalcolando i pesi delle connessioni tra i neuroni per migliorare le prestazioni a ogni ciclo di addestramento.",
          image: "/img/Lalgoritmo-di-backpropagation-in-una-rete-neurale.png"
        },
        {
          name: "AI Generativa e Futuro",
          topic: "Technological Evolution",
          desc: "L'AI generativa rappresenta l'ultima frontiera, capace di creare testi, immagini e codice partendo da semplici indicazioni. Lo studio si concentra sull'etica dell'AI, sulla gestione dei dataset e sulle potenzialità di queste tecnologie per potenziare la creatività umana.",
          image: "/img/AI-generativa.png"
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
          desc: "La gestione della concorrenza permette a un computer di eseguire più compiti 'simultaneamente'. Lo studio dei processi, dei thread e delle sezioni critiche è fondamentale per evitare conflitti (deadlock) e ottimizzare le prestazioni delle CPU multi-core moderne.",
          image: "/img/concorrenza.png"
        },
        {
          name: "Sistemi Operativi",
          topic: "System Architecture",
          desc: "Il Sistema Operativo è l'intermediario tra hardware e utente. Lo studio approfondisce la gestione della memoria, lo scheduling della CPU e il file system. Capire come Linux o Windows gestiscono le risorse è essenziale per scrivere software efficiente e sicuro.",
          image: "/img/os.png"
        },
        {
          name: "Sviluppo con Android Studio",
          topic: "Mobile Development",
          desc: "Android Studio è l'IDE standard per creare app per il sistema operativo mobile più diffuso al mondo. Lo studio copre il ciclo di vita delle Activity, la gestione dei layout XML e l'integrazione con i sensori dello smartphone.",
          image: "/img/android.png"
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
          desc: "Comprendere la busta paga significa saper leggere le voci che compongono la retribuzione: dal lordo al netto, passando per contributi previdenziali (INPS) e ritenute fiscali (IRPEF). È un documento fondamentale che regola il rapporto tra lavoratore e azienda.",
          image: "/img/busta.png"
        },
        {
          name: "Costi e Ricavi",
          topic: "Business Economics",
          desc: "L'analisi economica di un'impresa si basa sull'equilibrio tra costi (fissi e variabili) e ricavi. Lo studio del Break-Even Point permette di capire quando un progetto inizia a generare profitto. Per un informatico, saper stimare i costi di sviluppo e infrastruttura è cruciale.",
          image: "/img/costiricavi.jpg"
        },
        {
          name: "Tipologie di Aziende",
          topic: "Corporate Structures",
          desc: "Dalle ditte individuali alle S.p.A., ogni forma giuridica ha responsabilità e vantaggi diversi. Lo studio delle organizzazioni aziendali analizza come le gerarchie e i flussi di lavoro si adattano al mercato, con un focus particolare sulle startup innovative.",
          image: "/img/azienda.jpg"
        }
      ]
    }
  };

  const HUMANITIES_SECTIONS: Record<string, any> = {
    italiano: {
      items: [
        {
          name: "Luigi Pirandello",
          period: "1867 - 1936",
          work: "Uno, nessuno e centomila",
          desc: "Luigi Pirandello è il maestro della crisi dell'identità moderna. La sua opera 'Uno, nessuno e centomila' rappresenta il capolavoro della riflessione sulla molteplicità dell'io. Pirandello ci mostra come ogni persona è contemporaneamente una per se stessa e mille per gli altri, a seconda di come viene percepita. Questo tema è straordinariamente attuale nell'era dei social media, dove ciascuno di noi costruisce molteplici identità digitali.",
          quote: "Uno, nessuno e centomila",
          source: "Luigi Pirandello",
          image: "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Gabriele D'Annunzio",
          period: "1863 - 1938",
          work: "La pioggia nel pineto",
          desc: "Gabriele D'Annunzio è il poeta dell'estetismo e del panismo, cioè della fusione dell'uomo con la natura. 'La pioggia nel pineto' è una celebrazione sensoriale della natura, dove il poeta e la donna si dissolvono nel ritmo della pioggia e nel sussurro dei pini. D'Annunzio ha rivoluzionato la letteratura italiana con il suo stile ricercato e la sua visione di una bellezza assoluta come fine supremo dell'arte.",
          quote: "La pioggia nel pineto",
          source: "Gabriele D'Annunzio",
          image: "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&q=80&w=800"
        },
        {
          name: "Giuseppe Ungaretti",
          period: "1888 - 1970",
          work: "Soldati",
          desc: "Giuseppe Ungaretti è il poeta della trincea, della brevità e dell'essenzialità. La sua poesia 'Soldati' è una delle più toccanti della letteratura italiana: in poche parole, cattura l'angoscia e la fragilità della vita umana durante la Grande Guerra. Ungaretti ha rivoluzionato la poesia italiana con l'Ermetismo, uno stile che privilegia la profondità emotiva e la ricerca del significato nascosto.",
          quote: "Soldati",
          source: "Giuseppe Ungaretti",
          image: "https://images.unsplash.com/photo-1507842217343-583f20270319?auto=format&fit=crop&q=80&w=800"
        }
      ]
    },
    storia: {
      items: [
        {
          name: "La Grande Guerra (1914-1918)",
          period: "1914 - 1918",
          work: "L'Inizio del Secolo Breve",
          desc: "La Prima Guerra Mondiale ha segnato il passaggio dal XIX al XX secolo. Questa guerra ha introdotto tecnologie devastanti: carri armati, gas tossici, aerei da combattimento. La trincea è diventata il simbolo della guerra moderna: migliaia di soldati si affrontavano in condizioni disumane, con perdite enormi per guadagni territoriali minimi. La Grande Guerra ha ucciso milioni di persone e ha seminato il terreno per i conflitti futuri.",
          quote: "L'Inizio del Secolo Breve",
          source: "Storico",
          image: "/img/primaguerra.png"
        },
        {
          name: "Totalitarismi e Shoah",
          period: "1922 - 1945",
          work: "Il Buio del Novecento",
          desc: "Tra le due guerre mondiali, l'Europa è stata dominata da regimi totalitari: il fascismo italiano, il nazismo tedesco e lo stalinismo sovietico. Questi regimi hanno utilizzato la propaganda, la violenza di stato e il controllo totale della società per mantenere il potere. L'Olocausto rimane uno dei crimini più atroci della storia umana, con sei milioni di ebrei uccisi nei campi di concentramento.",
          quote: "Il Buio del Novecento",
          source: "Storico",
          image: "/img/secguerra.png"
        },
        {
          name: "La Costituzione Italiana",
          period: "1946 - 1948",
          work: "La Rinascita Democratica",
          desc: "Dopo la caduta del fascismo, l'Italia ha scritto una nuova Costituzione (entrata in vigore il 1° gennaio 1948) che rappresenta uno dei documenti più progressisti del dopoguerra. La Costituzione italiana garantisce i diritti fondamentali, la separazione dei poteri e il suffragio universale. L'articolo 11 ripudia la guerra come strumento di offesa alla libertà dei popoli, riflettendo il desiderio di pace dopo il conflitto.",
          quote: "La Rinascita Democratica",
          source: "Storico",
          image: "/img/costituzione.png"
        }
      ]
    },
    inglese: {
      items: [
        {
          name: "George Orwell",
          period: "1903 - 1950",
          work: "1984 e la Sorveglianza",
          desc: "George Orwell è il profeta della sorveglianza di massa. Nel suo romanzo distopico '1984', descrive un regime totalitario dove il Grande Fratello osserva ogni cittadino 24 ore al giorno. Orwell ha anticipato di decenni l'era della sorveglianza digitale: oggi, i nostri dati personali sono raccolti da aziende tecnologiche e governi, proprio come nel romanzo. La sua visione rimane straordinariamente attuale.",
          quote: "1984 e la Sorveglianza",
          source: "George Orwell",
          image: "/img/george.png"
        },
        {
          name: "The Industrial Revolution",
          period: "18th - 19th Century",
          work: "Charles Dickens e il Cambiamento",
          desc: "La Rivoluzione Industriale ha trasformato il mondo. Charles Dickens ha documentato le conseguenze umane di questa trasformazione: lo sfruttamento dei bambini nelle fabbriche, la povertà urbana, l'inquinamento. Nel frattempo, Charles Babbage stava inventando i primi computer meccanici, gettando le basi per l'era digitale. La Rivoluzione Industriale è il ponte tra il mondo agricolo e quello digitale.",
          quote: "Charles Dickens e il Cambiamento",
          source: "Storico",
          image: "/img/revolution.png"
        },
        {
          name: "Technical English & ICT",
          period: "Modern Era",
          work: "La Lingua della Tecnologia",
          desc: "L'inglese è diventato la lingua franca della tecnologia e della scienza. Dalla programmazione (Python, JavaScript) alla documentazione tecnica, l'inglese domina il settore ICT. Imparare l'inglese tecnico non è solo una competenza linguistica, ma una necessità professionale. La capacità di leggere documentazione tecnica, scrivere codice commentato in inglese e comunicare con sviluppatori internazionali è fondamentale per una carriera nel settore IT.",
          quote: "La Lingua della Tecnologia",
          source: "Tecnico",
          image: "/img/ict.png"
        }
      ]
    }
  };

  const renderEduProjectCard = (proj: any) => {
    const isExpanded = expandedEduProjs[proj.id];
    return (
      <div key={proj.id} className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-4 md:p-6 space-y-3 hover:border-[#E0D8D0]/25 transition-all">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-sm md:text-base font-bold text-[#E0D8D0] flex-1">{proj.title}</h4>
          <span className="text-[9px] px-2 py-1 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 rounded-full text-[#E0D8D0]/70 font-mono whitespace-nowrap">{proj.category}</span>
        </div>
        <p className="text-xs md:text-sm text-[#BDB5AD] font-light">{proj.desc}</p>

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
          {proj.tech.map((tc: string, keyidx: number) => (
            <span
              key={keyidx}
              className="text-[9px] font-light text-[#E0D8D0]/75 bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 px-2 py-0.5 rounded-md font-mono"
            >
              {tc}
            </span>
          ))}
        </div>
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
              { id: "professionale", label: "Area Professionale" }
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
          
          {/* Left Sidebar */}
          <Sidebar data={portfolio} />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">

            {/* HOME SECTION */}
            {activeSection === "home" && <AboutSection />}

            {/* FSL SECTION */}
            {activeSection === "fsl" && (
              <div className="space-y-8 animate-fade-in">
                {/* Intestazione */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Briefcase className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Esperienza Lavorativa</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Prisma Jesi - Negozio di Manutenzione e Commercio Elettronico
                  </h2>
                </div>

                {/* Introduzione */}
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4">
                  <h3 className="text-sm font-semibold tracking-[0.1em] text-[#E0D8D0] uppercase">La Mia Esperienza</h3>
                  <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light">
                    Ho avuto l'opportunità di lavorare presso Prisma, un negozio specializzato nella manutenzione di computer e nella vendita di oggetti elettronici. Durante questo periodo, ho sviluppato competenze pratiche fondamentali nel settore IT, imparando a smontare e riparare componenti hardware, diagnosticare problemi tecnici e fornire un servizio clienti professionale e attento.
                  </p>
                  <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light">
                    L'esperienza mi ha permesso di comprendere il ciclo completo di un'attività commerciale: dalla gestione dell'inventario, alla consulenza tecnica ai clienti, fino alla risoluzione pratica di problemi hardware. Ogni giorno ho potuto applicare le conoscenze teoriche acquisite a scuola in un contesto reale, scoprendo quanto sia importante la combinazione tra competenza tecnica e capacità comunicativa.
                  </p>
                </div>

                {/* Layout: Mappa a sinistra + Commento a destra */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mappa */}
                  <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden">
                    <div className="h-80 bg-[#050505] relative flex items-center justify-center">
                      <img 
                        src="/img/prisma-map.png" 
                        alt="Prisma Jesi Location" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-[#E0D8D0]">Prisma Jesi</h4>
                      <p className="text-xs text-[#BDB5AD]">Negozio di manutenzione computer e vendita articoli elettronici</p>
                      <p className="text-xs text-[#E0D8D0]/60 font-mono">📍 Jesi, Italia</p>
                    </div>
                  </div>

                  {/* Commento personale */}
                  <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#E0D8D0] mb-3">Il Mio Commento</h4>
                      <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light italic">
                        "Lavorare da Prisma è stata un'esperienza formativa che mi ha insegnato il valore della pazienza e della precisione. Ho imparato che la tecnologia non è solo teoria, ma è qualcosa che tocchiamo, ripariamo e miglioriamo ogni giorno. I clienti mi hanno insegnato quanto sia importante ascoltare, capire i loro problemi e trovare soluzioni concrete. È stato gratificante vedere il volto di una persona quando le ho risolto un problema che la stava bloccando da giorni."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Box Pro/Contro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Aspetti Positivi */}
                  <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-semibold text-[#E0D8D0] uppercase tracking-[0.1em]">✓ Aspetti Positivi</h4>
                    <ul className="space-y-2 text-xs text-[#BDB5AD]">
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Ho sviluppato competenze pratiche di troubleshooting hardware</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Ho imparato a comunicare con clienti non tecnici in modo chiaro</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Ho compreso il ciclo completo di un'attività commerciale</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Ho acquisito responsabilità e autonomia nel lavoro</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Ho visto come la teoria scolastica si applica nella pratica</span></li>
                    </ul>
                  </div>

                  {/* Aspetti da Migliorare */}
                  <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-4">
                    <h4 className="text-sm font-semibold text-[#E0D8D0] uppercase tracking-[0.1em]">⚠ Aspetti da Migliorare</h4>
                    <ul className="space-y-2 text-xs text-[#BDB5AD]">
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Inizialmente ero lento nei diagnosi, ma ho imparato a velocizzarmi</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Dovevo migliorare la gestione dello stress durante i picchi di lavoro</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Avrei voluto approfondire di più la parte software e reti</span></li>
                      <li className="flex gap-2"><span className="text-[#E0D8D0] font-bold">•</span> <span>Potevo essere più proattivo nel proporre soluzioni innovative</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* AREA UMANISTICA */}
            {activeSection === "umanistica" && (
              <div className="space-y-8 animate-fade-in">
                <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-[#E0D8D0]">
                    <Languages className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Area Umanistica</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
                    Italiano, Storia e Inglese
                  </h2>
                </div>

                <div className="flex border-b border-[#E0D8D0]/10 pb-[10px] gap-2 overflow-x-auto no-scrollbar">
                  {(Object.keys(HUMANITIES_SECTIONS) as Array<keyof typeof HUMANITIES_SECTIONS>).map((subKey) => {
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
                        {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
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

            {/* EDUCAZIONE CIVICA */}
            {activeSection === "civica" && (
              <CivicaSection />
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

                <div className="grid grid-cols-1 gap-8">
                  {PROFESSIONAL_SECTIONS[activeProfSubSection].items.map((item: any, index: number) => (
                    <div 
                      key={index} 
                      className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-[#E0D8D0]/25 transition-all group duration-300"
                    >
                      <div className="w-full md:w-1/3 lg:w-1/4 h-64 md:h-auto shrink-0 overflow-hidden bg-[#050505]">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";
                          }}
                        />
                      </div>
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E0D8D0]/5 pb-4">
                            <div>
                              <span className="text-[10px] font-mono tracking-[0.2em] text-[#E0D8D0]/40 block mb-1 uppercase">{item.topic}</span>
                              <h4 className="text-xl font-bold text-[#E0D8D0]">{item.name}</h4>
                            </div>
                          </div>
                          <div className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light whitespace-pre-wrap">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
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
