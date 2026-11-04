import { motion } from 'framer-motion'
import type { Member } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { faNum } from '../../lib/persian'
import { useReducedMotion } from '../../lib/motion'
import { IconChevronLeft } from '../icons'

interface Props {
  member: Member
  rank: number
  highlight?: boolean
  index: number
  onClick: () => void
}

export function MemberRow({ member, rank, highlight, index, onClick }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.button
      initial={reduced ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.25 }}
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-right transition-colors',
        highlight ? 'bg-leaf-50 ring-1 ring-leaf-400' : 'hover:bg-sand-50',
      ].join(' ')}
    >
      <span className="w-5 shrink-0 text-center text-xs font-extrabold text-ink-500">{faNum(rank)}</span>
      <Avatar name={member.name} color={member.color} size={38} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-bold text-ink-900">{member.name}</p>
          {member.isMe && (
            <span className="shrink-0 rounded-full bg-sky-400 px-1.5 py-0.5 text-[9px] font-bold text-white">تو</span>
          )}
        </div>
        <p className="truncate text-[11px] text-ink-500">
          {member.role}
          {member.grad && <span className="mr-1 text-clay-500">· فارغ‌التحصیل</span>}
          {member.honorary && <span className="mr-1 text-sun-600">· عضو افتخاری</span>}
        </p>
      </div>
      <span className="shrink-0 text-sm font-extrabold text-leaf-600">{faNum(member.points)}</span>
      <IconChevronLeft size={16} className="shrink-0 text-ink-300" />
    </motion.button>
  )
}
