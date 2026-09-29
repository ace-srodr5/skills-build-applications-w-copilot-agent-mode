import DataPage from './DataPage.jsx'

function Leaderboard() {
  return (
    <DataPage
      resource="leaderboard"
      title="Leaderboard"
      description="Competitive standings based on points, participation, and weekly streaks."
      renderMobileTitle={(entry) => `#${entry.rank} ${entry.user?.displayName ?? 'Member'}`}
      columns={[
        { key: 'rank', label: 'Rank', render: (entry) => `#${entry.rank}` },
        { key: 'user', label: 'Member', render: (entry) => entry.user?.displayName ?? 'Unknown' },
        { key: 'team', label: 'Team', render: (entry) => entry.team?.name ?? 'No team' },
        { key: 'points', label: 'Points', render: (entry) => entry.points.toLocaleString() },
        { key: 'streak', label: 'Weekly streak', render: (entry) => `${entry.weeklyStreak} days` },
      ]}
    />
  )
}

export default Leaderboard