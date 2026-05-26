import { PortfolioData } from "./types";

export const defaultPortfolioData: PortfolioData = {
  name: "Tommaso Copparoni",
  role: "Full-Stack Developer & AI Specialist",
  tagline: "Progetto e sviluppo applicazioni web ultra-performanti con integrazioni di Intelligenza Artificiale avanzata.",
  bio: "Sono un ingegnere del software con oltre 5 anni di esperienza nella creazione di interfacce dinamiche e architetture scalabili. Combino solide basi di programmazione full-stack (React, Node.js, Python, PostgreSQL) con la creazione di funzionalità guidate dall'AI generativa per offrire esperienze utente d'avanguardia.",
  location: "Jesi, Italia",
  email: "st11349@iismarconipieralisi.it",
  github: "https://github.com/example-username",
  linkedin: "https://linkedin.com/in/example-username",
  availability: "Immediata per contratti Freelance & Full-time",
  rates: "€50 - €70 / ora",
  skills: [
    {
      category: "Hard Skills",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Python", "Gemini API", "PostgreSQL", "Git"]
    },
    {
      category: "Soft Skills",
      items: ["Problem Solving", "Team Working", "Comunicazione Efficace", "Adattabilità", "Gestione del Tempo", "Pensiero Critico", "Apprendimento Continuo"]
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
      longDesc: "Sviluppo avanzato ed integrazione di soluzioni basate su agenti decisionali autonomi e pipeline di Retrieval-Augmented Generation (RAG). Sfruttamento dell'SDK Google GenAI server-side e uso di database vettoriali per ottimizzare le risposte contestuali. Tecniche di Prompt Engineering, function calling ed elaborazione strutturata dei dati.",
      tech: ["Gemini API", "Python", "RAG", "Prompt Engineering", "Vector DB", "Node.js"],
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
