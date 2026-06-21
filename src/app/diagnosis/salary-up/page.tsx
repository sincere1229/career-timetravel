import type { Metadata } from 'next';
import DiagnosisV2Shell from '@/components/DiagnosisV2Shell';
import { salaryUpV2 } from '@/lib/diagnosisV2Data';

export const metadata: Metadata = {
  title: '年収アップ行動診断（プロトタイプ） | Career TimeTravel',
  description: '潜在的な傾向をリアルタイムで可視化する新方式の診断プロトタイプです。',
};

export default function SalaryUpV2Page() {
  return <DiagnosisV2Shell config={salaryUpV2} />;
}
