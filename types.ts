export interface ServiceFeature {
  label: string;
  tooltip: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: ServiceFeature[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  highlight?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: string; // Lucide icon name or image url
  url?: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  WORKFLOW = 'workflow',
  SERVICES = 'services',
  CERTIFICATIONS = 'certifications',
  DEMO = 'ai-demo',
  CONTACT = 'contact'
}