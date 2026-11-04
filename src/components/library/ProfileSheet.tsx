import { useState } from 'react'
import type { Member } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { Modal } from '../common/Modal'
import { faNum } from '../../lib/persian'
import { IconAward, IconBook, IconStar } from '../icons'

interface Props {
  member: Member | null
  onClose: () => void
}

export function ProfileSheet({ member, onClose }: Props) {
  const open = !!member
  return (
    <Modal open={open} onClose={onClose} title="پروفایل عضو">
      {member && <Body member={member} />}
    </Modal>
  )
}

function Body({ member }: { member: Member }) {
  const badges = member.badges ?? ['فعال']
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar name={member.name} color={member.color} size={64} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-ink-900">{member.name}</p>
          <p className="text-sm text-ink-500">{member.role}</p>
          {member.grad && <span className="text-xs text-clay-500">فارغ‌التحصیل</span>}
          {member.honorary && <span className="text-xs text-sun-600"> · عضو افتخاری</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Stat value={faNum(member.points)} label="امتیاز امسال" />
        <Stat value={faNum(badges.length)} label="تعداد نشان" />
        <Stat value={member.grad ? '—' : faNum(1)} label="سال فعالیت" />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold text-ink-500">نشان‌ها</p>
        <div className="flex flex-wrap gap-2">
          {badges.slice(0, 3).map((b, i) => (
            <span key={i} className="flex items-center gap-1.5 rounded-full bg-sand-50 px-3 py-1.5 text-xs font-bold text-ink-700">
              <IconAward size={14} className="text-sun-500" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-2.5 text-center">
      <p className="text-base font-extrabold text-leaf-600">{value}</p>
      <p className="text-[10px] font-semibold text-ink-500">{label}</p>
    </div>
  )
}
