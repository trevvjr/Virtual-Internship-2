import { getBooks } from '@/services/books';

export async function GET() {
  const signal = AbortSignal.timeout(10000);
  const feeds = await Promise.all([
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected', signal),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended', signal),
    getBooks('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested', signal),
  ]);
  const books = [...new Map(feeds.flat().map((book) => [book.id, book])).values()];

  return Response.json(
    books.map(({ id, title, author, subTitle, imageLink }) => ({
      id,
      title,
      author,
      subTitle,
      imageLink,
    })),
  );
}