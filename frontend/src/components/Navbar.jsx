import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Gulaab-Jamun E‑Tongue</Link>
        <div className="flex items-center gap-4">
          <Link to="/herbs">Herbs</Link>
          <Link to="/results">Test Results</Link>
          <Link to="/about">About</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-gray-900 text-white dark:bg-white dark:text-gray-900">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}


