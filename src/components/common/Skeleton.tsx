// اسکلتون برای حالت بارگذاری
export function Skeleton({ className = '', rounded = 'rounded-2xl' }: { className?: string; rounded?: string }) {
  return (
    <div
      className={['animate-pulse bg-sand-200', rounded, className].join(' ')}
      aria-hidden
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="mt-3 h-8 w-2/3" />
      <Skeleton className="mt-3 h-2 w-full" rounded="rounded-full" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-10 w-10" rounded="rounded-full" />
        <Skeleton className="h-10 w-10" rounded="rounded-full" />
        <Skeleton className="h-10 w-10" rounded="rounded-full" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 border-b border-sand-100 py-3 last:border-0">
          <Skeleton className="h-9 w-9" rounded="rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  )
}
