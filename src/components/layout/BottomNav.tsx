import { NavLink, useLocation } from 'react-router-dom'
import { sectionForPath, activeTabId } from './tabs'

export function BottomNav() {
  const { pathname } = useLocation()
  const section = sectionForPath(pathname)
  const activeId = activeTabId(pathname, section)

  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-40 flex items-stretch border-t border-sand-200 bg-sand-50/95 px-2 pb-[calc(var(--safe-bottom)+6px)] pt-1.5 backdrop-blur-md"
    >
      {section.tabs.map((t) => {
        const active = activeId === t.id
        const Icon = t.icon
        return (
          <NavLink
            key={t.id}
            to={t.to}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5"
          >
            <span
              className={[
                'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                active ? 'bg-leaf-500 text-white' : 'text-ink-500',
              ].join(' ')}
            >
              <Icon size={20} />
            </span>
            <span className={['text-[10px] font-bold', active ? 'text-leaf-600' : 'text-ink-500'].join(' ')}>
              {t.label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}
