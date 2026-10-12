import BookRowSkeleton from '../../components/book-row-skeleton';

function BookSectionSkeleton({ title, count }: { title: string; count: number }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 h-7 w-36 animate-pulse rounded-sm bg-[#e8edef]" aria-hidden="true" />
      <p className="mb-8 h-5 w-20 animate-pulse rounded-sm bg-[#eef1f2]" aria-hidden="true" />
      <BookRowSkeleton count={count} layout="library" />
      <span className="sr-only">Loading {title.toLowerCase()}.</span>
    </section>
  );
}

export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8"
      aria-busy="true"
      aria-label="Loading your library"
    >
      <BookSectionSkeleton title="Saved Books" count={1} />
      <BookSectionSkeleton title="Finished" count={4} />
    </main>
  );
}