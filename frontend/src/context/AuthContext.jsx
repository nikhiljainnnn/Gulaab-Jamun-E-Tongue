import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .me()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const data = await authService.login({ email, password })
    if (data?.access_token) {
      localStorage.setItem('token', data.access_token)
      const me = await authService.me()
      setUser(me)
    }
    return data
  }

  const register = async (payload) => {
    const data = await authService.register(payload)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


