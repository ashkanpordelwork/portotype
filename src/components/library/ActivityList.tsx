import { RECENT_ACTIVITIES } from '../../data/data'
import { faNum } from '../../lib/persian'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'
import { IconStar } from '../icons'

export function ActivityList() {
  const reduced = useReducedMotion()
  return (
    <div className="rounded-3xl bg-white p-4 shadow-card">
      <h3 className="mb-3 text-sm font-extrabold text-ink-900">فعالیت‌های اخیر</h3>
      <div className="space-y-1">
        {RECENT_ACTIVITIES.map((a, i) => (
          <motion.div
            key={a.id}
            initial={reduced ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.22 }}
            className="flex items-start gap-3 rounded-2xl px-2 py-2"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand-50 text-sun-500">
              <IconStar size={15} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] leading-snug text-ink-900">
                <span className="font-bold">{a.who}</span> {a.what}
              </p>
              <p className="text-[11px] text-ink-500">{a.when}{a.points ? ` · ${faNum(a.points)} امتیاز` : ''}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
