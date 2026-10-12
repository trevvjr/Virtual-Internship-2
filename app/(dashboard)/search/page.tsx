import Link from 'next/link';
import { LuClock, LuStar } from 'react-icons/lu';
import BookDuration from '../../components/book-duration';
import { getBooks, type Book } from '@/services/books';

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function SearchResult({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-[#e1e7ea] py-4 text-[#032b41] sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-6"
    >
      <img src={book.imageLink} alt={book.title} className="aspect-square w-full object-cover" />
      <div className="min-w-0">
        <h2 className="mb-1 text-lg font-bold">{book.title}</h2>
        <p className="mb-2 text-sm text-[#78858a]">{book.author}</p>
        <p className="mb-3 line-clamp-2 text-sm">{book.subTitle}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#78858a]">
          <span className="inline-flex items-center gap-1">
            <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
            <BookDuration audioLink={book.audioLink} />
          </span>
          <span className="inline-flex items-center gap-1">
            <LuStar className="h-3.5 w-3.5" aria-hidden="true" />
            {book.averageRating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const queryValue = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = queryValue?.trim() ?? '';

  if (!query) {
    return (
      <main className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8">
        <h1 className="mb-2 text-[22px] font-bold text-[#032b41]">Search books</h1>
        <p className="text-base font-light text-[#78858a]">Enter a title, author, or keyword to find a book.</p>
      </main>
    );
  }

  const feeds = await Promise.all([
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected'),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended'),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested'),
  ]);
  const books = [...new Map(feeds.flat().map((book) => [book.id, book])).values()];
  const normalizedQuery = query.toLocaleLowerCase();
  const results = books.filter((book) =>
    [book.title, book.author, book.subTitle, ...book.tags]
      .join(' ')
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  );

  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8">
      <h1 className="mb-2 text-[22px] font-bold text-[#032b41]">Search results</h1>
      <p className="mb-6 text-base font-light text-[#78858a]">
        {results.length} {results.length === 1 ? 'book' : 'books'} for “{query}”
      </p>
      {results.length > 0 ? (
        <div>
          {results.map((book) => <SearchResult key={book.id} book={book} />)}
        </div>
      ) : (
        <p className="text-sm text-[#78858a]">No books found. Try another title, author, or keyword.</p>
      )}
    </main>
  );
}