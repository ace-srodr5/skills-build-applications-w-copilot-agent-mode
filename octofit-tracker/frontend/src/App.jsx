import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { apiBaseUrl } from './api.js'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const logoUrl = new URL('../../../docs/octofitapp-small.png', import.meta.url).href

const navigation = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/users">
          <img src={logoUrl} alt="OctoFit Tracker" />
          <span>OctoFit Tracker</span>
        </NavLink>
        <nav className="nav nav-pills">
          {navigation.map((item) => (
            <NavLink className="nav-link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <div className="api-banner">
          <span>API</span>
          <code>{apiBaseUrl}</code>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
