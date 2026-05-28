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
        content: "Nel corso del Novecento, i regimi totalitari (Fascismo, Nazismo, Stalinismo) hanno elevato la propaganda a vera e propria scienza del consenso. Attraverso il controllo ferreo di radio, giornali e dei primi cinegiornali (come l'Istituto Luce in Italia), lo Stato non si limitava a informare, ma plasmava attivamente la realtà percepita dalle masse. L'obiettivo era l'annullamento del pensiero critico individuale a favore di una fede cieca nel 'Capo' e nell'ideologia di partito.\n\nApprofondimento: La propaganda utilizzava tecniche di semplificazione estrema e ripetizione ossessiva di slogan, un metodo che oggi ritroviamo, seppur con scopi diversi, nel marketing virale e nelle strategie di engagement dei social media.\n\nCuriosità: Il Ministero della Cultura Popolare (MinCulPop) in Italia arrivava a dettare persino le parole da usare e le foto da pubblicare, vietando categoricamente qualsiasi accenno a cronaca nera o fallimenti statali per proiettare un'immagine di perfezione assoluta.",
        image: "https://www2.comune.milano.it/documents/462956031/475100368/kuliscioff_1200x1200.jpg/e31d1c98-b449-7497-410c-576a983cd42a?t=1740476341462"
      },
      {
        id: "s2",
        title: "Censura e libertà di stampa",
        content: "La libertà di stampa, sancita dall'Articolo 21 della nostra Costituzione, è il termometro della salute di una democrazia. Storicamente, la censura è stata lo strumento principale per silenziare il dissenso: dai 'libri proibiti' alle veline del regime fascista. Senza una stampa libera, il cittadino è privato degli strumenti necessari per formarsi un'opinione consapevole e partecipare attivamente alla vita politica.\n\nEvoluzione Digitale: Oggi la censura ha cambiato volto, diventando tecnologica. Parliamo di 'Great Firewall', oscuramento selettivo di siti web, limitazioni algoritmiche (shadow banning) e pressioni economiche sui grandi gruppi editoriali. La sfida moderna non è solo l'assenza di informazioni, ma la sovrabbondanza di notizie non verificate che soffocano la verità.\n\nCuriosità: In molti paesi, ancora oggi, l'accesso a piattaforme come Wikipedia o YouTube viene limitato durante periodi di tensione politica per impedire la circolazione di video e testimonianze in tempo reale.",
        image: "https://www.veglienews.com/wp-content/uploads/2022/07/stampa_1924_0.jpg"
      },
      {
        id: "s3",
        title: "Dai dati cartacei al cloud",
        content: "La transizione dal supporto cartaceo al digitale rappresenta una delle rivoluzioni più profonde della storia umana. Per secoli, la memoria dell'umanità è stata affidata a faldoni, archivi polverosi e biblioteche, soggetti a usura, incendi e difficoltà di consultazione. Con l'avvento dell'informatica, siamo passati alla centralizzazione dei dati in database locali, fino ad arrivare all'era del Cloud Computing, dove l'informazione è liquida, onnipresente e accessibile da qualsiasi punto del globo.\n\nImpatto Sociale: Questa dematerializzazione ha accelerato i processi burocratici e scientifici, ma ha sollevato enormi questioni sulla 'sovranità del dato': dove risiedono fisicamente le nostre foto, le nostre mail e i nostri documenti sanitari? Chi ne detiene realmente le chiavi?\n\nCuriosità: Si stima che ogni giorno l'umanità produca circa 2.5 quintilioni di byte di dati. Per dare un'idea della potenza attuale, un comune smartwatch di oggi ha una memoria e una velocità di calcolo migliaia di volte superiore ai computer della NASA che portarono l'uomo sulla Luna nel 1969.",
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
        content: "La lingua italiana sta vivendo una fase di mutamento accelerato a causa della comunicazione digitale. Online convivono registri estremamente diversi: dall'italiano standard alle commistioni con l'inglese (anglicismi), fino all'uso di emoji e sticker che fungono da veri e propri segnali paralinguistici per trasmettere emozioni che il solo testo scritto non riuscirebbe a veicolare. Saper navigare tra questi registri è una competenza fondamentale della cittadinanza digitale.\n\nNetiquette e Professionismo: Un errore comune è traslare il linguaggio informale delle chat private in contesti formali o lavorativi. La padronanza linguistica consiste proprio nel capire quando è opportuno usare un termine tecnico, quando un'abbreviazione e quando è necessario un tono istituzionale.\n\nCuriosità: L'Accademia della Crusca monitora costantemente i 'neologismi digitali'. Parole come 'triggerare', 'ghostare' o 'boomer' sono entrate nel dibattito linguistico nazionale, dimostrando come la rete sia diventata il principale laboratorio di evoluzione della nostra lingua.",
        image: "https://www.maestraelena.com/wp-content/uploads/2021/10/8e0c8b17-3ddc-42b6-a3c8-cbaa988769b3.jpg"
      },
      {
        id: "i2",
        title: "Analisi di testi giornalistici sulla sicurezza",
        content: "Nell'era dell'informazione veloce, i testi giornalistici che trattano di sicurezza (informatica, stradale o sociale) tendono spesso al sensazionalismo. Il fenomeno del 'Clickbait' spinge i redattori a utilizzare titoli allarmistici per generare visualizzazioni, a scapito della precisione tecnica. Analizzare criticamente un articolo significa saper distinguere tra il fatto nudo e crudo e l'interpretazione soggettiva del giornalista.\n\nVerifica delle Fonti: Un testo attendibile cita dati ufficiali (ISTAT, report di cybersecurity, fonti governative) e non si limita a riportare rumors. La capacità di cross-checking (confronto tra più fonti) è l'unica difesa efficace contro la disinformazione e le fake news che proliferano soprattutto sui temi della sicurezza e della salute.\n\nCuriosità: Esistono software di analisi testuale che utilizzano l'AI per rilevare il 'sentiment' di un articolo e identificare se il linguaggio usato è manipolatorio o se è progettato per indurre paura nel lettore.",
        image: "https://dnewpydm90vfx.cloudfront.net/wp-content/uploads/2018/06/Matrice-analisi-rischi_shutterstock_532416841-489x360.jpg"
      },
      {
        id: "i3",
        title: "Scrittura argomentativa e netiquette",
        content: "Saper argomentare online non significa solo 'aver ragione', ma saper esporre le proprie tesi in modo logico, rispettoso e documentato. La netiquette (il galateo della rete) non è un insieme di regole polverose, ma la base per una convivenza civile nello spazio pubblico digitale. Il rispetto dell'interlocutore, l'evitare il maiuscolo (che equivale a urlare) e la moderazione dei toni sono requisiti essenziali per un dibattito costruttivo.\n\nHate Speech: La scrittura può diventare un'arma. La lotta all'odio online parte dalla consapevolezza che dietro ogni profilo c'è una persona. La responsabilità di ciò che scriviamo è totale, sia dal punto di vista etico che legale, poiché la rete non è una 'zona franca' dove tutto è permesso.\n\nCuriosità: Il termine 'Netiquette' è nato nel 1994, quando la rete era ancora testuale e accessibile a pochi. Oggi è diventato un pilastro dell'educazione civica digitale, insegnato nelle scuole per prevenire fenomeni di cyberbullismo.",
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
        content: "In ambito aziendale e organizzativo, la sicurezza non può più essere considerata un 'optional' o un costo, ma deve essere integrata fin dalla fase di progettazione (Security by Design). Proteggere i dati non significa solo installare un antivirus, ma creare una cultura della sicurezza che coinvolga ogni dipendente. Una singola password debole o un file lasciato incustodito possono compromettere l'intera infrastruttura di una multinazionale.\n\nPolicy Aziendali: Le organizzazioni moderne adottano policy rigorose sull'uso dei dispositivi personali (BYOD), sull'accesso ai server e sulla gestione delle credenziali. La privacy del cliente è un asset fondamentale: perderla significa distruggere la reputazione del brand.\n\nCuriosità: La maggior parte delle violazioni di sicurezza non avviene per attacchi hacker sofisticati, ma per 'ingegneria sociale', ovvero manipolando le persone per farsi consegnare chiavi di accesso o informazioni riservate.",
        image: "https://protezionedatipersonali.it/images/secure-document.jpg"
      },
      {
        id: "g2",
        title: "Gestione del rischio e data breach",
        content: "Il rischio zero non esiste. La gestione del rischio consiste nell'identificare le minacce potenziali, valutarne l'impatto e predisporre misure di mitigazione. Quando queste misure falliscono, si verifica un 'Data Breach': una violazione di sicurezza che comporta la perdita, la modifica o l'accesso non autorizzato a dati personali.\n\nProtocolli di Risposta: In caso di breach, le aziende hanno l'obbligo legale di notificare l'autorità garante e, in certi casi, gli utenti interessati entro 72 ore. Questo processo richiede una preparazione meticolosa, backup aggiornati e un piano di 'Disaster Recovery' per ripristinare i servizi nel minor tempo possibile.\n\nCuriosità: Alcuni dei più grandi data breach della storia hanno coinvolto miliardi di account (come nel caso di Yahoo o Facebook), portando alla vendita di database enormi nel dark web per scopi di phishing e furto d'identità.",
        image: "https://www.coretech.it/_public/img/kb/GDRP_Finanza_9.png"
      },
      {
        id: "g3",
        title: "GDPR e protezione dei dati",
        content: "Il Regolamento Generale sulla Protezione dei Dati (GDPR), entrato in vigore nel 2018, ha rivoluzionato il modo in cui i dati vengono gestiti in Europa e nel mondo. Il principio cardine è che il dato appartiene all'individuo, non all'azienda che lo conserva. Questo introduce diritti fondamentali come il diritto all'accesso, alla rettifica, alla portabilità e il celebre 'diritto all'oblio' (la cancellazione dei dati non più necessari).\n\nResponsabilità: Le aziende devono nominare figure specifiche come il DPO (Data Protection Officer) e tenere un registro dei trattamenti. Le sanzioni per il mancato rispetto possono arrivare fino al 4% del fatturato globale annuo, rendendo la compliance una priorità assoluta per il management.\n\nCuriosità: Grazie al GDPR, oggi possiamo richiedere a colossi come Google o Amazon di inviarci un file contenente TUTTE le informazioni che hanno raccolto su di noi negli anni: spesso si tratta di archivi di diversi gigabyte che rivelano quanto siamo profilati.",
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
        content: "La Triade CIA è il modello fondamentale su cui si basa tutta la sicurezza informatica. Si compone di tre pilastri: Riservatezza (Confidentiality), Integrità (Integrity) e Disponibilità (Availability). \n1. Riservatezza: garantire che i dati siano accessibili solo a chi ne ha diritto.\n2. Integrità: assicurare che i dati non vengano modificati in modo non autorizzato durante il transito o la conservazione.\n3. Disponibilità: garantire che i sistemi e i dati siano pronti all'uso quando necessario.\n\nEquilibrio: La sfida di un sistemista è mantenere l'equilibrio tra questi tre elementi. Ad esempio, una crittografia troppo complessa aumenta la riservatezza ma potrebbe rallentare il sistema, compromettendo la disponibilità.\n\nCuriosità: Il modello è così solido che viene utilizzato non solo per i computer, ma anche per la sicurezza fisica delle banche e dei segreti di stato fin dagli anni '70.",
        image: "https://negg.blog/wp-content/uploads/2024/09/Triade-cia.png"
      },
      {
        id: "sr2",
        title: "Autenticazione, crittografia, firewall",
        content: "Questi sono gli strumenti tecnici 'di trincea' per la difesa delle reti. L'autenticazione verifica l'identità dell'utente (chi sei?), la crittografia protegge il contenuto dei messaggi rendendoli illeggibili agli intrusi, e il firewall funge da dogana, filtrando il traffico in entrata e in uscita in base a regole di sicurezza prestabilite.\n\nDifesa in Profondità: Un sistema sicuro non si affida a un solo strumento, ma a più strati. Se un firewall viene superato, la crittografia deve impedire la lettura dei dati; se una password viene rubata, l'autenticazione a due fattori (MFA) deve bloccare l'accesso.\n\nCuriosità: La crittografia moderna si basa su problemi matematici così complessi che un computer tradizionale impiegherebbe miliardi di anni per decifrare una singola chiave AES-256. La nuova frontiera è la crittografia post-quantistica, progettata per resistere ai futuri supercomputer quantistici.",
        image: "https://learn.microsoft.com/it-it/security-updates/images/Cc700828.SGFG15601(it-it,TechNet.10).gif"
      },
      {
        id: "sr3",
        title: "Phishing, malware e contromisure",
        content: "Il fattore umano è spesso l'anello debole della catena. Il phishing utilizza l'inganno (mail false, siti clone) per spingere l'utente a rivelare dati sensibili. I malware (virus, worm, trojan, ransomware) sono software malevoli progettati per danneggiare, spiare o ricattare l'utente cifrando i suoi file e chiedendo un riscatto.\n\nStrategie di Difesa: La prima difesa è l'educazione: non cliccare su link sospetti e verificare sempre il mittente. Tecnicamente, è indispensabile avere sistemi operativi aggiornati, antivirus attivi e, soprattutto, una strategia di backup offline (non collegato alla rete) per poter ripristinare i dati in caso di attacco ransomware.\n\nCuriosità: Il primo virus informatico della storia, 'Creeper' (1971), non faceva danni: si limitava a visualizzare il messaggio 'I'm the creeper, catch me if you can!' sui terminali collegati ad ARPANET. Oggi, i malware sono un business miliardario gestito da vere e proprie organizzazioni criminali.",
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
          Un'analisi approfondita dei diritti costituzionali, della memoria storica e delle sfide tecnologiche nel mondo contemporaneo. La cittadinanza attiva oggi passa inevitabilmente per la consapevolezza digitale.
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
                      <div className="pt-2">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="w-full max-w-2xl h-auto rounded-xl border border-[#E0D8D0]/10 object-cover shadow-lg"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
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
          Indice degli Approfondimenti
        </h3>
        <div className="space-y-2">
          {currentSubject?.topics.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => {
                if (!expandedTopics[topic.id]) {
                  toggleTopic(topic.id);
                }
                const element = document.getElementById(topic.id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
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
