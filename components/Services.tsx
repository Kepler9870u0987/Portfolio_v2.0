import React from 'react';
import { BrainCircuit, Globe, FileText, CheckCircle2, ShieldCheck, Server, Lock } from 'lucide-react';
import { SERVICES } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit size={32} aria-hidden="true" />,
  Globe: <Globe size={32} aria-hidden="true" />,
  FileText: <FileText size={32} aria-hidden="true" />,
  ShieldCheck: <ShieldCheck size={32} aria-hidden="true" />,
  Server: <Server size={32} aria-hidden="true" />,
  Lock: <Lock size={32} aria-hidden="true" />,
};

export const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-24 relative scroll-mt-20" aria-labelledby="services-title">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-3xl md:text-5xl font-bold text-white mb-4">Servizi & Tecnologie</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Dallo sviluppo web d'eccellenza alla frontiera dell'AI Privata. 
            Soluzioni scalabili progettate per il business reale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {SERVICES.map((service) => (
            <article 
              key={service.id}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl hover:border-accent-500/50 transition-colors group/card flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-accent-500 group-hover/card:scale-110 transition-transform duration-300 shadow-inner">
                  {iconMap[service.icon] || <Globe size={32} aria-hidden="true" />}
                </div>
                {service.id === 'local-ai' && (
                  <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">
                    GDPR READY
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm group/item relative">
                      <CheckCircle2 size={16} className="text-accent-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="border-b border-dotted border-slate-600 hover:border-accent-500 transition-colors cursor-help" aria-describedby={`tooltip-${service.id}-${idx}`}>
                        {feature.label}
                      </span>
                      
                      {/* Tooltip - Accessible via hover/focus, redundant info for screen readers usually */}
                      <div id={`tooltip-${service.id}-${idx}`} role="tooltip" className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-xs text-white rounded-lg shadow-xl border border-slate-700 w-56 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-10 pointer-events-none text-center">
                        {feature.tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};