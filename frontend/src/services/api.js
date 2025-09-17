import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },
  async register(payload) {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}

// Herbs endpoints
export const herbsService = {
  async list(params = {}) {
    const { data } = await api.get('/herbs', { params })
    return data
  },
}

// Test Results endpoints
export const resultsService = {
  async list(params = {}) {
    const { data } = await api.get('/test-results', { params })
    return data
  },
}


