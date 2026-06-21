const AMAZON_ASSOCIATE_TAG = 'sincere1229-22';

export function buildAmazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}
