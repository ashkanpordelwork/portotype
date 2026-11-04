import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button3D } from './Button3D'
import { pageTransition } from '../../lib/motion'

interface Props {
  title: string
  icon?: React.ReactNode
  backTo?: string
  backLabel?: string
}

// صفحه‌ی «به‌زودی» برای تب‌هایی که صفحه ندارند
export function ComingSoon({ title, icon, backTo = '/', backLabel = 'بازگشت' }: Props) {
  const navigate = useNavigate()
  return (
    <motion.div
      {...pageTransition}
      className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sand-100 text-leaf-500">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-ink-900">{title}</h2>
        <p className="mt-1 text-sm text-ink-500">این بخش به‌زودی در نسخه‌ی آزمایشی فعال می‌شود.</p>
      </div>
      <Button3D variant="secondary" onClick={() => navigate(backTo)}>
        {backLabel}
      </Button3D>
    </motion.div>
  )
}
