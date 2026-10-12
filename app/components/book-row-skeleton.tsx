type BookRowSkeletonProps = {
  count: number;
  layout: 'for-you' | 'library';
};

export default function BookRowSkeleton({ count, layout }: BookRowSkeletonProps) {
  const isForYou = layout === 'for-you';

  return (
    <div
      className={isForYou
        ? 'grid grid-flow-col auto-cols-[196px] gap-4 overflow-hidden'
        : 'flex gap-10 overflow-hidden'}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`${isForYou ? 'w-[196px]' : 'w-[172px]'} shrink-0 animate-pulse`}
        >
          <div
            className={`mb-2 w-full bg-[#e8edef] ${isForYou ? 'h-[172px]' : 'aspect-square'}`}
          />
          <div className="mb-2 h-5 w-4/5 rounded-sm bg-[#e8edef]" />
          <div className="mb-3 h-4 w-3/5 rounded-sm bg-[#eef1f2]" />
          <div className="mb-2 h-4 w-full rounded-sm bg-[#eef1f2]" />
          <div className="h-4 w-2/3 rounded-sm bg-[#eef1f2]" />
        </div>
      ))}
    </div>
  );
}