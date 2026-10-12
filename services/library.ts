import type { Book } from './books';

const LIBRARY_STORAGE_KEY = 'summarist:savedBooks';
const LIBRARY_CHANGE_EVENT = 'summarist-library-change';

export function getSavedBooks(): Book[] {
  if (typeof window === 'undefined') return [];

  try {
    const savedBooks: unknown = JSON.parse(window.localStorage.getItem(LIBRARY_STORAGE_KEY) ?? '[]');
    if (!Array.isArray(savedBooks)) return [];

    return savedBooks.filter(
      (book): book is Book =>
        typeof book === 'object' &&
        book !== null &&
        typeof book.id === 'string' &&
        typeof book.title === 'string' &&
        typeof book.author === 'string',
    );
  } catch {
    return [];
  }
}

export function toggleSavedBook(book: Book): boolean {
  const savedBooks = getSavedBooks();
  const isSaved = savedBooks.some((savedBook) => savedBook.id === book.id);
  const updatedBooks = isSaved
    ? savedBooks.filter((savedBook) => savedBook.id !== book.id)
    : [...savedBooks, book];

  window.localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(updatedBooks));
  window.dispatchEvent(new Event(LIBRARY_CHANGE_EVENT));

  return !isSaved;
}

export { LIBRARY_CHANGE_EVENT };