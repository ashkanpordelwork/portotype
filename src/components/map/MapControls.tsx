import { motion } from 'framer-motion'
import { IconLocate, IconMinus, IconPlus } from '../icons'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
}

export function MapControls({ onZoomIn, onZoomOut, onLocate }: Props) {
  const reduced = useReducedMotion()
  const btn =
    'flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-ink-700 shadow-card active:bg-sand-100'
  return (
    <div className="absolute bottom-[calc(var(--safe-bottom)+88px)] left-3 z-30 flex flex-col gap-2 md:bottom-4">
      <motion.button
        whileTap={reduced ? undefined : { scale: 0.92 }}
        onClick={onZoomIn}
        className={btn}
        aria-label="بزرگ‌نمایی"
      >
        <IconPlus size={20} />
      </motion.button>
      <motion.button
        whileTap={reduced ? undefined : { scale: 0.92 }}
        onClick={onZoomOut}
        className={btn}
        aria-label="کوچک‌نمایی"
      >
        <IconMinus size={20} />
      </motion.button>
      <motion.button
        whileTap={reduced ? undefined : { scale: 0.92 }}
        onClick={onLocate}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-leaf-500 text-white shadow-card active:bg-leaf-600"
        aria-label="مکان من"
      >
        <IconLocate size={20} />
      </motion.button>
    </div>
  )
}
