import type { Metadata } from 'next';
import DiagnosisV2Shell from '@/components/DiagnosisV2Shell';
import { sideHustleV2 } from '@/lib/diagnosisV2DataSideHustle';

export const metadata: Metadata = {
  title: '副業適性診断 | Career TimeTravel',
  description: '潜在的な傾向をリアルタイムで可視化する副業適性診断です。',
};

export default function SideHustleV2Page() {
  return <DiagnosisV2Shell config={sideHustleV2} />;
}
