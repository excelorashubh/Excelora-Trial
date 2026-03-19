import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'
import { useNavigate } from 'react-router-dom'

export default function TeacherDashboard() {
  const { user, logout, refreshUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { refreshUser() }, [])

  return (
    <div className="flex flex-col min-h-screen dark:bg-[#0f0f0f] dark:text-white">
      {/* Header */}
      <div className="w-full px-6 py-3 flex items-center justify-between border-b sticky top-0 backdrop-blur-md z-10">
        <h1 className="text-xl font-bold">Teacher Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 space-y-2">
          <h2 className="font-semibold text-lg mb-3">My Profile</h2>
          <InfoRow label="Name" value={user?.name} />
          <InfoRow label="Email" value={user?.email} />
          <InfoRow label="Phone" value={user?.phone} />
          <InfoRow label="Subject" value={user?.subject} />
          <InfoRow label="Qualification" value={user?.qualification} />
          <InfoRow label="Experience" value={user?.experience ? `${user.experience} years` : null} />
          <InfoRow label="Status" value={user?.status} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm text-left" onClick={() => navigate('/teacher/materials')}>Upload Materials</button>
            <button className="bg-green-600 text-white px-3 py-2 rounded text-sm text-left" onClick={() => navigate('/teacher/attendance')}>Mark Attendance</button>
          </div>
        </div>

        {/* Assigned Students */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
          <h2 className="font-semibold text-lg mb-3">Assigned Students ({user?.assignedStudents?.length || 0})</h2>
          {user?.assignedStudents?.length > 0 ? (
            <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
              {user.assignedStudents.map(s => (
                <li key={s._id} className="flex justify-between border-b pb-1">
                  <span>{s.name}</span>
                  <span className="text-gray-500 text-xs">{s.class || ''}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No students assigned yet.</p>
          )}
        </div>
      </div>

      {/* Classes */}
      <div className="px-6 pb-6 grid grid-cols-1 gap-4">
        <ClassList todayOnly title="Today's Classes" />
        <ClassList title="All My Classes" />
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
