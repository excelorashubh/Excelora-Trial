import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { getClass, updateClass } from '../services/classService'
import toast from 'react-hot-toast'

const inputCls = "w-full px-3 py-2.5 bg-[#1e293b] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
const labelCls = "block text-xs font-medium text-slate-400 mb-1"

export default function EditClass() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', subject: '', teacherName: '', studentNames: '', classDate: '', classTime: '', meetingLink: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }))

  useEffect(() => {
    getClass(classId).then(res => {
      const d = res.data || res
      setForm({
        title: d.title || '', subject: d.subject || '',
        teacherName: d.teacher?.name || '',
        studentNames: Array.isArray(d.students) ? d.students.map(s => s.name).join(', ') : '',
        classDate: d.classDate || '', classTime: d.classTime || '',
        meetingLink: d.meetingLink || ''
      })
    }).catch(() => {
      toast.error('Failed to load class')
      navigate('/admin/all-classes')
    }).finally(() => setLoading(false))
  }, [classId])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.subject) return toast.error('Title and subject are required')
    if (!form.classDate) return toast.error('Class date is required')
    if (!form.classTime) return toast.error('Class time is required')
    setSaving(true)
    try {
      await updateClass(classId, {
        ...form,
        studentNames: form.studentNames ? form.studentNames.split(',').map(s => s.trim()).filter(Boolean) : []
      })
      toast.success('Class updated')
      navigate('/admin/all-classes')
    } catch (err) {
      const data = err?.response?.data
      toast.error(data?.errors ? data.errors.map(e => e.msg).join(', ') : 'Error updating class')
    } finally { setSaving(false) }
  }

  if (loading) return <AdminLayout title="Edit Class"><div className="text-slate-400 animate-pulse">Loading...</div></AdminLayout>

  return (
    <AdminLayout title="Edit Class">
      <div className="max-w-2xl">
        <div className="bg-[#1e293b] rounded-xl border border-white/5 p-6">
          <h2 className="text-base font-semibold mb-5 text-white">Edit Class Details</h2>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title *</label>
                <input className={inputCls} value={form.title} onChange={set('title')} />
              </div>
              <div>
                <label className={labelCls}>Subject *</label>
                <input className={inputCls} value={form.subject} onChange={set('subject')} />
              </div>
              <div>
                <label className={labelCls}>Teacher Name</label>
                <input className={inputCls} value={form.teacherName} onChange={set('teacherName')} />
              </div>
              <div>
                <label className={labelCls}>Student Names (comma separated)</label>
                <input className={inputCls} value={form.studentNames} onChange={set('studentNames')} />
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
              <input className={inputCls} value={form.meetingLink} onChange={set('meetingLink')} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Update Class'}
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
