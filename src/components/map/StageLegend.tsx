import { STAGES } from '../../data/data'

export function StageLegend({ className = '' }: { className?: string }) {
  return (
    <div className={['flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl bg-white/90 px-3 py-2 text-[11px] font-semibold text-ink-700 shadow-soft backdrop-blur-sm', className].join(' ')}>
      <span className="text-ink-500">مراحل:</span>
      {STAGES.map((s) => (
        <span key={s.id} className="flex items-center gap-1">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
  )
}
