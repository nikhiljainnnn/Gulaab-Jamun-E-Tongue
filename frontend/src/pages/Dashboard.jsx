import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <section className="container-page section">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight">Dashboard</h2>
      {user ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface p-5">
            <h3 className="font-medium mb-2">Account</h3>
            <div className="text-sm space-y-1">
              <p><span className="text-gray-500">Name:</span> {user.name || '—'}</p>
              <p><span className="text-gray-500">Email:</span> {user.email}</p>
            </div>
          </div>
          <div className="card-surface p-5">
            <h3 className="font-medium mb-2">Saved Tests</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your saved or recent tests will appear here.</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  )
}


