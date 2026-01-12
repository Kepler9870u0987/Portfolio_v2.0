import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, SectionId } from '../types';

const SUGGESTED_QUESTIONS = [
  "Ho un'agenzia immobiliare, come può aiutarmi l'AI?",
  "Gestisco uno studio legale, RAG può servirmi?",
  "Vorrei automatizzare la creazione di report.",
  "Parlami delle esperienze passate di Manuel."
];

export const AIChatDemo: React.FC = () => {
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

  return (
    <div id={SectionId.DEMO} className="py-8 md:py-24 relative overflow-hidden scroll-mt-16 w-full">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
          
          {/* Left Side: Pitch */}
          <div className="w-full lg:w-1/2 text-white mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-accent-600/20 text-accent-500 px-3 py-1.5 rounded-full mb-4 border border-accent-600/30 backdrop-blur-md">
              <Sparkles size={16} />
              <span className="font-semibold text-xs uppercase tracking-wide">Consulenza Istantanea</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 leading-tight">
              Scopri come l'AI può <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-purple-400">scalare il tuo Business</span>
            </h2>
            <p className="text-slate-300 text-sm md:text-lg mb-6 leading-relaxed">
              Non sai da dove iniziare? Descrivi la tua attività nella chat. L'assistente è istruito per analizzare il tuo settore e proporti soluzioni RAG o automazioni su misura.
            </p>
            
            {/* Suggested questions: Column on mobile */}
            <div className="block">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Prova a chiedere</h3>
              <div className="flex flex-col gap-2 lg:flex-row lg:flex-wrap">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-left w-full lg:w-auto text-xs md:text-sm bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700/80 active:bg-slate-600/80 text-slate-300 py-3 px-4 rounded-lg transition-all border border-slate-700"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Chat Interface */}
          <div className="w-full lg:w-1/2">
            {/* Mobile: Fixed height safe for small screens. Desktop: Taller. */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[450px] lg:h-[600px] w-full max-w-full">
              
              {/* Chat Header */}
              <div className="bg-slate-950/80 p-3 border-b border-slate-700 flex items-center gap-3 shrink-0">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-accent-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm md:text-base">Manuel's AI Assistant</h3>
                  <p className="text-[10px] md:text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online • Gemini Flash
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-slate-850/50 scroll-smooth"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent-600 text-white rounded-tr-none'
                          : 'bg-slate-700/90 text-slate-200 rounded-tl-none border border-slate-600 animate-fade-in-up duration-500'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p>{msg.text}</p>
                      ) : (
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-accent-300" {...props} />,
                            code: ({node, ...props}) => <code className="bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono text-accent-200" {...props} />,
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
                    <div className="bg-slate-700/90 rounded-2xl rounded-tl-none p-3 border border-slate-600 flex items-center gap-2 text-slate-400 text-xs md:text-sm animate-fade-in-up">
                      <Loader2 className="animate-spin" size={14} />
                      <span>Sto pensando...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-slate-950/80 border-t border-slate-700 shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 bg-slate-900/50 border border-slate-700 text-white text-base rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-all placeholder:text-slate-500 w-full"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};