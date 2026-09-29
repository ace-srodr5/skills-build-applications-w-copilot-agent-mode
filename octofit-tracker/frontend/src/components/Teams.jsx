import DataPage from './DataPage.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <DataPage
      resource="teams"
      endpoint={teamsEndpoint}
      title="Teams"
      description="Training groups, coaches, and shared goals across the OctoFit community."
      renderMobileTitle={(team) => team.name}
      columns={[
        { key: 'name', label: 'Team', render: (team) => team.name },
        { key: 'mascot', label: 'Mascot', render: (team) => team.mascot },
        { key: 'coach', label: 'Coach', render: (team) => team.coach },
        { key: 'goal', label: 'Member goal', render: (team) => team.memberGoal },
      ]}
    />
  )
}

export default Teams