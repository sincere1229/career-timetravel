import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import './globals.css'

export const metadata: Metadata = {
  title: 'Career TimeTravel | Chronoが導くキャリア戦略サイト',
  description: '退職・転職・副業・年収アップ。未来案内人Chronoが、診断とシミュレーションであなたの次の一手を可視化します。',
  openGraph: {
    title: 'Career TimeTravel',
    description: '未来の働き方を、いま選び直す。Chronoのキャリア診断ポータル',
    url: 'https://career-timetravel.com',
    siteName: 'Career TimeTravel',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
