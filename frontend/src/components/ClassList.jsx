import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getClasses, deleteClass } from '../services/classService'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function ClassList({ todayOnly = false, title = 'Class List' }) {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  const toLocalYmd = (d) => {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  const toLocalHm = (d) => {
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const getClassDateYmd = (cls) => {
    if (cls?.classDate) return cls.classDate
    if (cls?.schedule) {
      const d = new Date(cls.schedule)
      return Number.isNaN(d.getTime()) ? '' : toLocalYmd(d)
    }
    return ''
  }

  const getClassTimeHm = (cls) => {
    if (cls?.classTime) return cls.classTime
    if (cls?.schedule) {
      const d = new Date(cls.schedule)
      return Number.isNaN(d.getTime()) ? '' : toLocalHm(d)
    }
    return ''
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const getTodayDate = () => {
    // Local date in YYYY-MM-DD (matches how classDate is stored)
    return toLocalYmd(new Date())
  }

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const data = await getClasses()
      let classList = data.data || data
      classList = Array.isArray(classList) ? classList : []
      classList.sort((a, b) => {
        const dateA = getClassDateYmd(a)
        const dateB = getClassDateYmd(b)
        if (dateA !== dateB) return dateA.localeCompare(dateB)
        const timeA = getClassTimeHm(a)
        const timeB = getClassTimeHm(b)
        return timeA.localeCompare(timeB)
      })
      
      // Filter to only today's classes if todayOnly is true
      if (todayOnly) {
        const today = getTodayDate()
        classList = classList.filter((cls) => getClassDateYmd(cls) === today)
      }
      
      setClasses(classList)
    } catch (err) {
      addToast('error', err.response?.data?.message || 'Failed to fetch classes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (classId, classTitle) => {
    if (window.confirm(`Are you sure you want to delete "${classTitle}"?`)) {
      try {
        await deleteClass(classId)
        addToast('success', 'Class deleted successfully')
        setClasses(classes.filter(c => c._id !== classId))
      } catch (err) {
        addToast('error', err.response?.data?.message || 'Failed to delete class')
      }
    }
  }

  const handleEdit = (classId) => {
    navigate(`/admin/edit-class/${classId}`)
  }

  if (loading) {
    return (
      <div className="p-6 bg-[#1e293b] rounded-xl border border-white/5 animate-pulse text-slate-500">
        Loading classes...
      </div>
    )
  }

  return (
    <div className="bg-[#1e293b] rounded-xl border border-white/5 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {isAdmin && (
          <button onClick={() => navigate('/admin/create-class')}
            className="text-xs text-primary-400 hover:text-primary-300 transition-colors">+ New Class</button>
        )}
      </div>
      {classes.length === 0 ? (
        <div className="px-5 py-8 text-center text-slate-500 text-sm">
          {todayOnly ? 'No classes scheduled for today' : 'No classes available'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Subject</th>
                <th className="px-4 py-3 text-left">Teacher</th>
                <th className="px-4 py-3 text-left">Students</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-left">Link</th>
                {isAdmin && <th className="px-4 py-3 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {classes.map((cls) => (
                <tr key={cls._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{cls.title}</td>
                  <td className="px-4 py-3 text-slate-300">{cls.subject}</td>
                  <td className="px-4 py-3 text-slate-300">{cls.teacher?.name || '—'}</td>
                  <td className="px-4 py-3 text-slate-400">{cls.students?.length || 0}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{getClassDateYmd(cls) || '—'}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{getClassTimeHm(cls) || '—'}</td>
                  <td className="px-4 py-3">
                    {cls.meetingLink ? (
                      <a href={cls.meetingLink} target="_blank" rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 text-xs transition-colors">
                        Join
                      </a>
                    ) : <span className="text-slate-600 text-xs">—</span>}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(cls._id)}
                          className="px-2.5 py-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded text-xs transition-colors">Edit</button>
                        <button onClick={() => handleDelete(cls._id, cls.title)}
                          className="px-2.5 py-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded text-xs transition-colors">Delete</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
