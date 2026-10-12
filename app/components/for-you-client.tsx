'use client';

import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { LuClock } from 'react-icons/lu';
import { FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import BookDuration from './book-duration';

type Book = {
  id: string;
  title: string;
  author: string;
  subTitle?: string;
  imageLink?: string;
  audioLink?: string;
  averageRating?: number;
  totalRating?: number;
  subscriptionRequired?:boolean;
};

type ForYouClientProps ={
    recommendedBooks: Book[];
    suggestedBooks: Book[];
    selectedBook: Book | null;
};

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes} min${minutes === 1 ? '' : 's'} ${seconds} sec${seconds === 1 ? '' : 's'}`;
}

function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`} className="block min-w-0 px-3">
      <article className="min-w-0">
        <div className="relative mb-2">
          {book.subscriptionRequired && (
            <span className='absolute right-1 top-1 rounded bg-[#032b41] px-2 py-1 text-xs font-medium text-white'>
              Premium
            </span>
          )}
        {book.imageLink && (
          <img src={book.imageLink} alt={book.title} className="mb-2 h-[172px] w-full object-cover" />
        )}
        </div>
        <h3 className="mb-1 text-base font-bold text-[#032b41]">{book.title}</h3>
        <p className="text-sm font-light text-[#394547]">{book.author}</p>
        {book.subTitle && <p className="text-sm text-[#394547]">{book.subTitle}</p>}
        <div className="mt-2 flex items-center gap-3 text-sm text-[#032b41]">
          <span className="inline-flex items-center gap-1">
            <LuClock className="h-3.5 w-3.5" aria-hidden="true" />
            <BookDuration audioLink={book.audioLink} />
          </span>
          {typeof book.averageRating === 'number' && (
            <span className="inline-flex items-center gap-1">
              <FaRegStar className="h-3.5 w-3.5" aria-hidden="true" />
              {book.averageRating}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}



export default function ForYouClient({ recommendedBooks, suggestedBooks, selectedBook }: ForYouClientProps) {
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedBook?.audioLink) {
      return;
    }

    const audio = new Audio(selectedBook.audioLink);
    const handleLoadedMetadata = () => setDuration(formatDuration(audio.duration));
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [selectedBook?.audioLink]);

  return (
    <main className="mx-auto w-full max-w-[1070px] px-8 py-10">
          <h1 className="mb-2 text-[22px] font-bold text-[#032b41]">Selected just for you</h1>

          {selectedBook && (
            <Link href={`/book/${selectedBook.id}`}>
              <article className="mb-6 grid w-full max-w-[680px] grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] items-start gap-6 rounded bg-[#fbefd6] p-6 max-md:grid-cols-1 max-md:gap-4">
                <div className="min-w-0 self-start">
                  <p className="text-left text-base leading-relaxed text-[#394547]">
                    {selectedBook.subTitle}
                  </p>
                </div>

              <div className="h-32 w-px justify-self-center bg-[#bac8ce] max-md:hidden" />

              <div className="flex min-w-0 items-center gap-4 max-md:w-full max-md:gap-3 max-md:justify-center">
                <div className="flex w-[140px] shrink-0 items-start overflow-hidden rounded-lg max-md:w-[100px]">
                  <img src={selectedBook.imageLink} alt={selectedBook.title} className="aspect-square w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h2 className="mb-2 font-semibold text-[#032b41]">{selectedBook.title}</h2>
                  <p className="mb-3 text-sm text-[#394547]">{selectedBook.author}</p>
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <button
                      type="button"
                      aria-label={`Play ${selectedBook.title} summary`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#032b41] text-white"
                    >
                      <FaPlay className="h-3 w-3 translate-x-0.5" aria-hidden="true" />
                    </button>
                    {duration && <span className="whitespace-nowrap text-sm text-[#032b41]">{duration}</span>}
                  </div>
                </div>
              </div>
            </article>
            </Link>
          )}

          <section className="mt-8">
            <h2 className="mb-2 text-[22px] font-bold text-[#032b41]">Recommended For You</h2>
            <p className="mb-6 text-base font-light text-[#394547]">We think you&apos;ll like these</p>
            <div 
                className="grid grid-flow-col auto-cols-[196px] gap-4 overflow-x-auto"
                aria-label="Recommended books"
                >
              {recommendedBooks.filter((book) => !book.title.toLowerCase().includes('The Lean Startup')).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
          <section className='mt-8'>
            <h2 className='mb-2 text-[22px] font-bold text-[#032b41]'>Suggested Books</h2> 
            <p className='mb-6 text-base font-light text-[#394547]'>Browse those books</p>
            <div 
                className="grid grid-flow-col auto-cols-[196px] gap-4 overflow-x-auto"
                aria-label="Suggested books"
                >
              {suggestedBooks.filter((book) => !book.title.toLowerCase().includes('The Lean Startup')).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
    </main>
  );
}
