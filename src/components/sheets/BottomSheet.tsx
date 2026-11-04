import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { IconX } from '../icons'
import { useIsMobile } from '../../lib/hooks'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** عنوان برای هدر شیت */
  title?: ReactNode
}

// شیت پایین (موبایل) / پنل داخل ستون (دسکتاپ)
export function BottomSheet({ open, onClose, children, title }: Props) {
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

  // دسکتاپ: پنل داخل ستون
  if (!isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl bg-white p-4 shadow-card"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="font-extrabold text-ink-900">{title}</div>
              <button onClick={onClose} aria-label="بستن" className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100 text-ink-500">
                <IconX size={16} />
              </button>
            </div>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // موبایل: شیت پایین با drag-to-dismiss
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-ink-900/30"
          />
          <SheetBody onClose={onClose} title={title} reduced={reduced}>
            {children}
          </SheetBody>
        </>
      )}
    </AnimatePresence>
  )
}

function SheetBody({
  onClose,
  title,
  reduced,
  children,
}: {
  onClose: () => void
  title?: ReactNode
  reduced: boolean
  children: ReactNode
}) {
  const bind = useDrag(
    ({ down, movement: [, my], velocity: [, vy], cancel, event }) => {
      // اگر روی دکمه یا عنصر قابل‌کلیک بود، درگ را نکن
      const t = event.target as HTMLElement
      if (t && t.closest('button, a, input, textarea, [role="button"]')) return
      if (my < 0) return // فقط به پایین
      if (my > 140 || vy > 0.6) {
        cancel?.()
        onClose()
      }
    },
    { axis: 'y', pointer: { touch: true } },
  )

  return (
    <motion.div
      initial={reduced ? false : { y: '100%' }}
      animate={{ y: 0 }}
      exit={reduced ? { opacity: 0 } : { y: '100%' }}
      transition={reduced ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 34 }}
      className="absolute inset-x-0 bottom-0 z-50 max-h-[78%] overflow-y-auto no-scrollbar rounded-t-4xl bg-white p-4 pb-[calc(var(--safe-bottom)+16px)] shadow-pop"
    >
      {/* نوار کشیدن (فقط این قسمت drag را راه‌اندازی می‌کند) */}
      <div {...(bind() as any)} className="cursor-grab active:cursor-grabbing">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-sand-200" />
        <div className="mb-3 flex items-center justify-between">
          <div className="font-extrabold text-ink-900">{title}</div>
          <button onClick={onClose} aria-label="بستن" className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100 text-ink-500">
            <IconX size={16} />
          </button>
        </div>
      </div>
      {/* محتوا: بدون gesture، کلیک‌ها و اسکرول طبیعی کار می‌کنند */}
      <div>{children}</div>
    </motion.div>
  )
}
