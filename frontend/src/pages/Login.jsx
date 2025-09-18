import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import { mapAuthError } from '../utils/authErrors'

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
      setError(mapAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  const { loginWithGoogle, resetPassword } = useAuth()
  const onGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setLoading(false)
    }
  }
  const onReset = async () => {
    if (!email) return setError('Enter your email to reset password')
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setError('Password reset email sent')
    } catch (err) {
      setError(mapAuthError(err))
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
            <Button type="submit" disabled={loading}>{loading ? (<><Spinner className="mr-2 h-4 w-4" /> Logging in...</>) : 'Login'}</Button>
            <Button type="button" variant="ghost" onClick={onReset}>Forgot password?</Button>
          </div>
          <div className="pt-2">
            <Button type="button" className="w-full" variant="muted" onClick={onGoogle}>Continue with Google</Button>
          </div>
        </form>
      </div>
    </section>
  )
}


