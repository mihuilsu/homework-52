import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login, register, selectAuthStatus, selectAuthError } from '../model/authSlice'
import Button from '../../../components/Button'
import styles from './AuthForm.module.css'

function AuthForm({ onSuccess }) {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectAuthStatus)
  const error = useAppSelector(selectAuthError)

  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const action = mode === 'login' ? login(form) : register(form)
    const result = await dispatch(action)
    if (result.meta.requestStatus === 'fulfilled') onSuccess?.()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={mode === 'login' ? styles.activeTab : styles.tab}
          onClick={() => setMode('login')}
        >
          Sign In
        </button>
        <button
          type="button"
          className={mode === 'register' ? styles.activeTab : styles.tab}
          onClick={() => setMode('register')}
        >
          Register
        </button>
      </div>

      {mode === 'register' && (
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
      )}

      <label className={styles.field}>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email@example.com"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          minLength={6}
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <Button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
    </form>
  )
}

export default AuthForm
