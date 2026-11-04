import { create } from 'zustand'
import { AnimatePresence, motion } from 'framer-motion'
import { IconCheck, IconClock, IconInfo } from '../icons'

export interface ToastItem {
  id: number
  text: string
  icon?: 'check' | 'clock' | 'info'
}

interface ToastStore {
  toasts: ToastItem[]
  push: (text: string, icon?: ToastItem['icon']) => void
  remove: (id: number) => void
}

let nextId = 1

export const useToast = create<ToastStore>((set, get) => ({
  toasts: [],
  push: (text, icon = 'check') => {
    const id = nextId++
    set({ toasts: [...get().toasts, { id, text, icon }] })
    setTimeout(() => get().remove(id), 3200)
  },
  remove: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}))

export function toast(text: string, icon?: ToastItem['icon']) {
  useToast.getState().push(text, icon)
}

export function ToastViewport() {
  const toasts = useToast((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed inset-x-0 top-[calc(var(--safe-top)+12px)] z-[200] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastBubble key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastBubble({ toast }: { toast: ToastItem }) {
  const remove = useToast((s) => s.remove)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-ink-900 px-4 py-2.5 text-sm font-medium text-white shadow-pop"
      onClick={() => remove(toast.id)}
    >
      <span className="text-sun-400">
        {toast.icon === 'check' && <IconCheck size={16} />}
        {toast.icon === 'clock' && <IconClock size={16} />}
        {toast.icon === 'info' && <IconInfo size={16} />}
      </span>
      <span>{toast.text}</span>
    </motion.div>
  )
}
