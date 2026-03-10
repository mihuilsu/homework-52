import axios from 'axios'

// Base Axios instance — all requests go through this client.
// Set VITE_API_BASE_URL in .env to point to your backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach auth token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global error handling — log details for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Unknown API error'
    return Promise.reject(new Error(message))
  },
)

export default api
