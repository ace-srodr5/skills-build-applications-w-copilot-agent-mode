import DataPage from './DataPage.jsx'

function Workouts() {
  return (
    <DataPage
      resource="workouts"
      title="Workouts"
      description="Personalized workout suggestions for endurance, strength, and recovery."
      renderMobileTitle={(workout) => workout.title}
      columns={[
        { key: 'title', label: 'Workout', render: (workout) => workout.title },
        { key: 'focus', label: 'Focus', render: (workout) => workout.focus },
        { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
        { key: 'duration', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
        { key: 'team', label: 'Recommended for', render: (workout) => workout.recommendedForTeam?.name ?? 'All teams' },
      ]}
    />
  )
}

export default Workouts