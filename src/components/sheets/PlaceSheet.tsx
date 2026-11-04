import type { Place } from '../../data/data'
import { stageById, STAGES } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { ProgressBar } from '../common/ProgressBar'
import { Button3D } from '../common/Button3D'
import { StageChip } from '../common/Chip'
import { faNum } from '../../lib/persian'
import { toast } from '../common/Toast'

interface Props {
  place: Place
  onEnter: () => void   // ورود به کتابخانه
  onDetails: () => void // جزئیات
}

export function PlaceSheet({ place, onEnter, onDetails }: Props) {
  const stage = stageById(place.stage)
  const stageIndex = stage.order

  const handleEnter = () => {
    if (place.canEnter) {
      onEnter()
    } else {
      toast('این مکان هنوز در نسخه‌ی آزمایشی نیست', 'info')
    }
  }

  return (
    <div className="space-y-4">
      {/* عنوان و مرحله */}
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-extrabold text-ink-900">{place.name}</h3>
          <StageChip name={stage.name} color={stage.color} active />
        </div>
        <p className="mt-1 text-sm text-ink-500">
          {place.domain}، {faNum(place.rolesFilled ?? 0)} از {faNum(place.rolesTotal ?? 0)} نقش پر شده
        </p>
      </div>

      {/* نوار مراحل */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-ink-500">
          <span>مسیر رشد</span>
          <span>{faNum(Math.round(place.progress * 100))}٪</span>
        </div>
        <div className="flex items-center gap-1.5">
          {STAGES.map((s, i) => (
            <div key={s.id} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="h-2 w-full rounded-full"
                style={{ background: i <= stageIndex ? s.color : '#EADFC6' }}
              />
              <span className="text-[9px] font-bold" style={{ color: i <= stageIndex ? s.color : '#A9AE9C' }}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <ProgressBar value={place.progress} color={stage.color} className="mt-3" height={6} />
      </div>

      {/* مسئول و اعضا */}
      {place.manager && (
        <div className="flex items-center gap-3 rounded-2xl bg-sand-50 p-3">
          <Avatar name={place.manager} color={stage.color} size={40} />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-ink-500">مسئول</p>
            <p className="truncate text-sm font-bold text-ink-900">{place.manager}</p>
          </div>
          {place.memberColors && place.memberColors.length > 0 && (
            <div className="flex -space-x-2 space-x-reverse">
              {place.memberColors.slice(0, 4).map((c, i) => (
                <Avatar key={i} name="" color={c} size={28} ring />
              ))}
              {place.memberColors.length > 4 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sand-200 text-[10px] font-bold text-ink-700 ring-2 ring-white">
                  +{faNum(place.memberColors.length - 4)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* دکمه‌ها */}
      <div className="flex gap-2">
        <Button3D className="flex-1" onClick={handleEnter}>
          {place.canEnter ? 'ورود به کتابخانه' : 'ورود'}
        </Button3D>
        <Button3D variant="secondary" onClick={onDetails}>
          جزئیات
        </Button3D>
      </div>
    </div>
  )
}
