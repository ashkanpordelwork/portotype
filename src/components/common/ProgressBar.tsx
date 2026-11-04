import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  value: number // ۰ تا ۱
  color?: string
  trackColor?: string
  height?: number
  className?: string
  animateOnEnter?: boolean
}

// نوار پیشرفت — پر شدن از راست هنگام ورود
export function ProgressBar({
  value,
  color = '#5E9C4A',
  trackColor = '#EADFC6',
  height = 8,
  className = '',
  animateOnEnter = true,
}: Props) {
  const reduced = useReducedMotion()
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div
      className={['relative w-full overflow-hidden rounded-full', className].join(' ')}
      style={{ height, background: trackColor }}
    >
      <motion.div
        className="absolute top-0 bottom-0 right-0 rounded-full"
        style={{ background: color }}
        initial={animateOnEnter && !reduced ? { width: 0 } : { width: `${pct}%` }}
        animate={{ width: `${pct}%` }}
        transition={reduced ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
