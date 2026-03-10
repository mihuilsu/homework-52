import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi, logoutApi } from '../api/authApi'

// Async thunk — log in with credentials
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginApi(credentials)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

// Async thunk — register a new user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      return await registerApi(userData)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

// Async thunk — log out the current user
export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = 'loading'
      state.error = null
    }
    const handleRejected = (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    }

    builder
      // login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, handleRejected)
      // register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(register.rejected, handleRejected)
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      })
  },
})

export const { clearAuthError } = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => Boolean(state.auth.token)
export const selectAuthStatus = (state) => state.auth.status
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
