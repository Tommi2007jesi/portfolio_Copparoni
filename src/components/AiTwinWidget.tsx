import { useState, useRef, useEffect } from "react";
import { PortfolioData, ChatMessage } from "../types";
import { 
  MessageSquareCode, 
  X, 
  Send, 
  Sparkles, 
  Minus, 
  ShieldCheck, 
  Bot, 
  ArrowRight,
  User,
  Terminal,
  RefreshCw
} from "lucide-react";

interface AiTwinWidgetProps {
  data: PortfolioData;
}

export default function AiTwinWidget({ data }: AiTwinWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with initial greeting representing the digital twin
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "initial-msg",
          sender: "ai",
          text: `Ciao! Sono il Clone AI di **${data.name}** 🤖✨. Sono stato programmato con tutte le conoscenze sul suo percorso professionale, tariffe e progetti.\n\nCome posso esserti utile oggi? Puoi pormi qualsiasi domanda o premere uno dei suggerimenti qui sotto!`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
  }, [data.name, messages.length]);

  // Handle re-teaching clone warning when profile info changes
  useEffect(() => {
    // If name or other crucial changes, add a system message in the chat logs
    if (messages.length > 0) {
      const systemGreetingId = `system-update-${data.name}`;
      const alreadyHasSystem = messages.some(m => m.id === systemGreetingId);
      if (!alreadyHasSystem && messages.length > 1) {
        setMessages(prev => [
          ...prev,
          {
            id: systemGreetingId,
            sender: "ai",
            text: `*ℹ️ Reteach completato! Ora sono il Clone AI di **${data.name}** con ruolo di **${data.role}**. Chiedimi pure sulle mie nuove competenze!*`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }
    }
  }, [data.name, data.role]);

  // Automatic scrolling anchor
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          profile: data
        })
      });

      if (!response.ok) {
        throw new Error("Impossibile comunicare con l'AI.");
      }

      const resData = await response.json();
      
      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: resData.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "Spiacente, ho riscontrato difficoltà nel mettermi in sintonia con il server centrale. Riprova tra un istante o verifica se il server è in esecuzione con la chiave API corretta.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "initial-msg-reset",
        sender: "ai",
        text: `Cronologia ripulita! Sono di nuovo a tua completa disposizione. Chiedimi qualunque cosa sulle competenze o tariffe di **${data.name}**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  const presetSuggestions = [
    "Quali sono le tue tariffe orarie?",
    "Che disponibilità lavorativa hai?",
    "Lavori anche da remoto?",
    "Parlami del progetto più complesso"
  ];

  return (
    <>
      {/* 1. COMPACT CHAT FLOAT BUBBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#E0D8D0] hover:bg-[#c9bfae] text-[#050505] rounded-full p-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
        >
          <div className="relative">
            <MessageSquareCode className="w-6 h-6 shrink-0" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0D8D0] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E0D8D0]"></span>
            </span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs font-semibold text-xs whitespace-nowrap transition-all duration-500 font-sans tracking-wider uppercase text-[10px]">
            Assumi la mia AI!
          </span>
        </button>
      )}

      {/* 2. CHAT PANEL WINDOW */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-[90vw] sm:w-[380px] h-[500px] bg-[#121212] border border-[#E0D8D0]/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-[#050505] text-[#E0D8D0] p-4 flex items-center justify-between border-b border-[#E0D8D0]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E0D8D0] text-[#050505] flex items-center justify-center font-bold text-xs font-display">
                AI
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-xs font-display tracking-wider uppercase text-[#E0D8D0]">
                    {data.name} AI-Clone
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] text-[#E0D8D0]/50 font-sans leading-none">Intervista il mio clone saggio</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChatHistory}
                className="p-1 rounded-md text-[#E0D8D0]/50 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5 transition-colors"
                title="Ripristina chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#E0D8D0]/50 hover:text-[#E0D8D0] hover:bg-[#E0D8D0]/5 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Secure badge */}
          <div className="bg-[#050505] px-3.5 py-1.5 border-b border-[#E0D8D0]/10 flex items-center justify-between text-[9px] text-[#E0D8D0]/70 font-mono tracking-wide">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E0D8D0]" />
              POWERED BY SERVER-SIDE GEMINI 3.5-FLASH
            </span>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050505]/30"
          >
            {messages.map((m) => {
              const isAi = m.sender === "ai";
              return (
                <div key={m.id} className={`flex gap-2 ${isAi ? "justify-start" : "justify-end"}`}>
                  
                  {isAi && (
                    <div className="w-6 h-6 rounded-full bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 text-[#E0D8D0] flex items-center justify-center text-[10px] shrink-0 font-bold self-end">
                      AI
                    </div>
                  )}

                  <div className="flex flex-col max-w-[80%]">
                    <div 
                      className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap font-light ${
                        isAi 
                          ? "bg-[#1a110b]/80 border border-[#E0D8D0]/10 text-[#E0D8D0] rounded-bl-sm" 
                          : "bg-[#E0D8D0] text-[#050505] font-normal rounded-br-sm"
                      }`}
                    >
                      {/* Simple parse for markdown bold items inside the text */}
                      {m.text.includes("**") ? (
                        m.text.split("**").map((part, index) => 
                          index % 2 === 1 ? <strong key={index} className="font-semibold text-white">{part}</strong> : part
                        )
                      ) : (
                        m.text
                      )}
                    </div>
                    <span className="text-[9px] text-[#E0D8D0]/40 mt-0.5 px-1 self-start font-mono">
                      {m.timestamp}
                    </span>
                  </div>

                </div>
              );
            })}

            {/* AI Typing loading indicator */}
            {isTyping && (
              <div className="flex gap-2 justify-start items-center animate-pulse">
                <div className="w-6 h-6 rounded-full bg-[#E0D8D0]/5 border border-[#E0D8D0]/10 text-[#E0D8D0] flex items-center justify-center text-[10px] shrink-0 font-bold">
                  AI
                </div>
                <div className="bg-[#1a110b]/80 border border-[#E0D8D0]/10 px-3.5 py-2 rounded-2xl text-xs text-[#E0D8D0]/50 flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0D8D0] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0D8D0] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0D8D0] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Suggestion chips */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-[#121212] border-t border-[#E0D8D0]/10">
              <span className="text-[9px] font-semibold text-[#E0D8D0]/40 uppercase tracking-[0.15em] block mb-1.5">Suggerimenti rapidi</span>
              <div className="flex flex-wrap gap-1">
                {presetSuggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s)}
                    className="text-[10px] font-light text-[#E0D8D0]/90 hover:text-white bg-[#050505] border border-[#E0D8D0]/10 hover:border-[#E0D8D0]/30 hover:bg-[#E0D8D0]/5 px-2.5 py-1 rounded-md transition-colors text-left font-sans cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form Input Container */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 border-t border-[#E0D8D0]/10 bg-[#121212] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Fai una domanda professionale..."
              disabled={isTyping}
              className="flex-1 bg-[#050505] text-[#E0D8D0] text-xs px-3.5 py-2 border border-[#E0D8D0]/10 focus:outline-hidden focus:ring-1 focus:ring-[#E0D8D0]/30 rounded-xl leading-relaxed font-light placeholder-[#E0D8D0]/40"
            />
            <button
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="p-2 bg-[#E0D8D0] hover:bg-[#c9bfae] disabled:bg-[#050505] text-[#050505] disabled:text-[#E0D8D0]/20 rounded-xl transition-all shadow-xs cursor-pointer focus:outline-hidden shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
