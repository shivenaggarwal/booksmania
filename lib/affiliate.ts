const AFFILIATE_TAG = process.env.NEXT_PUBLIC_AFFILIATE_TAG || "booksmania-20";

export function getAmazonAffiliateUrl(isbn: string): string {
  return `https://www.amazon.com/dp/${isbn}?tag=${AFFILIATE_TAG}`;
}

export function getBookshopAffiliateUrl(isbn: string): string {
  return `https://bookshop.org/a/${AFFILIATE_TAG}/${isbn}`;
}

export function getAffiliateUrl(isbn: string, provider: "amazon" | "bookshop" = "amazon"): string {
  switch (provider) {
    case "bookshop":
      return getBookshopAffiliateUrl(isbn);
    case "amazon":
    default:
      return getAmazonAffiliateUrl(isbn);
  }
}
