'use client';

import { useState } from 'react';
import Link from 'next/link';
import LineCTA from '@/components/LineCTA';

// ============================================================
// 相談カテゴリ定義
// ============================================================
const CATEGORIES = [
  {
    id: 'income',
    label: '年収を上げたい',
    emoji: '💰',
    color: '#D4AF37',
    diagnosisHref: '/diagnosis/salary-up',
    diagnosisLabel: '年収アップ行動診断',
    columns: [
      { title: '年収が上がる人と上がらない人、行動の違いは「学習時間」だけではない', slug: 'salary-up-daily-habits' },
      { title: '給与交渉で失敗しないための3つの準備', slug: 'salary-negotiation-guide' },
      { title: '2026年に市場価値が上がるスキルと、今すぐ始められる学び方', slug: 'high-value-skills-2026' },
    ],
    services: [
      { name: 'ネコエージェント', desc: 'LINEで気軽に転職相談', href: 'https://af.moshimo.com/af/c/click?a_id=5646086&p_id=7593&pc_id=21950&pl_id=94960' },
      { name: 'マスメディアン', desc: 'マーケ・IT業界の転職に強い', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B7NZ8Q+3JN0+6AZAP' },
      { name: 'Fast campus', desc: 'DX・AI・データスキルを習得', href: 'https://px.a8.net/svt/ejp?a8mat=4B5PG6+7AK8VE+5Q4A+BXIYP' },
    ],
    response: `年収アップには「転職」「昇給交渉」「スキルアップ」「副業」の4つのルートがあります。\n\nどのルートが合うかは、今の状況と目標によって変わります。まず現在の市場価値を把握してから、次の行動を考えるのが遠回りに見えて実は一番早い方法です。`,
  },
  {
    id: 'job_change',
    label: '転職を考えている',
    emoji: '🚀',
    color: '#64A0FF',
    diagnosisHref: '/diagnosis/career-change',
    diagnosisLabel: '転職市場価値診断',
    columns: [
      { title: '転職の「軸」が定まらない人が最初に考えるべきこと', slug: 'career-change-axis' },
      { title: '転職エージェントの正しい使い方と失敗しない選び方', slug: 'career-change-agent-how-to-use' },
      { title: '30代の転職で気をつけたいこと、有利に進めるための準備', slug: 'career-change-30s-guide' },
    ],
    services: [
      { name: 'ネコエージェント', desc: 'LINEで気軽に転職相談', href: 'https://af.moshimo.com/af/c/click?a_id=5646086&p_id=7593&pc_id=21950&pl_id=94960' },
      { name: 'SPI転職エージェント', desc: '完全無料の転職サポート', href: 'https://af.moshimo.com/af/c/click?a_id=5646088&p_id=7540&pc_id=21772&pl_id=94548' },
      { name: 'Remoful', desc: 'フルリモート求人に特化', href: 'https://af.moshimo.com/af/c/click?a_id=5646096&p_id=5870&pc_id=16301&pl_id=75329' },
    ],
    response: `転職を考えているなら、「なぜ転職したいのか」を言語化することが最初のステップです。\n\n不満から逃げる転職ではなく、目指す未来に向かう転職にするために、まず現在の市場価値と転職の軸を整理しましょう。`,
  },
  {
    id: 'side_hustle',
    label: '副業・独立したい',
    emoji: '🌱',
    color: '#06C755',
    diagnosisHref: '/diagnosis/side-hustle',
    diagnosisLabel: '副業適性診断',
    columns: [
      { title: '副業を始める前に決めておきたい「最初の一歩」', slug: 'side-business-first-step' },
      { title: '副業と本業の時間管理：成功している人の共通点', slug: 'side-business-time-management' },
      { title: '副業で得た収入の税金基礎知識', slug: 'side-business-tax-basics' },
    ],
    services: [
      { name: 'NAWABARI', desc: '低コストで法人登記・ビジネス住所', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B8UUGA+4YOI+5ZMCH' },
      { name: 'ペイトナー', desc: '請求書の報酬を今すぐ受け取る', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B9GA22+4PF6+631SX' },
      { name: '0円バーチャルオフィス', desc: '初期費用ゼロで住所取得', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B89EUI+4V0U+15PMN5' },
    ],
    response: `副業・独立を考えているなら、まず「自分が提供できる価値」を整理することが大切です。\n\nスキル・時間・資金・リスク許容度のバランスを把握してから動き出すと、失敗しにくくなります。焦らず、選択肢を整理しましょう。`,
  },
  {
    id: 'ai',
    label: 'AIを仕事に活かしたい',
    emoji: '🤖',
    color: '#a29bfe',
    diagnosisHref: '/diagnosis/ai',
    diagnosisLabel: 'AI活用適性診断',
    columns: [
      { title: 'AI時代にキャリアを守るために今すぐ始めるべきスキル投資', slug: 'ai-skill-for-career' },
      { title: 'AI自動化で「得意な仕事」がなくなる前に知っておくこと', slug: 'ai-automation-for-office-work' },
    ],
    services: [
      { name: 'Fast campus', desc: 'DX・AI・データスキルを体系的に習得', href: 'https://px.a8.net/svt/ejp?a8mat=4B5PG6+7AK8VE+5Q4A+BXIYP' },
      { name: 'NewMA', desc: 'AIコンサル・DX転職に特化', href: 'https://af.moshimo.com/af/c/click?a_id=5646091&p_id=7487&pc_id=21632&pl_id=93944' },
      { name: 'LEC', desc: '資格取得でキャリアに差をつける', href: 'https://px.a8.net/svt/ejp?a8mat=4B5PG6+56CRFU+1G62+72UDT' },
    ],
    response: `AIを仕事に活かすには、「AIに置き換えられるスキル」と「AIで強化できるスキル」を区別することが重要です。\n\nあなたの現在の業務でAIが使える場面を整理し、小さなところから始めるのが一番続けやすい方法です。`,
  },
  {
    id: 'career',
    label: '就活・キャリアの相談',
    emoji: '🎓',
    color: '#fd9644',
    diagnosisHref: '/diagnosis/career',
    diagnosisLabel: '就活キャリア診断',
    columns: [
      { title: '自己PRの言葉が見つからないときに試したい3つの整理法', slug: 'job-hunting-self-pr-words' },
      { title: '業界研究の正しいやり方と、よくある落とし穴', slug: 'job-hunting-industry-research' },
      { title: '面接の不安を減らすための準備と当日の心構え', slug: 'job-hunting-interview-anxiety' },
    ],
    services: [
      { name: 'キャリセン就活エージェント', desc: '内定ゼロでも諦めない個別サポート', href: 'https://af.moshimo.com/af/c/click?a_id=5646099&p_id=7382&pc_id=21253&pl_id=92960' },
      { name: 'キミスカ', desc: 'スカウト型就活で企業から声がかかる', href: 'https://px.a8.net/svt/ejp?a8mat=4B62OF+FBBH9M+24ZO+I1FMP' },
      { name: 'キャリパト', desc: 'キャリアコーチングで自分の軸を見つける', href: 'https://af.moshimo.com/af/c/click?a_id=5646097&p_id=7422&pc_id=21397&pl_id=93491' },
    ],
    response: `就活・キャリアの悩みは、「何をしたいかわからない」という段階から始まることが多いです。\n\nまず「自分がどんな状況でパフォーマンスが上がるか」を把握することが、自己PR作成や企業選びの土台になります。`,
  },
  {
    id: 'other',
    label: 'その他の相談',
    emoji: '💬',
    color: '#b2bec3',
    diagnosisHref: '/diagnosis/salary-up',
    diagnosisLabel: '年収アップ行動診断',
    columns: [
      { title: '転職の「軸」が定まらない人が最初に考えるべきこと', slug: 'career-change-axis' },
      { title: '副業を始める前に決めておきたい「最初の一歩」', slug: 'side-business-first-step' },
    ],
    services: [
      { name: 'キャリパト', desc: 'キャリアコーチングで方向性を整理', href: 'https://af.moshimo.com/af/c/click?a_id=5646097&p_id=7422&pc_id=21397&pl_id=93491' },
      { name: 'ネコエージェント', desc: 'LINEで気軽に相談しながら転職活動', href: 'https://af.moshimo.com/af/c/click?a_id=5646086&p_id=7593&pc_id=21950&pl_id=94960' },
    ],
    response: `どんな悩みでも、まず「現在地」と「目指したい方向」を整理することが大切です。\n\n今すぐ答えを出さなくても大丈夫です。まずは選択肢を並べてみましょう。`,
  },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];
type Step = 'select' | 'input' | 'result';

// ============================================================
// 将来API連携への置き換えポイント
// 現在は固定テンプレート回答。
// 将来は generateChronoResponse(categoryId, userInput) を
// Claude API呼び出しに差し替えるだけで動作する。
// ============================================================
async function generateChronoResponse(
  _categoryId: CategoryId,
  _userInput: string
): Promise<string> {
  // TODO: Claude API連携に置き換え
  const cat = CATEGORIES.find((c) => c.id === _categoryId);
  return cat?.response ?? '';
}

export default function ChatPage() {
  const [step, setStep] = useState<Step>('select');
  const [selectedCat, setSelectedCat] = useState<CategoryId | null>(null);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const cat = CATEGORIES.find((c) => c.id === selectedCat);

  async function handleSubmit() {
    if (!selectedCat || !userInput.trim()) return;
    setIsLoading(true);
    setStep('result');
    const res = await generateChronoResponse(selectedCat, userInput);
    setResponse(res);
    setIsLoading(false);
  }

  function reset() {
    setStep('select');
    setSelectedCat(null);
    setUserInput('');
    setResponse('');
  }

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>

      {/* ヘッダー：Chronoキャラクター */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(13,32,64,0.95) 0%, transparent 100%)',
        padding: '48px 20px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a3a6a, #0d2040)',
          border: '2px solid rgba(212,175,55,0.4)',
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          boxShadow: '0 0 32px rgba(212,175,55,0.15)',
        }}>
          🕐
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--chrono-gold)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: 8 }}>
          AI CAREER NAVIGATOR
        </p>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--chrono-white)', marginBottom: 10, lineHeight: 1.3 }}>
          Chrono に相談する
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
          今すぐ答えを出さなくても大丈夫です。<br />
          まず、選択肢を整理しましょう。
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>

        {/* ===== STEP 1: カテゴリ選択 ===== */}
        {step === 'select' && (
          <div>
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--chrono-silver)',
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 1.6,
            }}>
              どんなことについて相談しますか？
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedCat(c.id); setStep('input'); }}
                  style={{
                    background: 'rgba(192,214,242,0.04)',
                    border: `1px solid rgba(192,214,242,0.12)`,
                    borderRadius: 12,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.color + '66';
                    e.currentTarget.style.background = c.color + '0d';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(192,214,242,0.12)';
                    e.currentTarget.style.background = 'rgba(192,214,242,0.04)';
                  }}
                >
                  <span style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: c.color + '1a',
                    border: `1px solid ${c.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    {c.emoji}
                  </span>
                  <span style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: 'var(--chrono-white)',
                  }}>
                    {c.label}
                  </span>
                  <span style={{ marginLeft: 'auto', color: 'var(--chrono-text-dim)', fontSize: '0.85rem' }}>→</span>
                </button>
              ))}
            </div>

            {/* LINE誘導 */}
            <div style={{ marginTop: 32 }}>
              <LineCTA source="diagnosis" variant="banner" label="LINEで直接相談する" />
            </div>
          </div>
        )}

        {/* ===== STEP 2: 入力 ===== */}
        {step === 'input' && cat && (
          <div>
            {/* 戻るボタン */}
            <button
              onClick={reset}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--chrono-text-dim)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: '0 0 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              ← カテゴリを選び直す
            </button>

            {/* 選択カテゴリ表示 */}
            <div style={{
              background: cat.color + '0d',
              border: `1px solid ${cat.color}33`,
              borderRadius: 12,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
            }}>
              <span style={{ fontSize: '1.2rem' }}>{cat.emoji}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--chrono-white)' }}>
                {cat.label}
              </span>
            </div>

            <p style={{
              fontSize: '0.88rem',
              color: 'var(--chrono-silver)',
              marginBottom: 12,
              lineHeight: 1.6,
            }}>
              具体的にどんなことで悩んでいますか？<br />
              <span style={{ fontSize: '0.78rem', color: 'var(--chrono-text-dim)' }}>
                （入力はChronoの回答精度を上げるためだけに使用します）
              </span>
            </p>

            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`例：${
                cat.id === 'income' ? '今の年収400万で、500万を目指したい。何から始めればいいかわからない。' :
                cat.id === 'job_change' ? '3年目で転職を考えているが、何を軸にすればいいか迷っている。' :
                cat.id === 'side_hustle' ? '本業が忙しくて副業の時間が作れない。何から始めればいいか。' :
                cat.id === 'ai' ? 'AIが普及して自分の仕事がなくなるか不安。何を学べばいいか。' :
                cat.id === 'career' ? '就活中で自己PRが書けない。自分の強みがわからない。' :
                'キャリアに漠然とした不安があるが、何をすればいいかわからない。'
              }`}
              rows={5}
              style={{
                width: '100%',
                background: 'rgba(192,214,242,0.04)',
                border: '1px solid rgba(192,214,242,0.15)',
                borderRadius: 10,
                padding: '14px 16px',
                color: 'var(--chrono-white)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                marginBottom: 16,
              }}
            />

            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              style={{
                width: '100%',
                background: userInput.trim()
                  ? 'linear-gradient(135deg, var(--chrono-navy), #1a3a6a)'
                  : 'rgba(192,214,242,0.06)',
                border: `1px solid ${userInput.trim() ? 'rgba(212,175,55,0.4)' : 'rgba(192,214,242,0.1)'}`,
                color: userInput.trim() ? 'var(--chrono-gold)' : 'var(--chrono-text-dim)',
                borderRadius: 10,
                padding: '14px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: userInput.trim() ? 'pointer' : 'not-allowed',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              Chrono に相談する →
            </button>
          </div>
        )}

        {/* ===== STEP 3: 回答 ===== */}
        {step === 'result' && cat && (
          <div>
            {/* Chronoからの回答 */}
            <div style={{
              background: 'rgba(13,32,64,0.6)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 14,
              padding: '20px',
              marginBottom: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a3a6a, #0d2040)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  flexShrink: 0,
                }}>
                  🕐
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--chrono-gold)', fontWeight: 700 }}>
                  Chrono からの回答
                </span>
              </div>

              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--chrono-text-dim)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'inline-block', animation: 'pulse 1.2s infinite' }}>●</span>
                  <span>Chronoが考えています...</span>
                </div>
              ) : (
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--chrono-silver)',
                  lineHeight: 1.85,
                  whiteSpace: 'pre-line',
                }}>
                  {response}
                </p>
              )}
            </div>

            {!isLoading && (
              <>
                {/* 1. おすすめ診断 */}
                <div style={{
                  background: 'rgba(212,175,55,0.05)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 12,
                  padding: '16px 18px',
                  marginBottom: 16,
                }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--chrono-gold)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 10 }}>
                    STEP 1 ✦ おすすめ診断
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--chrono-white)', fontWeight: 600, marginBottom: 12, lineHeight: 1.5 }}>
                    まず、あなたの現在の傾向を診断してみましょう
                  </p>
                  <Link
                    href={cat.diagnosisHref}
                    style={{
                      display: 'block',
                      background: 'linear-gradient(135deg, rgba(13,32,64,0.8), rgba(26,58,106,0.8))',
                      border: '1px solid rgba(212,175,55,0.3)',
                      color: 'var(--chrono-gold)',
                      borderRadius: 8,
                      padding: '11px 16px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                  >
                    {cat.diagnosisLabel}を受ける →
                  </Link>
                </div>

                {/* 2. おすすめコラム */}
                <div style={{ marginBottom: 16 }}>
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--chrono-ice)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginBottom: 10,
                  }}>
                    STEP 2 ✦ おすすめコラム
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cat.columns.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/columns/${col.slug}`}
                        style={{
                          background: 'rgba(192,214,242,0.04)',
                          border: '1px solid rgba(192,214,242,0.1)',
                          borderRadius: 10,
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          textDecoration: 'none',
                          transition: 'border-color 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '0.9rem' }}>📄</span>
                        <span style={{
                          fontSize: '0.82rem',
                          color: 'var(--chrono-white)',
                          lineHeight: 1.5,
                          flex: 1,
                        }}>
                          {col.title}
                        </span>
                        <span style={{ color: 'var(--chrono-text-dim)', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 3. おすすめサービス */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--chrono-ice)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginBottom: 10,
                  }}>
                    STEP 3 ✦ 参考になるサービス
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--chrono-text-dim)', marginBottom: 10 }}>
                    ※ 広告・PR
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {cat.services.map((svc, i) => (
                      <a
                        key={i}
                        href={svc.href}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        style={{
                          background: 'rgba(192,214,242,0.04)',
                          border: '1px solid rgba(192,214,242,0.1)',
                          borderRadius: 10,
                          padding: '12px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          textDecoration: 'none',
                        }}
                      >
                        <span style={{ fontSize: '0.9rem' }}>🔗</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--chrono-white)', marginBottom: 2 }}>
                            {svc.name}
                          </p>
                          <p style={{ fontSize: '0.74rem', color: 'var(--chrono-text-dim)' }}>
                            {svc.desc}
                          </p>
                        </div>
                        <span style={{ color: 'var(--chrono-text-dim)', fontSize: '0.8rem', flexShrink: 0 }}>→</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 4. LINE相談 */}
                <LineCTA
                  source="result"
                  type={
                    cat.id === 'income' ? 'income' :
                    cat.id === 'job_change' ? 'job_change' :
                    cat.id === 'side_hustle' ? 'side_hustle' :
                    cat.id === 'ai' ? 'ai' :
                    cat.id === 'career' ? 'career' :
                    'career'
                  }
                  variant="full"
                  label="もっと詳しくChronoに相談する"
                />

                {/* もう一度相談 */}
                <button
                  onClick={reset}
                  style={{
                    marginTop: 16,
                    width: '100%',
                    background: 'none',
                    border: '1px solid rgba(192,214,242,0.12)',
                    color: 'var(--chrono-text-dim)',
                    borderRadius: 10,
                    padding: '12px',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  別のテーマで相談する
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </main>
  );
}
