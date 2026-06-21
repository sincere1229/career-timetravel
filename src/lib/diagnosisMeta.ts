import type { DiagnosisMeta } from '@/types/diagnosis';

// 全診断はChrono版のオリジナル新方式（リアルタイム傾向可視化＋ユーザーが選ぶ）として
// このサイト内で完結する。
export const diagnosisList: DiagnosisMeta[] = [
  {
    id: 'salary-up',
    name: '年収アップ行動診断',
    shortName: '年収アップ',
    tagline: '本当はどう働きたいか。あなたの中の傾向をリアルタイムで可視化',
    description:
      '12の質問に答えると、伴走サポート志向・収入優先度・スピード重視・専門性志向の4つの傾向がリアルタイムで見えてきます。最後に選ぶのはあなた自身です。',
    questionCount: 12,
    estMinutes: 3,
    available: true,
    accentIcon: 'trend',
  },
  {
    id: 'side-hustle',
    name: '副業適性診断',
    shortName: '副業適性',
    tagline: 'あなたに合う副業のかたちを、潜在的な傾向から見つける',
    description:
      '12の質問から、時間投資度・スキル活用度・リスク許容度・発信志向の傾向を可視化し、あなたに合う副業の方向性を提示します。',
    questionCount: 12,
    estMinutes: 3,
    available: true,
    accentIcon: 'side',
  },
  {
    id: 'ai',
    name: 'AI活用適性診断',
    shortName: 'AI活用適性',
    tagline: 'あなたに合うAIとの付き合い方を見つける',
    description:
      '12の質問から、自動化志向・創造性活用・学習意欲・収益化志向の傾向を可視化します。',
    questionCount: 12,
    estMinutes: 3,
    available: true,
    accentIcon: 'ai',
  },
  {
    id: 'career',
    name: '就活キャリア診断',
    shortName: '就活キャリア',
    tagline: 'あなたに合う就活の進め方を見つける',
    description:
      '12の質問から、安定志向・自己表現力・業界明確度・サポート希求度の傾向を可視化します。',
    questionCount: 12,
    estMinutes: 3,
    available: true,
    accentIcon: 'compass',
  },
  {
    id: 'career-change',
    name: '転職市場価値診断',
    shortName: '転職市場価値',
    tagline: '今の市場価値と、動くべきタイミングを見つける',
    description:
      '12の質問から、緊急度・市場価値自覚度・条件交渉志向・比較検討志向の傾向を可視化します。',
    questionCount: 12,
    estMinutes: 3,
    available: true,
    accentIcon: 'compass',
  },
];

export function getDiagnosisMeta(id: string): DiagnosisMeta | undefined {
  return diagnosisList.find((d) => d.id === id);
}

// サイト内の診断ページへのパス
export function getDiagnosisUrl(id: string): string {
  return `/diagnosis/${id}`;
}
