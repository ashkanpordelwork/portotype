import { useEffect, useState } from 'react'
import { Modal } from '../common/Modal'
import { Button3D } from '../common/Button3D'
import { LIBRARY_INFO } from '../../data/data'
import { Avatar } from '../common/Avatar'
import { toast } from '../common/Toast'

interface Props {
  open: boolean
  onClose: () => void
}

export function MessageModal({ open, onClose }: Props) {
  const [text, setText] = useState('')
  useEffect(() => { if (open) setText('') }, [open])

  const send = () => {
    toast('پیامت فرستاده شد', 'check')
    onClose()
  }

  const m = LIBRARY_INFO.manager
  return (
    <Modal open={open} onClose={onClose} title="پیام به مسئول">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Avatar name={m.name} color={m.color} size={36} />
          <div>
            <p className="text-sm font-bold text-ink-900">{m.name}</p>
            <p className="text-[11px] text-ink-500">مسئول کتابخانه</p>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="پیامت رو بنویس…"
          className="w-full resize-none rounded-2xl border-2 border-sand-200 bg-white p-3 text-sm text-ink-900 outline-none focus:border-leaf-400"
        />
        <Button3D className="w-full" disabled={text.trim().length === 0} onClick={send}>
          ارسال پیام
        </Button3D>
      </div>
    </Modal>
  )
}
