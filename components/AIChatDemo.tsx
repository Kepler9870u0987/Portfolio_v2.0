import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, MessageSquarePlus, ArrowRight, Database, ShieldCheck, FileText, Globe, Users } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, SectionId } from '../types';

interface AIChatDemoProps {
  onTransferChat?: (summary: string) => void;
  onChatUpdate?: (history: string) => void;
}

// EXPANDED QUESTIONS LIST FOR MASONRY LAYOUT
// Covers: RAG, Automation, Web Dev, Security, Onboarding
const SUGGESTED_QUESTIONS = [
  { 
    text: "Cos'è un sistema RAG e come gestisce i miei PDF?", 
    icon: <Database size={14} />,
    delay: "0ms" 
  },
  { 
    text: "Voglio automatizzare la creazione di preventivi.", 
    icon: <FileText size={14} />,
    delay: "100ms" 
  },
  { 
    text: "Ho bisogno di un nuovo sito web performante.", 
    icon: <Globe size={14} />,
    delay: "200ms" 
  },
  { 
    text: "Le soluzioni AI sono GDPR compliant e sicure?", 
    icon: <ShieldCheck size={14} />,
    delay: "300ms" 
  },
  { 
    text: "Come velocizzo l'onboarding dei nuovi assunti?", 
    icon: <Users size={14} />,
    delay: "400ms" 
  },
  { 
    text: "Integrare l'AI nei miei vecchi database SQL.", 
    icon: <Database size={14} />,
    delay: "500ms" 
  }
];

export const AIChatDemo: React.FC<AIChatDemoProps> = ({ onTransferChat, onChatUpdate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Ciao! Sono l'assistente AI di Manuel. \n\n**Raccontami del tuo business!** \n\nPosso analizzare il tuo settore (es. Ristorazione, Consulenza, E-commerce) e spiegarti concretamente come integrare l'AI per risparmiare tempo e gestire meglio le informazioni.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false); // State for summary generation
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScrollTop = scrollHeight - clientHeight;
      scrollContainerRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Update parent component with chat history whenever messages change
  useEffect(() => {
    if (onChatUpdate) {
      const interactionHistory = messages
        .filter(m => m.id !== 'welcome') // Exclude the static welcome message
        .map(m => {
            const roleLabel = m.role === 'user' ? '👤 UTENTE' : '🤖 AI ASSISTANT';
            return `[${roleLabel}]: ${m.text}`;
        })
        .join('\n\n');
        
      onChatUpdate(interactionHistory);
    }
  }, [messages, onChatUpdate]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuote = async () => {
    if (!hasUserMessages) return;
    
    setIsGeneratingSummary(true);
    
    try {
      // PROMPT PER IL RIASSUNTO
      // Questo è il prompt specifico che genera il testo della mail
      const summaryPrompt = `
        Analizza la nostra conversazione finora.
        Genera un riassunto strutturato per punti elenco (bullet points) delle mie esigenze e dei servizi di Manuel (Web, RAG, Automation) che potrebbero essermi utili.
        Il testo deve essere pronto per essere inviato via mail come richiesta di preventivo.
        Non aggiungere premesse come "Ecco il riassunto", scrivi direttamente i punti.
      `;

      // Use the existing session to maintain context
      const summaryText = await sendMessageToGemini(summaryPrompt);

      const emailBody = `Ciao Manuel,\n\nHo parlato con il tuo assistente AI. Ecco i punti chiave delle mie esigenze:\n\n${summaryText}\n\nVorrei approfondire queste soluzioni.`;
      
      if (onTransferChat) {
        onTransferChat(emailBody);
      }
    } catch (error) {
      console.error("Errore generazione riassunto", error);
      // Fallback in case of error
      const rawHistory = messages.filter(m => m.role === 'user').map(m => `- ${m.text}`).join('\n');
      onTransferChat(`Ciao Manuel,\n\nEcco le mie richieste:\n${rawHistory}`);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <section id={SectionId.DEMO} className="py-8 md:py-24 relative overflow-hidden scroll-mt-16 w-full" aria-labelledby="ai-demo-title">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:gap-16 items-start">
          
          {/* Left Side: Pitch & Masonry Suggestions */}
          <div className="w-full lg:w-1/2 text-white mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-accent-600/20 text-accent-500 px-3 py-1.5 rounded-full mb-4 border border-accent-600/30 backdrop-blur-md">
              <Sparkles size={16} aria-hidden="true" />
              <span className="font-semibold text-xs uppercase tracking-wide">Consulenza Istantanea</span>
            </div>
            <h2 id="ai-demo-title" className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Scopri come l'AI può <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-purple-400">scalare il tuo Business</span>
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl">
              Non sai da dove iniziare? Seleziona un argomento qui sotto o scrivi liberamente nella chat. L'assistente è istruito per analizzare il tuo settore e proporti soluzioni concrete.
            </p>
            
            <div className="relative">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <MessageSquarePlus size={14} />
                Suggerimenti rapidi
              </h3>
              
              {/* MASONRY LAYOUT using CSS columns */}
              <div className="columns-1 sm:columns-2 gap-4 space-y-4 w-full max-w-xl">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <div 
                    key={idx}
                    className="break-inside-avoid"
                  >
                    <button
                      onClick={() => handleSend(q.text)}
                      style={{ animationDelay: q.delay }}
                      className="
                        w-full text-left
                        bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 
                        text-slate-200 p-4 rounded-xl
                        transition-all duration-300
                        border border-slate-700/50 hover:border-accent-500/50
                        hover:shadow-lg hover:shadow-accent-500/10
                        hover:text-white hover:-translate-y-1
                        active:scale-95
                        cursor-pointer
                        animate-fade-in-up
                        flex flex-col gap-2
                        group
                      "
                    >
                      <div className="text-accent-500 group-hover:text-accent-400 transition-colors bg-slate-900/50 p-2 rounded-lg w-fit">
                        {q.icon}
                      </div>
                      <span className="text-sm font-medium leading-snug">
                        {q.text}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Chat Interface */}
          <div className="w-full lg:w-1/2 sticky top-24">
            {/* MOBILE: h-[70vh] to allow keyboard and avoid overflow. DESKTOP: h-[600px] */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[70vh] md:h-[600px] w-full max-w-full transform transition-all hover:shadow-accent-500/10 relative group">
              
              {/* Chat Header */}
              <div className="bg-slate-950/90 p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Bot size={22} className="text-white" aria-hidden="true" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">Manuel's AI Assistant</h3>
                    <p className="text-xs text-slate-400">Powered by Gemini 1.5 Flash</p>
                  </div>
                </div>
                
                {hasUserMessages && (
                  <button
                    onClick={generateQuote}
                    disabled={isGeneratingSummary || isLoading}
                    className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs text-white px-3 py-1.5 rounded-lg transition-colors border border-slate-700 hover:border-accent-500 shadow-md animate-fade-in-up"
                    title="Usa l'AI per riassumere la chat e compilare il modulo contatti"
                  >
                    {isGeneratingSummary ? (
                       <Loader2 size={12} className="animate-spin" />
                    ) : (
                       <Sparkles size={12} />
                    )}
                    {isGeneratingSummary ? 'Elaborazione...' : 'Genera Preventivo'}
                  </button>
                )}
              </div>

              {/* Chat Messages */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 bg-slate-900/30 scroll-smooth"
                aria-live="polite"
                aria-atomic="false"
                role="log"
                tabIndex={0}
                aria-label="Cronologia messaggi chat"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`w-full ${msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                  >
                    {msg.role === 'model' ? (
                      // AI MESSAGE STYLE (ChatGPT-like)
                      <div className="flex gap-4 max-w-[95%] md:max-w-[90%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md mt-1">
                          <Bot size={16} className="text-white" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="text-xs font-semibold text-slate-400 mb-1 ml-1">AI Assistant</div>
                            <div className="text-slate-200 text-sm md:text-base leading-relaxed bg-slate-800/40 p-4 rounded-xl rounded-tl-none border border-slate-700/50 shadow-sm animate-fade-in-up">
                                <ReactMarkdown
                                components={{
                                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                                    ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-3 space-y-2 text-slate-300" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-3 space-y-2 text-slate-300" {...props} />,
                                    li: ({node, ...props}) => (
                                        <li className="pl-1 marker:text-accent-500" {...props} />
                                    ),
                                    strong: ({node, ...props}) => <strong className="font-bold text-accent-300" {...props} />,
                                    code: ({node, ...props}) => <code className="bg-slate-950 px-1.5 py-0.5 rounded text-xs font-mono text-accent-200 border border-slate-700" {...props} />,
                                }}
                                >
                                {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                      </div>
                    ) : (
                      // USER MESSAGE STYLE (Bubble)
                      <div className="max-w-[85%] md:max-w-[75%] flex flex-col items-end">
                         <div className="bg-accent-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-md text-sm md:text-base leading-relaxed">
                            <p>{msg.text}</p>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                   <div className="flex gap-4 max-w-[90%] animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                           <Loader2 size={16} className="animate-spin text-accent-500" />
                        </div>
                        <div className="flex-1 space-y-2 py-2">
                             <div className="h-2 bg-slate-800 rounded w-24"></div>
                             <div className="h-2 bg-slate-800 rounded w-48"></div>
                        </div>
                   </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 shrink-0">
                
                {/* Mobile Quote Button */}
                 {hasUserMessages && (
                  <button
                    onClick={generateQuote}
                    disabled={isGeneratingSummary || isLoading}
                    className="md:hidden w-full mb-3 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-xs text-white px-3 py-2 rounded-lg transition-colors border border-slate-700 animate-fade-in-up"
                  >
                    {isGeneratingSummary ? (
                       <Loader2 size={14} className="animate-spin" />
                    ) : (
                       <Sparkles size={14} className="text-accent-500" />
                    )}
                    ⚡ Genera Preventivo da Chat
                  </button>
                )}

                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="flex gap-3"
                >
                  <label htmlFor="chat-input" className="sr-only">Scrivi un messaggio</label>
                  <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Chiedimi come ottimizzare il tuo lavoro..."
                    className="flex-1 bg-slate-900 border border-slate-700 text-white text-base rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all placeholder:text-slate-500 w-full hover:border-slate-600"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    aria-label="Invia messaggio"
                    className="bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all flex items-center justify-center shrink-0 focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 shadow-lg shadow-accent-600/20"
                  >
                    <Send size={20} aria-hidden="true" />
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};