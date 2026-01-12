import React, { useState, useEffect } from 'react';
import { Linkedin, Send, Loader2, CheckCircle, AlertCircle, Settings, Copy, Check, Sparkles, Wand2 } from 'lucide-react';
import { send } from '@emailjs/browser';
import { sendMessageToGemini } from '../services/geminiService';
import { SectionId } from '../types';

const EMAILJS_SERVICE_ID = "service_tjetugx"; 
const EMAILJS_TEMPLATE_ID = "template_mbindoi"; 
const EMAILJS_PUBLIC_KEY = "W7V6Y2BeuyPqp_mfS";

interface ContactFooterProps {
  initialMessage?: string;
  lastUpdate?: number;
  chatHistory?: string;
}

const cleanMarkdownResponse = (text: string) => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s*(.*)/g, (match, p1) => `\n${p1.toUpperCase()}\n`)
    .replace(/`{3}([\s\S]*?)`{3}/g, '$1')
    .replace(/^\s*-\s/gm, '• ')
    .trim();
};

export const ContactFooter: React.FC<ContactFooterProps> = ({ initialMessage, lastUpdate, chatHistory }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

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
            const prompt = `
              Ecco una trascrizione di una chat con un cliente:\n\n${chatHistory}\n\n
              Genera un riassunto schematico per una mail di richiesta preventivo.
              Sii professionale e usa punti elenco.
            `;
            
            let aiSummary = await sendMessageToGemini(prompt);
            aiSummary = cleanMarkdownResponse(aiSummary);

            const finalMessage = `Ciao Manuel,\n\nHo interagito con il tuo assistente AI. Ecco il riassunto della conversazione:\n\n${aiSummary}\n\nVorrei capire come implementare queste soluzioni nella mia azienda.`;
            
            setFormData(prev => ({ ...prev, message: finalMessage }));
        } catch (error) {
            console.error("Errore riassunto AI nel footer", error);
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
      setEmailError('Inserisci un indirizzo email valido');
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
      setErrorMessage(error?.text || "Errore invio.");
      setStatus('error');
    }
  };

  return (
    <footer id={SectionId.CONTACT} className="pt-16 pb-8 border-t border-slate-800/50 scroll-mt-20 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-1/2">
            <h2 id="contact-heading" className="text-3xl font-bold text-white mb-6">Parliamo del tuo Progetto</h2>
            <p className="text-slate-200 mb-8 max-w-xl leading-relaxed text-lg font-medium">
              Vuoi un nuovo sito web o vuoi implementare un Knowledge Management System per la tua azienda? 
              Contattami per discutere di come ottimizzare il passaggio di consegne e automatizzare i tuoi documenti.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <button 
                onClick={copyForLinkedIn}
                className="inline-flex items-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-6 py-3 rounded-lg transition-colors font-bold w-fit active:scale-95 shadow-lg shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Linkedin size={20} />
                {copied ? <span>Testo Copiato!</span> : <span>Scrivimi su LinkedIn</span>}
              </button>
            </div>
            
            <div className="text-slate-400 text-sm mt-12 font-medium">
              <p>&copy; {new Date().getFullYear()} Manuel Albanese.</p>
              <p className="mt-2 text-xs">Built with React, Tailwind & Gemini API.</p>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              
              <h3 className="text-xl font-bold text-white mb-6">Invia un messaggio</h3>
              
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Messaggio Inviato!</h4>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-accent-500 hover:text-accent-400 underline font-bold"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Nome *</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors placeholder:text-slate-500 font-medium"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">Email *</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-slate-950 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors placeholder:text-slate-500 font-medium ${
                          emailError 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-slate-700 focus:border-accent-500 focus:ring-accent-500'
                        }`}
                        placeholder="tu@azienda.com"
                      />
                      {emailError && <p className="text-red-400 text-xs mt-1 flex items-center gap-1 font-bold"><AlertCircle size={12}/> {emailError}</p>}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex justify-between items-end mb-2">
                       <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wide">Messaggio *</label>
                       
                       {chatHistory && (
                           <button 
                             type="button" 
                             onClick={handleGenerateSummary}
                             disabled={isSummarizing}
                             className="
                               relative overflow-hidden group
                               flex items-center gap-2 px-4 py-1.5 rounded-full 
                               bg-gradient-to-r from-indigo-900/40 to-purple-900/40 
                               border border-indigo-500/30 hover:border-indigo-400/80
                               transition-all duration-300 ease-out
                               hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
                               active:scale-95
                               disabled:opacity-50 disabled:cursor-not-allowed
                             "
                           >
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                             
                             {isSummarizing ? (
                                <Loader2 size={12} className="text-indigo-400 animate-spin" />
                             ) : (
                                <Wand2 size={12} className="text-indigo-400 group-hover:text-indigo-300 group-hover:rotate-12 transition-transform" />
                             )}
                             
                             <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 group-hover:text-white">
                                {isSummarizing ? 'Analisi AI...' : 'Importa da Chat'}
                             </span>
                           </button>
                       )}
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors resize-none placeholder:text-slate-500 leading-relaxed font-medium"
                      placeholder="Descrivi la tua esigenza..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 font-bold">
                      <p className="flex items-center gap-2"><AlertCircle size={16} /> {errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-white text-slate-900 hover:bg-slate-200 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Invio...
                      </>
                    ) : (
                      <>
                        Invia Richiesta
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