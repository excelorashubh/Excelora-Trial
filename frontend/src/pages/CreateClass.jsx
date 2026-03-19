import React, { useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { createClass } from '../services/classService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const inputCls = "w-full px-3 py-2.5 bg-[#1e293b] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
const labelCls = "block text-xs font-medium text-slate-400 mb-1"

export default function CreateClass() {
  const [form, setForm] = useState({ title: '', subject: '', teacherName: '', studentNames: '', classDate: '', classTime: '', meetingLink: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.subject) return toast.error('Title and subject are required')
    if (!form.classDate) return toast.error('Class date is required')
    if (!form.classTime) return toast.error('Class time is required')
    setLoading(true)
    try {
      await createClass({
        ...form,
        studentNames: form.studentNames ? form.studentNames.split(',').map(s => s.trim()).filter(Boolean) : []
      })
      toast.success('Class created')
      setForm({ title: '', subject: '', teacherName: '', studentNames: '', classDate: '', classTime: '', meetingLink: '' })
    } catch (err) {
      const data = err?.response?.data
      toast.error(data?.errors ? data.errors.map(e => e.msg).join(', ') : 'Error creating class')
    } finally { setLoading(false) }
  }

  return (
    <AdminLayout title="Create Class">
      <div className="max-w-2xl">
        <div className="bg-[#1e293b] rounded-xl border border-white/5 p-6">
          <h2 className="text-base font-semibold mb-5 text-white">New Class Details</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title *</label>
                <input className={inputCls} placeholder="e.g. Maths Batch A" value={form.title} onChange={set('title')} />
              </div>
              <div>
                <label className={labelCls}>Subject *</label>
                <input className={inputCls} placeholder="e.g. Mathematics" value={form.subject} onChange={set('subject')} />
              </div>
              <div>
                <label className={labelCls}>Teacher Name</label>
                <input className={inputCls} placeholder="Teacher's full name" value={form.teacherName} onChange={set('teacherName')} />
              </div>
              <div>
                <label className={labelCls}>Student Names (comma separated)</label>
                <input className={inputCls} placeholder="Alice, Bob, Charlie" value={form.studentNames} onChange={set('studentNames')} />
              </div>
              <div>
                <label className={labelCls}>Class Date *</label>
                <input type="date" className={inputCls} value={form.classDate} onChange={set('classDate')} />
              </div>
              <div>
                <label className={labelCls}>Class Time *</label>
                <input type="time" className={inputCls} value={form.classTime} onChange={set('classTime')} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Meeting Link</label>
              <input className={inputCls} placeholder="https://zoom.us/j/..." value={form.meetingLink} onChange={set('meetingLink')} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60">
                {loading ? 'Creating...' : 'Create Class'}
              </button>
              <button type="button" onClick={() => navigate('/admin/all-classes')}
                className="px-5 py-2.5 border border-white/10 text-slate-400 hover:text-white text-sm rounded-lg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
