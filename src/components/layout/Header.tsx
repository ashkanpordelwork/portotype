import type { ReactNode } from 'react'
import { Avatar, LevelBadge } from '../common/Avatar'
import { ME } from '../../data/data'
import { faNum } from '../../lib/persian'
import { IconBell, IconFlame } from '../icons'
import { useIsMobile } from '../../lib/hooks'

interface Props {
  title?: string
  subtitle?: string
  onBack?: () => void
  tabs?: ReactNode
}

export function Header({ title, subtitle, onBack, tabs }: Props) {
  const isMobile = useIsMobile()
  return (
    <header className="flex items-center gap-2 bg-sand-50/90 px-3 py-2.5 backdrop-blur-sm md:px-6">
      {/* آواتار + سطح */}
      <div className="relative flex items-center">
        <Avatar name={ME.name} color={ME.avatarColor} size={isMobile ? 38 : 42} />
        <div className="absolute -bottom-1 -left-1.5">
          <LevelBadge level={ME.level} size={22} />
        </div>
      </div>

      {/* عنوان */}
      {(title || onBack) && (
        <div className="min-w-0 flex-1">
          {onBack ? (
            <button onClick={onBack} className="text-sm font-extrabold text-ink-900">{title}</button>
          ) : (
            <p className="truncate text-sm font-extrabold text-ink-900">{title}</p>
          )}
          {subtitle && <p className="truncate text-[11px] text-ink-500">{subtitle}</p>}
        </div>
      )}
      {!title && <div className="flex-1" />}

      {/* تب‌های دسکتاپ (اختیاری) */}
      {tabs && <div className="hidden md:block">{tabs}</div>}

      {/* روز پیاپی */}
      <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 shadow-soft">
        <IconFlame size={16} className="text-clay-500" />
        <span className="text-xs font-extrabold text-clay-500">{faNum(ME.streak)}</span>
        <span className="hidden text-[10px] text-ink-500 sm:inline">روز پیاپی</span>
      </div>

      {/* اعلان‌ها */}
      <button aria-label="اعلان‌ها" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft">
        <IconBell size={18} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-clay-500" />
      </button>
    </header>
  )
}
