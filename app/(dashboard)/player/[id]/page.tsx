import BookPlayer from '@/app/components/book-player';
import { getBook } from '@/services/books';

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  return <BookPlayer book={book} />;
}
