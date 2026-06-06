# Career TimeTravel — Vercelデプロイ手順

## ディレクトリ構成

```
career-timetravel-deploy/
├── src/
│   ├── app/
│   │   ├── layout.tsx               グローバルレイアウト
│   │   ├── globals.css              グローバルCSS
│   │   ├── page.tsx                 トップ（診断一覧）
│   │   └── diagnosis/
│   │       ├── salary-up/page.tsx   年収アップ診断（公開中）
│   │       ├── side-hustle/page.tsx 副業診断（準備中）
│   │       └── career/page.tsx      就活診断（準備中）
│   ├── components/
│   │   └── DiagnosisShell.tsx       診断共通コンポーネント
│   ├── lib/
│   │   ├── diagnosisEngine.ts       スコア計算
│   │   └── storage.ts               localStorage
│   └── types/
│       └── diagnosis.ts             型定義
├── public/data/csv/
│   ├── questions_salary.csv         年収診断 質問
│   ├── result_templates_salary.csv  年収診断 結果
│   └── questions_side_hustle.csv    副業診断（プレースホルダー）
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
└── .gitignore
```

---

## デプロイ手順

### Step 1: GitHubリポジトリ作成

```bash
cd career-timetravel-deploy
git init
git add .
git commit -m "initial commit: career timetravel MVP"
git branch -M main
git remote add origin https://github.com/sincere1229/career-timetravel.git
git push -u origin main
```

### Step 2: npm install（ローカル確認する場合）

```bash
npm install
npm run dev
# → http://localhost:3000
```

### Step 3: Vercelデプロイ

1. https://vercel.com にログイン
2. 「Add New Project」→ `career-timetravel` リポジトリを選択
3. 設定はすべてデフォルトのまま「Deploy」
4. デプロイ完了後、「Domains」から `career-timetravel.com` を追加

### Step 4: カスタムドメイン設定

Vercelダッシュボード → Settings → Domains
- `career-timetravel.com` を追加
- ドメインレジストラのDNS設定でVercelのAレコードを設定

---

## 診断追加方法（副業・就活）

1. `public/data/csv/questions_副業.csv` を追加
2. `public/data/csv/result_templates_副業.csv` を追加
3. `src/app/diagnosis/side-hustle/page.tsx` を `DiagnosisShell` で実装
4. GitHubにpush → Vercel自動デプロイ

---

## noteリンク変更

`public/data/csv/result_templates_salary.csv` の `note_url` 列を実際のURLに変更してください。
現在はすべて `https://note.com/` になっています。

---

## URL一覧

| ページ | URL |
|---|---|
| トップ | https://career-timetravel.com |
| 年収アップ診断 | https://career-timetravel.com/diagnosis/salary-up |
| 副業適性診断 | https://career-timetravel.com/diagnosis/side-hustle |
| 就活診断 | https://career-timetravel.com/diagnosis/career |
