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
