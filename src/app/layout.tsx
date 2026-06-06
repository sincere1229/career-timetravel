import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Career TimeTravel | キャリア診断ポータル',
  description: '年収アップ・副業・就活。あなたのキャリアを診断して次の行動を見つけよう。',
  openGraph: {
    title: 'Career TimeTravel',
    description: '無料キャリア診断ポータル',
    url: 'https://career-timetravel.com',
    siteName: 'Career TimeTravel',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
