import type { Metadata } from 'next';
import DiagnosisV2Shell from '@/components/DiagnosisV2Shell';
import { careerChangeV2 } from '@/lib/diagnosisV2DataCareerChange';

export const metadata: Metadata = {
  title: '転職市場価値診断 | Career TimeTravel',
  description: '潜在的な傾向をリアルタイムで可視化する転職市場価値診断です。',
};

export default function CareerChangeV2Page() {
  return <DiagnosisV2Shell config={careerChangeV2} />;
}
