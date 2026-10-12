export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[1070px] px-6 pb-36 pt-8 md:px-8" aria-busy="true" aria-label="Loading book player">
      <article className="mx-auto max-w-[760px] animate-pulse">
        <div className="mb-7 h-8 w-4/5 border-b border-[#e1e7ea] pb-5">
          <div className="h-6 w-full rounded-sm bg-[#e8edef]" />
        </div>
        <div className="mb-6 flex justify-end gap-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-8 w-10 rounded-sm bg-[#eef1f2]" />
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-full rounded-sm bg-[#e8edef]" />
              <div className="h-4 w-full rounded-sm bg-[#eef1f2]" />
              <div className="h-4 w-4/5 rounded-sm bg-[#eef1f2]" />
            </div>
          ))}
        </div>
      </article>
      <div className="fixed bottom-0 left-0 h-20 w-full animate-pulse border-t border-[#dce3e6] bg-white md:left-[200px] md:w-[calc(100%-200px)]">
        <div className="flex h-full items-center justify-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#e8edef]" />
          <div className="h-12 w-12 rounded-full bg-[#e8edef]" />
          <div className="h-12 w-12 rounded-full bg-[#e8edef]" />
        </div>
      </div>
    </main>
  );
}
