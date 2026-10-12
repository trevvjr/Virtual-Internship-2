export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 py-10" aria-busy="true" aria-label="Loading book details">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="order-last animate-pulse space-y-4 md:order-first">
          <div className="h-9 w-4/5 rounded-sm bg-[#e8edef]" />
          <div className="h-5 w-2/5 rounded-sm bg-[#eef1f2]" />
          <div className="h-6 w-3/4 rounded-sm bg-[#eef1f2]" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-[#e1e7ea] py-5">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-5 animate-pulse rounded-sm bg-[#e8edef]" />
            ))}
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-36 animate-pulse rounded-sm bg-[#e8edef]" />
            <div className="h-12 w-36 animate-pulse rounded-sm bg-[#e8edef]" />
          </div>
          <div className="h-7 w-48 animate-pulse rounded-sm bg-[#e8edef]" />
          <div className="h-24 w-full animate-pulse rounded-sm bg-[#eef1f2]" />
          <div className="h-7 w-40 animate-pulse rounded-sm bg-[#e8edef]" />
          <div className="h-24 w-full animate-pulse rounded-sm bg-[#eef1f2]" />
        </div>

        <div className="order-first mx-auto aspect-square w-full max-w-[300px] animate-pulse bg-[#e8edef] md:order-last" />
      </section>
      <span className="sr-only">Loading book details.</span>
    </main>
  );
}