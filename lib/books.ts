import { Book, Category } from "./types";

// ─── Mock Data ───────────────────────────────────────────
// In production, replace with Google Books API or Open Library calls

export const featuredBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0525559477-L.jpg",
    rating: 4.5,
    reviewCount: 12453,
    genre: "Fiction",
    isbn: "0525559477",
    publishedDate: "2020-09-29",
    pageCount: 288,
    price: 14.99,
    tags: ["bestseller", "fiction", "philosophical"],
    quote: "It is easy to mourn the lives we aren't living. It is hard to see what is there instead of what isn't.",
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself are finished.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0593135202-L.jpg",
    rating: 4.8,
    reviewCount: 18920,
    genre: "Sci-Fi",
    isbn: "0593135202",
    publishedDate: "2021-05-04",
    pageCount: 496,
    price: 16.99,
    tags: ["sci-fi", "adventure", "bestseller"],
    quote: "I penetrated the outer hull of an alien spacecraft with a rock. So I've got that going for me.",
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg",
    rating: 4.7,
    reviewCount: 45231,
    genre: "Self-Help",
    isbn: "0735211299",
    publishedDate: "2018-10-16",
    pageCount: 320,
    price: 13.99,
    tags: ["self-help", "productivity", "bestseller"],
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
  },
  {
    id: "4",
    title: "Dune",
    author: "Frank Herbert",
    description:
      "Set on the desert planet Arrakis, Dune is the story of Paul Atreides, who would become known as Muad'Dib, the prophesied leader of the Fremen.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0441013597-L.jpg",
    rating: 4.6,
    reviewCount: 32100,
    genre: "Sci-Fi",
    isbn: "0441013597",
    publishedDate: "1965-08-01",
    pageCount: 688,
    price: 11.99,
    tags: ["classic", "sci-fi", "epic"],
    quote: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
  },
  {
    id: "5",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description:
      "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",
    rating: 4.6,
    reviewCount: 22340,
    genre: "Finance",
    isbn: "0857197681",
    publishedDate: "2020-09-08",
    pageCount: 256,
    price: 14.99,
    tags: ["finance", "psychology", "bestseller"],
    quote: "Wealth is what you don't see. It's the cars not purchased, the diamonds not bought.",
  },
  {
    id: "6",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    description:
      "From the Nobel Prize-winning author, a magnificent new novel about the wondrous capacity to love.",
    coverImage: "https://covers.openlibrary.org/b/isbn/059331817X-L.jpg",
    rating: 4.2,
    reviewCount: 8900,
    genre: "Fiction",
    isbn: "059331817X",
    publishedDate: "2021-03-02",
    pageCount: 320,
    price: 15.99,
    tags: ["fiction", "literary", "ai"],
    quote: "There was something very special, but it wasn't inside Josie. It was inside those who loved her.",
  },
  {
    id: "7",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    description:
      "A tale of gods, kings, immortal fame, and the human heart. A reimagining of Homer's Iliad.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0062060627-L.jpg",
    rating: 4.7,
    reviewCount: 28700,
    genre: "Historical Fiction",
    isbn: "0062060627",
    publishedDate: "2012-03-06",
    pageCount: 416,
    price: 12.99,
    tags: ["historical", "mythology", "romance"],
    quote: "I could recognize him by touch alone, by smell; I would know him blind, by the way his breaths came and his feet struck the earth.",
  },
  {
    id: "8",
    title: "Educated",
    author: "Tara Westover",
    description:
      "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    coverImage: "https://covers.openlibrary.org/b/isbn/0399590501-L.jpg",
    rating: 4.5,
    reviewCount: 31200,
    genre: "Memoir",
    isbn: "0399590501",
    publishedDate: "2018-02-20",
    pageCount: 352,
    price: 13.99,
    tags: ["memoir", "inspiring", "bestseller"],
    quote: "You can love someone and still choose to say goodbye to them. You can miss a person every day, and still be glad that they are no longer in your life.",
  },
];

export const staffPicks: Book[] = [
  featuredBooks[0],
  featuredBooks[3],
  featuredBooks[6],
  featuredBooks[4],
];

export const trendingBooks: Book[] = [
  featuredBooks[1],
  featuredBooks[2],
  featuredBooks[5],
  featuredBooks[7],
  featuredBooks[0],
  featuredBooks[3],
];

export const categories: Category[] = [
  {
    slug: "fiction",
    name: "Fiction",
    description: "Explore worlds beyond imagination",
    image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&q=80",
    bookCount: 1240,
  },
  {
    slug: "sci-fi",
    name: "Sci-Fi",
    description: "Journey through space and time",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    bookCount: 890,
  },
  {
    slug: "self-help",
    name: "Self-Help",
    description: "Transform your life, one page at a time",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
    bookCount: 670,
  },
  {
    slug: "history",
    name: "History",
    description: "Uncover stories of the past",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12ebb?w=600&q=80",
    bookCount: 540,
  },
  {
    slug: "mystery",
    name: "Mystery",
    description: "Unravel gripping whodunits",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bookCount: 780,
  },
  {
    slug: "romance",
    name: "Romance",
    description: "Stories that steal your heart",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    bookCount: 920,
  },
];

export function getBookById(id: string): Book | undefined {
  return featuredBooks.find((book) => book.id === id);
}

export function getBooksByGenre(genre: string): Book[] {
  return featuredBooks.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase()
  );
}

export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase();
  return featuredBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.tags.some((tag) => tag.includes(q))
  );
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}
