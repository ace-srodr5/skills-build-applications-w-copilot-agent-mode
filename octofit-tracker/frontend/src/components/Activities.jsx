import { formatDate } from '../api.js'
import DataPage from './DataPage.jsx'

function Activities() {
  return (
    <DataPage
      resource="activities"
      title="Activities"
      description="Recent cardio, strength, and recovery sessions logged by OctoFit members."
      renderMobileTitle={(activity) => activity.activityType}
      columns={[
        { key: 'type', label: 'Activity', render: (activity) => activity.activityType },
        { key: 'user', label: 'Member', render: (activity) => activity.user?.displayName ?? 'Unassigned' },
        { key: 'team', label: 'Team', render: (activity) => activity.team?.name ?? 'No team' },
        { key: 'duration', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
        { key: 'calories', label: 'Calories', render: (activity) => activity.caloriesBurned },
        { key: 'date', label: 'Completed', render: (activity) => formatDate(activity.completedAt) },
      ]}
    />
  )
}

export default Activities