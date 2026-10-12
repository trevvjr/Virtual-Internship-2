import { getBook } from '@/services/books';
import BookDuration from '@/app/components/book-duration';
import AddToLibraryButton from '@/app/components/add-to-library-button';
import BookReadButton from '@/app/components/book-read-button';
import Link from 'next/link';
import { LuClock, LuLightbulb, LuMic, LuStar } from 'react-icons/lu';

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(id);

  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 py-10">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="order-last text-[#032b41] md:order-first">
          <h1 className="mb-4 text-3xl font-semibold leading-tight">{book.title}</h1>
          <p className="mb-4 text-medium font-semibold">{book.author}</p>
          <p className='text-xl text-gray-600 font-light'>{book.subTitle}</p>

          <div className="grid grid-cols-2 my-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-[#e1e7ea] py-5 text-sm font-medium text-[#032b41]">
            <span className="inline-flex items-center gap-2">
              <LuStar className="h-4 w-4" aria-hidden="true" />
              {book.averageRating} ({book.totalRating} ratings)
            </span>
            <span className="inline-flex items-center gap-2">
              <LuClock className="h-4 w-4" aria-hidden="true" />
              <BookDuration audioLink={book.audioLink} />
            </span>
            <span className="inline-flex items-center gap-2">
              <LuMic className="h-4 w-4" aria-hidden="true" />
              {book.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <LuLightbulb className="h-4 w-4" aria-hidden="true" />
              {book.keyIdeas} Key ideas
            </span>
          </div>
          <div className="mt-6 flex gap-3">
            <BookReadButton bookId={id} subscriptionRequired={book.subscriptionRequired} />
            <Link 
              href={`/book/${id}/listen`}
              className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded bg-[#032b41] text-base text-white transition-opacity duration-200 hover:opacity-80 sm:w-36 sm:flex-none">
              <LuMic className="h-6 w-6" aria-hidden="true" />
              Listen
            </Link>
          </div>

          <AddToLibraryButton book={book} />

          <section className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">What&apos;s it about?</h2>
            <div className="mb-3 flex flex-wrap gap-2">
              {book.tags?.map((tag) => (
                <span key={tag} className="inline-flex h-12 items-center rounded bg-[#f1f6f4] px-4 text-base font-medium text-[#032b41]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="leading-relaxed">{book.bookDescription}</p>
          </section>

          <section className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">About the author</h2>
            <p className="leading-relaxed">{book.authorDescription}</p>
          </section>
        </div>

        {book.imageLink && (
          <img
            src={book.imageLink}
            alt={book.title}
            className="order-first mx-auto aspect-square w-full max-w-[300px] object-cover md:order-last md:mx-0"
          />
        )}
      </section>
    </main>
  );
}