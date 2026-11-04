import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { DesktopTabs } from './DesktopTabs'
import { ToastViewport } from '../common/Toast'
import { ReducedMotionContext } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../lib/hooks'

export function AppShell() {
  const reduced = usePrefersReducedMotion()
  return (
    <ReducedMotionContext.Provider value={reduced}>
      <div className="flex h-full flex-col">
        <Header tabs={<DesktopTabs />} />
        <main className="relative flex-1 overflow-hidden">
          {/* ستون محتوا: روی دسکتاپ ۵۶۰ وسط، روی موبایل تمام‌عرض */}
          <div className="mx-auto h-full w-full max-w-[600px]">
            <Outlet />
          </div>
        </main>
        {/* منوی پایین فقط موبایل */}
        <div className="md:hidden">
          <BottomNav />
        </div>
        <ToastViewport />
      </div>
    </ReducedMotionContext.Provider>
  )
}
