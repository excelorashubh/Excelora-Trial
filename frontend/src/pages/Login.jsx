import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const u = await login(email, password)
      if (u.role === 'admin') navigate('/admin')
      else if (u.role === 'teacher') navigate('/teacher')
      else navigate('/student')
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.errors ? data.errors.map(e=>e.msg).join(', ') : (data?.message || 'Login failed')
      setError(msg)
      addToast('error', msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading? 'Signing in...':'Sign In'}</button>
        </form>
        <p className="mt-4 text-sm">No account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </div>
    </div>
  )
}
