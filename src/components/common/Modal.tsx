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
  title?: ReactNode
  /** عرض مودال دسکتاپ */
  maxWidth?: number
}

// موبایل: شیت پایین با drag-to-dismiss / دسکتاپ: مودال وسط
export function Modal({ open, onClose, children, title, maxWidth = 440 }: Props) {
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()

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
            className="fixed inset-0 z-[100] bg-ink-900/40 backdrop-blur-[2px]"
          />
          {isMobile ? (
            <SheetBody onClose={onClose} title={title} reduced={reduced}>
              {children}
            </SheetBody>
          ) : (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto no-scrollbar rounded-3xl bg-white p-5 shadow-pop"
              style={{ maxWidth }}
            >
              {title && (
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-extrabold text-ink-900">{title}</div>
                  <button onClick={onClose} aria-label="بستن" className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100 text-ink-500">
                    <IconX size={16} />
                  </button>
                </div>
              )}
              {children}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

function SheetBody({ onClose, title, reduced, children }: { onClose: () => void; title?: ReactNode; reduced: boolean; children: ReactNode }) {
  const bind = useDrag(
    ({ movement: [, my], velocity: [, vy], cancel, event }) => {
      const t = event.target as HTMLElement
      if (t && t.closest('button, a, input, textarea, [role="button"]')) return
      if (my < 0) return
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
      className="fixed inset-x-0 bottom-0 z-[101] max-h-[85%] overflow-y-auto no-scrollbar rounded-t-4xl bg-white p-5 pb-[calc(var(--safe-bottom)+16px)] shadow-pop"
    >
      <div {...(bind() as any)} className="cursor-grab active:cursor-grabbing">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-sand-200" />
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <div className="font-extrabold text-ink-900">{title}</div>
            <button onClick={onClose} aria-label="بستن" className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-100 text-ink-500">
              <IconX size={16} />
            </button>
          </div>
        )}
      </div>
      <div>{children}</div>
    </motion.div>
  )
}
