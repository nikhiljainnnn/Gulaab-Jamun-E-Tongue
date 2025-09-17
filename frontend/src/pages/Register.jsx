import { useState } from 'react'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      await register({ name, email, password })
      navigate('/login')
    } catch (err) {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-page section grid place-items-center">
      <div className="card-surface w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-5">Create account</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
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
            <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
          </div>
        </form>
      </div>
    </section>
  )
}


