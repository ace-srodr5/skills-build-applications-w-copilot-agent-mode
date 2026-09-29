import DataPage from './DataPage.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <DataPage
      resource="users"
      endpoint={usersEndpoint}
      title="Users"
      description="Athlete and coach profiles synced from the OctoFit API."
      renderMobileTitle={(user) => user.displayName}
      columns={[
        { key: 'name', label: 'Name', render: (user) => user.displayName },
        { key: 'username', label: 'Username', render: (user) => user.username },
        { key: 'email', label: 'Email', render: (user) => user.email },
        { key: 'role', label: 'Role', render: (user) => user.role },
        { key: 'team', label: 'Team', render: (user) => user.team?.name ?? 'No team' },
      ]}
    />
  )
}

export default Users