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
      <div className="p-4 bg-white rounded shadow">
        <div className="animate-pulse">Loading classes...</div>
      </div>
    )
  }

  const openMeet = (meetLink) => {
    window.open(`https://${meetLink}`, "_blank", "noopener,noreferrer");
    
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {classes.length === 0 ? (
        <div className="text-gray-500 py-4">
          {todayOnly ? 'No classes scheduled for today' : 'No classes available'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Teacher</th>
                <th className="px-4 py-2 text-left">Students</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Class Link</th>
                {isAdmin && <th className="px-4 py-2 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{cls.title}</td>
                  <td className="px-4 py-2">{cls.subject}</td>
                  <td className="px-4 py-2">{cls.teacher?.name || 'N/A'}</td>
                  <td className="px-4 py-2">{cls.students?.length || 0}</td>
                  <td className="px-4 py-2 text-sm">
                    {getClassDateYmd(cls) || 'N/A'}
                  </td>
                  
                  <td className="px-4 py-2 text-sm">
                    {getClassTimeHm(cls) || 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    {cls.meetingLink ? (
                      <a
                        href={cls.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all" onClick={()=>{
                          openMeet(cls.meetingLink)
                        }}
                      >
                        Open Class
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cls._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls._id, cls.title)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
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
