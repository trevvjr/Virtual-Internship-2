export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8" aria-busy="true" aria-label="Searching books">
      <div className="mb-2 h-7 w-48 animate-pulse rounded-sm bg-[#e8edef]" />
      <div className="mb-6 h-5 w-56 animate-pulse rounded-sm bg-[#eef1f2]" />
      <div className="divide-y divide-[#e1e7ea]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-6">
            <div className="aspect-square w-full animate-pulse bg-[#e8edef]" />
            <div className="space-y-3 py-1">
              <div className="h-6 w-4/5 animate-pulse rounded-sm bg-[#e8edef]" />
              <div className="h-4 w-2/5 animate-pulse rounded-sm bg-[#eef1f2]" />
              <div className="h-4 w-full animate-pulse rounded-sm bg-[#eef1f2]" />
              <div className="h-4 w-3/5 animate-pulse rounded-sm bg-[#eef1f2]" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Searching books.</span>
    </main>
  );
}