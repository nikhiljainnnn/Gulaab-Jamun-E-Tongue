import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import { mapAuthError } from '../utils/authErrors'

export default function Auth({ initial = 'login' }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLoginPath = pathname.includes('login')
  const [mode, setMode] = useState(initial || (isLoginPath ? 'login' : 'register'))
  const isLogin = mode === 'login'

  const { login, register, loginWithGoogle, resetPassword, user, loginDemo } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Keep mode synced when navigating directly to /login or /register
    setMode(isLoginPath ? 'login' : 'register')
  }, [isLoginPath])

  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user])

  const title = useMemo(() => (isLogin ? 'Login' : 'Create account'), [isLogin])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill all required fields')
      return
    }
    if (!isLogin && password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register({ name, email, password })
      }
      navigate('/dashboard')
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setLoading(false)
    }
  }

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
        <div className="flex items-center gap-2 mb-5">
          <button onClick={() => setMode('login')} className={`text-sm px-3 py-1.5 rounded-md ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`text-sm px-3 py-1.5 rounded-md ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>Sign Up</button>
        </div>
        <h2 className="text-xl font-semibold mb-5">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1">Name</label>
              <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label className="block mb-1">Email</label>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input className="input-field" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
          )}
          {error && <p className={`text-sm ${error.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>{error}</p>}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>{loading ? (<><Spinner className="mr-2 h-4 w-4" /> {isLogin ? 'Logging in...' : 'Creating account...'}</>) : (isLogin ? 'Login' : 'Create account')}</Button>
            {isLogin && (
              <Button type="button" variant="ghost" onClick={onReset}>Forgot password?</Button>
            )}
          </div>
          <div className="pt-2">
            <Button type="button" className="w-full" variant="muted" onClick={onGoogle}>Continue with Google</Button>
          </div>
          <div className="pt-2">
            <Button type="button" className="w-full" variant="ghost" onClick={() => { setError(''); loginDemo(); navigate('/dashboard') }}>Continue as Demo User</Button>
          </div>
        </form>
      </div>
    </section>
  )
}


