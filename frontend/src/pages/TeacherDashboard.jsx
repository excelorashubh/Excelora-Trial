import React from 'react'
import { useAuth } from '../context/AuthContext'
import ClassList from '../components/ClassList'

export default function TeacherDashboard(){
  const { user, logout } = useAuth()
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Teacher Dashboard</h1>
        <div>
          <span className="mr-4">{user?.name}</span>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="mb-2">Quick Actions</div>
          <div className="flex gap-2 flex-wrap">
            <a href="/teacher/materials" className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm">Upload Materials</a>
            <a href="/teacher/attendance" className="inline-block bg-green-600 text-white px-3 py-1 rounded text-sm">Mark Attendance</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ClassList todayOnly title="Today's Classes" />
        <ClassList title="All Classes" />
      </div>
    </div>
  )
}
