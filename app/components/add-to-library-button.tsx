'use client';

import { useEffect, useState } from 'react';
import { LuBookmark } from 'react-icons/lu';
import type { Book } from '@/services/books';
import { getSavedBooks, LIBRARY_CHANGE_EVENT, toggleSavedBook } from '@/services/library';

export default function AddToLibraryButton({ book }: { book: Book }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const syncSavedState = () => {
      setSaved(getSavedBooks().some((savedBook) => savedBook.id === book.id));
    };

    syncSavedState();
    window.addEventListener(LIBRARY_CHANGE_EVENT, syncSavedState);
    window.addEventListener('storage', syncSavedState);

    return () => {
      window.removeEventListener(LIBRARY_CHANGE_EVENT, syncSavedState);
      window.removeEventListener('storage', syncSavedState);
    };
  }, [book.id]);

  return (
    <button
      type="button"
      onClick={() => setSaved(toggleSavedBook(book))}
      className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-blue-500 transition-colors duration-200 hover:text-blue-700 hover:cursor-pointer"
    >
      <LuBookmark className="h-7 w-7" aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
      {saved ? 'Saved in My Library' : 'Add title to My Library'}
    </button>
  );
}
