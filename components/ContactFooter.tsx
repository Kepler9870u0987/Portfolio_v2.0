import React, { useState } from 'react';
import { Linkedin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionId } from '../types';

export const ContactFooter: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email' && emailError) {
      // Clear error as user types to give immediate positive feedback potential
      setEmailError('');
    }
  };

  const validateEmail = (email: string) => {
    // Robust email regex standard (RFC 5322 compliant mostly)
    // Allows modern TLDs (longer than 6 chars like .solutions, .technology)
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit validation check before submission
    if (!formData.email || !validateEmail(formData.email)) {
      setEmailError('Inserisci un indirizzo email valido (es. nome@azienda.com)');
      // Focus the email input if possible, or just return
      const emailInput = document.getElementById('email');
      emailInput?.focus();
      return;
    }

    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      // Basic validation check simulation (Name check)
      if (formData.name.length > 2) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <footer id={SectionId.CONTACT} className="bg-slate-900/80 backdrop-blur-md pt-16 pb-8 border-t border-slate-800 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6">Pronto a innovare?</h2>
            <p className="text-slate-400 mb-8 max-w-xl leading-relaxed">
              Hai un progetto in mente? Che tu abbia bisogno di un sito web performante o di integrare un sistema RAG per la tua azienda, contattami per una consulenza gratuita.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <a 
                href="https://www.linkedin.com/in/manuel-albanese" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-6 py-3 rounded-lg transition-colors font-medium w-fit active:scale-95"
              >
                <Linkedin size={20} />
                Contattami su LinkedIn
              </a>
            </div>
            
            <div className="text-slate-600 text-sm mt-12">
              <p>&copy; {new Date().getFullYear()} Manuel Albanese.</p>
              <p className="mt-2 text-xs">Built with React, Tailwind & Gemini API.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-slate-950/80 backdrop-blur p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6">Invia un messaggio diretto</h3>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Messaggio Inviato!</h4>
                  <p className="text-slate-400">Ti risponderò il prima possibile.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-accent-500 hover:text-accent-400 underline"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-400 mb-1 uppercase">Nome</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1 uppercase">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                          emailError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-slate-700 focus:border-accent-500 focus:ring-accent-500'
                        }`}
                        placeholder="tu@azienda.com"
                      />
                      {emailError && (
                        <p className="text-red-400 text-xs mt-1 animate-fade-in-up flex items-center gap-1 font-medium">
                           <AlertCircle size={12} /> {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-1 uppercase">Messaggio</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none"
                      placeholder="Descrivi brevemente il tuo progetto..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg animate-fade-in-up">
                      <AlertCircle size={16} />
                      Si è verificato un errore durante l'invio. Riprova.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Invia Messaggio
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};