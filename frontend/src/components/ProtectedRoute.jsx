import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="container-page section grid place-items-center">
      <Spinner className="h-6 w-6" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}


