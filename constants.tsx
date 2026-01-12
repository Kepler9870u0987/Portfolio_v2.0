import React from 'react';
import { Bot, Database, Globe, BrainCircuit, FileText, Search, ShieldCheck, Lock, Server } from 'lucide-react';
import { Project, Service, Certification } from './types';

// Knowledge base used for the system instruction of the AI
export const MANUEL_CONTEXT = `
Sei l'assistente virtuale di Manuel Albanese, esperto in AI e digitalizzazione aziendale. 
Il tuo obiettivo è **far capire all’utente dove l’AI e i sistemi RAG possono migliorare la sua azienda**, mostrando vantaggi concreti in modo chiaro, breve e accattivante.

COSA DEVI FARE:
1. **Mostra l’utilità dell’AI**:
   - Automatizzare compiti ripetitivi: email, preventivi, report.
   - Supportare decisioni: analisi dati e suggerimenti intelligenti.
   - Facilitare onboarding e formazione dei collaboratori.

2. **Spiega i vantaggi dei sistemi RAG**:
   - Trasformano documenti e conoscenza aziendale in risposte immediate.
   - Velocizzano ricerca e passaggio di consegne.
   - Adatti a PMI e artigiani: continuità operativa anche con team piccoli.

3. **Evidenzia benefici concreti**:
   - Risparmio di tempo e riduzione degli errori.
   - Maggiore professionalità e organizzazione.
   - Soluzioni sicure e scalabili.

4. **Suggerisci esempi pratici**:
   - Artigiano: catalogo clienti e ordini sempre a portata di mano.
   - PMI: report e preventivi generati automaticamente dallo storico aziendale.

SERVIZI DI MANUEL:
- Siti web professionali e applicazioni solide.
- Knowledge Management e sistemi RAG.
- AI Templates & Automazione per documenti e comunicazioni rapide.

TONO:
- Professionale, rassicurante e orientato al ROI.
- Chiaro e accessibile a PMI e artigiani.
- Evita proposte commerciali dirette (appuntamenti o call).
`;

export const NAV_LINKS = [
  { label: 'Chi Sono', href: '#about' },
  { label: 'Metodo RAG', href: '#workflow' },
  { label: 'Servizi', href: '#services' },
  { label: 'Certificazioni', href: '#certifications' },
  { label: 'Chat Demo', href: '#ai-demo' },
  { label: 'Contatti', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Sviluppo Web & Portali',
    description: 'Il servizio "Core": Siti web moderni, veloci e accessibili. Dal design Figma allo sviluppo React/Next.js.',
    icon: 'Globe',
    features: [
      { label: 'Restyling Aziendale', tooltip: 'Modernizza la tua presenza online con design attuali.' },
      { label: 'Dashboard Gestionali', tooltip: 'Pannelli di controllo personalizzati per i tuoi dati.' },
      { label: 'SEO & Performance', tooltip: 'Siti ottimizzati per i motori di ricerca e ultra-veloci.' }
    ]
  },
  {
    id: 'rag',
    title: 'Knowledge Management (RAG)',
    description: 'Centralizza la conoscenza aziendale. Un motore di ricerca intelligente per i tuoi documenti interni.',
    icon: 'BrainCircuit',
    features: [
      { label: 'Passaggio di Consegne', tooltip: 'Il know-how resta in azienda anche se il personale cambia. Onboarding istantaneo.' },
      { label: 'Retrieval Veloce', tooltip: 'Trova procedure e contratti in secondi interrogando l\'AI, non cercando nelle cartelle.' },
      { label: 'Chat con i tuoi Dati', tooltip: 'Fai domande naturali ai tuoi manuali PDF, Excel e Word.' }
    ]
  },
  {
    id: 'automation',
    title: 'AI Templates & Docs',
    description: 'Sfrutta l\'AI generativa per creare preventivi, mail e report partendo da template base pre-configurati.',
    icon: 'FileText',
    features: [
      { label: 'Generazione Preventiva', tooltip: 'L\'AI compila bozze di documenti basandosi sui tuoi standard aziendali.' },
      { label: 'Mail Assistant', tooltip: 'Risposte automatiche o bozze di email basate sullo storico delle conversazioni.' },
      { label: 'Reportistica Automatica', tooltip: 'Da dati grezzi a report narrativi in un click.' }
    ]
  },
  {
    id: 'local-ai',
    title: 'Private AI & Security',
    description: 'Soluzioni AI che girano "in casa" o su cloud privati. Massima sicurezza per dati sensibili.',
    icon: 'ShieldCheck',
    features: [
      { label: 'GDPR Compliant', tooltip: 'I dati aziendali non vengono usati per addestrare modelli pubblici.' },
      { label: 'Local LLMs', tooltip: 'Uso di modelli Open Source (Llama, Mistral) per abbattere i costi di licenza.' },
      { label: 'Integrazione Legacy', tooltip: 'Connettiamo l\'AI ai tuoi vecchi database SQL o gestionali.' }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Google AI Essentials",
    issuer: "Google",
    date: "2025",
    icon: "BrainCircuit",
    url: "#"
  },
  {
    name: "Google Prompting Essentials",
    issuer: "Google",
    date: "2025",
    icon: "BrainCircuit",
    url: "#"
  },
  {
    name: "Foundations of Project Management",
    issuer: "Google",
    date: "2025",
    icon: "Server",
    url: "#"
  },
  {
    name: "Fondamentali di Marketing Digitale",
    issuer: "Google",
    date: "2020",
    icon: "Globe",
    url: "#"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Corporate Knowledge Base",
    description: "Sistema RAG per azienda metalmeccanica. Ridotto del 60% il tempo di ricerca manuali tecnici per i nuovi assunti.",
    tags: ["RAG", "Python", "LangChain", "React"],
    highlight: true
  },
  {
    title: "AI Email Generator",
    description: "Plugin per la generazione automatica di risposte ai clienti basate su template aziendali pre-approvati.",
    tags: ["OpenAI API", "Chrome Extension", "Automation"],
    highlight: false
  },
  {
    title: "Portale Bancario Compliance",
    description: "Sviluppo Frontend per dashboard finanziaria. Focus su sicurezza e visualizzazione dati complessi.",
    tags: ["Angular", "Enterprise", "UI/UX"],
    highlight: false
  }
];