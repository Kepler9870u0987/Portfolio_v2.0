import React from 'react';
import { Code, Cpu, Layers, TrendingUp, Building2, ShieldCheck } from 'lucide-react';
import { SectionId } from '../types';

export const AboutStory: React.FC = () => {
  return (
    <section id={SectionId.ABOUT} className="py-24 relative overflow-hidden scroll-mt-20" aria-labelledby="about-title">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: The Narrative */}
          <div className="lg:w-1/2 space-y-8">
            <h2 id="about-title" className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Dal Mondo Enterprise <br />
              all'<span className="text-accent-500">AI Innovation</span>
            </h2>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                Il mio percorso professionale è radicato nello sviluppo software di alto livello. Ho maturato una solida esperienza lavorando all'interno di <strong>team di sviluppo strutturati</strong>, collaborando alla realizzazione di progetti per importanti clienti del <strong className="text-white">settore bancario e finanziario</strong>.
              </p>
              <p>
                In questi contesti complessi ("Mission Critical"), ho contribuito alla modernizzazione di sistemi e allo sviluppo di interfacce utente, imparando sul campo l'importanza assoluta di <em className="text-accent-400">affidabilità, sicurezza e precisione</em> nel codice.
              </p>
              <p>
                Oggi porto quel bagaglio di esperienza tecnica nel mondo dell'<strong>Intelligenza Artificiale</strong>. Offro soluzioni AI (come sistemi RAG e Local LLM) costruite con la stessa professionalità e attenzione ai dettagli appresa lavorando su progetti Enterprise, garantendo privacy e scalabilità.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/50 flex flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-3xl font-bold text-white">
                  <Building2 className="text-accent-500" size={28} aria-hidden="true" /> Fintech
                </span>
                <span className="text-sm text-slate-400 uppercase tracking-wider">Esperienza</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-3xl font-bold text-white">
                  <ShieldCheck className="text-green-500" size={28} aria-hidden="true" /> Enterprise
                </span>
                <span className="text-sm text-slate-400 uppercase tracking-wider">Methodology</span>
              </div>
            </div>
             <div className="mt-4">
                 <a href="https://www.linkedin.com/in/manuel-albanese" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors border-b border-transparent hover:border-accent-400">
                    Verifica il mio percorso su LinkedIn <TrendingUp size={16} aria-hidden="true" />
                 </a>
              </div>
          </div>

          {/* Right: The Timeline Visualization */}
          <div className="lg:w-1/2 w-full">
            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-12 py-4">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:bg-accent-500 group-hover:border-accent-400 transition-colors" aria-hidden="true"></div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-slate-800/80 backdrop-blur rounded-lg text-slate-400 group-hover:text-white transition-colors">
                    <Layers size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Enterprise & Fintech Projects</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Sviluppatore Backend (.NET Core, Java) in team di consulenza per istituti finanziari. Contributo all'integrazione di servizi e gestione API.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:bg-accent-500 group-hover:border-accent-400 transition-colors" aria-hidden="true"></div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-slate-800/80 backdrop-blur rounded-lg text-slate-400 group-hover:text-white transition-colors">
                    <Code size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Modern Frontend & UI/UX</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Focus su Angular e React. Progettazione di interfacce accessibili e collaborazione con team di design (Figma) per portali complessi.
                </p>
              </div>

              {/* Timeline Item 3 (Current) */}
              <div className="relative pl-8 md:pl-12 group">
                <div className="absolute -left-[9px] md:-left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500 border-2 border-accent-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]" aria-hidden="true"></div>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 bg-accent-600/20 backdrop-blur rounded-lg text-accent-400">
                    <Cpu size={20} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white">AI Solutions Architect</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Integrazione di LLM (Google Gemini, Local Models) nei workflow aziendali. Project Management e soluzioni GDPR compliant.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};