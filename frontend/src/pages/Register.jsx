import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // client-side validation
    if (!name || !email || !password) {
      setError('Name, email and password are required')
      addToast('error', 'Name, email and password are required')
      setLoading(false)
      return
    }
    try {
      const u = await register({ name, email, password, role })
      if (u.role === 'admin') navigate('/admin')
      else if (u.role === 'teacher') navigate('/teacher')
      else navigate('/student')
    } catch (err) { setError(err?.response?.data?.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <select className="w-full border p-2 rounded" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button className="w-full bg-green-600 text-white p-2 rounded" disabled={loading}>{loading? 'Creating...':'Create Account'}</button>
        </form>
      </div>
    </div>
  )
}
