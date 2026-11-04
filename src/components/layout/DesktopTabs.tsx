import { NavLink, useLocation } from 'react-router-dom'
import { sectionForPath, activeTabId } from './tabs'

// تب‌های دسکتاپ در هدر بالا (به‌جای منوی پایین موبایل)
export function DesktopTabs() {
  const { pathname } = useLocation()
  const section = sectionForPath(pathname)
  const activeId = activeTabId(pathname, section)

  return (
    <div className="flex items-center gap-1">
      {section.tabs.map((t) => {
        const active = activeId === t.id
        const Icon = t.icon
        return (
          <NavLink
            key={t.id}
            to={t.to}
            className={[
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors',
              active ? 'bg-leaf-500 text-white shadow-soft' : 'text-ink-500 hover:bg-sand-100',
            ].join(' ')}
          >
            <Icon size={16} />
            {t.label}
            {t.comingSoon && <span className="rounded-full bg-sand-200 px-1 text-[8px] text-ink-500">به‌زودی</span>}
          </NavLink>
        )
      })}
    </div>
  )
}
