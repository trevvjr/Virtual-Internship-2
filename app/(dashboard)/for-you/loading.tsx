import BookRowSkeleton from '../../components/book-row-skeleton';

function BookSectionSkeleton({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <section className="mt-8">
            <h2 className="mb-2 h-7 w-56 animate-pulse rounded-sm bg-[#e8edef]" aria-hidden="true" />
            <p className="mb-6 h-5 w-40 animate-pulse rounded-sm bg-[#eef1f2]" aria-hidden="true" />
            <BookRowSkeleton count={5} layout="for-you" />
            <span className="sr-only">Loading {title}: {subtitle}.</span>
        </section>
    );
}

export default function Loading() {
    return (
        <main className="mx-auto w-full max-w-[1070px] px-8 py-10" aria-busy="true" aria-label="Loading recommendations">
            <h1 className="mb-2 h-7 w-48 animate-pulse rounded-sm bg-[#e8edef]" aria-hidden="true" />

            <div className="mb-6 grid w-full max-w-[680px] grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] items-start gap-6 rounded bg-[#fbefd6] p-6 max-md:grid-cols-1 max-md:gap-4">
                <div className="h-24 animate-pulse rounded-sm bg-[#f3e4c7]" />
                <div className="h-32 w-px animate-pulse bg-[#e8edef] max-md:hidden" />
                <div className="flex items-center gap-4">
                    <div className="h-[112px] w-[112px] shrink-0 animate-pulse rounded-sm bg-[#e8edef]" />
                    <div className="flex-1 space-y-3">
                        <div className="h-5 w-4/5 animate-pulse rounded-sm bg-[#e8edef]" />
                        <div className="h-4 w-3/5 animate-pulse rounded-sm bg-[#eef1f2]" />
                        <div className="h-9 w-9 animate-pulse rounded-full bg-[#e8edef]" />
                    </div>
                </div>
            </div>

            <BookSectionSkeleton title="Recommended For You" subtitle="We think you will like these books" />
            <BookSectionSkeleton title="Suggested Books" subtitle="Browse suggested books" />
        </main>
    );
}