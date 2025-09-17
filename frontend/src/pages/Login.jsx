import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-page section grid place-items-center">
      <div className="card-surface w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-5">Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
          </div>
        </form>
      </div>
    </section>
  )
}


