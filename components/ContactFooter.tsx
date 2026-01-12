import React, { useState, useEffect } from 'react';
import { Linkedin, Send, Loader2, CheckCircle, AlertCircle, Settings, Copy, Check, Sparkles } from 'lucide-react';
import { send } from '@emailjs/browser';
import { sendMessageToGemini } from '../services/geminiService';
import { SectionId } from '../types';

// CONFIGURAZIONE EMAILJS
const EMAILJS_SERVICE_ID = "service_tjetugx"; 
const EMAILJS_TEMPLATE_ID = "template_mbindoi"; 
const EMAILJS_PUBLIC_KEY = "W7V6Y2BeuyPqp_mfS";

interface ContactFooterProps {
  initialMessage?: string;
  lastUpdate?: number;
  chatHistory?: string; // Nuova prop che contiene il testo della chat
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ initialMessage, lastUpdate, chatHistory }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [configError, setConfigError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Forza l'aggiornamento del campo messaggio quando cambia il timestamp lastUpdate (vecchio metodo)
  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({
        ...prev,
        message: initialMessage
      }));
    }
  }, [initialMessage, lastUpdate]);

  const handleGenerateSummary = async () => {
    if (chatHistory) {
        setIsSummarizing(true);
        try {
            // PROMPT PER IL FOOTER
            // Se l'utente clicca il bottone nel footer, usiamo l'AI per riassumere la history grezza.
            const prompt = `Ecco una trascrizione di una chat con un cliente:\n\n${chatHistory}\n\nGenera un riassunto schematico per punti elenco delle esigenze del cliente, da inserire in una mail di richiesta preventivo. Sii breve e professionale.`;
            
            const aiSummary = await sendMessageToGemini(prompt);
            
            const finalMessage = `Ciao Manuel,\n\nHo interagito con il tuo assistente AI. Ecco il riassunto della conversazione:\n\n${aiSummary}\n\nVorrei capire come implementare queste soluzioni nella mia azienda.`;
            
            setFormData(prev => ({ ...prev, message: finalMessage }));
        } catch (error) {
            console.error("Errore riassunto AI nel footer", error);
            // Fallback manuale
            const manualSummary = `Ciao Manuel,\n\nHo interagito con il tuo assistente AI. Ecco il log della conversazione:\n\n${chatHistory}`;
            setFormData(prev => ({ ...prev, message: manualSummary }));
        } finally {
            setIsSummarizing(false);
        }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email' && emailError) setEmailError('');
    if (configError) setConfigError('');
    if (status === 'error') setStatus('idle');
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const copyForLinkedIn = async () => {
    if (formData.message) {
      try {
        await navigator.clipboard.writeText(formData.message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        window.open('https://www.linkedin.com/in/manuel-albanese', '_blank');
      } catch (err) {
        console.error("Failed to copy", err);
      }
    } else {
        window.open('https://www.linkedin.com/in/manuel-albanese', '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !validateEmail(formData.email)) {
      setEmailError('Inserisci un indirizzo email valido (es. nome@azienda.com)');
      const emailInput = document.getElementById('email');
      emailInput?.focus();
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const templateParams = {
        to_email: "manuel.albanese.lavoro@gmail.com", 
        reply_to: formData.email, 
        from_name: formData.name,
        message: formData.message,
      };

      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      const msg = error?.text || error?.message || JSON.stringify(error);
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  return (
    // Removed specific background opacity to blend with global background
    <footer id={SectionId.CONTACT} className="pt-16 pb-8 border-t border-slate-800/50 scroll-mt-20 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="lg:w-1/2">
            <h2 id="contact-heading" className="text-3xl font-bold text-white mb-6">Parliamo del tuo Progetto</h2>
            <p className="text-slate-300 mb-8 max-w-xl leading-relaxed">
              Vuoi un nuovo sito web o vuoi implementare un Knowledge Management System per la tua azienda? 
              Contattami per discutere di come ottimizzare il passaggio di consegne e automatizzare i tuoi documenti.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={copyForLinkedIn}
                className="inline-flex items-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-6 py-3 rounded-lg transition-colors font-medium w-fit active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b5]"
              >
                <Linkedin size={20} aria-hidden="true" />
                {copied ? (
                    <span className="flex items-center gap-2">Testo Copiato! <Check size={16} /></span>
                ) : (
                    <span>Scrivimi su LinkedIn</span>
                )}
              </button>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                 Cliccando qui sopra, il testo del messaggio preventivo verrà copiato nei tuoi appunti e si aprirà il mio profilo LinkedIn.
              </p>
            </div>
            
            <div className="text-slate-500 text-sm mt-12">
              <p>&copy; {new Date().getFullYear()} Manuel Albanese.</p>
              <p className="mt-2 text-xs">Built with React, Tailwind & Gemini API.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2">
            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6">Invia un messaggio</h3>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up" role="alert">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Messaggio Inviato!</h4>
                  <p className="text-slate-300">Ti risponderò a breve su {formData.email || 'questa email'}.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-accent-500 hover:text-accent-400 underline focus:outline-none focus:ring-2 focus:ring-accent-500 rounded"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5 uppercase">Nome *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500 transition-colors"
                        placeholder="Nome Cognome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5 uppercase">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? "email-error" : undefined}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-slate-900/50 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 transition-colors ${
                          emailError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-slate-700 focus:border-accent-500 focus:ring-accent-500'
                        }`}
                        placeholder="tu@azienda.com"
                      />
                      {emailError && (
                        <p id="email-error" className="text-red-400 text-xs mt-1 animate-fade-in-up flex items-center gap-1 font-medium" role="alert">
                           <AlertCircle size={12} aria-hidden="true" /> {emailError}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between items-center mb-1.5 flex-wrap gap-2">
                       <label htmlFor="message" className="block text-sm font-medium text-slate-300 uppercase">Messaggio *</label>
                       
                       {/* BOTTONE GENERA RIASSUNTO - STILE PREMIUM */}
                       {chatHistory && (
                           <button 
                             type="button" 
                             onClick={handleGenerateSummary}
                             disabled={isSummarizing}
                             className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all duration-300
                               bg-gradient-to-r from-accent-500/10 to-purple-500/10 border border-accent-500/30 text-accent-200
                               hover:from-accent-500/20 hover:to-purple-500/20 hover:border-accent-500/60 hover:text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:-translate-y-0.5
                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none animate-fade-in-up"
                           >
                             <span className="relative z-10 flex items-center gap-2">
                                {isSummarizing ? (
                                   <Loader2 size={14} className="animate-spin text-accent-400" />
                                ) : (
                                   <Sparkles size={14} className="text-accent-400 group-hover:text-yellow-300 transition-colors" />
                                )}
                                {isSummarizing ? 'Analisi in corso...' : 'Importa riassunto Chat AI'}
                             </span>
                           </button>
                       )}
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500 transition-colors resize-none"
                      placeholder="Descrivi la tua esigenza (es. Sito Web, Sistema RAG, Automazione Documenti...)"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex flex-col gap-1 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg animate-fade-in-up" role="alert">
                      <div className="flex items-center gap-2 font-semibold">
                         <AlertCircle size={16} aria-hidden="true" />
                         Errore invio
                      </div>
                      <p className="opacity-90 text-xs">
                        {errorMessage.includes('recipients address is empty') 
                            ? "Configurazione Mancante nella Dashboard EmailJS. Controlla il campo 'To Email' nel template." 
                            : (errorMessage || "Controlla la connessione o le impostazioni EmailJS.")}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-accent-600 hover:bg-accent-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group active:scale-95 focus:ring-2 focus:ring-accent-500"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Invia a Manuel
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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