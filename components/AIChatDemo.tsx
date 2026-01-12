import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, MessageSquarePlus, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, SectionId } from '../types';

interface AIChatDemoProps {
  onTransferChat?: (summary: string) => void;
}

// Updated offsets and delays for a more organic, scattered floating effect
const SUGGESTED_QUESTIONS = [
  { text: "Ho un'agenzia immobiliare, come può aiutarmi l'AI?", delay: "0s", duration: "5s", offset: "self-start ml-0 md:ml-0" },
  { text: "Gestisco uno studio legale, RAG può servirmi?", delay: "1.5s", duration: "6.5s", offset: "self-end mr-4 md:mr-12" },
  { text: "Vorrei automatizzare la creazione di report.", delay: "0.5s", duration: "5.5s", offset: "self-center ml-8 md:ml-12" },
  { text: "Parlami delle esperienze passate di Manuel.", delay: "2.5s", duration: "7s", offset: "self-start ml-4 md:ml-24" }
];

export const AIChatDemo: React.FC<AIChatDemoProps> = ({ onTransferChat }) => {
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

  const generateQuote = () => {
    const userMessages = messages.filter(m => m.role === 'user').map(m => `- ${m.text}`).join('\n');
    if (!userMessages) return;

    const summary = `Ciao Manuel,\n\nHo chattato con il tuo assistente AI e ho bisogno di supporto per queste esigenze:\n\n${userMessages}\n\nPossiamo approfondire con un preventivo?`;
    
    if (onTransferChat) {
      onTransferChat(summary);
    }
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <section id={SectionId.DEMO} className="py-8 md:py-24 relative overflow-hidden scroll-mt-16 w-full" aria-labelledby="ai-demo-title">
      
      {/* CSS Animazione Fluttuante Custom */}
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-custom {
          animation-name: float-y;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:gap-16 items-center">
          
          {/* Left Side: Pitch & Floating Suggestions */}
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
              Non sai da dove iniziare? Descrivi la tua attività nella chat. L'assistente è istruito per analizzare il tuo settore e proporti soluzioni RAG o automazioni su misura.
            </p>
            
            {/* Irregular Floating Suggestions */}
            <div className="relative pl-2">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <MessageSquarePlus size={14} />
                Spunti di conversazione
              </h3>
              
              {/* Flex container allows using self-start/end for scattering */}
              <div className="flex flex-col gap-5 w-full max-w-lg">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <div 
                    key={idx}
                    className={`transform transition-all ${q.offset}`}
                  >
                    <button
                      onClick={() => handleSend(q.text)}
                      style={{ 
                        animationDelay: q.delay,
                        animationDuration: q.duration
                      }}
                      className="
                        animate-float-custom
                        text-left text-sm 
                        bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 
                        text-slate-200 py-3 px-5 rounded-2xl rounded-tl-sm
                        transition-all duration-300
                        border border-slate-700/50 hover:border-accent-500/50
                        hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]
                        hover:text-white
                        active:scale-95
                        cursor-pointer
                        hover:z-10 relative
                      "
                    >
                      "{q.text}"
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Chat Interface */}
          <div className="w-full lg:w-1/2">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[500px] md:h-[600px] w-full max-w-full transform transition-all hover:shadow-accent-500/10 relative group">
              
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
                    className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-accent-600 text-xs text-white px-3 py-1.5 rounded-lg transition-colors border border-slate-700 hover:border-accent-500 shadow-md animate-fade-in-up"
                    title="Usa la conversazione per compilare il modulo contatti"
                  >
                    <Sparkles size={12} />
                    Genera Preventivo
                  </button>
                )}
              </div>

              {/* Chat Messages */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-900/30 scroll-smooth"
                aria-live="polite"
                aria-atomic="false"
                role="log"
                tabIndex={0}
                aria-label="Cronologia messaggi chat"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm md:text-base leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-accent-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 animate-fade-in-up'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p>{msg.text}</p>
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-3 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-3 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-accent-300" {...props} />,
                            code: ({node, ...props}) => <code className="bg-slate-950 px-1.5 py-0.5 rounded text-xs font-mono text-accent-200" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 border border-slate-700 flex items-center gap-3 text-slate-300 text-sm animate-pulse">
                      <Loader2 className="animate-spin text-accent-500" size={16} aria-hidden="true" />
                      <span>Sto analizzando la richiesta...</span>
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
                    className="md:hidden w-full mb-3 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs text-white px-3 py-2 rounded-lg transition-colors border border-slate-700 animate-fade-in-up"
                  >
                    <Sparkles size={14} className="text-accent-500" />
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