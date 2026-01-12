import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Database, ShieldCheck, FileText, Globe, Users, Code, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, SectionId } from '../types';

interface AIChatDemoProps {
  onTransferChat?: (summary: string) => void;
  onChatUpdate?: (history: string) => void;
}

const cleanMarkdownResponse = (text: string) => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') 
    .replace(/\*(.*?)\*/g, '$1')     
    .replace(/#{1,6}\s*(.*)/g, (match, p1) => `\n${p1.toUpperCase()}\n`) 
    .replace(/`{3}([\s\S]*?)`{3}/g, '$1') 
    .replace(/`(.+?)`/g, '$1') 
    .replace(/^\s*-\s/gm, '• ') 
    .trim();
};

const SUGGESTED_QUESTIONS = [
  { 
    text: "Cos'è un sistema RAG e come gestisce i miei PDF?", 
    icon: <Database size={16} className="text-purple-400" />,
    delay: "0ms" 
  },
  { 
    text: "Voglio automatizzare la creazione di preventivi.", 
    icon: <FileText size={16} className="text-blue-400" />,
    delay: "100ms" 
  },
  { 
    text: "Ho bisogno di un nuovo sito web performante.", 
    icon: <Globe size={16} className="text-green-400" />,
    delay: "200ms" 
  },
  { 
    text: "Le soluzioni AI sono GDPR compliant e sicure?", 
    icon: <ShieldCheck size={16} className="text-yellow-400" />,
    delay: "300ms" 
  },
  { 
    text: "Come velocizzo l'onboarding dei nuovi assunti?", 
    icon: <Users size={16} className="text-pink-400" />,
    delay: "400ms" 
  },
  { 
    text: "Integrare l'AI nei miei vecchi database SQL.", 
    icon: <Code size={16} className="text-orange-400" />,
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
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
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

  useEffect(() => {
    if (onChatUpdate) {
      const interactionHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => `[${m.role === 'user' ? 'UTENTE' : 'AI'}]: ${m.text}`)
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
      const summaryPrompt = `
        Analizza la nostra conversazione finora.
        Genera un riassunto strutturato per punti elenco delle mie esigenze e dei servizi di Manuel.
        Sii sintetico e professionale.
      `;

      let summaryText = await sendMessageToGemini(summaryPrompt);
      const cleanText = cleanMarkdownResponse(summaryText);

      const emailBody = `Ciao Manuel,\n\nHo parlato con il tuo assistente AI. Ecco i punti chiave delle mie esigenze:\n\n${cleanText}\n\nVorrei approfondire queste soluzioni.`;
      
      if (onTransferChat) {
        onTransferChat(emailBody);
      }
    } catch (error) {
      console.error("Errore generazione riassunto", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <section id={SectionId.DEMO} className="py-8 md:py-24 relative w-full" aria-labelledby="ai-demo-title">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
          
          {/* Left Side: Context & Suggestions */}
          <div className="w-full lg:w-5/12 text-white mb-8 lg:mb-0 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full mb-6 border border-indigo-500/20 backdrop-blur-md">
              <Sparkles size={14} className="animate-pulse" />
              <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider">AI Powered Assistant</span>
            </div>
            
            <h2 id="ai-demo-title" className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Parla con il mio <br/>
              {/* FIXED: Using standard Tailwind colors for gradient to ensure visibility */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-extrabold">Digital Brain</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Non è un semplice chatbot. È un sistema istruito sulla mia esperienza per analizzare il tuo business e proporti subito soluzioni RAG o Web su misura.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 p-3 rounded-xl transition-all duration-200 group flex items-start gap-3"
                >
                  <div className="mt-0.5 p-1.5 bg-slate-950 rounded-lg group-hover:scale-110 transition-transform border border-slate-800">
                    {q.icon}
                  </div>
                  <span className="text-xs md:text-sm text-slate-200 group-hover:text-white font-medium leading-snug">
                    {q.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Chat Interface - FIXED FOR MOBILE VISIBILITY */}
          <div className="w-full lg:w-7/12 mt-4 lg:mt-0">
            {/* FIXED: Solid background colors, high contrast border, no transparency, robust flex layout */}
            <div className="bg-slate-900 rounded-2xl border border-slate-600 shadow-2xl flex flex-col h-[600px] md:h-[700px] relative overflow-hidden z-20">
              
              {/* Header - Darker BG for contrast */}
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Manuel.AI</h3>
                    <div className="flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-[10px] text-slate-400 font-mono font-bold">Gemini 1.5 Flash • Online</span>
                    </div>
                  </div>
                </div>
                
                {hasUserMessages && (
                   <button
                     onClick={generateQuote}
                     disabled={isGeneratingSummary || isLoading}
                     className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-slate-700 px-3 py-1.5 rounded-lg transition-all"
                   >
                     {isGeneratingSummary ? <Loader2 size={14} className="animate-spin" /> : <ArrowUpRight size={14} />}
                     <span className="hidden sm:inline">Genera Preventivo</span>
                   </button>
                )}
              </div>

              {/* Messages Area - Lighter BG (Slate-900) */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent bg-slate-900"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`w-full flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'model' ? (
                      <div className="flex gap-4 max-w-full md:max-w-[95%] group">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
                          <Bot size={16} className="text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-slate-200 text-sm md:text-[15px] leading-7 markdown-content font-medium">
                                <ReactMarkdown
                                components={{
                                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                                    ul: ({node, ...props}) => <ul className="mb-3 space-y-1 ml-1" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-3 space-y-1 text-slate-200" {...props} />,
                                    li: ({node, ...props}) => (
                                        <li className="flex items-start gap-2 text-slate-300" {...props}>
                                            <span className="text-indigo-500 mt-1.5 text-[6px]">●</span>
                                            <span className="flex-1">{props.children}</span>
                                        </li>
                                    ),
                                    strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-base font-bold text-white mt-4 mb-2 flex items-center gap-2" {...props} />,
                                    code: ({node, ...props}) => <code className="bg-slate-950 px-1.5 py-0.5 rounded text-xs font-mono text-indigo-300 border border-slate-700" {...props} />,
                                }}
                                >
                                {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-3 max-w-[85%]">
                         <div className="bg-slate-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm text-sm md:text-[15px] leading-relaxed border border-slate-700 font-medium">
                            {msg.text}
                         </div>
                         <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1 overflow-hidden border border-slate-600">
                             <User size={16} className="text-slate-300" />
                         </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                   <div className="flex gap-4 max-w-full animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/10 border border-indigo-500/10 flex items-center justify-center shrink-0 mt-1">
                           <Bot size={16} className="text-indigo-500/50" />
                        </div>
                        <div className="flex items-center gap-1 mt-3">
                             <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></span>
                             <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-100"></span>
                             <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-200"></span>
                        </div>
                   </div>
                )}
                
                <div className="h-2"></div>
              </div>

              {/* Input Area - Darker BG (Slate-950) */}
              <div className="p-3 md:p-4 bg-slate-950 border-t border-slate-800 shrink-0 z-20">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="relative flex items-end gap-2 bg-slate-900 border border-slate-700 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all shadow-inner"
                >
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(input);
                      }
                    }}
                    placeholder="Chiedimi come ottimizzare il tuo lavoro..."
                    rows={1}
                    className="flex-1 bg-transparent text-white text-base px-3 py-2 focus:outline-none resize-none max-h-32 placeholder:text-slate-500 scrollbar-hide font-medium"
                    style={{ minHeight: '44px' }}
                    aria-label="Messaggio chat"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-800 text-white rounded-lg transition-all flex items-center justify-center shrink-0 mb-0.5 shadow-lg"
                    aria-label="Invia"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <div className="text-center mt-2">
                     <p className="text-[10px] text-slate-500 font-medium">L'AI può commettere errori. Verifica le informazioni importanti.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};