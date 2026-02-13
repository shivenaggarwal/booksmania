export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  genre: string;
  isbn: string;
  publishedDate: string;
  pageCount: number;
  price?: number;
  tags: string[];
  quote?: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  bookCount: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  bookIds: string[];
}

export interface ComparisonArticle {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedDate: string;
  readTime: number;
  seoTitle: string;
  seoDescription: string;
  books: ComparisonBook[];
  verdict: string;
  tags: string[];
}

export interface ComparisonBook {
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  isbn: string;
  rating: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  summary: string;
}

export interface RecommendationResult {
  book: Book;
  matchScore: number;
  reason: string;
}
