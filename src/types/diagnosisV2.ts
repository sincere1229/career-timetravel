export interface DiagnosisV2Config {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  characterName?: string;
  characterImage?: string;
  questions: DiagnosisV2Question[];
  services: DiagnosisV2Service[];
  traits: TraitMeta[];
}

export type DiagnosisV2Question =
  | {
      id: string;
      type: 'slider';
      prompt: string;
      trait: string;
      direction: 1 | -1;
      lowAnchor?: string;
      highAnchor?: string;
    }
  | {
      id: string;
      type: 'choice';
      prompt: string;
      trait?: string;
      direction?: 1 | -1;
      options: {
        label: string;
        sublabel?: string;
        effects?: Record<string, number>;
        value?: number;
      }[];
    };

export interface DiagnosisV2Service {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  matchProfile: Record<string, { min?: number; max?: number }>;
  matchScore?: number;
  href: string | null;
  bannerImage?: string;
  bannerWidth?: number;
  bannerHeight?: number;
  impUrl?: string;
  isAffiliate: boolean;
  comingSoon: boolean;
}

export interface TraitMeta {
  key: string;
  label: string;
  lowLabel?: string;
  highLabel?: string;
  color?: string;
  description?: string;
}
