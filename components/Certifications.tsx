import React from 'react';
import { Award, ExternalLink, ShieldCheck, BrainCircuit, Globe, Server, Lock } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';
import { SectionId } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  BrainCircuit: <BrainCircuit size={24} />,
  Globe: <Globe size={24} />,
  Server: <Server size={24} />,
  Lock: <Lock size={24} />,
  ShieldCheck: <ShieldCheck size={24} />
};

export const Certifications: React.FC = () => {
  return (
    <section id={SectionId.CERTIFICATIONS} className="py-20 bg-slate-950/30 backdrop-blur-sm border-t border-slate-800/50 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Award className="text-accent-500" size={32} />
              Certificazioni & Competenze
            </h2>
            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Formazione continua per garantire standard tecnici elevati.
            </p>
          </div>
          
          <div className="hidden md:block h-px flex-1 bg-slate-800 mx-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/80 backdrop-blur p-6 rounded-xl border border-slate-800 hover:border-accent-500/30 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-900/50 rounded-lg text-slate-300 group-hover:text-accent-400 transition-colors border border-slate-800">
                  {iconMap[cert.icon] || <Award size={24} />}
                </div>
                <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded">
                  {cert.date}
                </span>
              </div>
              
              <h3 className="font-semibold text-white mb-1 group-hover:text-accent-100 transition-colors line-clamp-2">
                {cert.name}
              </h3>
              <p className="text-sm text-slate-500 mb-4">{cert.issuer}</p>
              
              {cert.url && (
                <a 
                  href={cert.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent-500 hover:text-accent-400 font-medium mt-auto"
                >
                  Verifica Credenziale <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};