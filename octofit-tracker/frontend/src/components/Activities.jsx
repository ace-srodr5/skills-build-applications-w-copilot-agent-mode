import { formatDate } from '../api.js'
import DataPage from './DataPage.jsx'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <DataPage
      resource="activities"
      endpoint={activitiesEndpoint}
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