import type { DiagnosisV2Config, ServiceCandidate, TraitKey } from '@/types/diagnosisV2';

export type TraitScores = Record<TraitKey, number>;

export function initTraitScores(config: DiagnosisV2Config): TraitScores {
  const scores: TraitScores = {};
  config.traits.forEach((t) => {
    scores[t.key] = 0;
  });
  return scores;
}

// スライダー回答(1-5)をtraitスコアに変換して加算する
export function applySliderAnswer(
  scores: TraitScores,
  trait: TraitKey,
  direction: 1 | -1,
  value: number // 1-5
): TraitScores {
  // 3を中央として-2〜+2に正規化
  const delta = ((value - 3) / 2) * direction;
  return { ...scores, [trait]: (scores[trait] ?? 0) + delta };
}

// 選択肢の effects をそのまま加算する
export function applyChoiceAnswer(
  scores: TraitScores,
  effects: Partial<Record<TraitKey, number>>
): TraitScores {
  const next = { ...scores };
  for (const [key, val] of Object.entries(effects)) {
    next[key] = (next[key] ?? 0) + (val ?? 0);
  }
  return next;
}

// 表示用に0-100スケールへ正規化（中央50、レンジは±4を想定）
export function normalizeForDisplay(rawScore: number): number {
  const clamped = Math.max(-4, Math.min(4, rawScore));
  return Math.round(50 + (clamped / 4) * 50);
}

export interface ScoredService extends ServiceCandidate {
  matchScore: number; // 0-100、高いほど合致
}

// 各サービスについて、ユーザーのtraitスコアがmatchProfileの条件にどれだけ合うかを計算する
export function rankServices(config: DiagnosisV2Config, scores: TraitScores): ScoredService[] {
  const results: ScoredService[] = config.services.map((service) => {
    let matchPoints = 0;
    let totalConditions = 0;

    for (const [traitKey, range] of Object.entries(service.matchProfile)) {
      totalConditions += 1;
      const value = scores[traitKey] ?? 0;
      let satisfied = true;
      if (range?.min !== undefined && value < range.min) satisfied = false;
      if (range?.max !== undefined && value > range.max) satisfied = false;

      if (satisfied) {
        // 条件を満たす度合いに応じて加点（しきい値からの距離が大きいほど高得点）
        const distance =
          range?.min !== undefined ? value - range.min : range?.max !== undefined ? range.max - value : 0.5;
        matchPoints += 1 + Math.max(0, Math.min(1, distance / 2));
      }
    }

    const matchScore = totalConditions > 0 ? Math.round((matchPoints / (totalConditions * 2)) * 100) : 50;
    return { ...service, matchScore: Math.max(0, Math.min(100, matchScore)) };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore);
}
