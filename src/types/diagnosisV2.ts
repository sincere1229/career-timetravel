// 潜在傾向を引き出す新方式診断の型
// ユーザーは「診断される」のではなく、リアルタイムで自分の傾向を見ながら進み、
// 最後に複数のサービス候補から自分で選ぶ。

export type TraitKey = string;

export interface TraitDefinition {
  key: TraitKey;
  label: string; // 表示用ラベル（例：「伴走サポート志向」）
  lowLabel: string; // 軸の低い側の説明（例：「自立して進めたい」）
  highLabel: string; // 軸の高い側の説明（例：「手厚くサポートしてほしい」）
  color: string;
}

export type QuestionType = 'slider' | 'choice';

export interface SliderQuestion {
  id: string;
  type: 'slider';
  prompt: string;
  lowAnchor: string;
  highAnchor: string;
  // このスライダーが影響するtrait。値(1-5)はそのままtraitスコアに反映される
  trait: TraitKey;
  // 値が高いほどtraitスコアが上がるか下がるか
  direction: 1 | -1;
}

export interface ChoiceOption {
  label: string;
  sublabel?: string;
  // この選択肢を選んだ時、各traitにどれだけ影響するか
  effects: Partial<Record<TraitKey, number>>;
}

export interface ChoiceQuestion {
  id: string;
  type: 'choice';
  prompt: string;
  options: ChoiceOption[];
}

export type Question = SliderQuestion | ChoiceQuestion;

export interface ServiceCandidate {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  // このサービスが強く合う条件：traitごとのしきい値（min/max）
  matchProfile: Partial<Record<TraitKey, { min?: number; max?: number }>>;
  href: string | null; // A8リンク、または提携前は公式サイトへの通常リンク
  bannerImage?: string; // A8バナー画像URL（あれば画像付きカードで表示）
  bannerWidth?: number;
  bannerHeight?: number;
  isAffiliate: boolean; // true: A8等のアフィリエイトリンク / false: 通常の公式サイトリンク（提携前）
  comingSoon: boolean; // true: リンク自体がまだない（完全な準備中）
}

export interface DiagnosisV2Config {
  id: string;
  title: string;
  subtitle: string;
  traits: TraitDefinition[];
  questions: Question[];
  services: ServiceCandidate[];
}
