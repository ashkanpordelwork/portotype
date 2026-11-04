import { CURRENT_YEAR } from '../../data/data'
import { ScoreTable } from './ScoreTable'
import { RequestCard } from './RequestCard'
import { ActivityList } from './ActivityList'
import { useStore } from '../../store/useStore'

interface Props {
  onApply: () => void
}

export function MembersTab({ onApply }: Props) {
  const cancelRequest = useStore((s) => s.cancelRequest)
  return (
    <div className="space-y-4">
      <ScoreTable members={CURRENT_YEAR.members} yearLabel={CURRENT_YEAR.label} />
      <RequestCard onApply={onApply} onCancel={cancelRequest} />
      <ActivityList />
    </div>
  )
}
