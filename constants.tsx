import React from 'react';
import { Bot, Database, Globe, BrainCircuit, FileText, Search, ShieldCheck, Lock, Server } from 'lucide-react';
import { Project, Service, Certification } from './types';

// Knowledge base used for the system instruction of the AI
export const MANUEL_CONTEXT = `
Sei l'assistente virtuale commerciale di Manuel Albanese.
Il tuo obiettivo è VENDERE i servizi di Manuel spiegando i vantaggi pratici in modo semplice e accattivante.

CHI E' IL TUO INTERLOCUTORE:
Probabilmente un imprenditore o un manager non tecnico. NON usare termini complessi come "RAG", "Vector DB", "Microservizi" o "Embeddings" a meno che non ti vengano chiesti esplicitamente.
Parla invece di: Risparmio di tempo, Riduzione errori, Sicurezza dei dati, Automazione.

LA TUA STRATEGIA DI VENDITA:
1. **Semplifica**:
   - Non dire "Sistema RAG su documenti", dì "Un 'Cervello Digitale' che legge i tuoi manuali e risponde alle domande dello staff in un secondo".
   - Non dire "Automazione Python", dì "Un assistente invisibile che scrive report e email noiose al posto tuo".
   
2. **Usa la Leva della Competenza (Background Enterprise)**:
   - Manuel non è un amatore: ha maturato esperienza lavorando in **team di sviluppo** su progetti complessi per clienti del settore finanziario.
   - Messaggio chiave: "Ha imparato il rigore e l'attenzione alla sicurezza lavorando su progetti per grandi istituti finanziari, e applica lo stesso standard professionale al tuo progetto".

3. **Call to Action**:
   - Spingi gentilmente l'utente a contattare Manuel tramite il form nel sito o su LinkedIn per una chiacchierata senza impegno.

I SERVIZI (Tradotti in linguaggio Business):
- **Gestione Conoscenza Aziendale (RAG)**: Per smettere di perdere ore a cercare informazioni nei file PDF o Word.
- **AI Privata & Sicura**: Per usare l'intelligenza artificiale senza regalare i propri dati alle multinazionali (GDPR compliant).
- **Sviluppo Web Avanzato**: Siti che non sono solo vetrine, ma strumenti di lavoro veloci e affidabili.

TONO:
Empatico, professionale ma caldo, sicuro di sé, orientato alla soluzione.
`;

export const NAV_LINKS = [
  { label: 'Chi Sono', href: '#about' },
  { label: 'Processo AI', href: '#workflow' },
  { label: 'Servizi', href: '#services' },
  { label: 'Certificazioni', href: '#certifications' },
  { label: 'Chat Demo', href: '#ai-demo' },
  { label: 'Contatti', href: '#contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'rag',
    title: 'Knowledge Management (RAG)',
    description: 'Trasforma i tuoi documenti aziendali in una "banca dati parlante". Riduci i tempi di onboarding e retrieval delle informazioni.',
    icon: 'BrainCircuit',
    features: [
      { label: 'Chatbot su dati proprietari', tooltip: 'L\'AI apprende solo dai tuoi PDF e documenti interni, garantendo privacy.' },
      { label: 'Ricerca semantica avanzata', tooltip: 'Trova concetti, non solo parole chiave esatte.' },
      { label: 'Citazione delle fonti', tooltip: 'Il sistema indica sempre da quale documento proviene l\'informazione.' }
    ]
  },
  {
    id: 'local-ai',
    title: 'Private AI & Local LLMs',
    description: 'Massima sicurezza per i tuoi dati. Eseguiamo modelli AI (SLM) direttamente sulla tua infrastruttura o in cloud privato isolato.',
    icon: 'ShieldCheck',
    features: [
      { label: '100% GDPR Compliant', tooltip: 'I dati non lasciano mai i tuoi server. Ideale per settore medico, legale e finance.' },
      { label: 'No Data Training', tooltip: 'I tuoi dati non vengono usati per addestrare modelli pubblici.' },
      { label: 'Zero Costi API', tooltip: 'Abbattimento dei costi ricorrenti per token sfruttando hardware locale.' }
    ]
  },
  {
    id: 'web',
    title: 'Sviluppo Web Enterprise',
    description: 'Applicazioni web complesse, accessibili e sicure. Dal design in Figma allo sviluppo in React/Angular e .NET/Java.',
    icon: 'Globe',
    features: [
      { label: 'Microservizi & API REST', tooltip: 'Architetture scalabili basate su Spring Boot o .NET Core.' },
      { label: 'UI/UX & Accessibilità', tooltip: 'Interfacce inclusive progettate su Figma e sviluppate pixel-perfect.' },
      { label: 'Modernizzazione Legacy', tooltip: 'Trasformazione di vecchi applicativi in moderne Web App.' }
    ]
  },
  {
    id: 'automation',
    title: 'Automazione Workflow',
    description: 'Agenti AI che lavorano per te. Generazione automatica di documenti, analisi email e reportistica integrata.',
    icon: 'FileText',
    features: [
      { label: 'Drafting Documentale', tooltip: 'Crea bozze di contratti o report in secondi basandosi su template.' },
      { label: 'Integrazione CRM/ERP', tooltip: 'Collega l\'intelligenza artificiale ai tuoi software gestionali esistenti.' },
      { label: 'Data Entry Intelligente', tooltip: 'Estrai automaticamente dati da PDF, fatture e immagini per popolare Excel o gestionali, azzerando gli errori manuali.' }
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
    title: "Banking Compliance Dashboard",
    description: "Sviluppo frontend all'interno di un team per un applicativo di segnalazioni bancarie. Focus su accessibilità e gestione dati.",
    tags: ["Angular", "Spring", "Figma", "Teamwork"],
    highlight: true
  },
  {
    title: "HR Management Migration",
    description: "Collaborazione alla migrazione di un gestionale HR legacy verso architettura a microservizi.",
    tags: ["Java", "Microservices", "API REST", "SQL"],
    highlight: false
  },
  {
    title: "Legal RAG Assistant (Private)",
    description: "Sistema AI locale per analisi contratti. Nessun dato esce dai server dello studio legale. GDPR Compliant.",
    tags: ["Local LLM", "Python", "Privacy", "Ollama"],
    highlight: false
  }
];