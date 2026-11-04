import { LIBRARY_INFO } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { Button3D } from '../common/Button3D'
import { faNum } from '../../lib/persian'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  onMessage: () => void
}

export function ManagerCard({ onMessage }: Props) {
  const reduced = useReducedMotion()
  const m = LIBRARY_INFO.manager
  const s = LIBRARY_INFO.stats
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
      className="rounded-3xl bg-white p-4 shadow-card"
    >
      <div className="flex items-center gap-3">
        <Avatar name={m.name} color={m.color} size={52} />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-ink-500">مسئول کتابخانه</p>
          <p className="truncate text-base font-extrabold text-ink-900">{m.name}</p>
          <p className="text-xs text-ink-500">{m.grade} · از {m.since}</p>
        </div>
        <Button3D variant="secondary" onClick={onMessage} className="px-3 py-2.5">
          پیام
        </Button3D>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat value={faNum(s.activeMembers)} label="عضو فعال" />
        <Stat value={faNum(s.openRoles)} label="نقش خالی" />
        <Stat value={faNum(s.yearsActive)} label="سال فعالیت" />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-500">{LIBRARY_INFO.description}</p>
    </motion.div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-2.5 text-center">
      <p className="text-lg font-extrabold text-leaf-600">{value}</p>
      <p className="text-[10px] font-semibold text-ink-500">{label}</p>
    </div>
  )
}
