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

// New Component: Glowing Section Divider
const SectionDivider = () => (
  <div className="relative w-full h-24 flex items-center justify-center overflow-hidden pointer-events-none">
    {/* Central Glow Line */}
    <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
    <div className="absolute w-1/3 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent blur-[1px]"></div>
    
    {/* Atmospheric Glow */}
    <div className="absolute w-24 h-24 bg-accent-500/10 rounded-full blur-3xl"></div>
  </div>
);

// New Component: Global Animated Background
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-accent-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-blue-900/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
  </div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Handle Splash Screen timing
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2200); // 2.2 seconds total duration

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(splashTimer);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Extract ID from href (remove #)
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-accent-500/30 selection:text-white relative">
      
      <AnimatedBackground />

      {/* SPLASH SCREEN */}
      <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
        <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest">Inizializzazione Sistemi RAG...</p>
      </div>

      {/* MAIN CONTENT */}
      <div className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4' : 'bg-transparent py-6'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-white tracking-tighter" onClick={(e) => handleNavClick(e, '#hero')}>
              Manuel<span className="text-accent-500">.AI</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-slate-300 hover:text-white hover:text-accent-400 transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}

              {/* CTA Button Desktop */}
              <a 
                href={`#${SectionId.DEMO}`}
                onClick={(e) => handleNavClick(e, `#${SectionId.DEMO}`)}
                className="flex items-center gap-2 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 hover:to-purple-500 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 hover:scale-105 active:scale-95 border border-white/10"
              >
                <Sparkles size={16} className="animate-pulse" />
                AI Chat
              </a>

              <a 
                href="https://www.linkedin.com/in/manuel-albanese" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl animate-fade-in-up">
              {/* CTA Button Mobile */}
               <a 
                href={`#${SectionId.DEMO}`}
                onClick={(e) => handleNavClick(e, `#${SectionId.DEMO}`)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg mb-2 shadow-lg shadow-accent-500/20"
              >
                <Sparkles size={20} />
                Parla con l'AI
              </a>

              {NAV_LINKS.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-slate-300 py-2 border-b border-slate-800 last:border-0 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </nav>

        <Hero />
        
        <SectionDivider />

        <AIChatDemo />

        <SectionDivider />

        <AboutStory />
        
        <SectionDivider />
        
        <AIWorkflow />

        <SectionDivider />

        <Services />

        <SectionDivider />

        <Certifications />

        <SectionDivider />

        {/* Projects Section */}
        <div className="py-24 bg-slate-950/40 backdrop-blur-sm border-t border-slate-800/50">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Progetti Recenti</h2>
              <p className="text-slate-400">Un mix di Web Development e implementazioni AI.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, idx) => (
                <div key={idx} className={`p-6 rounded-xl border ${project.highlight ? 'bg-slate-900/80 border-accent-500/30' : 'bg-slate-900/40 border-slate-800/60'} hover:border-slate-500 transition-all group backdrop-blur-md`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-400 transition-colors">{project.title}</h3>
                    {project.link && <ExternalLink size={18} className="text-slate-500 hover:text-white cursor-pointer" />}
                  </div>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-800/80 text-slate-300 px-3 py-1 rounded-full border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactFooter />
      </div>

    </div>
  );
}

export default App;