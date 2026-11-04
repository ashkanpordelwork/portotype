import { faNum } from '../../lib/persian'

interface Props {
  name: string
  color: string
  size?: number
  className?: string
  ring?: boolean
}

// آواتار ساده با حرف اول نام روی رنگ
export function Avatar({ name, color, size = 40, className = '', ring = false }: Props) {
  const initial = name.trim().charAt(0)
  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-full font-bold text-white',
        ring ? 'ring-2 ring-white' : '',
        className,
      ].join(' ')}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.42,
      }}
      aria-label={name}
    >
      {initial}
    </div>
  )
}

// نشان سطح کنار آواتار
export function LevelBadge({ level, size = 36 }: { level: number; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-sun-500 font-extrabold text-white shadow-soft"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      title={`سطح ${faNum(level)}`}
    >
      {faNum(level)}
    </div>
  )
}
