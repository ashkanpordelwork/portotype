import { useState } from 'react'
import type { Member } from '../../data/data'
import { Podium } from './Podium'
import { MemberRow } from './MemberRow'
import { ProfileSheet } from './ProfileSheet'
import { faNum } from '../../lib/persian'
import { IconScroll } from '../icons'

interface Props {
  members: Member[]
  isHistory?: boolean
  yearLabel?: string
  empty?: boolean
}

export function ScoreTable({ members, isHistory = false, yearLabel, empty = false }: Props) {
  const [selected, setSelected] = useState<Member | null>(null)

  if (empty) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100 text-ink-300">
          <IconScroll size={26} />
        </div>
        <p className="font-bold text-ink-700">برای این سال سابقه‌ای ثبت نشده</p>
        {yearLabel && <p className="mt-1 text-sm text-ink-500">{yearLabel}</p>}
      </div>
    )
  }

  const top3 = members.slice(0, 3)
  const rest = members.slice(3).map((m, i) => ({ m, rank: i + 4 }))

  return (
    <div className="rounded-3xl bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
          <IconScroll size={18} className="text-leaf-500" />
          جدول امتیاز {yearLabel ? `· ${yearLabel}` : ''}
        </h3>
        <span className="text-xs font-semibold text-ink-500">{faNum(members.length)} عضو</span>
      </div>

      {top3.length > 0 && <Podium members={top3} />}

      <div className="mt-3 space-y-1">
        {rest.map(({ m, rank }, i) => (
          <MemberRow
            key={m.id + rank}
            member={m}
            rank={rank}
            index={i}
            highlight={isHistory && m.isMe}
            onClick={() => setSelected(m)}
          />
        ))}
      </div>

      <ProfileSheet member={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
