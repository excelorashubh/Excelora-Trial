import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getClass, updateClass } from '../services/classService'
import { useToast } from '../context/ToastContext'

export default function EditClass() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', subject: '', teacherName: '', studentNames: '', classDate: '', classTime: '', meetingLink: '' })
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetchClass()
  }, [classId])

  const fetchClass = async () => {
    try {
      const data = await getClass(classId)
      const classData = data.data || data
      setForm({
        title: classData.title || '',
        subject: classData.subject || '',
        teacherName: classData.teacher?.name || '',
        studentNames: Array.isArray(classData.students)
          ? classData.students.map(s => s.name).join(', ')
          : '',
        classDate: classData.classDate || '',
        classTime: classData.classTime || '',
        meetingLink: classData.meetingLink || ''
      })
    } catch (err) {
      addToast('error', 'Failed to fetch class details')
      setTimeout(() => navigate('/admin'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()

    if (!form.title || !form.subject) {
      addToast('error', 'Title and subject are required')
      return
    }
    if (!form.classDate) {
      addToast('error', 'Class date is required')
      return
    }
    if (!form.classTime) {
      addToast('error', 'Class time is required')
      return
    }

    const payload = {
      ...form,
      studentNames: form.studentNames
        ? form.studentNames.split(',').map(s => s.trim()).filter(Boolean)
        : []
    }

    try {
      await updateClass(classId, payload)
      addToast('success', 'Class updated successfully')
      setTimeout(() => navigate('/admin'), 1500)
    } catch (err) {
      const data = err?.response?.data
      const msg = data?.errors ? data.errors.map(e => e.msg).join(', ') : 'Error updating class'
      addToast('error', msg)
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">Loading class details...</div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-4">
        <button 
          onClick={() => navigate('/admin')} 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Dashboard
        </button>
      </div>
      <h2 className="text-xl mb-4">Edit Class</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Class Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Subject"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Teacher Name</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Teacher Name"
            value={form.teacherName}
            onChange={e => setForm({ ...form, teacherName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Student Names (comma separated)</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Alice,Bob,Charlie"
            value={form.studentNames}
            onChange={e => setForm({ ...form, studentNames: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class Date *</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={form.classDate}
              onChange={e => setForm({ ...form, classDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Class Time *</label>
            <input
              type="time"
              className="w-full border p-2 rounded"
              value={form.classTime}
              onChange={e => setForm({ ...form, classTime: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Meeting Link</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="https://zoom.us/j/..."
            value={form.meetingLink}
            onChange={e => setForm({ ...form, meetingLink: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Update Class
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

