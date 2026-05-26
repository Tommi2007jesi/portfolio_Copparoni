import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent startup crashes if GEMINI_API_KEY is not set yet
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY env variable is required to power the AI-Twin.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. AI-Twin Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, profile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const currentProfile = profile || {
      name: "Alessandro Rovere",
      role: "Full-Stack Developer",
      tagline: "Progetto e sviluppo applicazioni web ...",
      skills: [],
      projects: [],
      experiences: [],
      rates: "€50 - €70 / ora",
      availability: "Immediata"
    };

    // System instruction injected with the customized portfolio profile
    const systemInstruction = `Sei l'AI-Twin (il gemello digitale) di ${currentProfile.name}. Il tuo ruolo è: ${currentProfile.role}.
Tagline: "${currentProfile.tagline}"
Bio: "${currentProfile.bio || ''}"
Tariffa oraria: ${currentProfile.rates || 'Non specificata'}
Disponibilità: ${currentProfile.availability || 'Disponibile per colloqui'}
Posizione: ${currentProfile.location || 'Milano, Italia'}
Email: ${currentProfile.email || 'contatto@esempio.it'}

Competenze principali:
${JSON.stringify(currentProfile.skills, null, 2)}

Progetti principali realizzati:
${JSON.stringify(currentProfile.projects, null, 2)}

Esperienze lavorative principali:
${JSON.stringify(currentProfile.experiences, null, 2)}

Istruzioni per il comportamento:
1. Rispondi in modo professionale ed entusiasta, parlando in prima persona singolare ("io", "il mio percorso") per rappresentare fedelmente ${currentProfile.name}.
2. Rispondi in italiano (se l'utente scrive in italiano) in modo conciso ma esaustivo. Usa elenchi puntati se utile.
3. Se l'utente ti fa domande fuori tempo o non professionali (es. ricette, compiti di scuola astratti non attinenti al lavoro), rispondi con cortesia guidandoli nuovamente sul tema professionale, sulla disponibilità di ${currentProfile.name} e sui suoi progetti.
4. Sii pronto a discutere tariffe, metodologie di lavoro agile, passioni tecnologiche di ${currentProfile.name} e come puoi aiutare l'azienda o il cliente nel loro prossimo progetto.`;

    const ai = getAiClient();
    
    // Convert previous dialogue list to Gemini chat contents
    const recentMessages = messages.slice(-10); // keep context to last 10 messages for speed & budget
    const contents = recentMessages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Mi scuso, ho riscontrato un'anomalia nel generare una risposta. Chiedimi qualcos'altro!";
    res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Errore durante la chiamata Gemini API:", err);
    res.status(500).json({
      error: "Impossibile comunicare con l'AI-Twin.",
      message: err.message || String(err),
    });
  }
});

// 2. Proposal Generator Endpoint
app.post("/api/proposal", async (req, res) => {
  try {
    const { projectIdea, profile } = req.body;
    if (!projectIdea || typeof projectIdea !== "string" || projectIdea.trim() === "") {
      return res.status(400).json({ error: "La descrizione del progetto è obbligatoria." });
    }

    const currentProfile = profile || {
      name: "Alessandro Rovere",
      role: "Full-Stack Developer",
      skills: [],
      rates: "€50 - €70 / ora"
    };

    const ai = getAiClient();

    const systemInstruction = `Sei un Proposal Analyst Senior automatico.
In base alle competenze e alla tariffa di questo programmatore (${currentProfile.name}, Ruolo: ${currentProfile.role}, Competenze: ${JSON.stringify(currentProfile.skills)}, Tariffe: ${currentProfile.rates}), devi redigere una proposta di progetto professionale in italiano per il cliente basata sull'idea descritta.
Utilizza una struttura pulita in Markdown con le seguenti sezioni:
1. **Titolo Proposta ed Executive Summary** (Sintesi di alto livello)
2. **Architettura Tecnica Consigliata** (Strumenti presi specificamente dalle skill di ${currentProfile.name})
3. **Pianificazione Fasi di Sviluppo** (Elencona dei moduli d'opera proposti: Analisi, Interfaccia, Backend, Test, Supporto, con una stima delle ore per fase)
4. **Stima Economica** (Genera una tabella con fasi, ore stimate, costo basato sulla tariffa oraria di ${currentProfile.name} o su una tariffa media di 60€/ora se non indicata, e totale complessivo in Euro)
5. **Perché scegliere ${currentProfile.name}** (Conclusione convincente)

Usa un tono altamente professionale, autorevole e rassicurante.`;

    const promptText = `Genera una proposta dettagliata per la seguente idea di progetto:
"${projectIdea}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    const proposalMarkdown = response.text || "Spiacente, non sono riuscito a elaborare la proposta. Riprova con altri dettagli o descrizioni più ampie.";
    res.json({ proposal: proposalMarkdown });
  } catch (err: any) {
    console.error("Errore durante la generazione della proposta AI:", err);
    res.status(500).json({
      error: "Impossibile generare la proposta client.",
      message: err.message || String(err),
    });
  }
});

// Serve assets in Production or configure dev-server in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files from /dist in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server portfolio pronto all'indirizzo http://localhost:${PORT}`);
  });
}

startServer();
