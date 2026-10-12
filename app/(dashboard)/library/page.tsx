import LibraryClient from '../../components/library-client';
import { getBooks } from '@/services/books';

export default async function LibraryPage() {
  const finishedBooks = await getBooks(
    'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=finished',
  );

  return <LibraryClient books={finishedBooks} />;
}