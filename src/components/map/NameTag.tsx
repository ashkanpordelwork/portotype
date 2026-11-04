import { motion } from 'framer-motion'
import { faNum } from '../../lib/persian'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  name: string
  stageColor: string
  stageName: string
  progress: number // ۰..۱
  selected: boolean
  dimmed: boolean
  onClick: () => void
}

export function NameTag({ name, stageColor, stageName, progress, selected, dimmed, onClick }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      animate={{ opacity: dimmed ? 0.45 : 1, scale: selected ? 1.08 : 1 }}
      transition={{ duration: 0.2 }}
      className="relative flex flex-col items-center whitespace-nowrap rounded-2xl bg-white/95 px-3 py-1.5 shadow-card backdrop-blur-sm"
      style={{
        border: selected ? `2px solid ${stageColor}` : '2px solid transparent',
      }}
    >
      <span className="text-[13px] font-extrabold text-ink-900">{name}</span>
      <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold" style={{ color: stageColor }}>
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: stageColor }} />
        {stageName} · {faNum(Math.round(progress * 100))}٪
      </span>
      {/* اشاره‌گر پایین */}
      <span
        className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] bg-white/95"
        style={{ borderRight: selected ? `2px solid ${stageColor}` : '2px solid transparent', borderBottom: selected ? `2px solid ${stageColor}` : '2px solid transparent' }}
      />
    </motion.button>
  )
}
