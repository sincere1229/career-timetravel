import type { ServiceCategory } from '@/types/diagnosis';

// isAffiliate相当の情報はa8BannerPool.tsで管理。
// href: null かつ comingSoon: true の項目は、A8提携リンクの確定待ち（プログラムIDのみ判明）。
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'job-agent',
    title: '転職エージェント',
    description: '年収交渉や非公開求人の紹介など、プロのサポートを受けながら転職活動を進めたい方向け。',
    items: [
      { name: '総合型転職エージェント', description: '幅広い業界・職種をカバーする大手エージェント', href: 'https://townwork.net/', comingSoon: false },
      { name: 'ハイクラス向け転職エージェント', description: '年収アップ・管理職転職に強いエージェント', href: 'https://doda.jp/', comingSoon: false },
      { name: '第二新卒・未経験向けエージェント', description: '未経験挑戦型・若手層向けの求人に強いエージェント', href: 'https://www.mynavi-agent.jp/', comingSoon: false },
      { name: 'マスメディアン', description: 'マーケティング・クリエイティブ職特化の人材紹介サービス', href: null, comingSoon: true },
      { name: 'ファルマスタッフ', description: '薬剤師専門の求人・転職サイト', href: null, comingSoon: true },
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
    id: 'independence',
    title: '独立・開業準備',
    description: '独立・フリーランスを考え始めた人が、最初に整えておきたい事務まわりの仕組み。',
    items: [
      { name: 'マネーフォワード クラウド開業届', description: '3ステップで開業手続きが完了するオンラインサービス', href: null, comingSoon: true },
      { name: 'マネーフォワード クラウド確定申告', description: '経費管理から確定申告までをまるごと効率化', href: null, comingSoon: true },
      { name: '0円バーチャルオフィス', description: '法人登記・屋号・郵便物受取が無料で使える', href: null, comingSoon: true },
      { name: 'Strategy Consultant Bank', description: 'フリーランスコンサルタント向けの案件紹介マッチング', href: null, comingSoon: true },
      { name: '代理店ドットコム', description: '副業・独立・新規事業のビジネス案件を探せる資料請求サイト', href: null, comingSoon: true },
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
      { name: 'オンスク.JP', description: '月額1,628円で様々な資格学習がウケホーダイ', href: null, comingSoon: true },
      { name: '能セン', description: '需要の高い国家資格に特化した学習スクール', href: null, comingSoon: true },
      { name: 'SARAスクール', description: '女性のための通信講座、140講座以上から選べる', href: null, comingSoon: true },
      { name: '諒設計アーキテクトラーニング', description: 'おうちでカンタンに資格取得できる通信講座', href: null, comingSoon: true },
      { name: '資格対策ドットコム', description: '金融資格に強いeラーニングサービス', href: null, comingSoon: true },
      { name: 'LEC東京リーガルマインド', description: '法律・資格分野の老舗スクール、書籍・講座が充実', href: null, comingSoon: true },
      { name: 'JTEX', description: '技術系国家資格に特化した通信講座', href: null, comingSoon: true },
      { name: 'formie', description: 'スマホだけで簡単に資格取得できる通信講座', href: null, comingSoon: true },
    ],
  },
  {
    id: 'selfback',
    title: 'セルフバックで稼ぐ',
    description: '自分でサービスに申し込むだけで、ポイントやキャッシュバックを受け取れる「自己アフィリエイト」。副業の最初の一歩としても人気です。',
    items: [
      { name: 'ハピタス', description: '高還元率のポイントサイト。無料会員登録だけでもポイントが貯まる', href: null, comingSoon: true },
      { name: 'SoftBank Air', description: '工事不要のインターネット回線。契約で高額キャッシュバック', href: null, comingSoon: true },
      { name: 'ビッグローブ光', description: '光回線の乗り換えで最大5万円キャッシュバック', href: null, comingSoon: true },
      { name: 'GMOとくとくBB（WiMAX）', description: 'モバイルWi-Fiの契約でキャッシュバック特典', href: null, comingSoon: true },
      { name: 'auひかり', description: '新規開通で高額キャッシュバックキャンペーン中', href: null, comingSoon: true },
      { name: 'エックスサーバー', description: '国内シェアNo.1のレンタルサーバー。契約で成果報酬', href: null, comingSoon: true },
    ],
  },
  {
    id: 'time-saving',
    title: '副業の時間を作るサービス',
    description: '副業に充てる時間がない、という人のための時短・生活効率化サービス。',
    items: [
      { name: 'ダスキン メリーメイド', description: '家事代行サービスで、家事の時間を副業時間に変える', href: null, comingSoon: true },
      { name: 'シェフの無添つくりおき', description: '冷蔵の手作り惣菜を自宅にお届け、料理の時間を削減', href: null, comingSoon: true },
      { name: 'ユアマイスター', description: 'プロのハウスクリーニングで掃除の時間を作る', href: null, comingSoon: true },
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
