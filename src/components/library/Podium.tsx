import { motion } from 'framer-motion'
import type { Member } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { faNum, faRank } from '../../lib/persian'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  members: Member[] // سه نفر اول
}

// سکوهای ۱ تا ۳ — سکوها از پایین بالا می‌آیند، بعد آواتارها
export function Podium({ members }: Props) {
  const reduced = useReducedMotion()
  // ترتیب نمایش: ۲ - ۱ - ۳ (وسط بلندتر)
  const order = [members[1], members[0], members[2]].filter(Boolean)
  const heights = [70, 96, 56] // به ترتیب ۲، ۱، ۳
  const medals = ['#A8A8A8', '#E9A23B', '#B5895A'] // نقره، طلا، برنز برای سکو

  return (
    <div className="flex items-end justify-center gap-2 px-2 pt-2">
      {order.map((m, idx) => {
        const realRank = m === members[0] ? 1 : m === members[1] ? 2 : 3
        const h = realRank === 1 ? heights[1] : realRank === 2 ? heights[0] : heights[2]
        const medal = realRank === 1 ? medals[1] : realRank === 2 ? medals[0] : medals[2]
        return (
          <div key={m.id + idx} className="flex flex-1 flex-col items-center" style={{ maxWidth: 110 }}>
            {/* آواتار */}
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25 + idx * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
            >
              <Avatar name={m.name} color={m.color} size={realRank === 1 ? 52 : 44} ring />
              <span
                className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white shadow-soft"
                style={{ background: medal }}
              >
                {faRank(realRank)}
              </span>
            </motion.div>
            <p className="mt-1.5 max-w-full truncate text-[11px] font-bold text-ink-900">{m.name}</p>
            <p className="text-[10px] font-semibold text-leaf-600">{faNum(m.points)}</p>
            {/* سکو */}
            <motion.div
              initial={reduced ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.05 + idx * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
              style={{ height: h, background: medal, transformOrigin: 'bottom', opacity: 0.85 }}
              className="mt-1 w-full rounded-t-xl"
            />
          </div>
        )
      })}
    </div>
  )
}
