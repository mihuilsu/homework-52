import api from '../../../services/api/baseApi'

// Send login credentials and receive a token
export const loginApi = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

// Register a new account
export const registerApi = async (userData) => {
  const response = await api.post('/auth/register', userData)
  return response.data
}

// Invalidate the current session on the server
export const logoutApi = async () => {
  await api.post('/auth/logout')
}
