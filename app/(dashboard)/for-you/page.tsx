import ForYouClient from '../../components/for-you-client';
import { getBooks } from '@/services/books';

export default async function ForYouPage() {
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected'),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended'),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested')
  ])

  return (
    <ForYouClient
      selectedBook={selectedBooks[0] ?? null}
      recommendedBooks={recommendedBooks}
      suggestedBooks={suggestedBooks}
    />
  );
}