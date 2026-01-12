import React from 'react';
import { ArrowRight, Database, Code } from 'lucide-react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  return (
    <div id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden scroll-mt-28">
      
      {/* Background Content acts as overlay here if needed, but keeping it minimal for global bg to show */}
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 py-12 lg:py-0">
        <div className="max-w-4xl lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight opacity-0 animate-fade-in-up">
            Trasforma i tuoi Dati <br />
            in <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-purple-400">Conoscenza Aziendale</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-8 md:mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in-up delay-200">
            Sviluppatore Senior specializzato in <strong>Sistemi RAG</strong> e <strong>AI Automation</strong>.
            Aiuto le aziende a costruire Knowledge Management Systems intelligenti che riducono i tempi di ricerca e automatizzano la creazione di documenti, mantenendo l'eccellenza nello sviluppo Web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-300">
            <a 
              href={`#${SectionId.DEMO}`}
              className="px-8 py-4 bg-accent-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent-600/20 hover:bg-accent-700 hover:shadow-accent-600/40 hover:scale-105 active:scale-95"
            >
              Parla con la mia AI
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={`#${SectionId.SERVICES}`}
              className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-white rounded-lg font-semibold transition-all duration-300 border border-slate-700 hover:bg-slate-700 hover:border-slate-400 flex items-center justify-center gap-2 active:scale-95"
            >
              Esplora i Servizi
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-slate-800/50 opacity-0 animate-fade-in-up delay-500">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Tech Stack & Innovazione</p>
            <div className="flex flex-wrap gap-4 text-slate-400">
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Database size={16} /> Vector Databases</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors"><Code size={16} /> React & TypeScript</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors"><span className="font-bold text-accent-400">Gemini</span> API</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">LangChain</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors">RAG Pipelines</span>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="lg:w-1/3 opacity-0 animate-fade-in-up delay-200">
            <div className="relative w-56 h-56 md:w-80 md:h-80 mx-auto">
                <div className="absolute inset-0 bg-accent-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
                    alt="Manuel Albanese - AI Solutions Architect" 
                    width="600"
                    height="600"
                    loading="lazy"
                    className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 right-4 bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-xs font-medium text-white">Disponibile per progetti</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};