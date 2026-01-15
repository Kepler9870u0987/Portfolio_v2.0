import React from 'react';
import { ArrowRight, Database, Code, FileText, Linkedin, ChevronsDown, Calendar } from 'lucide-react';
import { SectionId } from '../types';

export const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden scroll-mt-28" aria-label="Introduzione">
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 pt-12 pb-32 lg:py-0 mb-0 lg:mb-0">
        <div className="max-w-4xl lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight opacity-0 animate-fade-in-up">
            Siti Web & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-purple-400">Knowledge Management</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 md:mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in-up delay-200 font-medium">
            Aiuto le aziende a <strong>costruire siti web</strong> performanti e a gestire la conoscenza aziendale con l'AI. 
            Implemento sistemi <strong>RAG</strong> per ottimizzare il <em>passaggio di consegne</em>, velocizzare il recupero delle informazioni e generare documenti da template intelligenti.
          </p>
          
          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 opacity-0 animate-fade-in-up delay-300">
            <a 
              href={`#${SectionId.DEMO}`}
              className="px-8 py-4 bg-accent-600 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent-600/20 hover:bg-accent-700 hover:shadow-accent-600/40 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 focus:outline-none"
            >
              Parla con la mia AI
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>

            {/* Booking Button */}
            <a 
              href="https://calendly.com/manuel-albanese-lavoro/30min" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-slate-800 text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-slate-700 hover:text-accent-300 hover:scale-105 active:scale-95 shadow-lg border border-slate-700 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 focus:outline-none"
            >
              <Calendar size={20} aria-hidden="true" />
              Prenota una Call
            </a>
            
            {/* LinkedIn Button */}
            <a 
              href="https://www.linkedin.com/in/manuel-albanese" 
              target="_blank" 
              rel="noreferrer"
              className="px-8 py-4 bg-[#0077b5] text-white rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#006396] hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b5] focus:outline-none"
            >
              <Linkedin size={20} aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-slate-800/50 opacity-0 animate-fade-in-up delay-500">
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">Core Services</p>
            <div className="flex flex-wrap gap-4 text-slate-300">
              <span className="flex items-center gap-2 hover:text-white transition-colors font-medium"><Code size={16} aria-hidden="true" /> Web Development</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors font-medium"><Database size={16} aria-hidden="true" /> Knowledge Management</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors font-medium"><FileText size={16} aria-hidden="true" /> Doc Generation</span>
              <span className="flex items-center gap-2 hover:text-white transition-colors font-medium"><span className="font-bold text-accent-400">RAG</span> Systems</span>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="lg:w-1/3 opacity-0 animate-fade-in-up delay-200">
            <div className="relative w-56 h-56 md:w-80 md:h-80 mx-auto">
                <div className="absolute inset-0 bg-accent-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" 
                    alt="Manuel Albanese - Foto ritratto professionale" 
                    width="600"
                    height="600"
                    loading="lazy"
                    className="relative w-full h-full object-cover rounded-full border-4 border-slate-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 right-4 bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" aria-hidden="true"></div>
                    <span className="text-xs font-bold text-white">Open to Work</span>
                </div>
            </div>
        </div>
      </div>

      {/* Floating Animated Scroll Button - Centered Correctly for Mobile */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center opacity-0 animate-fade-in-up delay-1000 w-full pointer-events-none">
        <a 
            href={`#${SectionId.DEMO}`}
            aria-label="Scorri giù alla demo"
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors animate-bounce p-4 pointer-events-auto"
        >
            <span className="text-xs uppercase tracking-widest font-bold">Scopri l'AI</span>
            <ChevronsDown size={28} className="text-accent-500 drop-shadow-md" />
        </a>
      </div>
    </section>
  );
};