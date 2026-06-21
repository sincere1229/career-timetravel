'use client';

import { useState } from 'react';
import Link from 'next/link';
import RecommendedNext from '@/components/RecommendedNext';

export default function RetirementSimulatorPage() {
  const [savings, setSavings] = useState<string>('1000000');
  const [monthlyExpense, setMonthlyExpense] = useState<string>('200000');
  const [severance, setSeverance] = useState<string>('0');
  const [unemploymentMonths, setUnemploymentMonths] = useState<string>('3');
  const [unemploymentMonthly, setUnemploymentMonthly] = useState<string>('150000');
  const [showResult, setShowResult] = useState(false);

  const savingsNum = toNumber(savings);
  const expenseNum = toNumber(monthlyExpense);
  const severanceNum = toNumber(severance);
  const ueMonths = toNumber(unemploymentMonths);
  const ueMonthly = toNumber(unemploymentMonthly);

  const totalFunds = savingsNum + severanceNum + ueMonths * ueMonthly;
  const monthsWithoutBenefit = expenseNum > 0 ? (savingsNum + severanceNum) / expenseNum : 0;
  const monthsWithBenefit = expenseNum > 0 ? totalFunds / expenseNum : 0;

  function handleCalculate() {
    setShowResult(true);
  }

  const type = classify(monthsWithoutBenefit);

  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <div className="eyebrow">Simulator</div>
      <h1
        style={{
          fontFamily: 'var(--font-heading-jp)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          margin: '14px 0 16px',
          color: 'var(--chrono-white)',
        }}
      >
        退職シミュレーター
      </h1>
      <p style={{ color: 'var(--chrono-text-dim)', lineHeight: 1.9, marginBottom: 40 }}>
        貯金額と毎月の支出から、退職後に何ヶ月生活できるかを試算します。漠然とした不安を、まず数字にしてみましょう。
      </p>

      <div className="glass-card card-pad" style={{ marginBottom: 32 }}>
        <FieldRow
          label="現在の貯金額"
          value={savings}
          onChange={setSavings}
          unit="円"
          placeholder="1000000"
        />
        <FieldRow
          label="毎月の生活費（家賃・食費・固定費など）"
          value={monthlyExpense}
          onChange={setMonthlyExpense}
          unit="円"
          placeholder="200000"
        />
        <FieldRow
          label="退職金の見込み額（なければ0）"
          value={severance}
          onChange={setSeverance}
          unit="円"
          placeholder="0"
        />
        <FieldRow
          label="失業保険を受給できる見込み月数"
          value={unemploymentMonths}
          onChange={setUnemploymentMonths}
          unit="ヶ月"
          placeholder="3"
        />
        <FieldRow
          label="失業保険の月額目安"
          value={unemploymentMonthly}
          onChange={setUnemploymentMonthly}
          unit="円"
          placeholder="150000"
        />

        <button onClick={handleCalculate} className="btn btn-primary" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
          生活可能月数を計算する
        </button>
      </div>

      {showResult && (
        <div className="fade-up">
          <div className="grid-cards" style={{ marginBottom: 28 }}>
            <div className="glass-card card-pad" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--chrono-text-dim)', marginBottom: 10 }}>
                失業保険なしの場合
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--chrono-white)' }}>
                約{monthsWithoutBenefit.toFixed(1)}<span style={{ fontSize: '1rem', marginLeft: 4 }}>ヶ月</span>
              </div>
            </div>
            <div className="glass-card card-pad" style={{ textAlign: 'center', borderColor: 'rgba(212,175,55,0.4)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--chrono-gold)', marginBottom: 10 }}>
                失業保険を含めた場合
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--chrono-white)' }}>
                約{monthsWithBenefit.toFixed(1)}<span style={{ fontSize: '1rem', marginLeft: 4 }}>ヶ月</span>
              </div>
            </div>
          </div>

          <div className="glass-card card-pad" style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--chrono-white)', marginBottom: 10 }}>{type.title}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--chrono-silver)', lineHeight: 1.9, marginBottom: 18 }}>
              {type.message}
            </p>
            <h4 style={{ fontSize: '0.84rem', color: 'var(--chrono-gold)', marginBottom: 12 }}>次に取るべき行動 3つ</h4>
            <ol style={{ margin: 0, paddingLeft: 20, color: 'var(--chrono-white)', fontSize: '0.88rem', lineHeight: 2 }}>
              {type.actions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ol>
          </div>

          <RecommendedNext />

          <div style={{ marginTop: 40 }}>
            <Link href="/columns/before-retirement-anxiety" className="btn btn-ghost">
              関連コラムを読む
            </Link>
          </div>
        </div>
      )}

      <p style={{ fontSize: '0.72rem', color: 'var(--chrono-text-dim)', marginTop: 32, lineHeight: 1.8 }}>
        ※ この試算は簡易計算であり、税金・社会保険料の変動、地域や雇用形態による失業保険の支給条件の違いは考慮していません。正確な金額はハローワークや専門家にご確認ください。
      </p>
    </div>
  );
}

function toNumber(v: string): number {
  const n = parseFloat(v.replace(/[^0-9.]/g, ''));
  return isNaN(n) ? 0 : n;
}

function classify(months: number) {
  if (months < 2) {
    return {
      title: '要注意ゾーン：今すぐ準備を始めましょう',
      message:
        '現在の貯金だけでは、生活できる期間が短い状態です。退職を急ぐ前に、固定費の見直しや収入確保の準備を並行して進めることをおすすめします。',
      actions: [
        '家賃・サブスクなど固定費を一度すべて書き出す',
        '在職中に転職活動・副業を始めてみる',
        '失業保険の受給条件を事前に確認しておく',
      ],
    };
  }
  if (months < 6) {
    return {
      title: '準備ゾーン：計画的に動けば十分間に合います',
      message:
        '一定の余裕はありますが、長期戦になると不安が大きくなる期間です。退職前に転職活動をある程度進めておくと安心です。',
      actions: [
        '退職前に転職エージェントへ登録して情報収集を始める',
        '失業保険の受給スケジュールを確認する',
        '毎月の支出を一度見直し、余裕を作る',
      ],
    };
  }
  return {
    title: '余裕ゾーン：選択肢を広げて動けます',
    message:
      'しばらくは生活に大きな不安なく動ける状態です。焦らず、自分に合ったキャリアの方向性をじっくり選べるタイミングです。',
    actions: [
      '転職タイプ診断で自分の優先軸を整理する',
      '学び直しやスキルアップに時間を使ってみる',
      '副業を試して収入の選択肢を増やしておく',
    ],
  };
}

function FieldRow({
  label,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  placeholder: string;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: 'block', fontSize: '0.86rem', color: 'var(--chrono-silver)', marginBottom: 8 }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 8,
            border: '1px solid rgba(192,214,242,0.2)',
            background: 'rgba(192,214,242,0.05)',
            color: 'var(--chrono-white)',
            fontSize: '0.94rem',
          }}
        />
        <span style={{ fontSize: '0.82rem', color: 'var(--chrono-text-dim)', minWidth: 28 }}>{unit}</span>
      </div>
    </div>
  );
}
