import { LIBRARY_INFO } from '../../data/data'
import { stageById, STAGES } from '../../data/data'
import { ProgressBar } from '../common/ProgressBar'
import { faNum } from '../../lib/persian'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'

export function LevelCard() {
  const stage = stageById(LIBRARY_INFO.stage)
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-3xl p-4 shadow-card"
      style={{ background: `linear-gradient(135deg, ${stage.color} 0%, ${stage.color}dd 100%)` }}
    >
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-xs font-semibold opacity-80">مرحله‌ی کتابخانه</p>
          <p className="text-2xl font-extrabold">{stage.name}</p>
        </div>
        <div className="flex items-center gap-1">
          {STAGES.map((s, i) => {
            const filled = i <= stage.order
            return (
              <motion.div
                key={s.id}
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                className="h-9 w-9 rounded-xl border-2 border-white/60"
                style={{ background: filled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)' }}
                title={s.name}
              />
            )
          })}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-white">
        <span className="text-xs font-semibold opacity-80">امتیاز کل</span>
        <span className="text-lg font-extrabold">{faNum(LIBRARY_INFO.totalPoints)}</span>
      </div>
      <ProgressBar value={LIBRARY_INFO.progress} color="#ffffff" trackColor="rgba(255,255,255,0.25)" height={6} animateOnEnter={false} />
    </motion.div>
  )
}
