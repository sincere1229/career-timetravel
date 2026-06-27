export interface DiagnosisV2Config {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  characterName?: string;
  characterImage?: string;
  questions: DiagnosisV2Question[];
  services: DiagnosisV2Service[];
  traits: Record<string, TraitMeta>;
}

export interface DiagnosisV2Question {
  id: string;
  type: 'slider' | 'choice';
  text: string;
  trait: string;
  direction?: 1 | -1;
  options?: { label: string; value: number }[];
}

export interface DiagnosisV2Service {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  matchProfile: Record<string, { min?: number; max?: number }>;
  href: string | null;
  bannerImage?: string;
  bannerWidth?: number;
  bannerHeight?: number;
  impUrl?: string;
  isAffiliate: boolean;
  comingSoon: boolean;
}

export interface TraitMeta {
  label: string;
  description?: string;
}
