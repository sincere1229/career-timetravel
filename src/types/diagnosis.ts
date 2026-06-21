export type DiagnosisId = 'salary-up' | 'side-hustle' | 'career' | 'ai' | 'career-change';

export interface DiagnosisQuestion {
  id: string;
  diagnosis_id: string;
  question: string;
  category: string;
  weight: number;
  answer_type: string;
  options: string[];
}

export interface DiagnosisResultTemplate {
  type: string;
  min: number;
  max: number;
  title: string;
  state: string;
  next: string;
  strengths: string[];
  weaknesses: string[];
  actions: string[];
  noteUrl: string;
}

export interface DiagnosisMeta {
  id: DiagnosisId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  questionCount: number;
  estMinutes: number;
  available: boolean;
  accentIcon: string;
}

export interface ColumnPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
  publishedAt: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  name: string;
  description: string;
  href: string | null;
  comingSoon: boolean;
}
