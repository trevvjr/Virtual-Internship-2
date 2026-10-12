'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LuClock, LuStar } from 'react-icons/lu';
import type { Book } from '@/services/books';
import { getSavedBooks, LIBRARY_CHANGE_EVENT } from '@/services/library';
import BookDuration from './book-duration';
import LibraryLoginPrompt from './library-login-prompt';
import { useAuth } from './auth-provider';

function LibraryBook({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`} className="block w-[172px] shrink-0 text-[#032b41]">
      <img
        src={book.imageLink}
        alt={book.title}
        className="mb-2 aspect-square w-full object-cover"
      />
      <h3 className="mb-1 line-clamp-2 text-base font-bold">{book.title}</h3>
      <p className="mb-2 text-sm font-light text-[#78858a]">{book.author}</p>
      {book.subTitle && <p className="mb-2 line-clamp-2 text-sm">{book.subTitle}</p>}
      <div className="flex items-center gap-2 text-sm text-[#78858a]">
        <span className="inline-flex items-center gap-1">
          <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
          <BookDuration audioLink={book.audioLink} />
        </span>
        <span className="inline-flex items-center gap-1">
          <LuStar className="h-3.5 w-3.5" aria-hidden="true" />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}

function BookSection({ title, books, emptyMessage }: {
  title: string;
  books: Book[];
  emptyMessage?: string;
}) {
  return (
    <section className="mb-10">
      <h1 className="mb-3 text-[22px] font-bold text-[#032b41]">{title}</h1>
      <p className="mb-8 text-base font-light text-[#78858a]">
        {books.length} {books.length === 1 ? 'item' : 'items'}
      </p>
      {books.length > 0 ? (
        <div className="flex gap-10 overflow-x-auto pb-2" aria-label={title}>
          {books.map((book) => <LibraryBook key={book.id} book={book} />)}
        </div>
      ) : (
        <div className="mx-auto max-w-[400px] rounded-[10px] bg-[#f1f6f4] px-6 py-5 text-center text-[#032b41]">
          {title === 'Saved Books' ? (
            <>
              <p className="w-full h-full mb-1 font-bold">Save your favorite books!</p>
              <p className="w-full h-full mb-2 text-base text-[#394547]">When you save a book, it will appear here.</p>
            </>
          ) : (
            <>
              <p className="w-full h-full mb-1 font-bold">Done and dusted!</p>
              <p className='w-full h-full mb-2 text-base text-[#394547]'>When you finish a book, you can find it here later.</p>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default function LibraryClient({ books }: { books: Book[] }) {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    const syncSavedBooks = () => setSavedBooks(getSavedBooks());
    syncSavedBooks();
    window.addEventListener(LIBRARY_CHANGE_EVENT, syncSavedBooks);
    window.addEventListener('storage', syncSavedBooks);

    return () => {
      window.removeEventListener(LIBRARY_CHANGE_EVENT, syncSavedBooks);
      window.removeEventListener('storage', syncSavedBooks);
    };
  }, []);

  if (loading) return null;
  if (!user) return <LibraryLoginPrompt />;

  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8">
      <BookSection title="Saved Books" books={savedBooks} emptyMessage="No books saved yet." />
      <BookSection title="Finished" books={books} />
    </main>
  );
}