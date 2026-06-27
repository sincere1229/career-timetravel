'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { DiagnosisV2Config } from '@/types/diagnosisV2';
import LineCTA from '@/components/LineCTA';
import {
  initTraitScores,
  applySliderAnswer,
  applyChoiceAnswer,
  normalizeForDisplay,
  rankServices,
  type TraitScores,
} from '@/lib/diagnosisV2Engine';

export default function DiagnosisV2Shell({ config }: { config: DiagnosisV2Config }) {
  const [step, setStep] = useState(-1); // -1: intro, 0..n-1: questions, n: result
  const [scores, setScores] = useState<TraitScores>(() => initTraitScores(config));
  const [sliderValue, setSliderValue] = useState(3);

  const totalSteps = config.questions.length;
  const isIntro = step === -1;
  const isResult = step === totalSteps;

  function handleSliderSubmit() {
    const q = config.questions[step];
    if (q.type !== 'slider') return;
    const next = applySliderAnswer(scores, q.trait as string, q.direction as (1 | -1), sliderValue);
    setScores(next);
    setSliderValue(3);
    setStep((s) => s + 1);
  }

  function handleChoiceSubmit(effects: Partial<Record<string, number>>) {
    const next = applyChoiceAnswer(scores, effects as Partial<Record<string, number>>);
    setScores(next);
    setTimeout(() => setStep((s) => s + 1), 150);
  }

  if (isIntro) {
    return <IntroScreen config={config} onStart={() => setStep(0)} />;
  }

  if (isResult) {
    return <ResultScreen config={config} scores={scores} />;
  }

  const q = config.questions[step];
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <div className="container section" style={{ maxWidth: 920 }}>
      <ProgressBar progress={progress} current={step + 1} total={totalSteps} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 28,
          marginTop: 28,
          alignItems: 'start',
        }}
        className="diag-v2-grid"
      >
        {/* 質問パネル */}
        <div className="glass-card card-pad fade-up" key={q.id}>
          <div style={{ fontSize: '0.74rem', color: 'var(--chrono-ice)', letterSpacing: '0.06em', marginBottom: 14 }}>
            Q{step + 1} / {totalSteps}
          </div>
          <h2
            style={{
              fontSize: '1.15rem',
              color: 'var(--chrono-white)',
              lineHeight: 1.7,
              marginBottom: 30,
              fontFamily: 'var(--font-heading-jp)',
            }}
          >
            {q.prompt}
          </h2>

          {q.type === 'slider' ? (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--chrono-text-dim)',
                  marginBottom: 14,
                }}
              >
                <span>{q.lowAnchor}</span>
                <span>{q.highAnchor}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="chrono-slider"
                style={{ width: '100%' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 8,
                  marginBottom: 28,
                  gap: 6,
                }}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: n === sliderValue ? 'var(--chrono-gold)' : 'rgba(192,214,242,0.2)',
                    }}
                  />
                ))}
              </div>
              <button onClick={handleSliderSubmit} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                次へ
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoiceSubmit(opt.effects ?? {})}
                  className="answer-option"
                  style={{
                    textAlign: 'left',
                    padding: '14px 18px',
                    borderRadius: 10,
                    border: '1px solid rgba(192,214,242,0.18)',
                    background: 'rgba(192,214,242,0.04)',
                    color: 'var(--chrono-silver)',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ color: 'var(--chrono-white)', marginBottom: opt.sublabel ? 4 : 0 }}>{opt.label}</div>
                  {opt.sublabel && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--chrono-text-dim)' }}>{opt.sublabel}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ライブプレビューパネル */}
        <LivePreview config={config} scores={scores} answeredCount={step} />
      </div>

      <style>{`
        .answer-option:hover {
          border-color: var(--chrono-gold) !important;
          background: rgba(212,175,55,0.08) !important;
        }
        .chrono-slider {
          -webkit-appearance: none;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--chrono-ice), var(--chrono-gold));
          outline: none;
        }
        .chrono-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--chrono-white);
          border: 2px solid var(--chrono-gold);
          cursor: pointer;
        }
        .chrono-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--chrono-white);
          border: 2px solid var(--chrono-gold);
          cursor: pointer;
        }
        @media (max-width: 760px) {
          .diag-v2-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function LivePreview({
  config,
  scores,
  answeredCount,
}: {
  config: DiagnosisV2Config;
  scores: TraitScores;
  answeredCount: number;
}) {
  return (
    <div className="glass-card card-pad" style={{ position: 'sticky', top: 90 }}>
      <div style={{ fontSize: '0.74rem', color: 'var(--chrono-gold)', letterSpacing: '0.06em', marginBottom: 6 }}>
        LIVE PREVIEW
      </div>
      <div style={{ fontSize: '0.86rem', color: 'var(--chrono-silver)', marginBottom: 22 }}>
        今のあなたの傾向（{answeredCount} / {config.questions.length} 回答済み）
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {config.traits.map((t) => {
          const display = normalizeForDisplay(scores[t.key] ?? 0);
          return (
            <div key={t.key}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--chrono-white)',
                  marginBottom: 6,
                }}
              >
                <span>{t.label}</span>
                <span style={{ color: t.color }}>{display}</span>
              </div>
              <div style={{ height: 5, borderRadius: 999, background: 'rgba(192,214,242,0.12)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${display}%`,
                    background: t.color,
                    transition: 'width 0.5s var(--ease-chrono)',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.66rem',
                  color: 'var(--chrono-text-dim)',
                  marginTop: 4,
                }}
              >
                <span>{t.lowLabel}</span>
                <span>{t.highLabel}</span>
              </div>
            </div>
          );
        })}
      {/* LINE導線 */}
      <div style={{ marginTop: 32 }}>
        <LineCTA
          source="result"
          variant="full"
          label="Chronoに相談する"
        />
      </div>

      {/* AIチャット相談CTA */}
      <div style={{
        marginTop: 16,
        background: 'rgba(100,160,255,0.06)',
        border: '1px solid rgba(100,160,255,0.2)',
        borderRadius: 14,
        padding: '18px 20px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--chrono-ice)', marginBottom: 6 }}>
          🤖 AIキャリア相談
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginBottom: 14, lineHeight: 1.6 }}>
          転職・副業・AI活用について、Chronoに直接相談できます
        </p>
        <a href="/chat" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #1a3a6a, #0d2040)',
          border: '1px solid rgba(100,160,255,0.3)',
          color: 'var(--chrono-ice)',
          borderRadius: 10,
          padding: '11px 26px',
          fontSize: '0.85rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          Chronoに相談する →
        </a>
      </div>
    </div>
  );
}

function IntroScreen({ config, onStart }: { config: DiagnosisV2Config; onStart: () => void }) {
  return (
    <div className="container section" style={{ maxWidth: 640, textAlign: 'center' }}>
      <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
        Diagnosis
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          margin: '14px 0 16px',
          color: 'var(--chrono-white)',
        }}
      >
        {config.title}
      </h1>
      <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, marginBottom: 36 }}>{config.subtitle}</p>
      <div
        style={{
          fontSize: '0.84rem',
          color: 'var(--chrono-ice)',
          marginBottom: 36,
        }}
      >
        質問数：{config.questions.length}問　所要時間：約3分
      </div>
      <button onClick={onStart} className="btn btn-primary">
        診断をはじめる
      </button>
    </div>
  );
}

function ProgressBar({ progress, current, total }: { progress: number; current: number; total: number }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: 'var(--chrono-text-dim)',
          marginBottom: 8,
        }}
      >
        <span>
          {current} / {total}
        </span>
        <span>{progress}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, background: 'rgba(192,214,242,0.12)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--chrono-ice), var(--chrono-gold))',
            transition: 'width 0.4s var(--ease-chrono)',
          }}
        />
      </div>
    </div>
  );
}

function ResultScreen({ config, scores }: { config: DiagnosisV2Config; scores: TraitScores }) {
  const ranked = rankServices(config, scores);
  const top = ranked.slice(0, 3);

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <img
          src="/chrono-small.png"
          alt="Chrono"
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid rgba(212,175,55,0.5)',
            flexShrink: 0,
          }}
        />
        <div style={{ fontSize: '0.84rem', color: 'var(--chrono-ice)' }}>
          Chronoより：診断、お疲れさまでした。あなたの傾向を見てみましょう。
        </div>
      </div>
      <div className="eyebrow">Your Tendency</div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          margin: '14px 0 16px',
          color: 'var(--chrono-white)',
        }}
      >
        あなたの中にある、本当の傾向
      </h1>
      <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, marginBottom: 36 }}>
        Chronoが見つけたのは「正解」ではなく、あなたが無意識に持っている傾向です。ここから先は、あなた自身が選んでください。
      </p>

      <div className="glass-card card-pad" style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {config.traits.map((t) => {
            const display = normalizeForDisplay(scores[t.key] ?? 0);
            return (
              <div key={t.key}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.86rem',
                    color: 'var(--chrono-white)',
                    marginBottom: 8,
                  }}
                >
                  <span>{t.label}</span>
                  <span style={{ color: t.color, fontWeight: 600 }}>{display}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(192,214,242,0.12)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${display}%`, background: t.color }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    color: 'var(--chrono-text-dim)',
                    marginTop: 5,
                  }}
                >
                  <span>{t.lowLabel}</span>
                  <span>{t.highLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h2 style={{ fontSize: '0.92rem', color: 'var(--chrono-ice)', marginBottom: 18 }}>
        比較しておきたい、あなたに近い選択肢
      </h2>
      <p style={{ fontSize: '0.82rem', color: 'var(--chrono-text-dim)', marginBottom: 22, lineHeight: 1.8 }}>
        相性の高い順に並んでいますが、実際の相性は使ってみないと分かりません。無料のサービスなら、上位2〜3個はまとめて試して、合わなかったものだけ後で外す形がおすすめです。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
        {top.map((s, idx) => {
          const cardContent = (
            <>
              {s.bannerImage ? (
                <img
                  src={s.bannerImage}
                  alt={s.name}
                  width={s.bannerWidth}
                  height={s.bannerHeight}
                  style={{ borderRadius: 8, flexShrink: 0, maxWidth: 120, height: 'auto' }}
                />
              ) : (
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{s.emoji}</div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '0.98rem', color: 'var(--chrono-white)', margin: 0 }}>{s.name}</h3>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--chrono-gold)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      borderRadius: 999,
                      padding: '2px 9px',
                    }}
                  >
                    相性 {s.matchScore}%
                  </span>
                  {s.comingSoon && (
                    <span style={{ fontSize: '0.66rem', color: 'var(--chrono-text-dim)' }}>準備中</span>
                  )}
                  {s.isAffiliate && (
                    <span style={{ fontSize: '0.62rem', color: 'var(--chrono-text-dim)' }}>PR</span>
                  )}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--chrono-text-dim)', lineHeight: 1.7, margin: 0 }}>
                  {s.tagline}
                </p>
              </div>
            </>
          );

          const cardStyle: React.CSSProperties = {
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            borderColor: idx === 0 ? 'rgba(212,175,55,0.4)' : undefined,
          };

          if (s.href && !s.comingSoon) {
            return (
              <>
                <a key={s.id} href={s.href} target="_blank" rel="nofollow noopener noreferrer" className="glass-card card-pad" style={cardStyle}>
                  {cardContent}
                </a>
                {s.impUrl && (
                  <img src={s.impUrl} width={1} height={1} style={{ border: 'none', display: 'block' }} loading="lazy" alt="" />
                )}
              </>
            );
          }

          return (
            <div key={s.id} className="glass-card card-pad" style={cardStyle}>
              {cardContent}
            </div>
          );
        })}
      </div>

      <div
        className="glass-card card-pad"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          marginBottom: 44,
          background: 'rgba(212,175,55,0.05)',
          borderColor: 'rgba(212,175,55,0.25)',
        }}
      >
        <img
          src="/chrono-small.png"
          alt="Chrono"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid rgba(212,175,55,0.4)',
            flexShrink: 0,
          }}
        />
        <p style={{ fontSize: '0.84rem', color: 'var(--chrono-silver)', lineHeight: 1.9, margin: 0 }}>
          「どれか1つに絞る」よりも、「気になった2〜3個、まとめて登録してみる」の方が、後悔は少ないものです。無料で使えるサービスなら、迷っている時間より試している時間の方が、結局は近道になります。
        </p>
      </div>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <Link href="/services" className="btn btn-primary">
          すべての選択肢を見る
        </Link>
        <Link href="/" className="btn btn-ghost">
          トップへ戻る
        </Link>
      </div>

      {/* LINE導線 */}
      <div style={{ marginTop: 32 }}>
        <LineCTA
          source="result"
          variant="full"
          label="Chronoに相談する"
        />
      </div>

      {/* AIチャット相談CTA */}
      <div style={{
        marginTop: 16,
        background: 'rgba(100,160,255,0.06)',
        border: '1px solid rgba(100,160,255,0.2)',
        borderRadius: 14,
        padding: '18px 20px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--chrono-ice)', marginBottom: 6 }}>
          🤖 AIキャリア相談
        </p>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', marginBottom: 14, lineHeight: 1.6 }}>
          転職・副業・AI活用について、Chronoに直接相談できます
        </p>
        <a href="/chat" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #1a3a6a, #0d2040)',
          border: '1px solid rgba(100,160,255,0.3)',
          color: 'var(--chrono-ice)',
          borderRadius: 10,
          padding: '11px 26px',
          fontSize: '0.85rem',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          Chronoに相談する →
        </a>
      </div>
    </div>
  );
}
