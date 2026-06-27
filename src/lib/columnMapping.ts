// 診断タイプ → 関連コラムカテゴリのマッピング
export const DIAGNOSIS_COLUMN_MAP: Record<string, string[]> = {
  'salary-up':     ['年収アップ', '退職'],
  'side-hustle':   ['副業'],
  'ai':            ['AI活用', '年収アップ'],
  'career':        ['就活'],
  'career-change': ['転職', '退職'],
};

// 診断タイプ → 表示ラベル
export const DIAGNOSIS_LABELS: Record<string, string> = {
  'salary-up':     '年収アップ',
  'side-hustle':   '副業・フリーランス',
  'ai':            'AI活用',
  'career':        '就活・キャリアスタート',
  'career-change': '転職・キャリアチェンジ',
};
