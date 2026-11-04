import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Chip({ children, active = false, onClick, className = '' }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
        active
          ? 'bg-leaf-500 text-white shadow-soft'
          : 'bg-sand-100 text-ink-700 hover:bg-sand-200',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

// چیپ رنگی مرحله
export function StageChip({
  name,
  color,
  active = false,
}: {
  name: string
  color: string
  active?: boolean
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold',
        active ? 'text-white' : 'text-ink-700',
      ].join(' ')}
      style={active ? { background: color } : { background: color + '22' }}
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
      {name}
    </span>
  )
}
