import type { Metadata } from 'next';
import DiagnosisV2Shell from '@/components/DiagnosisV2Shell';
import { aiAptitudeV2 } from '@/lib/diagnosisV2DataAi';

export const metadata: Metadata = {
  title: 'AI活用適性診断 | Career TimeTravel',
  description: '潜在的な傾向をリアルタイムで可視化するAI活用適性診断です。',
};

export default function AiAptitudeV2Page() {
  return <DiagnosisV2Shell config={aiAptitudeV2} />;
}
