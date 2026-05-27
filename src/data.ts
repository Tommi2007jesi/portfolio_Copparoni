import { PortfolioData } from "./types";

export const defaultPortfolioData: PortfolioData = {
  name: "Tommaso Copparoni",
  role: "Studente Informatica - IIS Marconi Pieralisi",
  tagline: "Studente di Informatica | Appassionato di Tecnologia e Basket",
  bio: "Sono uno studente del quinto anno dell'indirizzo informatica. I primi due anni ho frequentato il Liceo da Vinci indirizzo sportivo, per poi trasferirmi qui al Marconi Pieralisi. Vivo a Jesi e sono da poco maggiorenne. Nel tempo libero gioco a basket qui a Jesi, faccio anche l'arbitro e mi piace uscire con i miei amici.",
  location: "Jesi, Italia",
  email: "st11349@iismarconipieralisi.it",
  github: "https://github.com/example-username",
  linkedin: "https://linkedin.com/in/example-username",
  availability: "Disponibile per stage e progetti scolastici",
  rates: "Studente",
  skills: [
    {
      category: "Competenze Tecniche",
      items: ["Creazione DB", "Problem Solving", "Team Working", "Gestione del Tempo", "Progettazione Reti LAN", "Linguaggi Client-Server"]
    }
  ],
  activities: [
    {
      id: "act1",
      title: "Giocatore",
      organization: "Basket Jesi Academy",
      location: "Jesi",
      icon: "🏀"
    },
    {
      id: "act2",
      title: "Animatore",
      organization: "Centro Estivo San Francesco",
      location: "Jesi",
      icon: "🎯"
    },
    {
      id: "act3",
      title: "Arbitro di Basket",
      organization: "CIA Marche",
      location: "Marche",
      icon: "🏆"
    }
  ],
  projects: [
    {
      id: "p-info",
      title: "Informatica",
      desc: "Progettazione e sviluppo software ad oggetti, modellazione di basi di dati relazionali/NoSQL e creazione di interfacce web dinamiche e robuste.",
      longDesc: "Approfondimento dei paradigmi di programmazione imperativa (C/C++) e orientata agli oggetti (Java, C#). Progettazione concettuale, logica e fisica di basi di dati (RDBMS come PostgreSQL e NoSQL come MongoDB) con normalizzazione ed ottimizzazione delle query SQL. Integrazione di architetture MVC moderni e API protette.",
      tech: ["Java", "C++", "PostgreSQL", "SQL", "Spring Boot", "JSON API"],
      category: "Area Professionale"
    },
    {
      id: "p-sistemi",
      title: "Sistemi e reti",
      desc: "Architetture dei sistemi operativi di rete, indirizzamento IP, sicurezza informatica e gestione remota di router e switch.",
      longDesc: "Studio e configurazione di architetture di rete complesse conformi al modello standard ISO/OSI e TCP/IP. Progettazione delle subnetting IPv4/IPv6, impostazione di protocolli di routing dinamico (OSPF, RIP) e di sicurezza dei nodi tramite switch, router e firewall simulatori quali Cisco Packet Tracer. Monitoraggio del traffico dati con Wireshark.",
      tech: ["Cisco IOS", "Wireshark", "Packet Tracer", "OSPF", "Routing", "Network Security"],
      category: "Area Professionale"
    },
    {
      id: "p-ai",
      title: "Intelligenza Artificiale",
      desc: "Integrazione di modelli generativi di linguaggio naturale (LLM), elaborazione semantica e automazione intelligente dei contenuti.",
      longDesc: "Sviluppo avanzato ed integrazione di soluzioni basate su agenti decisionali autonomi e pipeline di Retrieval-Augmented Generation (RAG). Utilizzo di modelli LLM open-source e database vettoriali per ottimizzare le risposte contestuali. Tecniche di Prompt Engineering, function calling ed elaborazione strutturata dei dati.",
      tech: ["Python", "RAG", "Prompt Engineering", "Vector DB", "Node.js", "LLM"],
      category: "Area Professionale"
    },
    {
      id: "p-tipsit",
      title: "Tipsit",
      desc: "Sviluppo di applicazioni concorrenti e distribuite, programmazione client/server multithread e interazioni di rete a basso livello.",
      longDesc: "Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni. Studio avanzato della concorrenza tramite thread e processi nei sistemi Unix e gestione dei semafori per la mutua esclusione. Sviluppo ed implementation di socket client-server sincrone ed asincrone TCP/UDP multipiattaforma.",
      tech: ["TypeScript", "Multi-threading", "Sockets", "TCP/IP", "WebSockets", "C"],
      category: "Area Professionale"
    },
    {
      id: "p-gpoi",
      title: "GPOI",
      desc: "Gestione progetti professionali, pianificazione dei requisiti, analisi costi-benefici e applicazione delle metodologie di sviluppo Agile.",
      longDesc: "Gestione Progetto e Organizzazione d'Impresa. Comprensione organizzativa delle realtà aziendali, pianificazione strategica di scomposizione delle milestones per lo sviluppo del software. Utilizzo di strumenti per la visualizzazione del tempo come diagrammi di Gantt e PERT, e conduzione agile dei compiti tramite metodologia Scrum.",
      tech: ["Agile", "Scrum", "Gantt", "Business Plan", "Project Management"],
      category: "Area Professionale"
    }
  ],
  experiences: [
    {
      id: "exp1",
      role: "Senior Full-Stack & AI Engineer",
      company: "TechNova Consulting",
      period: "2024 - Presente",
      desc: "Guido la transizione all'AI per PMI, integrando assistenti intelligenti nei sistemi CRM aziendali interni e ottimizzando le prestazioni di caricamento delle piattaforme web del 40%."
    },
    {
      id: "exp2",
      role: "Full-Stack Developer",
      company: "CreativeCode Studio",
      period: "2022 - 2024",
      desc: "Sviluppo di portali interattivi, e-commerce complessi e dashboard dati ad alto traffico. Gestione e mentoring di 3 sviluppatori junior."
    },
    {
      id: "exp3",
      role: "Frontend Developer Specialist",
      company: "NexGen Web Agency",
      period: "2021 - 2022",
      desc: "Sviluppo di interfacce pixel-perfect responsive in React ed integrazione di API RESTful di terze parti."
    }
  ]
};
