import { useEffect, useState } from 'react'
import { Modal } from '../common/Modal'
import { Button3D } from '../common/Button3D'
import { LIBRARY_OPEN_ROLES } from '../../data/data'
import { useStore } from '../../store/useStore'
import { toast } from '../common/Toast'
import { faCount } from '../../lib/persian'
import { IconCheck } from '../icons'

interface Props {
  open: boolean
  onClose: () => void
}

const MIN_LEN = 10

export function RequestSheet({ open, onClose }: Props) {
  const submitRequest = useStore((s) => s.submitRequest)
  const [roleId, setRoleId] = useState<string | null>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (open) {
      setRoleId(null)
      setText('')
    }
  }, [open])

  const valid = !!roleId && text.trim().length >= MIN_LEN

  const handleSubmit = () => {
    if (!valid || !roleId) return
    submitRequest(roleId, text.trim())
    toast('درخواستت برای امیر حسینی فرستاده شد', 'check')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="درخواست عضویت در کتابخانه">
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold text-ink-500">انتخاب نقش</p>
          <div className="space-y-2">
            {LIBRARY_OPEN_ROLES.map((r) => (
              <button
                key={r.id}
                data-testid={`role-${r.id}`}
                onClick={() => setRoleId(r.id)}
                className={[
                  'flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-right transition-colors',
                  roleId === r.id ? 'border-leaf-500 bg-leaf-50' : 'border-sand-200 bg-white',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                    roleId === r.id ? 'border-leaf-500 bg-leaf-500 text-white' : 'border-sand-300',
                  ].join(' ')}
                >
                  {roleId === r.id && <IconCheck size={14} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink-900">{r.name}</p>
                  <p className="text-[11px] text-ink-500">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-ink-500">چرا می‌خوای عضو بشی؟</p>
            <span className={['text-[11px] font-semibold', text.trim().length >= MIN_LEN ? 'text-leaf-600' : 'text-ink-300'].join(' ')}>
              {faCount(text.trim().length, MIN_LEN)}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="مثلاً: عاشق کتاب‌خوانی‌ام و می‌خوام به بچه‌ها کمک کنم کتاب‌های خوب پیدا کنن…"
            className="w-full resize-none rounded-2xl border-2 border-sand-200 bg-white p-3 text-sm text-ink-900 outline-none focus:border-leaf-400"
          />
        </div>

        <Button3D className="w-full" disabled={!valid} onClick={handleSubmit}>
          ارسال درخواست
        </Button3D>
      </div>
    </Modal>
  )
}
