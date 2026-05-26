import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

interface CivicaTopic {
  id: string;
  title: string;
  content: string;
  image?: string;
}

interface CivicaSubject {
  id: string;
  name: string;
  icon: string;
  topics: CivicaTopic[];
}

const CIVICA_DATA: CivicaSubject[] = [
  {
    id: "storia",
    name: "Storia",
    icon: "📚",
    topics: [
      {
        id: "s1",
        title: "Propaganda e controllo dell'informazione nel Novecento",
        content: "Nel Novecento i regimi totalitari usarono la propaganda come strumento per orientare l'opinione pubblica. Radio, giornali e cinegiornali erano controllati dallo Stato. L'obiettivo era creare consenso e impedire visioni alternative.\n\nCuriosità: molti slogan politici dell'epoca erano studiati da psicologi e grafici per essere ricordati facilmente, proprio come oggi fanno i brand sui social.",
        image: "https://www2.comune.milano.it/documents/462956031/475100368/kuliscioff_1200x1200.jpg/e31d1c98-b449-7497-410c-576a983cd42a?t=1740476341462"
      },
      {
        id: "s2",
        title: "Censura e libertà di stampa",
        content: "La censura impediva la pubblicazione di contenuti scomodi per il regime. La libertà di stampa, invece, è un pilastro delle democrazie moderne: senza informazione libera non esiste opinione pubblica consapevole.\n\nOggi la censura può assumere forme digitali: oscuramento di siti, limitazioni sui social, pressioni economiche sui media.",
        image: "https://www.veglienews.com/wp-content/uploads/2022/07/stampa_1924_0.jpg"
      },
      {
        id: "s3",
        title: "Dai dati cartacei al cloud",
        content: "Per secoli le informazioni sono state conservate su carta. Con l'avvento dell'informatica si è passati ai database digitali, fino al cloud, dove i dati sono distribuiti globalmente.\n\nCuriosità: uno smartphone moderno ha più potenza di calcolo dei computer usati per le missioni Apollo.",
        image: "https://www.softstore.it/wp-content/uploads/2015/02/Faldoni-su-PC1.jpg"
      }
    ]
  },
  {
    id: "italiano",
    name: "Italiano",
    icon: "💬",
    topics: [
      {
        id: "i1",
        title: "Lessico e registri della comunicazione in rete",
        content: "Online convivono italiano, inglese, emoji, abbreviazioni e meme. Saper scegliere il registro giusto è fondamentale: un messaggio informale non va bene in un contesto professionale.\n\nCuriosità: molte parole nate online entrano nei dizionari ufficiali.",
        image: "https://www.maestraelena.com/wp-content/uploads/2021/10/8e0c8b17-3ddc-42b6-a3c8-cbaa988769b3.jpg"
      },
      {
        id: "i2",
        title: "Analisi di testi giornalistici sulla sicurezza",
        content: "I testi giornalistici sulla sicurezza spesso usano titoli allarmistici per attirare l'attenzione. Analizzarli significa verificare fonti, dati e distinzione tra fatti e opinioni.",
        image: "https://dnewpydm90vfx.cloudfront.net/wp-content/uploads/2018/06/Matrice-analisi-rischi_shutterstock_532416841-489x360.jpg"
      },
      {
        id: "i3",
        title: "Scrittura argomentativa e netiquette",
        content: "La scrittura argomentativa online richiede chiarezza e rispetto. La netiquette stabilisce regole per evitare hate speech e conflitti.",
        image: "https://www.massimocappanera.it/wp-content/uploads/2017/08/netiquette-cappanera.jpg"
      }
    ]
  },
  {
    id: "gpoi",
    name: "GPOI",
    icon: "⚙️",
    topics: [
      {
        id: "g1",
        title: "Sicurezza e privacy come requisiti organizzativi",
        content: "Ogni organizzazione deve proteggere dati, sistemi e persone. La sicurezza non è solo tecnologia: è formazione, policy e responsabilità condivisa.",
        image: "https://protezionedatipersonali.it/images/secure-document.jpg"
      },
      {
        id: "g2",
        title: "Gestione del rischio e data breach",
        content: "Un data breach può causare danni economici, legali e reputazionali. La gestione del rischio serve a prevenire incidenti e ridurre impatti.",
        image: "https://www.coretech.it/_public/img/kb/GDRP_Finanza_9.png"
      },
      {
        id: "g3",
        title: "GDPR e protezione dei dati",
        content: "Il GDPR stabilisce come devono essere trattati i dati personali. Introduce diritti come accesso, rettifica e in alcuni casi oblio.",
        image: "https://www.bluefoxstudio.it/media/k2/items/cache/1698b847c2e4fe98c05adcdc9d420590_XL.jpg"
      }
    ]
  },
  {
    id: "sistemi",
    name: "Sistemi e Reti",
    icon: "🔒",
    topics: [
      {
        id: "sr1",
        title: "Triade CIA",
        content: "La triade CIA: Confidentiality, Integrity, Availability. Ogni sistema sicuro deve garantire questi tre principi.",
        image: "https://negg.blog/wp-content/uploads/2024/09/Triade-cia.png"
      },
      {
        id: "sr2",
        title: "Autenticazione, crittografia, firewall",
        content: "Autenticazione = verificare identità.\nCrittografia = proteggere dati.\nFirewall = filtrare traffico.\nProxy = intermediari sicuri.",
        image: "https://learn.microsoft.com/it-it/security-updates/images/Cc700828.SGFG15601(it-it,TechNet.10).gif"
      },
      {
        id: "sr3",
        title: "Phishing, malware e contromisure",
        content: "Il phishing inganna l'utente per rubare dati.\nI malware possono cifrare, rubare o distruggere file.\nLe contromisure includono MFA, antivirus, backup e attenzione ai link.",
        image: "https://cdn-caklk.nitrocdn.com/sJCpruYkVvovUsWvtAEzkQwTuXjDDQLL/assets/images/optimized/rev-49004e6/powerdmarc.com/wp-content/uploads/2022/07/Ransomware-Vs-Malware-Vs-Phishing.jpg"
      }
    ]
  }
];

export default function CivicaSection() {
  const [activeSubject, setActiveSubject] = useState<string>("storia");
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const currentSubject = CIVICA_DATA.find(s => s.id === activeSubject);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Educational Banner */}
      <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a1410]/50 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-2 text-[#E0D8D0]">
          <ShieldCheck className="w-4 h-4 text-[#E0D8D0] animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] font-sans opacity-70">Educazione Civica & Agenda 2030</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-light italic text-[#E0D8D0] tracking-tight leading-tight font-serif">
          Libertà di Espressione e Sicurezza Digitale
        </h2>
        <p className="text-[#BDB5AD] leading-relaxed text-xs md:text-sm font-light">
          Sviluppo morale, costituzionale dell'individuo e sensibilizzazione ambientale. La tecnologia deve affiancare una rigorosa condotta etica tesa alla sostenibilità e al rispetto comunitario.
        </p>
      </div>

      {/* Subject Navigation Tabs */}
      <div className="flex border-b border-[#E0D8D0]/10 pb-[10px] gap-2 overflow-x-auto no-scrollbar">
        {CIVICA_DATA.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setActiveSubject(subject.id);
              setExpandedTopics({});
            }}
            className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer group whitespace-nowrap ${
              activeSubject === subject.id
                ? "bg-[#E0D8D0] text-[#050505] shadow-xs"
                : "text-[#E0D8D0]/60 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5"
            }`}
          >
            <span className="text-base">{subject.icon}</span>
            {subject.name}
          </button>
        ))}
      </div>

      {/* Topics Accordion */}
      {currentSubject && (
        <div className="space-y-3">
          {currentSubject.topics.map((topic) => {
            const isExpanded = expandedTopics[topic.id];
            return (
              <div
                key={topic.id}
                className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl overflow-hidden hover:border-[#E0D8D0]/25 transition-all duration-300"
              >
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a1410]/30 transition-colors"
                >
                  <h3 className="text-sm font-medium text-[#E0D8D0] tracking-tight">
                    {topic.title}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[#E0D8D0]/50 transition-transform duration-300 shrink-0 ml-4 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E0D8D0]/5 space-y-4 animate-slide-in">
                    <p className="text-xs md:text-sm text-[#BDB5AD] leading-relaxed font-light whitespace-pre-wrap">
                      {topic.content}
                    </p>
                    {topic.image && (
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="w-full max-w-sm h-auto rounded-xl border border-[#E0D8D0]/10 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Index Sidebar Info */}
      <div className="bg-[#121212] border border-[#E0D8D0]/10 rounded-2xl p-6 space-y-3">
        <h3 className="text-xs font-semibold tracking-[0.2em] text-[#E0D8D0]/70 uppercase font-sans">
          Indice Argomenti
        </h3>
        <div className="space-y-2">
          {currentSubject?.topics.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => {
                toggleTopic(topic.id);
                setExpandedTopics(prev => ({
                  ...prev,
                  [topic.id]: !prev[topic.id]
                }));
              }}
              className="block text-left text-xs text-[#BDB5AD] hover:text-[#E0D8D0] transition-colors hover:pl-1 font-light"
            >
              {idx + 1}. {topic.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
