import { YEAR_SUMMARIES, type YearSummary } from '../../data/data'
import { ScoreTable } from './ScoreTable'
import { Chip } from '../common/Chip'
import { Avatar } from '../common/Avatar'
import { IconAward, IconUsers, IconScroll } from '../icons'
import { faNum } from '../../lib/persian'
import { useStore } from '../../store/useStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../lib/motion'

export function HistoryTab() {
  const historyYearId = useStore((s) => s.historyYearId)
  const setHistoryYear = useStore((s) => s.setHistoryYear)
  const reduced = useReducedMotion()

  const year: YearSummary = YEAR_SUMMARIES.find((y) => y.yearId === historyYearId) ?? YEAR_SUMMARIES[1]

  return (
    <div className="space-y-4">
      {/* چیپ‌های سال */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {YEAR_SUMMARIES.map((y) => (
          <Chip key={y.yearId} active={y.yearId === historyYearId} onClick={() => setHistoryYear(y.yearId)}>
            {y.label}
          </Chip>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={year.yearId}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* کارت خلاصه‌ی سال */}
          {!year.empty ? (
            <div className="rounded-3xl bg-white p-4 shadow-card">
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-ink-900">خلاصه‌ی {year.label}</h3>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-sand-50 p-3">
                <Avatar name={year.manager} color="#3A6630" size={40} />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-ink-500">مسئول آن سال</p>
                  <p className="truncate text-sm font-bold text-ink-900">{year.manager}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                <SummaryStat icon={<IconUsers size={16} />} value={faNum(year.memberCount)} label="اعضا" />
                <SummaryStat icon={<IconScroll size={16} />} value={faNum(year.totalPoints)} label="امتیاز کل" />
                <SummaryStat icon={<IconAward size={16} />} value={faNum(year.approvedReports)} label="گزارش" />
                <SummaryStat icon={<IconAward size={16} />} value={faNum(year.groupBadges)} label="نشان گروهی" />
              </div>
            </div>
          ) : null}

          <ScoreTable
            members={year.members}
            isHistory
            yearLabel={year.label}
            empty={year.empty}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function SummaryStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-2 text-center">
      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-leaf-500">{icon}</div>
      <p className="text-sm font-extrabold text-ink-900">{value}</p>
      <p className="text-[9px] font-semibold text-ink-500">{label}</p>
    </div>
  )
}
