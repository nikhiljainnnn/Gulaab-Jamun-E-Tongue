import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/WhatsApp Image 2025-09-18 at 20.43.38_a16dd7fd.jpg' // ✅ your logo

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 bg-white/60 dark:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
      <nav className="container-page py-3 flex items-center justify-between">
        
        {/* ✅ Logo + Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="Aushadhi Assure Logo" 
            className="h-8 w-8 object-contain rounded-full" // added rounded for nice look
          />
          <span className="text-lg md:text-xl font-semibold tracking-tight">
            Aushadhi Assure
          </span>
        </Link>

        {/* ✅ Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/herbs" className="hover:underline underline-offset-4">Herbs</Link>
          <Link to="/results" className="hover:underline underline-offset-4">Test Results</Link>
          <Link to="/about" className="hover:underline underline-offset-4">About</Link>
        </div>

        {/* ✅ Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="hidden md:inline text-sm hover:underline underline-offset-4">Dashboard</Link>
              <button onClick={logout} className="btn-muted text-sm px-3 py-1.5">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm px-3 py-1.5">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
