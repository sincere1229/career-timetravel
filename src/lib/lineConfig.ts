// LINE公式アカウント設定
// 環境変数 NEXT_PUBLIC_CHRONO_LINE_URL で上書き可能
export const CHRONO_LINE_URL = process.env.NEXT_PUBLIC_CHRONO_LINE_URL ?? 'https://lin.ee/XTpUrd8';

// URLパラメータ付きLINE URLを生成する関数
export function buildLineUrl(params?: {
  source?: 'top' | 'diagnosis' | 'result' | 'article' | 'affiliate';
  type?: 'career' | 'job_change' | 'side_hustle' | 'independence' | 'ai' | 'income' | 'freelance';
  result?: string;
  article?: string;
  affiliate?: string;
}): string {
  if (!params) return CHRONO_LINE_URL;
  const query = new URLSearchParams();
  if (params.source)    query.set('source', params.source);
  if (params.type)      query.set('type', params.type);
  if (params.result)    query.set('result', params.result);
  if (params.article)   query.set('article', params.article);
  if (params.affiliate) query.set('affiliate', params.affiliate);
  const qs = query.toString();
  return qs ? `${CHRONO_LINE_URL}?${qs}` : CHRONO_LINE_URL;
}
