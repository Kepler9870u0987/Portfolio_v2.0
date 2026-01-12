import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { Hero } from './components/Hero';
import { AboutStory } from './components/AboutStory';
import { AIWorkflow } from './components/AIWorkflow';
import { Services } from './components/Services';
import { AIChatDemo } from './components/AIChatDemo';
import { ContactFooter } from './components/ContactFooter';
import { Certifications } from './components/Certifications';
import { NAV_LINKS, PROJECTS } from './constants';
import { SectionId } from './types';

// Component: Glowing Section Divider (White Line Version)
const SectionDivider = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Central Glow Line - White core with bright glow */}
    <div className="w-3/4 md:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_25px_rgba(255,255,255,0.8)] opacity-100"></div>
  </div>
);

// Component: Global Animated Background (Vibrant 3-Color Gradient)
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020617]" aria-hidden="true">
    {/* Animated Blobs Layer */}
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
    
    {/* Noise Overlay for Texture */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [messageTrigger, setMessageTrigger] = useState(0); 
  const [chatHistory, setChatHistory] = useState<string>(''); 

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Handle Splash Screen timing
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.focus(); 
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleChatTransfer = (messageSummary: string) => {
    setPrefilledMessage(messageSummary);
    setMessageTrigger(Date.now());
    const contactSection = document.getElementById(SectionId.CONTACT);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChatUpdate = (history: string) => {
    setChatHistory(history);
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-accent-500/30 selection:text-white relative">
      <a href="#main-content" className="fixed top-4 left-4 z-[1000] bg-accent-600 text-white px-4 py-2 rounded-lg opacity-0 focus:opacity-100 pointer-events-none focus:pointer-events-auto transition-opacity shadow-xl border border-white/20">
        Vai al contenuto principale
      </a>

      <AnimatedBackground />

      {/* SPLASH SCREEN */}
      <div aria-hidden={!showSplash} className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-accent-500/20 blur-xl rounded-full animate-pulse-fast"></div>
          <Cpu size={64} className="text-accent-500 relative z-10 animate-bounce" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-white tracking-widest animate-pulse">
          MANUEL<span className="text-accent-500">.AI</span>
        </h1>
        <div className="mt-4 w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-accent-500 animate-[blob_2s_infinite] w-1/2 rounded-full"></div>
        </div>
        <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-semibold">Inizializzazione Sistemi RAG...</p>
      </div>

      <div className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <header>
          <nav aria-label="Navigazione principale" className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
              <a href="#" className="text-2xl font-bold text-white tracking-tighter" onClick={(e) => handleNavClick(e, '#hero')}>
                Manuel<span className="text-accent-500">.AI</span>
              </a>

              <ul className="hidden md:flex items-center gap-6 lg:gap-8 list-none">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm font-medium text-slate-200 hover:text-white hover:text-accent-400 transition-colors cursor-pointer">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`#${SectionId.DEMO}`} onClick={(e) => handleNavClick(e, `#${SectionId.DEMO}`)} className="flex items-center gap-2 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 hover:scale-105 active:scale-95 border border-white/10">
                    <Sparkles size={16} className="animate-pulse" aria-hidden="true" />
                    AI Chat
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/manuel-albanese" target="_blank" rel="noreferrer" aria-label="Profilo LinkedIn" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors block">
                    <Linkedin size={20} className="text-white" />
                  </a>
                </li>
              </ul>

              <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-controls="mobile-menu" aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {isMenuOpen && (
              <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl animate-fade-in-up">
                 <a href={`#${SectionId.DEMO}`} onClick={(e) => handleNavClick(e, `#${SectionId.DEMO}`)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg mb-2 shadow-lg shadow-accent-500/20">
                  <Sparkles size={20} aria-hidden="true" />
                  Parla con l'AI
                </a>
                <ul className="flex flex-col gap-4 list-none p-0">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block text-lg font-medium text-slate-200 py-2 border-b border-slate-800 last:border-0 cursor-pointer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>
        </header>

        <main id="main-content">
          <Hero />
          <SectionDivider />
          <AIChatDemo onTransferChat={handleChatTransfer} onChatUpdate={handleChatUpdate} />
          <SectionDivider />
          <AboutStory />
          <SectionDivider />
          <AIWorkflow />
          <SectionDivider />
          <Services />
          <SectionDivider />
          <Certifications />
          <SectionDivider />

          <section className="py-24 relative" aria-labelledby="projects-title">
            <div className="container mx-auto px-6">
              <div className="mb-12">
                <h2 id="projects-title" className="text-3xl font-bold text-white mb-3">Progetti Recenti</h2>
                <p className="text-slate-200 text-lg">Un mix di Web Development e implementazioni AI.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, idx) => (
                  <article key={idx} className={`p-6 rounded-xl border ${project.highlight ? 'bg-slate-900/60 border-accent-500/30' : 'bg-slate-900/40 border-slate-800/60'} hover:border-slate-500 transition-all group backdrop-blur-md`}>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-accent-400 transition-colors">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Vedi progetto ${project.title}`} className="text-slate-400 hover:text-white cursor-pointer"><ExternalLink size={18} /></a>
                      )}
                    </div>
                    <p className="text-slate-200 mb-6 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-950 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700/80 font-medium">{tag}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <ContactFooter 
          initialMessage={prefilledMessage} 
          lastUpdate={messageTrigger} 
          chatHistory={chatHistory} 
        />
      </div>
    </div>
  );
}

export default App;