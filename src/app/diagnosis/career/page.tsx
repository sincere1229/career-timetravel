import type { Metadata } from 'next';
import DiagnosisV2Shell from '@/components/DiagnosisV2Shell';
import { careerStartV2 } from '@/lib/diagnosisV2DataCareer';

export const metadata: Metadata = {
  title: '就活キャリア診断 | Career TimeTravel',
  description: '潜在的な傾向をリアルタイムで可視化する就活キャリア診断です。',
};

export default function CareerStartV2Page() {
  return <DiagnosisV2Shell config={careerStartV2} />;
}
