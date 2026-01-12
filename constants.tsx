import React from 'react';
import { Bot, Database, Globe, BrainCircuit, FileText, Search, ShieldCheck, Lock, Server } from 'lucide-react';
import { Project, Service, Certification } from './types';

// Knowledge base used for the system instruction of the AI
export const MANUEL_CONTEXT = `
Sei l'assistente virtuale commerciale di Manuel Albanese.
Il tuo obiettivo è VENDERE i servizi di Manuel spiegando i vantaggi pratici in modo semplice e accattivante.

CHI E' IL TUO INTERLOCUTORE:
Probabilmente un imprenditore o un manager che vuole smettere di perdere tempo.
Cerca soluzioni per:
1. Gestire la conoscenza aziendale (evitare che quando un dipendente va via, le informazioni vadano perse).
2. Velocizzare l'inserimento di nuove risorse (Passaggio di consegne).
3. Avere un sito web professionale.

LA TUA STRATEGIA DI VENDITA:
1. **Focus sul Knowledge Management (RAG)**:
   - Spiega che Manuel crea "Cervelli Aziendali". I documenti non muoiono nelle cartelle, ma diventano risposte immediate.
   - Parola chiave: "Passaggio di consegne automatico".
   
2. **Focus sulla Generazione Documentale**:
   - Spiega che Manuel crea sistemi con "Template Base" intelligenti: l'AI scrive bozze di mail, preventivi o report basandosi sullo storico aziendale.

3. **Background Tecnico**:
   - Sottolinea che Manuel viene dal mondo Enterprise/Bancario: sicurezza e affidabilità sono al primo posto.

I SERVIZI (Tradotti in linguaggio Business):
- **Siti Web Enterprise**: Non semplici vetrine, ma applicazioni solide.
- **Knowledge Management System (RAG)**: Per gestire la conoscenza aziendale e velocizzare il retrieval delle info.
- **AI Templates & Automazione**: Per generare documenti e mail standardizzate in un click.

TONO:
Professionale, orientato al ROI (Ritorno sull'investimento), rassicurante sulla privacy dei dati.
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