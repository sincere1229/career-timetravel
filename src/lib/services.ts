import type { ServiceCategory } from '@/types/diagnosis';

// isAffiliate: true は A8.net 等のアフィリエイトリンク。false は提携前の公式サイトへの通常リンク。
// A8提携が確定し次第、該当する href をアフィリエイトリンクに差し替える。
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'job-agent',
    title: '転職エージェント',
    description: '年収交渉や非公開求人の紹介など、プロのサポートを受けながら転職活動を進めたい方向け。',
    items: [
      { name: '総合型転職エージェント', description: '幅広い業界・職種をカバーする大手エージェント', href: 'https://townwork.net/', comingSoon: false },
      { name: 'ハイクラス向け転職エージェント', description: '年収アップ・管理職転職に強いエージェント', href: 'https://doda.jp/', comingSoon: false },
      { name: '第二新卒・未経験向けエージェント', description: '未経験挑戦型・若手層向けの求人に強いエージェント', href: 'https://www.mynavi-agent.jp/', comingSoon: false },
    ],
  },
  {
    id: 'side-business',
    title: '副業サービス',
    description: '在宅ワーク、スキル販売、クラウドソーシングなど、副業の第一歩を後押しするサービス。',
    items: [
      { name: 'クラウドソーシングサービス', description: 'スキル型・発信型の副業の入り口に', href: 'https://crowdworks.jp/', comingSoon: false },
      { name: 'スキル販売プラットフォーム', description: '得意なことを商品化して販売できる', href: 'https://coconala.com/', comingSoon: false },
      { name: 'ペイトナー（請求書先払い）', description: 'フリーランスの資金繰りを安定させたい人に', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B9GA22+4PF6+609HU', comingSoon: false },
      { name: 'バーチャルオフィス NAWABARI', description: '独立・起業の第一歩を後押しする住所サービス', href: 'https://px.a8.net/svt/ejp?a8mat=4B5Q84+B8UUGA+4YOI+5YJRM', comingSoon: false },
    ],
  },
  {
    id: 'ai-school',
    title: 'AIスクール',
    description: 'AIスキルを学び直して市場価値を高めたい方向けのオンライン講座。',
    items: [
      { name: 'AI活用実践講座', description: '業務でAIを使いこなすための実践型講座', href: 'https://www.udemy.com/', comingSoon: false },
      { name: 'プログラミング×AIスクール', description: 'AI時代に対応したエンジニア育成スクール', href: 'https://www.udemy.com/', comingSoon: false },
    ],
  },
  {
    id: 'certification',
    title: '資格講座',
    description: '市場価値を高め、年収アップ・転職の選択肢を広げる資格取得講座。',
    items: [
      { name: '資格スクエア', description: '合格者のビッグデータで効率よく学べる資格学習サービス', href: 'https://px.a8.net/svt/ejp?a8mat=4B5PG6+7O97SA+373C+67JUA', comingSoon: false },
      { name: '国家資格対策講座', description: '専門性の高い国家資格にじっくり取り組みたい方向け', href: 'https://www.u-can.co.jp/', comingSoon: false },
    ],
  },
  {
    id: 'consulting',
    title: 'キャリア相談',
    description: '一人で悩まず、専門家と一緒にキャリアの方向性を整理したい方向け。',
    items: [
      { name: 'オンラインキャリア相談', description: '経験豊富なキャリアアドバイザーに無料相談', href: 'https://www.bizreach.jp/', comingSoon: false },
    ],
  },
];
