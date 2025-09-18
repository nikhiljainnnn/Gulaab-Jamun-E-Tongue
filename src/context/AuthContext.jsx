import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [demoMode, setDemoMode] = useState(false)

  useEffect(() => {
    // Demo user persistence
    const demo = localStorage.getItem('demo_user')
    if (demo) {
      setUser(JSON.parse(demo))
      setDemoMode(true)
      setLoading(false)
      return
    }
    if (!auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    if (!auth) throw new Error('Firebase not configured')
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  }

  const register = async ({ name, email, password }) => {
    if (!auth) throw new Error('Firebase not configured')
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) {
      await updateProfile(cred.user, { displayName: name })
    }
    return cred.user
  }

  const logout = () => {
    if (demoMode) {
      localStorage.removeItem('demo_user')
      setUser(null)
      setDemoMode(false)
      return
    }
    if (!auth) return
    return signOut(auth)
  }

  // Demo user handlers
  const loginDemo = () => {
    const demoUser = {
      uid: 'demo-uid',
      email: 'demo@gjtongue.local',
      name: 'Demo User',
    }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    setUser(demoUser)
    setDemoMode(true)
  }

  const value = useMemo(() => ({ user, loading, login, register, logout, demoMode, loginDemo }), [user, loading, demoMode])
  // Extended actions for UI
  const googleProvider = new GoogleAuthProvider()
  const loginWithGoogle = async () => {
    if (!auth) throw new Error('Firebase not configured')
    const cred = await signInWithPopup(auth, googleProvider)
    return cred.user
  }
  const resetPassword = async (email) => {
    if (!auth) throw new Error('Firebase not configured')
    return sendPasswordResetEmail(auth, email)
  }

  return <AuthContext.Provider value={{ ...value, loginWithGoogle, resetPassword }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


