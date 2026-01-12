import React from 'react';
import { Search, Database, Bot, Zap, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

export const AIWorkflow: React.FC = () => {
  const steps = [
    {
      icon: <Search size={24} aria-hidden="true" />,
      title: "1. Analisi & Discovery",
      desc: "Analizziamo i flussi di lavoro manuali e i dati non strutturati (PDF, Email, Note) della tua azienda."
    },
    {
      icon: <Database size={24} aria-hidden="true" />,
      title: "2. Ingestione Dati",
      desc: "I documenti vengono puliti, frammentati e trasformati in vettori numerici all'interno di un Knowledge Base sicuro."
    },
    {
      icon: <Bot size={24} aria-hidden="true" />,
      title: "3. Integrazione AI",
      desc: "Colleghiamo l'LLM (es. Gemini/GPT) ai tuoi dati. L'AI ora 'legge' la tua documentazione prima di rispondere."
    },
    {
      icon: <Zap size={24} aria-hidden="true" />,
      title: "4. Deployment & UI",
      desc: "Creiamo l'interfaccia (Chatbot, Dashboard) per permettere al team di usare la nuova intelligenza."
    }
  ];

  return (
    <section id={SectionId.WORKFLOW} className="py-24 relative scroll-mt-20" aria-labelledby="workflow-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent-500 font-semibold tracking-wider text-sm uppercase">Il Metodo</span>
          <h2 id="workflow-title" className="text-3xl md:text-4xl font-bold text-white mt-2">Come portiamo l'AI nel tuo business</h2>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
            Non è magia, è ingegneria. Ecco come trasformiamo i tuoi documenti statici in risorse attive.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" aria-hidden="true"></div>

          {/* Steps Grid - Increased gap for mobile to accommodate arrows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <article key={idx} className="group relative flex flex-col">
                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur p-8 rounded-2xl border border-slate-800 hover:border-accent-500/50 transition-all hover:-translate-y-2 duration-300 h-full flex flex-col items-center text-center shadow-lg relative z-10">
                  <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center text-accent-500 mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
                {/* Mobile Connector Arrow (Absolute Positioned in the Gap) */}
                {idx < steps.length - 1 && (
                  <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-20 md:hidden" aria-hidden="true">
                    <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center shadow-lg text-accent-500 animate-bounce delay-700">
                       <ArrowRight size={16} className="rotate-90" />
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
            <div className="inline-block bg-slate-900/50 backdrop-blur p-6 rounded-xl border border-dashed border-slate-700">
                <p className="text-slate-300 text-sm">
                    <span className="text-white font-bold">Risultato:</span> Il tempo di ricerca delle informazioni scende del <span className="text-green-400 font-bold">70%</span>. 
                    Il passaggio di consegne diventa automatico.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};