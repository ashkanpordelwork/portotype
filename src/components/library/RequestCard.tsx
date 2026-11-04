import { useStore } from '../../store/useStore'
import { LIBRARY_INFO } from '../../data/data'
import { Button3D } from '../common/Button3D'
import { IconClock, IconPlus } from '../icons'
import { faNum } from '../../lib/persian'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'

interface Props {
  onApply: () => void
  onCancel: () => void
}

export function RequestCard({ onApply, onCancel }: Props) {
  const status = useStore((s) => s.request.status)
  const reduced = useReducedMotion()
  const pending = status === 'pending'

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={[
        'rounded-3xl p-4 shadow-card',
        pending ? 'bg-sun-400/15 ring-1 ring-sun-400' : 'bg-white',
      ].join(' ')}
    >
      {pending ? (
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sun-400 text-white">
            <IconClock size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-ink-900">درخواست در انتظار تایید</p>
            <p className="text-xs text-ink-500">منتظر تایید {LIBRARY_INFO.manager.name} باشی.</p>
          </div>
          <Button3D variant="danger" onClick={onCancel} className="px-3 py-2.5">
            لغو درخواست
          </Button3D>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-500">
            <IconPlus size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-ink-900">تو هنوز عضو کتابخانه نیستی</p>
            <p className="text-xs text-ink-500">{faNum(LIBRARY_INFO.stats.openRoles)} نقش خالی منتظر توست.</p>
          </div>
          <Button3D onClick={onApply} className="px-3 py-2.5">
            درخواست عضویت
          </Button3D>
        </div>
      )}
    </motion.div>
  )
}
